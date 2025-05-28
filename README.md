# 📦 SAAEB SORTEIO

## 🎯 Descrição do Projeto

Este site foi desenvolvido para viabilizar a realização de sorteios em diversas escolas de algumas cidades. A participação se dá por meio de **doações de lixo eletrônico**, como peças ou periféricos de computadores antigos ou não utilizados.

Após realizar a doação, o participante preenche um **formulário** no site com seu **nome**, **número de telefone** e **e-mail**. Em seguida, um **PIN exclusivo** é gerado para o participante, que será seu número da sorte para concorrer aos prêmios.

Além disso, o sistema exibe o PIN gerado na tela e envia automaticamente um **e-mail de confirmação** contendo o mesmo PIN para o endereço cadastrado.

---

## 📌 Sistema de QR Code com Hash

Para facilitar o direcionamento correto dos participantes de cada cidade, foi implementado um esquema utilizando **QR Codes** específicos para cada cidade.

Cada QR Code contém uma **URL personalizada** com uma **hash única**, que identifica a cidade de origem do participante. Assim, ao escanear o QR Code, o usuário é automaticamente redirecionado para o sorteio da sua cidade, sem necessidade de selecionar ou informar manualmente.

Essa **hash é enviada automaticamente para a API** junto com os demais dados do participante e, ao armazenar no banco de dados, é registrada como a cidade de origem ou participação.

Esse mecanismo simplifica o fluxo e garante que os sorteios sejam organizados corretamente por cidade.

---

## 💻 Tecnologias Utilizadas

### **Front-end:**
- HTML
- CSS
- JavaScript

### **Back-end/API:**
- `cors@2.8.5` — para permitir requisições entre domínios.
- `dotenv@16.5.0` — para gerenciar variáveis de ambiente.
- `express@5.1.0` — framework web para criar rotas e gerenciar requisições.
- `mysql2@3.14.1` — para conexão com o banco de dados MySQL.
- `nodemailer@7.0.3` — para envio automático de e-mails com o PIN.
- `nodemon@3.1.10` — para facilitar o desenvolvimento com reinício automático do servidor.
- `pm2` — para deixar a API rodando em segundo plano.

---

## 🛠️ Como Funciona

1. O participante escaneia o **QR Code** da sua cidade e é redirecionado automaticamente para a URL correspondente.
2. Preenche o **formulário** com os dados: nome, número e e-mail.
3. O sistema gera um **PIN aleatório**.
4. O PIN é exibido na tela e enviado por **e-mail**.
5. O participante usa esse PIN para concorrer aos prêmios no sorteio da sua cidade.

---

## 🏆 Objetivo Social

O projeto visa, além de fomentar a educação e o engajamento nas escolas, promover a **conscientização sobre o descarte correto** de lixo eletrônico e o reaproveitamento de componentes.

---