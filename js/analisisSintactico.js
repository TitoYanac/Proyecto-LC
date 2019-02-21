var tokens;
var tokenActual;
var m,n;
var analisis;
$('#analisisSintactico-boton').click(function () { 
 	tokens = new Array();
	tokenActual ="";
	analisis="";
	m=0,n=0;
	document.getElementById("analisisSintactico").value=analisis;
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
					if(ValidarSentencias("YV")=="valido"&&tokenActual!="$"){
						if(validarCierreFuncion()=="valido"&&tokenActual!="$"){
							return "valido";
						}
					}
				}
			}
		}
	}
	function validarCierreFuncion() {
		var expReg = /^YV$/;
		if (expReg.test(tokenActual) == false){
			var error="Cierre de funcion incorrecto";
			marcarError(m,error,tokenActual);
	    }else{
	        siguienteToken();
	    }
		return "valido";
	}
	function ValidarSentencias(cierre) {
		/*var tipoSentencia= determinarTipoSentencia();
		tokenActual="";
		for (var i = n; i < tokens[m].length; i++) {
			tokenActual+=tokens[m][i]+" ";
		}
		if(tokenActual!=cierre){
			var e1=/^\s*(entero|decimal|boleano|cadena|caracter)\s+_[a-zA-Z][a-zA-Z0-9]*(\s*|,_[a-zA-Z][a-zA-Z0-9]*\s*)+\s*;\s*$/; //expReg_declararVariable
			var e2=/^\s*_[a-zA-Z][a-zA-Z0-9]*\s*=\s*([0-9]*|[0-9]*\.[0-9]*|"[a-zA-Z0-9]*"|'[a-zA-Z0-9]'|''|_[a-zA-Z][a-zA-Z0-9]*)\s*((\/|\*|\-|\+)\s*([0-9]*|[0-9]*\.[0-9]*|"[a-zA-Z0-9]*"|'[a-zA-Z0-9]'|''|_[a-zA-Z][a-zA-Z0-9]*))*\s*;\s*$/; //expReg_asignarValor
			

		}

		n=tokens[m].length;
		siguienteToken();*/
		return "valido";
	}

	function determinarTipoSentencia() {
		while(tokenActual!=""&&n<tokens[m].length){
			siguienteToken();
		}
		var expReg1=/^\s*(entero|decimal|boleano|cadena|caracter)\s*$/;
		if (expReg1.test(tokenActual) == true){
			return "declaracion";
	    }
	    var expReg2=/^\s*mientras\s*$/;
		if (expReg2.test(tokenActual) == true){
			return "mientras";
	    }
	    var expReg3=/^\s*para\s*$/;
		if (expReg3.test(tokenActual) == true){
			return "para";
	    }
	    var expReg4=/^\s*_[a-zA-Z][a-zA-Z0-9]*\s*$/;
		if (expReg4.test(tokenActual) == true){
			return "asignacion";
	    }
	    var expReg5=/^\s*[a-zA-Z][a-zA-Z0-9]*\s*$/;
		if (expReg5.test(tokenActual) == true){
			return "LlamarFuncion";
	    }
	    if (tokenActual== "}"){
			return "cierreSentencia";
	    }
	}


	function validarAperturaFuncion() {
		tokenActual="";
		for (var i = n; i < tokens[m].length; i++) {
			tokenActual+=tokens[m][i]+" ";
		}

		var expReg = /^\s*(VY\s*\(\s*(entero|decimal|boleano|cadena|caracter)\s+_[a-zA-Z][a-zA-Z0-9]*\s*\)|VY\s*\(\s*(entero|decimal|boleano|cadena|caracter)\s+_[a-zA-Z][a-zA-Z0-9]*\s*(,\s*(entero|decimal|boleano|cadena|caracter)\s+_[a-zA-Z][a-zA-Z0-9]*\s*)+\)|VY\s*\(\s*\))\s*$/;

		if (expReg.test(tokenActual) == false){
			var error="Apertura de funcion incorrecto";
			marcarError(m,error,tokenActual);
	    }

		n=tokens[m].length;
		siguienteToken();
		return "valido";
	}

	function validarNombre() {
		var expReg = /^[a-zA-Z][a-zA-Z0-9]*$/;
		if (expReg.test(tokenActual) == false){
			var error="NOMBRE de funcion incorrecto";
			marcarError(m,error,tokenActual);
	    }else{
	        siguienteToken();
	    }
	    return "valido";
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
  		c[m].setAttribute("style", "background-color: red;");
  		analisis+="Error en la linea "+m+" -> "+er+" ("+tka+")\n";
  		document.getElementById("analisisSintactico").value=analisis;
	}

	function ImprimirAnalisis() {
		document.getElementById("analisisSintactico").value=analisis;
	}