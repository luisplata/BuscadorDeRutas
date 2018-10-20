var mysql = require("../utilitys/conexion");
var moment = require('moment')();
var NodeNode = require("./NodeNode");
module.exports = function(){
	this.id;
	this.nombre;
	this.longitud;
	this.latitud;
	this.tipo;
	this.anterior;
	this.siguiente;
	this.app;
	this.created_at = moment.format('YYYY-MM-DD HH:mm:ss');
	this.updated_at = moment.format('YYYY-MM-DD HH:mm:ss');
	
	this.getAll = function(callback,res){
		var respuesta;
		mysql.Consulta("select * from nodos",function(error, results, fields){
			if (error) return res.status(503).json(error);
			callback(results);
		});
	}
	this.getOne=function(callback,res){
		mysql.Consulta(
			"select * from nodos where id = ?",
			[this.id],
			function(error, results, fields){
				if (error) return res.status(503).json(error);
				if(results.length == 0) return res.status(404).json("No existe");
				callback(results);
			}
		);
	}

	this.save = function(callback = function(){},res){
		mysql.insertar("insert into nodos(nombre, latitud, longitud, tipo_nodo, nodo_anterior, nodo_siguiente, app_id, created_at, updated_at) values(?,?,?,?,?,?,?,?,?)",
			[this.nombre, this.latitud, this.longitud, this.tipo, this.anterior, this.siguiente, this.app.id, this.created_at, this.updated_at],
			function(error, results, fields){
				if (error) return res.status(503).json(error);
				callback(results.insertId);
		});
	}

	this.delete = function(callback = function(){},res){
		mysql.insertar("delete from nodos where id = ?",
			[this.id],
			function(error, results, fields){
				if (error) return res.status(503).json(error);
				this.id = results.insertId;
				callback(this.id);
			}
		);
	}
	this.asignarNodoAnterior = function(callback,res){
		var principal = this.id;
		var siguiente = this.nodo_anterior;

		mysql.insertar("update nodos set nodo_anterior = ? where id = ?",
			[this.nodo_anterior, this.id],
			function(error, results, fields){
				if (error) return res.status(503).json(error);
				this.id = results.insertId;
				var idDelInsertado = this.id;
				//creamos la cosa para la relacion demuchos a muchos
				var nodoPorNodo = new NodeNode(principal, [siguiente]);
				nodoPorNodo.save(function(){
					callback(idDelInsertado);
				},function(error){
					return res.status(503).json(error);
				});
				//hasta aqui
			}
		);
	}
	this.asignarNodoSiguiente = function(callback,res){
		var principal = this.id;
		var siguiente = this.nodo_siguiente;
		mysql.insertar("update nodos set nodo_siguiente = ? where id = ?",
			[this.nodo_siguiente, this.id],
			function(error, results, fields){
				if (error) return res.status(503).json(error);
				this.id = results.insertId;
				var idDelInsertado = this.id;
				//creamos la cosa para la relacion demuchos a muchos
				var nodoPorNodo = new NodeNode(principal, [siguiente]);
				nodoPorNodo.save(function(){
					callback(idDelInsertado);
				},function(error){
					return res.status(503).json(error);
				});
				//hasta aqui
			}
		);
	}

}