var mysql = require("../utilitys/conexion");
var moment = require('moment')();
module.exports = function(){
	this.id;
	this.nombre;
	this.pagina;
	this.created_at = moment.format('YYYY-MM-DD HH:mm:ss');
	this.updated_at = moment.format('YYYY-MM-DD HH:mm:ss');
	this.getAll = function(callback,res){
		var respuesta;
		mysql.Consulta("select * from apps",function(error, results, fields){
			if (error) return res.status(503).json(error);
			callback(results);
		});
	}
	this.getOne=function(callback,res){
		mysql.Consulta(
			"select * from apps where id = ?",
			[this.id],
			function(error, results, fields){
				if (error) return res.status(503).json(error);
				if(results.length == 0) return res.status(404).json("No existe");
				callback(results);
			}
		);
	}

	this.save = function(callback = function(){},res){
		mysql.insertar("insert into apps(nombre, pagina_web,created_at,updated_at) values(?,?,?,?)",
			[this.nombre, this.pagina, this.created_at, this.updated_at],
			function(error, results, fields){
				if (error) return res.status(503).json(error);
				this.id = results.insertId;
				callback(this.id);
		});
	}

	this.delete = function(callback = function(){},res){
		mysql.insertar("delete from apps where id = ?",
			[this.id],
			function(error, results, fields){
				if (error) return res.status(503).json(error);
				this.id = results.insertId;
				callback(this.id);
		});
	}

}	