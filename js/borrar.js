function borrarCodigo() {

    var codigoArea_text = $('#codigo');

    var codigoArea = codigoArea_text.val();

    if (codigoArea == '') {
        alert("No hay nada que borrar");
        codigoArea_text.focus();
    } else {
        codigoArea_text.val('');
        document.getElementById("codeLine").innerHTML = '';
        var pl = document.createElement('p');
        pl.innerHTML = 1;
        document.getElementById("codeLine").appendChild(pl);
    }
}