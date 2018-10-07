var entorno 	= require('./config-modules.js').config();
exports.log 	= function(){
	var log4js = require('log4js');
	log4js.configure({
		appenders: { app: { type: 'file', filename: entorno.log.ruta_filename+'/app.log' } },
		categories: { default: { appenders: ["app"], level: 'ALL' } }
	});


	return log4js.getLogger(entorno.log.filename);
}