var tokens;
var tokenActual;
var m,n;
$('#analisisSintactico-boton').click(function () { 
 	tokens = new Array();
	tokenActual ="";
	m=0,n=0;
	if(conseguirArrayDeTokens()=="ready"){
		analizarGramatica();
	}

});

	function conseguirArrayDeTokens() {
		var m=$('#codigo').val().split("\n");
		for (var i = 0; i < m.length; i++)	tokens[i]=m[i].split(" ");
		tokenActual = tokens[0][0];
		return "ready";
	}
	
	function analizarGramatica() {
		switch(tokenActual) {
			case "":
				siguienteToken();
			break;
			case "$":
				ImprimirAnalisis();
			break;
			default:
				if (analizarFuncion()=="valido") {
					analizarGramatica();
				}
				
		}
	}
	function siguienteToken() {
		n++;
		if(tokens[m][n]==null){
			n=0;
			m++;
		}
		if(m<tokens.length){
			tokenActual=tokens[m][n];
		}else{
			tokenActual="$";
		}
	}

	function analizarFuncion() {
		if(validarTipo()=="valido"&&tokenActual!="$"){
			if(validarNombre()=="valido"&&tokenActual!="$"){
				if(validarAperturaFuncion()=="valido"&&tokenActual!="$"){
					if(ValidarSentencias()=="valido"&&tokenActual!="$"){
						if(validarCierreFuncion()=="valido"&&tokenActual!="$"){
							return "valido";
						}
					}
				}
			}
		}
	}
	function validarCierreFuncion() {
		return "valido";
	}
	function ValidarSentencias() {
		return "valido";
	}
	function validarAperturaFuncion() {
		if(tokenActual[0]=="V"&&tokenActual[0]=="Y"){
			
		}else{
			var error="Apertura de funcion incorrecto";
			marcarError(m,error,tokenActual);
		}
		m++,n=0;
		tokenActual =tokens[m][n];
		return "valido";
	}

	function validarParametroFuncion(argument) {
		
	}
	function validarNombre() {
		console.log("entro a validar nombre "+tokenActual);
		var expReg = /^[a-zA-Z]+\d*$/;
		console.log(expReg.test(tokenActual));
		if (expReg.test(tokenActual) == false){
			var error="NOMBRE de funcion incorrecto";
			marcarError(m,error,tokenActual);
	    }else{
	        siguienteToken();
	    }
	}


	function validarTipo() {
		if(tokenActual!="vacio"&&tokenActual!="cadena"&&tokenActual!="caracter"&&tokenActual!="entero"&&tokenActual!="decimal"&&tokenActual!="boleano"){
			var error="TIPO de funcion invalido";
			marcarError(m,error,tokenActual);
		}
		siguienteToken();
		return "valido";
	}

	function marcarError(m,er,tka) {
		var c = document.getElementById("codeLine").childNodes;
  		console.log(er+ "\n"+ tka);
  		c[m].setAttribute("style", "background-color: red;");
	}

	function ImprimirAnalisis() {
		// body...
	}