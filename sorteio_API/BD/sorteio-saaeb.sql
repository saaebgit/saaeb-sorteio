create database sorteio;
use sorteio;

create table TBUsuarios (
	idUsuario int primary key auto_increment,
    pin int unique,
	nome varchar(200) not null,
    numero varchar(15) not null,
    email varchar(50) not null,
    cidade varchar(20) not null
);
select * from TBUsuarios;

-- COMANDOS TESTES
insert into TBUsuarios (pin, nome, numero, email, cidade) values ('2','Ruan', '(17) 98105-8801', 'ruanpablof7@gmail.com', 'Barretos');

SELECT COUNT(*) FROM TBUsuarios WHERE pin = 29033;
SELECT 1 FROM TBUsuarios WHERE pin = 19157;
SELECT numero FROM TBUsuarios WHERE numero = '(17) 98105-8801';

drop table TBUsuarios;