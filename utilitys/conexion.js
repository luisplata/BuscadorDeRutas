var mysql      	= require('mysql');
var entorno 	= require('../utilitys/config-modules.js').config();

var consulta 	= function(consultica,callback){
	var connection = mysql.createConnection({
	  host     : entorno.db.servidor,
	  user     : entorno.db.usuario,
	  password : entorno.db.password
	});

	connection.connect();
	connection.query('USE '+entorno.db.database);
	connection.query(consultica, function(err, rows, fields) {
	  if (err) throw err;
	  	callback(rows);
	});

	connection.end();
}

module.exports.Consulta = consulta;