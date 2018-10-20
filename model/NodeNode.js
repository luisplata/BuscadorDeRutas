var mysql = require("../utilitys/conexion");
var moment = require('moment')();
module.exports = function(principal, vertices){
	this.id;
	this.principal = principal;
	this.vertices = vertices;
	this.created_at = moment.format('YYYY-MM-DD HH:mm:ss');
	this.updated_at = moment.format('YYYY-MM-DD HH:mm:ss');
	
	this.getAll = function(callback,res){
		var respuesta;
		mysql.Consulta("select * from node_node",function(error, results, fields){
			if (error) return res.status(503).json(error);
			callback(results);
		});
	}

	this.save = function(callback = function(){},callbackFail = function(){}){
		var principal = this.principal;
		var created_at = this.created_at;
		var updated_at = this.updated_at;
		this.vertices.forEach(function(vertice){
			mysql.insertar("insert into node_node(`nodo_principal`, `nodo_vertice`, `created_at`, `updated_at`) values(?,?,?,?)",
			[principal, vertice, created_at, updated_at],
			function(error, results, fields){
				if (error) callbackFail(error);
				callback();
			}); 
		});
	}

}	



