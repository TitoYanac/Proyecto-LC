var tokens;
var tokenActual;
var m,n;
var analisis;
var bucleapertura;

function  analisisSintactico() {
	console.log("se hizo click");
 	tokens = new Array();
	tokenActual ="";
	analisis="";
	m=0,n=0;
	bucleapertura=0;
	document.getElementById("analisisSintactico").value=analisis;
	if(conseguirArrayDeTokens()=="ready"){
		analizarGramatica();
	}
	if(analisis==""){
		document.getElementById("analisisSintactico").value="Analisis Sintactico Realizado con Exito \n No se encontraron errores en el Codigo.";
	}
}
	function conseguirArrayDeTokens() {
		var m=$('#codigo').val().split("\n");
		for (var i = 0; i < m.length; i++)	tokens[i]=m[i].split(" ");
		tokenActual = tokens[0][0];
		return "ready";
	}
	
	function analizarGramatica() {
		console.log("empezando a analizar");
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
		console.log("analizando funcion");
		if(tokenActual!="$"&&validarTipo()=="valido"){
			if(validarNombre()=="valido"&&tokenActual!="$"){
				if(validarAperturaFuncion()=="valido"&&tokenActual!="$"){
					if(ValidarSentencias()=="valido"&&tokenActual!="$"){
						validarCierreFuncion();
					}
				}
			}
		}
	}
	function validarCierreFuncion() {
    	if(bucleapertura!=0){
    		var error2="Falta cerrar bucle.";
			marcarError(m,error2,tokenActual);
    	}
		var expReg = /^\s*YV\s*$/;
		if (expReg.test(tokenActual) == false){
			var error="Cierre de funcion incorrecto";
			marcarError(m,error,tokenActual);
	    }
        siguienteToken();
	    console.log("imprimiendo el siguiente token al cierre de funcion: "+tokenActual);
		return "valido";
	}
	function ValidarSentencias() {
		if (tokenActual=="$") {
			return "valido";
		}
		tokenActual="";
		for (var i = 0; i < tokens[m].length; i++) {
			tokenActual+=tokens[m][i]+" ";
		}
		var tipoSentencia= determinarTipoSentencia(tokenActual);
		console.log("validando linea: "+(m+1)+"\ntoken actual: "+tokenActual+"\ntipo de sentencia: "+tipoSentencia);
		switch(tipoSentencia){
			case "declaracion":
				var e1=/^\s*(entero|decimal|boleano|cadena|caracter)\s+(_[a-zA-Z][a-zA-Z0-9]*|_[a-zA-Z][a-zA-Z0-9]*\s*=\s*(verdadero|falso|[0-9]*|[0-9]*\.[0-9]*|"[a-zA-Z0-9]*"|'[a-zA-Z0-9]'|''|_[a-zA-Z][a-zA-Z0-9]*)\s*((\/|\*|\-|\+)\s*([0-9]*|[0-9]*\.[0-9]*|"[a-zA-Z0-9]*"|'[a-zA-Z0-9]'|''|_[a-zA-Z][a-zA-Z0-9]*))*\s*)(\s*|,\s*_[a-zA-Z][a-zA-Z0-9]*\s*|,\s*_[a-zA-Z][a-zA-Z0-9]*\s*=\s*(verdadero|falso|[0-9]*|[0-9]*\.[0-9]*|"[a-zA-Z0-9]*"|'[a-zA-Z0-9]'|''|_[a-zA-Z][a-zA-Z0-9]*)\s*((\/|\*|\-|\+)\s*([0-9]*|[0-9]*\.[0-9]*|"[a-zA-Z0-9]*"|'[a-zA-Z0-9]'|''|_[a-zA-Z][a-zA-Z0-9]*))*\s*)+\s*$/; //expReg_declararVariable
				if (e1.test(tokenActual) == false){
					var error="Sentencia para declarar variable incorrecta.";
					marcarError(m,error,tokenActual);
			    }
			break;
			case "asignacion":
				var e2=/^\s*_[a-zA-Z][a-zA-Z0-9]*\s*=\s*(verdadero|falso|[0-9]*|[0-9]*\.[0-9]*|"[a-zA-Z0-9]*"|'[a-zA-Z0-9]'|''|_[a-zA-Z][a-zA-Z0-9]*)\s*((\/|\*|\-|\+)\s*([0-9]*|[0-9]*\.[0-9]*|"[a-zA-Z0-9]*"|'[a-zA-Z0-9]'|''|_[a-zA-Z][a-zA-Z0-9]*))*\s*\s*$/; //expReg_asignarValor
				if (e2.test(tokenActual) == false){
					var error="Sentencia asignar valor a una variable incorrecta.";
					marcarError(m,error,tokenActual);
			    }
			break;
			case "mientras":
				validarBucleMientras(tokenActual);
			break;
			case "para":
				validarBuclePara(tokenActual);
			break;
			case "LlamarFuncion":
				var e5=/^\s*[a-zA-Z][a-zA-Z0-9]*\(\s*(\s*|"[a-zA-Z0-9]*"|_[a-zA-Z][a-zA-Z0-9]*)(\s*|,"[a-zA-Z0-9]*"|,_[a-zA-Z][a-zA-Z0-9]*)*\s*\)\s*$/; //expReg_asignarValor
				if (e5.test(tokenActual) == false){
					var error="error de sintaxis en llamar función.";
					marcarError(m,error,tokenActual);
			    }
			break;
			case "cierreBucle":
				var e6=/^\s*\}\s*$/; //expReg_cierreBucle
				if (e6.test(tokenActual) == false){
					var error="Cierre de bucle incorrecto.";
					marcarError(m,error,tokenActual);
			    }else{
			    	bucleapertura--;
			    }
			break;
			case "comentario":
				var e8=/^\s*<--\s*[^<>-]*\s*-->\s*$/; //expReg_comentario

				if (e8.test(tokenActual) == false){
					var error="Sentencia de comentario incorrecto";
					marcarError(m,error,tokenActual);
			    }
			break;
			case "asignacionCorta":
				var e9=/^\s*_[a-zA-Z][a-zA-Z0-9]*(\+\+|\-\-)\s*$/; //expReg_asignacionCorta
				if (e9.test(tokenActual) == false){
					var error="Sentencia de asignacionCorta incorrecto";
					marcarError(m,error,tokenActual);
			    }
			break;
			case "sentenciaVacia":

			break;
			case "sino":
				var e9=/^\s*sino\s*{\s*$/; //expReg_asignacionCorta
				if (e9.test(tokenActual) == false){
					var error="Sentencia de asignacionCorta incorrecto";
					marcarError(m,error,tokenActual);
			    }
			    bucleapertura++;
			break;
			case "sicumple":
				var e9=/^\s*sicumple\s*\(\s*(_[a-zA-Z][a-zA-Z0-9]*\s*<\s*_[a-zA-Z][a-zA-Z0-9]*|_[a-zA-Z][a-zA-Z0-9]*\s*<=\s*_[a-zA-Z][a-zA-Z0-9]*|_[a-zA-Z][a-zA-Z0-9]*\s*>\s*_[a-zA-Z][a-zA-Z0-9]*|_[a-zA-Z][a-zA-Z0-9]*\s*>=\s*_[a-zA-Z][a-zA-Z0-9]*|_[a-zA-Z][a-zA-Z0-9]*\s*==\s*_[a-zA-Z][a-zA-Z0-9]*|_[a-zA-Z][a-zA-Z0-9]*\s*<\s*[0-9]+|_[a-zA-Z][a-zA-Z0-9]*\s*<=\s*[0-9]+|_[a-zA-Z][a-zA-Z0-9]*\s*>\s*[0-9]+|_[a-zA-Z][a-zA-Z0-9]*\s*>=\s*[0-9]+|[0-9]+\s*<\s*_[a-zA-Z][a-zA-Z0-9]*|[0-9]+\s*<=\s*_[a-zA-Z][a-zA-Z0-9]*|[0-9]+\s*>\s*_[a-zA-Z][a-zA-Z0-9]*|[0-9]+\s*>=\s*_[a-zA-Z][a-zA-Z0-9]*|[0-9]+\s*<=\s*[0-9]+|[0-9]+\s*<\s*[0-9]+|[0-9]+\s*>\s*[0-9]+|[0-9]+\s*>=\s*[0-9]+|_[a-zA-Z][a-zA-Z0-9]*\s*==\s*_[a-zA-Z][a-zA-Z0-9]*|"[a-zA-Z0-9]*"\s*==\s*"[a-zA-Z0-9]*")\s*\)\s*{\s*$/; //expReg_asignacionCorta
				if (e9.test(tokenActual) == false){
					var error="Sentencia de Si cumple incorrecta";
					marcarError(m,error,tokenActual);
			    }
			    bucleapertura++;
			break;
			case "cierreFuncion":
				var e10=/^\s*YV\s*$/; //expReg_comentario
				if (e10.test(tokenActual) == false){
					var error="Sentencia de Cierre de funcion incorrecto";
					marcarError(m,error,tokenActual);
			    }
			    if(bucleapertura!=0){
			    	var error2="Existen bucles de la funcion sin cerrar"
			    	marcarError(m,error2,tokenActual);
			    }
			    siguienteToken();
				if(tokenActual!="$")analizarFuncion();
			break;
			default:
				var error="Usted ha escrito cualquier cosa.";
				marcarError(m,error,tokenActual);
		}
		if(tokenActual!="$"){
			n=tokens[m].length;
			siguienteToken();
			ValidarSentencias();
		}
	}


	function validarBucleMientras() {
		
		var e3=/^\s*mientras\s*\(\s*(\s*|_[a-zA-Z][a-zA-Z0-9]*\s*(<|>|<=|>=|==)\s*("[a-zA-Z0-9]*"|[0-9]*|_[a-zA-Z][a-zA-Z0-9]*)\s*)\s*\)\s*{\s*$/; //expReg_mientras
		if (e3.test(tokenActual) == false){
			var error="Error de sintaxis Bucle mientras.";
			marcarError(m,error,tokenActual);
	    }else{
	    	bucleapertura++;
	    }
	}

	function validarBuclePara() {
		
		var e4=/^\s*para\s*\(\s*entero\s+_[a-zA-Z][a-zA-Z0-9]*\s*=\s*[0-9]+\s*;\s*(_[a-zA-Z][a-zA-Z0-9]*\s*(<|<=)\s*(_[a-zA-Z][a-zA-Z0-9]*|[0-9]+)\s*;\s*_[a-zA-Z][a-zA-Z0-9]*\+\+\s*|_[a-zA-Z][a-zA-Z0-9]*\s*(>|>=)\s*(_[a-zA-Z][a-zA-Z0-9]*|[0-9]+)\s*;\s*_[a-zA-Z][a-zA-Z0-9]*--\s*)\s*\)\s*{\s*$/; //expReg_para
		if (e4.test(tokenActual) == false){
			var error="Error de sintaxis Bucle para.";
			marcarError(m,error,tokenActual);
	    }else{
	    	bucleapertura++;

	    }
	}

	function determinarTipoSentencia(tactual) {
		var expReg1=/^\s*(entero|decimal|boleano|cadena|caracter)/;
		var expReg2=/^\s*mientras/;
		var expReg3=/^\s*para/;
		var expReg3_1=/^\s*sicumple/;
		var expReg3_2=/^\s*sino/;
		var expReg4=/^\s*_[a-zA-Z][a-zA-Z0-9]*\s*=/;
		var e5=/^\s*YV/;
		var expReg5=/^\s*[a-zA-Z][a-zA-Z0-9]*\(/;
		var expReg6=/^\s*\}/;
		var expReg7=/^\s*<--/;
		var expReg8=/^\s*$/;
		var expReg9=/^\s*_[a-zA-Z][a-zA-Z0-9]*(\+\+|--)/;
		if (expReg1.test(tactual) == true){
			return "declaracion";
	    }
		if (expReg2.test(tactual) == true){
			return "mientras";
	    }
		if (expReg3.test(tactual) == true){
			return "para";
	    }
	    if (expReg3_1.test(tactual) == true){
			return "sicumple";
	    }
	    if (expReg3_2.test(tactual) == true){
			return "sino";
	    }
		if (expReg4.test(tactual) == true){
			return "asignacion";
	    }
		if (e5.test(tactual) == true){
			return "cierreFuncion";
	    }
		if (expReg5.test(tactual) == true){
			return "LlamarFuncion";
	    }
	    if (expReg6.test(tactual) == true){
			return "cierreBucle";
	    }
	    if (expReg7.test(tactual) == true){
			return "comentario";
	    }
	    if (expReg8.test(tactual) == true){
			return "sentenciaVacia";
	    }

		if (expReg9.test(tactual) == true){
			return "asignacionCorta";
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

			var e1 = /^\s*$/;
			while (e1.test(tokenActual) == true) {
				siguienteToken();
			}
		if(tokenActual!="$"){
			var expReg = /^\s*(vacio|entero|decimal|boleano|cadena|caracter)\s*$/;
			if(expReg.test(tokenActual) == false){
				var error="TIPO de funcion invalido";
				marcarError(m,error,tokenActual);
			}
			siguienteToken();
			return "valido";
			
		}
	}

	function marcarError(m,er,tka) {
		var c = document.getElementById("codeLine").childNodes;
  		if(c[m]!=null)c[m].setAttribute("style", "background-color: red;");
  		analisis+="Error en la linea "+(m+1)+" -> "+er+" ("+tka+")\n";
  		console.log(analisis);
  		document.getElementById("analisisSintactico").value=analisis;
	}

	function ImprimirAnalisis() {
		document.getElementById("analisisSintactico").value=analisis;
	}