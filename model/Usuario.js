var mysql = require("../utilitys/conexion");
var moment = require('moment')();
var App = require("./App");
module.exports = function(){
	this.id;
	this.nombre;
	this.email;
	this.password;
	this.app;
	this.created_at = moment.format('YYYY-MM-DD HH:mm:ss');
	this.updated_at = moment.format('YYYY-MM-DD HH:mm:ss');

	this.getAll = function(callback,res){
		var respuesta;
		mysql.Consulta("select id, nombre, email, app_id from usuarios",function(error, results, fields){
			if (error) return res.status(503).json(error);
			callback(results);
		});
	}
	this.getOne=function(callback,res){
		var id = this.id;
		mysql.Consulta(
			"select id, nombre, email, app_id from usuarios where id = ?",
			[id],
			function(error, results, fields){
				if (error) return res.status(503).json(error);
				if(results.length == 0) return res.status(404).json(id);
				callback(results);
			}
		);
	}

	this.save = function(callback = function(){},res){
		mysql.insertar("insert into usuarios(nombre, email, password, app_id, created_at, updated_at) values(?,?,?,?,?,?)",
			[this.nombre, this.email, this.password, this.app.id, this.created_at, this.updated_at],
			function(error, results, fields){
				if (error) return res.status(503).json(error);
				this.id = results.insertId;
				callback(this.id);
		});
	}

	this.getApp = function(callback,res){
		mysql.Consulta("select * from apps where id = ?",[this.app.id],function(error, results, fields){
			if (error) res.status(503).json(error);
			callback(results);
		})
	}

	this.getById = function(id,callback,res){
		mysql.Consulta(
			"select id, nombre, email, app_id from usuarios where id = ?",
			[id],
			function(error, results, fields){
				if (error) return res.status(503).json(error);
				if(results.length == 0) return res.status(404).json(id);
				callback(results);
			}
		);
	}

	this.getUserLogin = function(callback,res){
		var usuario = this;
		mysql.Consulta(
			"select id, nombre, email, app_id from usuarios where email = ? and password = ?",
			[usuario.email,usuario.password],
			function(error, results, fields){
				if (error) return res.status(503).json(error);
				if(results.length == 0) return res.status(404).json(usuario);
				callback(results);
			}
		);
	}

}	