
var L_codigo=false;
var tokens;
var sentenciaActual;
var m,n;
var analisis;
var bucleapertura;
var funcionapertura;
var arrayDvariables;
var k;
function inicializar() {
	sentenciaActual ="";
	analisis="";
	m=0,n=0,k=0;
	bucleapertura=0;
	funcionapertura=0;
	arrayDvariables= new Array();
}
function  analisisSintactico() {
	inicializar();
	conseguirArrayDeTokens();
	if (L_codigo==true) {
		analizarGramatica();	
	}
	ImprimirAnalisis();
}
	function conseguirArrayDeTokens() {
		var codigo=$('#codigo').val();
		if(codigo!=""){
			L_codigo=true
			tokens = codigo.split("\n");
			sentenciaActual = tokens[m];
		}
	}
	
	function analizarGramatica() {
		while(sentenciaActual!="$"){
			AnalizarFuncion();
			if(n==0)siguienteToken();
		}
	}
	function AnalizarFuncion() {
		var lineavacia=/^\s*$/;
		while(lineavacia.test(sentenciaActual)==true&&sentenciaActual!="$"){
			siguienteToken();
		}
		if(sentenciaActual!="$"){
			if(funcionapertura!=0){
				var error;
				if(funcionapertura<0) error="Exceso de cerraduras de función";
				if(funcionapertura<0) error="falta(n) "+ funcionapertura + " cerraduras de función";
				marcarError(m,error,sentenciaActual);
			}
			AnalizarAperturaDeFuncion();
			siguienteToken();
		}
		while(ValidarSentencia()==true&&sentenciaActual!="$"){
			siguienteToken();
		}
		if(sentenciaActual!="$"){
			AnalizarCierreDeFuncion();
		}
		arrayDvariables = new Array();
	}



	function siguienteToken() {
		m++;
		if (m<tokens.length) {
			sentenciaActual=tokens[m];
		}else{
			sentenciaActual="$";
		}
	}

	function AnalizarAperturaDeFuncion() {
		var expReg = /^\s*(vacio|entero|entero|decimal|boleano|cadena|caracter)\s+[a-zA-Z][a-zA-Z0-9]*\s+VY\s*\(\s*(\s*|\s*(vacio|entero|entero|decimal|boleano|cadena|caracter)\s+_[a-zA-Z][a-zA-Z0-9]*)\s*(\s*|,\s*(vacio|entero|entero|decimal|boleano|cadena|caracter)\s+_[a-zA-Z][a-zA-Z0-9]*)*\s*\)\s*$/;

		if (expReg.test(sentenciaActual) == false){
			var error="Apertura de función incorrecto! ";
			marcarError(m,error,sentenciaActual);
	    }
	    agregarVariable();
	    funcionapertura++;
	}

	function AnalizarCierreDeFuncion() {
    	if(bucleapertura!=0){
    		var error2="Existen "+bucleapertura+" bucle(s) sin cerrar .";
			marcarError(m,error2,sentenciaActual);
    	}
		var expReg = /^\s*YV\s*$/;
		if (expReg.test(sentenciaActual) == false){
			var error="Cierre de funcion incorrecto";
			marcarError(m,error,sentenciaActual);
	    }
	    funcionapertura--;
	}
	function ValidarSentencia() {
		var tipoSentencia= determinarTipoSentencia(sentenciaActual);
		console.log("linea: "+ (m+1) + " tipo de sentencia : " + tipoSentencia);

		switch(tipoSentencia){
			case "declaracion":
				validarDeclaracionDeVariable();
				agregarVariable();
			break;
			case "asignacion":
				validarAsignacion();
			break;
			case "mientras":
				validarBucleMientras();
			break;
			case "para":
				validarBuclePara();
				agregarVariable();
			break;
			case "LlamarFuncion":
				validarLlamadaDeFuncion();
			break;
			case "cierreBucle":
				var e6=/^\s*\}\s*$/; //expReg_cierreBucle
				if (e6.test(sentenciaActual) == false){
					var error="Cierre de bucle incorrecto.";
					marcarError(m,error,sentenciaActual);
			    }else{
			    	bucleapertura--; 
			    }
			break;
			case "comentario":
				validarCometario();
			break;
			case "asignacionCorta":
				validarAsignacionCorta();
			break;
			case "sino":
				validarCondicional2();
			break;
			case "sicumple":
				validarCondicional();
			break;
			case "_vacio":
			break;
			case "_nextF":
				n=1;
				return false;
			break;
			case "_closeF":
				arrayDvariables = new Array();
				n=0;
				return false;
			break;
			default:
				var error="No se reconoce la linea de codigo!";
				marcarError(m,error,sentenciaActual);
		}
		buscarVariable();
		return true;
	}
	function validarAsignacionCorta() {
		var e9=/^\s*_[a-zA-Z][a-zA-Z0-9]*(\+\+|\-\-)\s*$/;
		if (e9.test(sentenciaActual) == false){
			var error="Sentencia de asignacionCorta incorrecto";
			marcarError(m,error,sentenciaActual);
	    }
	}
	function validarCometario() {
		var e8=/^\s*<--\s*[^<>-]*\s*-->\s*$/; //expReg_comentario

		if (e8.test(sentenciaActual) == false){
			var error="Sentencia de comentario incorrecto";
			marcarError(m,error,sentenciaActual);
	    }
	}
	function validarCondicional2() {
		var e9=/^\s*sino\s*{\s*$/; //expReg_asignacionCorta
		if (e9.test(sentenciaActual) == false){
			var error="Sentencia de asignacionCorta incorrecto";
			marcarError(m,error,sentenciaActual);
	    }
	    bucleapertura++;
	}
	function validarCondicional() {
			var e9=/^\s*sicumple\s*\(\s*(_[a-zA-Z][a-zA-Z0-9]*\s*<\s*_[a-zA-Z][a-zA-Z0-9]*|_[a-zA-Z][a-zA-Z0-9]*\s*<=\s*_[a-zA-Z][a-zA-Z0-9]*|_[a-zA-Z][a-zA-Z0-9]*\s*>\s*_[a-zA-Z][a-zA-Z0-9]*|_[a-zA-Z][a-zA-Z0-9]*\s*>=\s*_[a-zA-Z][a-zA-Z0-9]*|_[a-zA-Z][a-zA-Z0-9]*\s*==\s*_[a-zA-Z][a-zA-Z0-9]*|_[a-zA-Z][a-zA-Z0-9]*\s*<\s*[0-9]+|_[a-zA-Z][a-zA-Z0-9]*\s*<=\s*[0-9]+|_[a-zA-Z][a-zA-Z0-9]*\s*>\s*[0-9]+|_[a-zA-Z][a-zA-Z0-9]*\s*>=\s*[0-9]+|[0-9]+\s*<\s*_[a-zA-Z][a-zA-Z0-9]*|[0-9]+\s*<=\s*_[a-zA-Z][a-zA-Z0-9]*|[0-9]+\s*>\s*_[a-zA-Z][a-zA-Z0-9]*|[0-9]+\s*>=\s*_[a-zA-Z][a-zA-Z0-9]*|[0-9]+\s*<=\s*[0-9]+|[0-9]+\s*<\s*[0-9]+|[0-9]+\s*>\s*[0-9]+|[0-9]+\s*>=\s*[0-9]+|_[a-zA-Z][a-zA-Z0-9]*\s*==\s*_[a-zA-Z][a-zA-Z0-9]*|"[a-zA-Z0-9]*"\s*==\s*"[a-zA-Z0-9]*")\s*\)\s*{\s*$/; //expReg_asignacionCorta
			if (e9.test(sentenciaActual) == false){
				var error="Sentencia de Si cumple incorrecta";
				marcarError(m,error,sentenciaActual);
		    }
		    bucleapertura++;
		    buscarVariable();
	}
	function validarLlamadaDeFuncion(){
		var e5=/^\s*[a-zA-Z][a-zA-Z0-9]*\(\s*(\s*|"[a-zA-Z0-9]*"|_[a-zA-Z][a-zA-Z0-9]*)(\s*|,"[a-zA-Z0-9]*"|,_[a-zA-Z][a-zA-Z0-9]*)*\s*\)\s*$/;
		if (e5.test(sentenciaActual) == false){
			var error="error de sintaxis en llamar función.";
			marcarError(m,error,sentenciaActual);
	    }
	    buscarVariable();
	}
	function validarAsignacion() {
		var e2=/^\s*_[a-zA-Z][a-zA-Z0-9]*\s*=\s*(verdadero|falso|[0-9]*|[0-9]*\.[0-9]*|"[a-zA-Z0-9]*"|'[a-zA-Z0-9]'|''|_[a-zA-Z][a-zA-Z0-9]*)\s*((\/|\*|\-|\+)\s*([0-9]*|[0-9]*\.[0-9]*|"[a-zA-Z0-9]*"|'[a-zA-Z0-9]'|''|_[a-zA-Z][a-zA-Z0-9]*))*\s*\s*$/; //expReg_asignarValor
		if (e2.test(sentenciaActual) == false){
			var error="Sentencia asignar valor a una variable incorrecta.";
			marcarError(m,error,sentenciaActual);
	    }
	}

	function buscarVariable() {
		var temporal= new Array();
		var indice=0,encontrado=0;
		var aux2=sentenciaActual.split("");
		var text="";
		var cont=0;
		for (var i = 0; i < aux2.length; i++) {
			if(aux2[i]==";"){
				break;
			}
			if(aux2[i]=="_"){
				cont=1;
			}
			if(cont==1 ){
				if( aux2[i]==" " || aux2[i]==","|| aux2[i]==")"|| aux2[i]=="="|| aux2[i]=="+"){
					temporal[indice]=text;
					text="";
					indice++;
					cont=2;
				}else{
					text+= aux2[i];
				}
					
			}
		}
		if (cont==1) {
			temporal[indice]=text;
			text="";
			indice++;
			cont=2;
		}

		for (var t = 0; t < temporal.length; t++) {
			for (var p = 0; p < arrayDvariables.length; p++) {
				console.log("comparando: ("+t+","+p+") "+temporal[t]+" | "+arrayDvariables[p]);
				if(arrayDvariables[p]==temporal[t]){
					encontrado++;
				}
			}
			if(encontrado==0){
				var error="Variable "+temporal[t] +" no declarada";
				marcarError(m,error,sentenciaActual);
			}
			encontrado=0;
		}
	}
	function noencontrado(valor) {
		for (var i = 0; i < arrayDvariables.length; i++) {
			if(arrayDvariables[i]==valor) return false;
		}
		return true;
	}
	function agregarVariable() {
		var aux2=sentenciaActual.split("");
		var text="";
		var cont=0;
		for (var i = 0; i < aux2.length; i++) {
			if(aux2[i]==";"){
				break;
			}
			if(aux2[i]=="_"){
				cont=1;
			}
			if(cont==1 ){
				if( aux2[i]==" " || aux2[i]==","|| aux2[i]==")"|| aux2[i]=="="|| aux2[i]=="+"){
					console.log( text )
					if(noencontrado(text)){
						arrayDvariables[k]=text;
						k++;
					}else{
						var error="Variable "+ text +" ya ha sido declarada";
						marcarError(m,error,sentenciaActual);
					}
					text="";
					cont=2;
				}else{
					text+= aux2[i];
				}
					
			}
		}
		if (cont==1) {
			arrayDvariables[k]=text;
			text="";
			k++;
			cont=2;
		}

		//console.log("arrayDvariables ");
		//console.log(arrayDvariables);
	}

	function validarDeclaracionDeVariable(){
		var e1=/^\s*(entero|decimal|boleano|cadena|caracter)\s+(_[a-zA-Z][a-zA-Z0-9]*|_[a-zA-Z][a-zA-Z0-9]*\s*=\s*(verdadero|falso|[0-9]*|[0-9]*\.[0-9]*|"[a-zA-Z0-9]*"|'[a-zA-Z0-9]'|''|_[a-zA-Z][a-zA-Z0-9]*)\s*((\/|\*|\-|\+)\s*([0-9]*|[0-9]*\.[0-9]*|"[a-zA-Z0-9]*"|'[a-zA-Z0-9]'|''|_[a-zA-Z][a-zA-Z0-9]*))*\s*)(\s*|,\s*_[a-zA-Z][a-zA-Z0-9]*\s*|,\s*_[a-zA-Z][a-zA-Z0-9]*\s*=\s*(verdadero|falso|[0-9]*|[0-9]*\.[0-9]*|"[a-zA-Z0-9]*"|'[a-zA-Z0-9]'|''|_[a-zA-Z][a-zA-Z0-9]*)\s*((\/|\*|\-|\+)\s*([0-9]*|[0-9]*\.[0-9]*|"[a-zA-Z0-9]*"|'[a-zA-Z0-9]'|''|_[a-zA-Z][a-zA-Z0-9]*))*\s*)+\s*$/; //expReg_declararVariable
		if (e1.test(sentenciaActual) == false){
			var error="Sentencia para declarar variable incorrecta.";
			marcarError(m,error,sentenciaActual);
	    }
	}
	function validarBucleMientras() {
		var e3=/^\s*mientras\s*\(\s*(\s*|_[a-zA-Z][a-zA-Z0-9]*\s*(<|>|<=|>=|==)\s*("[a-zA-Z0-9]*"|[0-9]*|_[a-zA-Z][a-zA-Z0-9]*)\s*)\s*\)\s*{\s*$/; //expReg_mientras
		if (e3.test(sentenciaActual) == false){
			var error="Error de sintaxis Bucle mientras.";
			marcarError(m,error,sentenciaActual);
	    }else{
	    	bucleapertura++;
	    }
	}

	function validarBuclePara() {
		var e4=/^\s*para\s*\(\s*entero\s+_[a-zA-Z][a-zA-Z0-9]*\s*=\s*[0-9]+\s*;\s*(_[a-zA-Z][a-zA-Z0-9]*\s*(<|<=)\s*(_[a-zA-Z][a-zA-Z0-9]*|[0-9]+)\s*;\s*_[a-zA-Z][a-zA-Z0-9]*\+\+\s*|_[a-zA-Z][a-zA-Z0-9]*\s*(>|>=)\s*(_[a-zA-Z][a-zA-Z0-9]*|[0-9]+)\s*;\s*_[a-zA-Z][a-zA-Z0-9]*--\s*)\s*\)\s*{\s*$/; //expReg_para
		if (e4.test(sentenciaActual) == false){
			var error="Error de sintaxis Bucle para.";
			marcarError(m,error,sentenciaActual);
	    }else{
	    	bucleapertura++;

	    }
	}

	function determinarTipoSentencia(tactual) {
		var _declaracion=/^\s*(entero|decimal|boleano|cadena|caracter)/;
		var _mientras=/^\s*mientras/;
		var _para=/^\s*para/;
		var _sicumple=/^\s*sicumple/;
		var _sino=/^\s*sino/;
		var _asignacion=/^\s*_[a-zA-Z][a-zA-Z0-9]*\s*=/;
		var _LlamarFuncion=/^\s*[a-zA-Z][a-zA-Z0-9]*\(/;
		var _cierreBucle=/^\s*\}/;
		var _comentario=/^\s*<--/;
		var _nextF=/^\s*(vacio|entero|decimal|boleano|cadena|caracter)\s+[a-zA-Z][a-zA-Z0-9]*\s*/;
		var _atajo=/^\s*_[a-zA-Z][a-zA-Z0-9]*(\+\+|--)/;
		var _closeF=/^\s*YV/;
		var _vacio=/^\s*$/;
		if (_declaracion.test(tactual) == true){
			return "declaracion";
	    }
		if (_mientras.test(tactual) == true){
			return "mientras";
	    }
		if (_para.test(tactual) == true){
			return "para";
	    }
	    if (_sicumple.test(tactual) == true){
			return "sicumple";
	    }
	    if (_sino.test(tactual) == true){
			return "sino";
	    }
		if (_asignacion.test(tactual) == true){
			return "asignacion";
	    }
		if (_LlamarFuncion.test(tactual) == true){
			return "LlamarFuncion";
	    }
	    if (_cierreBucle.test(tactual) == true){
			return "cierreBucle";
	    }
	    if (_comentario.test(tactual) == true){
			return "comentario";
	    }
	    if (_nextF.test(tactual) == true){
			return "_nextF";
	    }

		if (_atajo.test(tactual) == true){
			return "asignacionCorta";
	    }
	    if (_closeF.test(tactual) == true){
	    	return"_closeF";
	    }
	    if (_vacio.test(tactual) == true){
	    	return"_vacio";
	    }
	}



	function marcarError(m,er,tka) {
		var c = document.getElementById("codeLine").childNodes;
  		if(c[m]!=null)c[m].setAttribute("style", "background-color: red;");
  		analisis+="Error en la linea "+(m+1)+" -> "+er+" ("+tka+")\n";
	}

	function ImprimirAnalisis() {
		if(L_codigo=true){
			if (analisis!="") {
				document.getElementById("analisisSintactico").value=analisis;
			}else{
				document.getElementById("analisisSintactico").value="Analisis Sintactico Realizado con Exito \n No se encontraron errores en el Codigo.";
			}
		}else{
			document.getElementById("analisisSintactico").value="No se ha escrito codigo.";
		}
	}