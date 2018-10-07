var express = require("express");
var route = express.Router();
var entorno = require('../utilitys/config-modules.js').config();
var mysql = require("../utilitys/conexion");
var Usuario = require("../model/Usuario");
var Validation = require("../utilitys/validacion");


route.post("/",function(req,res){
	//buscamos al usuario
	var usuario = new Usuario();
	usuario.email = req.body.email;
	usuario.password = req.body.password;
	usuario.getUserLogin(function(resultado){
		var respuesta = {
			token:Validation.crearToken(usuario.email),
			usuario: resultado
		}
		res.json(respuesta);
	},res);
});

route.put("/",function(req,res){
	Validation.isValid(req).then(function(resp){
		res.json(resp);
	}).catch(function(err){
		res.status(403).json(err);
	});
	
});


module.exports = route;