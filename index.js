var crypto = require("crypto");

// genera una cadena de caracteres al azar. Se utilizará como salt
var generarSalt = function(length){
	return crypto.randomBytes(Math.ceil(length/2))
		.toString("hex") /** convierte a formato hexadecimal */
		.slice(0,length);   /** devuelve el número de caracteres solicitados */
};

//hash password with crearHashSalt.
var generarCryptoPassword = function(password, salt){
	var hash = crypto.createHmac("sha512", salt);
	return hash.update(password).digest("hex");
};

//Valida el password de usuario, haciendo uso del salt guardado en la BD
function validarPassword(passwordUsuario, cryptoPassword, salt){
	return generarCryptoPassword(passwordUsuario, salt) === cryptoPassword;
}

//Aquí se prueba la contraseña
var pwdUsuario = "ContraseñaDifícil01";
var salt = generarSalt(32); /** Genera un salt de 32 caracteres*/
var cryptoPassword = generarCryptoPassword(pwdUsuario, salt);

console.log("Contraseña del usuario: --> " + pwdUsuario);
console.log("salt - automáticamente generado - También se guarda en la BD: --> " + salt);
console.log("CryptoPassword - Se guarda en la BD: --> " + cryptoPassword);
console.log("Es válida la contraseña? --> " + validarPassword(pwdUsuario, cryptoPassword, salt));
