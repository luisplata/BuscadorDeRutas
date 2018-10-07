var express = require("express");
var route = express.Router();
var entorno = require('../utilitys/config-modules.js').config();
var mysql = require("../utilitys/conexion");
var Validation = require("../utilitys/validacion");
var logger = require("../utilitys/logs").log();
var Nodo = require("../model/Nodo");
var App = require("../model/App");
var moment = require('moment')();

//todos aqui van utilizar la autenticación
route.post("/",function(req,res){
	Validation.isValid(req).then(function(resp){
		var nodo = new Nodo();
		nodo.nombre = req.body.nombre;
		nodo.longitud = req.body.longitud;
		nodo.latitud = req.body.latitud;
		nodo.app_id = req.body.app_id;
		nodo.tipo = req.body.tipo;
		var app = new App();
		app.id = req.body.app_id;
		nodo.app = app;
		nodo.save(function(resp){
			res.json(resp);
		},res);
	}).catch(function(error){
		logger.debug(error);
		res.status(403).json(error);
	});
});

route.get("/",function(req,res){
	new Nodo().getAll(function(respuesta){
		res.json(respuesta);
	},res);
});

//vamos a asignarle a un nodo otro nodo, pero el anterior solamente
route.post("/:nodo_actual/:nodo_anterior",function(req,res){
	Validation.isValid(req).then(function(resp){
		var nodo = new Nodo();
		nodo.id = req.params.nodo_actual;
		nodo.getOne(function(respuesta){
			//validamos el caso que sea tipo 0 = inicial que no debe tener nodo anterior
			if(respuesta[0].tipo_nodo == 0){
				return res.status(477).json("no puede tener nodo anterior un nodo tipo 0 o nodo inicial");
			}
			nodo.nodo_anterior = req.params.nodo_anterior;
			nodo.asignarNodoAnterior(function(){
				res.json("ok");
			},res);
		},res);
	}).catch(function(error){
		logger.debug(error);
		res.status(403).json(error);
	});
});

route.put("/:nodo_actual/:nodo_siguiente",function(req,res){
	Validation.isValid(req).then(function(resp){
		var nodo = new Nodo();
		nodo.id = req.params.nodo_actual;
		nodo.getOne(function(respuesta){
			//validamos el caso que sea tipo 2 = final que no debe tener nodo siguiente
			if(respuesta[0].tipo_nodo == 2){
				return res.status(477).json("no puede tener nodo siguiente un nodo tipo 2 o nodo final");
			}
			nodo.nodo_siguiente = req.params.nodo_siguiente;
			nodo.asignarNodoSiguiente(function(){
				res.json("ok");
			},res);
		},res);
	}).catch(function(error){
		logger.debug(error);
		res.status(403).json(error);
	});
});

module.exports = route;