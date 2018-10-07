var mysql      	= require('mysql');
var entorno 	= require('../utilitys/config-modules.js').config();
var logger = require("./logs").log();

var consulta 	= function(consultica, parametros,callback){
	var connection = mysql.createConnection({
	  host     : entorno.db.servidor,
	  user     : entorno.db.usuario,
	  password : entorno.db.password
	});

	connection.connect();
	connection.query('USE '+entorno.db.database);

	connection.query(consultica, parametros, function(err, rows, fields) {
		if (err) logger.error(err);
	  	callback(err, rows, fields);
	});

	connection.end();
}

var insertar = function(sql, parametros,callback){
	var connection = mysql.createConnection({
	  host     : entorno.db.servidor,
	  user     : entorno.db.usuario,
	  password : entorno.db.password
	});

	connection.connect();
	connection.query('USE '+entorno.db.database);
	
	connection.query(sql,parametros,function(err, rows, fields){
		if (err) logger.error(err);
		callback(err, rows, fields);
	});

	connection.end();
}

module.exports.Consulta = consulta;
module.exports.insertar = insertar;