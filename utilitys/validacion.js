var jwt = require('jsonwebtoken');
var entorno = require('./config-modules.js').config();
var logger = require("./logs").log();

//modelo para validar

var crearToken = function (username){
	var tokenData = {
		username: username
		// ANY DATA
	}
	var token = jwt.sign(tokenData, entorno.secret, {
		expiresIn: 60 * 60 * entorno.lifeToken // expires in 24 hours
	});
	logger.info({
			"token":token,
			"metodo":"creando token"
		});
	return token;
}

var validandoAutenticacion = function (token){
	var respuesta = {status:100,mensaje:{},token:""};
	respuesta.token = token;
    if(!respuesta.token){
		respuesta.status = 401;
		respuesta.mensaje="El token anda mal en el head";
		respuesta.token="";
    }
    respuesta.token = respuesta.token.replace('Bearer ', '');
	var verificacion = jwt.verify(respuesta.token, entorno.secret,function(err,data){
		if(err){
			respuesta.status = 511;
			respuesta.verificacion = data;
			respuesta.mensaje = "No es valido el token";
		}else{
			respuesta.status = 200;
			respuesta.verificacion = data;
		}
	});
	if(respuesta.status == 200){
		return true;
	}else{
		return false;
	}
}

var isValid = function(req){
	var token = req.headers['authorization'];
	return new Promise(function (fulfill, reject){
		logger.info({
			"token":token,
			"metodo":"isValid"
		});
	    if(validandoAutenticacion(token)){
	    	logger.info({
				"token":token,
				"metodo":"isValid=true"
			});
	    	fulfill(token);
	    }else{
	    	logger.info({
				"token":token,
				"metodo":"isValid=false"
			});
	    	reject(token);
	    }
	});
}

var Validacion={
	isValid:isValid,
	crearToken:crearToken
};

module.exports = Validacion;