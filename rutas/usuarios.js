var express = require("express");
var route = express.Router();
var entorno = require('../utilitys/config-modules.js').config();
var mysql = require("../utilitys/conexion");
var Usuario = require("../model/Usuario");
var App = require("../model/App");

//creando el usuario
route.post("/",function(req,res){
	//creamos el usuario
	var app = new App();
	app.id = req.body.app_id;
	var usuario = new Usuario();
	usuario.nombre = req.body.nombre;
	usuario.email = req.body.email;
	usuario.password = req.body.password;
	usuario.app = app;
	usuario.save(function(dato){
		res.json(dato);
	},res);

});

route.get("/",function(req,res){
	var usuario = new Usuario();
	usuario.getAll(function(respuesta){
		res.json(respuesta);
	},res);
});

route.get("/:id",function(req,res){
	var usuario = new Usuario();
	usuario.id = req.params.id;
	usuario.getOne(function(resultado){
		res.json(resultado);
	},res);
});

module.exports = route;