//chamando configs padrões do dotenv
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;

//Criando conexão com o banco
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(function(error) {
    if(error)
    {
        console.error("Erro ao conectar no banco de dados", error);
        return;
    }
    console.log("=====| Conexão com o banco criada |=====");
});

function gerarPinVerificado(connection, callback) {
  const gerarNumero = () => Math.floor(1000 + Math.random() * 99000);

  let tentativas = 0;
  const maxTentativas = 100000;

  function tentarGerar() {
    if (tentativas >= maxTentativas) {
      return callback(new Error('Falha ao gerar PIN único. Tente novamente.'));
    }

    const novoPin = gerarNumero();
    tentativas++;

    connection.query('SELECT 1 FROM TBUsuarios WHERE pin = ?', [novoPin], (err, results) => {
      if (err) return callback(err);

      if (results.length > 0) { 
        tentarGerar(); // Já existe, tenta de novo
      } else {
        callback(null, novoPin); // É único!
      }
    });
  }
  tentarGerar();
}
app.post('/usuarios', (req, res) => {
  const { nome, numero, email, cidade } = req.body;
  const sqlInsert = 'INSERT INTO TBUsuarios (pin ,nome, numero, email, cidade) VALUES (?, ?, ?, ?, ?)';
  const sqlSelectNumero = 'SELECT numero FROM TBUsuarios WHERE numero = ?';

//Vericação se já existe o número no banco
  connection.query(sqlSelectNumero, [numero], (err, results) => {
    if (err) {
      console.error('Erro ao verificar número: ', err);
      return res.status(500).json({
        sucesso: false,
        mensagem: 'Erro no servidor'
      });
    }
    if(results.length > 0) {
      return res.status(409).json({
        sucesso: false,
        mensagem: 'Este número já está cadastrado'
      });
    }
 
  //Gerar o pin
  gerarPinVerificado(connection, (err, novoPin) => {
    if (err) {
      console.error('Erro ao gerar PIN:', err);
      return res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao gerar PIN'
      });
    }

    //Inserindo dados na tabela
    connection.query(sqlInsert, [novoPin, nome, numero, email, cidade], (err) => {
      if (err) {
        console.error('Erro ao inserir usuário:', err);
        return res.status(500).json({
          sucesso: false,
          mensagem: 'Erro ao cadastrar'
        });
      }
      res.json({ 
            pin: novoPin.toString()
          });
          console.log('Sucesso pin:', novoPin);
        }
       );

    //Envio do email
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USR,
        pass: process.env.MAIL_PWD
      },
    });

    let options = {
      from: `SAAEB - Sorteio <${process.env.MAIL_USR}>`,
      to: `${email}`,
      subject: `Participação do Sorteio`,
      html: `<!DOCTYPE html>
            <html>
            <head>
            </head>
            <body>
            <p><span style="font-size: 14pt;">Voc&ecirc; est&aacute; participando do Sorteio !!!</span></p>
            <p><br /><span style="font-size: 14pt;">Seu c&oacute;digo &eacute;:&nbsp;</span></p>
            <table style="border-collapse: collapse; width: 100%; background-color: #2a2a2a; border-color: #e03e2d;" border="1">
            <tbody>
            <tr>
            <td style="width: 100%; text-align: center;"><span style="font-size: 24pt; color: #e03e2d;"><strong>${novoPin}</strong></span></td>
            </tr>
            </tbody>
            </table>
            <p><span style="font-size: 14pt;">Entraremos em contato caso voc&ecirc; seja o ganhador!</span></p>
            </body>
            </html>`
    }
    const sendEmail = async () => {
      try{
        await transporter.sendMail(options);
        console.log(`E-mail enviado!!!`)
        process.exit()
      } catch (error) {
        console.log(`Erro ao enviar E-mail`)
        console.log(error)
      }
    }
    sendEmail();

    });
  });
});
  app.listen(port, () => console.log('Servidor rodando na porta 3001'));