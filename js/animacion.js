var TextAreaCodigo = document.getElementById("codigo");
var LineasDeCodigo = document.getElementById("codeLine");

TextAreaCodigo.onscroll = function() {
	var x = TextAreaCodigo.scrollTop;
	LineasDeCodigo.firstChild.setAttribute("style", "margin-top: -"+x+"px");
};

TextAreaCodigo.addEventListener("keyup", function(event) {
	LineasDeCodigo.innerHTML ='';
	var ArraydeLineas = TextAreaCodigo.value.split("\n");
	var SaltosDeLinea = ArraydeLineas.length;
	for (var i = 0; i < SaltosDeLinea; i++) {
		var linea=document.createElement('p');
		linea.innerHTML =i+1;
		LineasDeCodigo.appendChild(linea);
	}
	var x = TextAreaCodigo.scrollTop;
	LineasDeCodigo.firstChild.setAttribute("style", "margin-top: -"+x+"px");
});

var menu = document.getElementById("overMenu");
var op1 = document.getElementById("t1");
var op2 = document.getElementById("t2");
var DisplayMenu=0;
menu.addEventListener("click", function(event) {
	if(DisplayMenu==0){
		op1.setAttribute("style", "opacity: 1; display: block;");
		op2.setAttribute("style", "opacity: 1; display: block;");
		DisplayMenu=1;
	}else{
		op1.setAttribute("style", "opacity: 0; display: none;");
		op2.setAttribute("style", "opacity: 0; display: none;");
		DisplayMenu=0;
	}
});

op1.addEventListener("click", function(event) {
	slide1.setAttribute("style", "opacity: 1; display: block;");
	slide2.setAttribute("style", "opacity: 1; display: none;");
});
op2.addEventListener("click", function(event) {
	slide1.setAttribute("style", "opacity: 1; display: none;");
	slide2.setAttribute("style", "opacity: 1; display: block;");
});

function mostrarAsignacion(){
	document.getElementById('asignacion-codigo1').style.display = 'block';
	document.getElementById('asignacion-codigo2').style.display = 'none';
	document.getElementById('asignacion-codigo3').style.display = 'none';
	document.getElementById('asignacion-codigo4').style.display = 'none';
	document.getElementById('asignacion-codigo5').style.display = 'none';
	document.getElementById('asignacion-codigo6').style.display = 'none';
}

function mostrarPara(){
	document.getElementById('asignacion-codigo2').style.display = 'block';
	document.getElementById('asignacion-codigo1').style.display = 'none';
	document.getElementById('asignacion-codigo3').style.display = 'none';
	document.getElementById('asignacion-codigo4').style.display = 'none';
	document.getElementById('asignacion-codigo5').style.display = 'none';
	document.getElementById('asignacion-codigo6').style.display = 'none';
}

function mostrarMientras(){
	document.getElementById('asignacion-codigo3').style.display = 'block';
	document.getElementById('asignacion-codigo1').style.display = 'none';
	document.getElementById('asignacion-codigo2').style.display = 'none';
	document.getElementById('asignacion-codigo4').style.display = 'none';
	document.getElementById('asignacion-codigo5').style.display = 'none';
	document.getElementById('asignacion-codigo6').style.display = 'none';
}

function mostrarCondicional(){
	document.getElementById('asignacion-codigo4').style.display = 'block';
	document.getElementById('asignacion-codigo1').style.display = 'none';
	document.getElementById('asignacion-codigo2').style.display = 'none';
	document.getElementById('asignacion-codigo3').style.display = 'none';
	document.getElementById('asignacion-codigo5').style.display = 'none';
	document.getElementById('asignacion-codigo6').style.display = 'none';
}

function mostrarCondicionalCompuesta(){
	document.getElementById('asignacion-codigo5').style.display = 'block';
	document.getElementById('asignacion-codigo1').style.display = 'none';
	document.getElementById('asignacion-codigo2').style.display = 'none';
	document.getElementById('asignacion-codigo3').style.display = 'none';
	document.getElementById('asignacion-codigo4').style.display = 'none';
	document.getElementById('asignacion-codigo6').style.display = 'none';
}

function mostrarErrorLexico(){
	document.getElementById('asignacion-codigo6').style.display = 'block';
	document.getElementById('asignacion-codigo1').style.display = 'none';
	document.getElementById('asignacion-codigo2').style.display = 'none';
	document.getElementById('asignacion-codigo3').style.display = 'none';
	document.getElementById('asignacion-codigo4').style.display = 'none';
	document.getElementById('asignacion-codigo5').style.display = 'none';
}
