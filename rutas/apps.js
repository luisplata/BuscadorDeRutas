var express = require("express");
var route = express.Router();
var entorno = require('../utilitys/config-modules.js').config();
var mysql = require("../utilitys/conexion");
var App = require("../model/App");
var Validation = require("../utilitys/validacion");

//Obtener todos los apps que hay
//sin autenticación
route.get("/",function(req,res){
	var app = new App();
	app.getAll(function(resultado){
		res.json(resultado);
	},res);
});

route.post("/",function(req,res){
	var app = new App();
	app.nombre = req.body.nombre;
	app.pagina = req.body.pagina;
	app.save(function(dato){
		res.json(dato);
	},res);
});

route.get("/:id",function(req,res){
	var app = new App();
	app.id = req.params.id;
	app.getOne(function(resultado){
		res.json(resultado);
	},res);
});

route.delete("/:id",function(req,res){
	var app = new App();
	app.id = req.params.id;
	Validation.isValid(req).then(function(){

	},function(err){
		
	});
});

module.exports = route;