var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var entorno = require('./utilitys/config-modules.js').config();
var mysql = require("./utilitys/conexion");
var logger = require("./utilitys/logs").logger;

//middleware para una api publica
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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