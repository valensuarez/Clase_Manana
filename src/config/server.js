//Traer Modulos

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const session = require('express-session');


const app = express(); //Inicializar el server

//Configurar el server:
//configurar puerto:
app.set('port', process.env.PORT || 3001);
//gestor de plantillas
app.set('view engine', 'ejs');

//Ruta de las vistas
var viewPathViews = path.join(__dirname,'../app/views');
app.set('views', viewPathViews);

//Middlewares (manejo de informacion)

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//configurar la ruta de las variables de entorno con dotenv
dotenv.config({path: path.join(__dirname, '../app/env/.env')});

//Configurar css
var viewPath = express.static(path.join(__dirname,'../public'));
app.use('/src', viewPath);


//Configurar sesiones
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

module.exports = app;