var text=document.getElementById("codigo");
var codeLine=document.getElementById("codeLine");

text.onscroll = function() {
	var x = text.scrollTop;
	codeLine.firstChild.setAttribute("style", "margin-top: -"+x+"px");
};

document.getElementById("codigo").addEventListener("keyup", function(event) {
	codeLine.innerHTML ='';
	var Lineas = text.value.split("\n");
	var SaltosDeLinea = Lineas.length;
	for (var i = 0; i < SaltosDeLinea; i++) {
		var pl=document.createElement('p');
		pl.innerHTML =i+1;
		codeLine.appendChild(pl);
	}
	var x = text.scrollTop;
	codeLine.firstChild.setAttribute("style", "margin-top: -"+x+"px");
});
