var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var entorno = require('./utilitys/config-modules.js').config();
var mysql = require("./utilitys/conexion");
var logger = require("./utilitys/logs").logger;

//configuracion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//rutas externas
var apps = require("./rutas/apps");
var usuarios = require("./rutas/usuarios");
var login = require("./rutas/login");
var nodo = require("./rutas/nodos");

//importacion de rutas
app.get("/",function(req,res){
	res.json("Hola bby");
});

app.use("/apps",apps);
app.use("/usuario",usuarios);
app.use("/login",login);
app.use("/nodo",nodo);

app.listen(entorno.puerto);