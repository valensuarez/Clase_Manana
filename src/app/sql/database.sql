CREATE DATABASE emisora_web;
USE emisora_web;

CREATE TABLE db_ganador(
    id_ganador INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    premio_entregado VARCHAR(100) NOT NULL,
    patrocinador VARCHAR(100) NOT NULL
)ENGINE INNODB;

CREATE TABLE db_sorteos(
    id_sorteos INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    imagen TEXT NOT NULL ,
    titulo VARCHAR(100) NOT NULL,
    codigo int(10) NOT NULL UNIQUE,
    nombre_producto VARCHAR(100) NOT NULL,
    lugar VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    onclick	BIT	NOT NULL,
    id_ganador INT,
    FOREIGN KEY (id_ganador) REFERENCES db_ganador(id_ganador) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE INNODB;



CREATE TABLE db_cliente(
    id_registro INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    foto_perfil text NOT NULL,
    user VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    addre VARCHAR(75) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    passw VARCHAR(255) NOT NULL,
    rol VARCHAR(255) NOT NULL,
    data_create TIMESTAMP,
    FOREIGN KEY (id_registro) REFERENCES db_sorteos(id_sorteos) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE INNODB;

create table db_asunto(
	id_asunto int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user VARCHAR(100) NOT NULL,
    email VARCHAR(75) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    addre VARCHAR (75) NOT NULL,
    asunto VARCHAR (20) NOT NULL,
    argumento VARCHAR(500) NOT NULL
)ENGINE INNODB;
