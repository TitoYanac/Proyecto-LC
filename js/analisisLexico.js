function analisisLexico() {

    var codigoArea_text = $('#codigo');
    var codigoArea = codigoArea_text.val();
    var htmlAnalisisLexico = '';

    //delimitadores
    var separador = "";//para separar en caracteres, incluidos espacios en blanco
    var separador1 = /\s/;//para detectar un espacio en blanco en el codigo ingresado
    var arrayPreToken = codigoArea.split(separador);
    var arrayPreToken1 = codigoArea.split(separador1);
    var longitudArrayPreToken = arrayPreToken.length;
    var longitudArrayPreToken1 = arrayPreToken1.length;
    var arrayPreTokensDelimitadores = [];
    var cont = 0;
    for (var i = 0; i < longitudArrayPreToken; i++) {
        if (arrayPreToken[i] == '(' || arrayPreToken[i] == ')' || arrayPreToken[i] == '{' ||
            arrayPreToken[i] == '}' || arrayPreToken[i] == ';' || arrayPreToken[i] == '[' ||
            arrayPreToken[i] == ']' || arrayPreToken[i] == ',' || arrayPreToken[i] == '.' ||
            arrayPreToken[i] == ':' || arrayPreToken[i] == '"') {
            arrayPreTokensDelimitadores[cont] = arrayPreToken[i];

            cont++;
        }
    }

    //palabras reservadas, identificadores 
    var arrayErrores = [];
    var arrayPreTokensIdentificadores = [];
    var arrayPreTokensNumeros = [];
    var arrayPreTokensNumerosDecimales = [];
    var arrayPreTokensTextos = [];
    var arrayPreTokensPalabrasReservadas = [];

    var contI = 0;
    var cont1 = 0;
    var cont2 = 0;
    var cont3 = 0;
    var cont4 = 0;
    var cont5 = 0;

    var exVacio = /.+vacio.+|.+vacio|vacio.+/;
    var exVacio1 = /vacio/;
    var exVy = /.+VY(?!\().+|.+VY|VY(?!\().+/;
    var exVy1 = /VY/;
    var exYv = /.+YV.+|.+YV|YV.+/;
    var exYv1 = /YV/;
    var exEntero = /.+entero.+|.+entero|entero.+/;
    var exEntero1 = /entero/;
    var exDecimal = /.+decimal.+|.+decimal|decimal.+/;
    var exDecimal1 = /decimal/;
    var exCadena = /.+cadena.+|.+cadena|cadena.+/;
    var exCadena1 = /cadena/;
    var exBoleano = /.+boleano.+|.+boleano|boleano.+/;
    var exBoleano1 = /boleano/;
    var exPara = /.+para(?!\().+|.+para|para(?!\().+/;
    var exPara1 = /para/;
    var exMientras = /.+mientras(?!\().+|.+mientras|mientras(?!\().+/;
    var exMientras1 = /mientras/;
    var exSiCumple = /.+sicumple(?!\().+|.+sicumple|sicumple(?!\().+/;
    var exSiCumple1 = /sicumple/;
    var exSino = /(?!\}).+sino(?!\{).+|.+sino/;
    var exSino1 = /sino/;
    var exImprimir = /.+imprimir(?!\().+|.+imprimir|imprimir(?!\().+/;
    var exImprimir1 = /imprimir/;
    var exVerdadero = /.+verdadero(?!\;).+|.+verdadero|verdadero(?!\;).+/;
    var exVerdadero1 = /verdadero/;
    var exFalso = /.+falso(?!\;).+|.+falso|falso(?!\;).+/;
    var exFalso1 = /falso/;

    var texto = /["].+[a-zA-Z]+[0-9]*.+["]/;
    var texto1 = /(?!\()(?!\").+[a-zA-Z]+[0-9]*(?!\")./

    var exPrincipal = /.+principal.+|.+principal|principal.+/;
    var exPrincipal1 = /principal/;
    var exNombreFuncion = /.+imprimirNumeros.+|.+imprimirNumeros|imprimirNumeros.+/;
    var exNombreFuncion1 = /imprimirNumeros/;

    var exError = /[a-zA-Z]+(?![a-zA-Z]).+[a-zA-Z]+|[a-zA-Z]+/
    var exidentificador = /_+[a-zA-Z]*[0-9]*[a-zA-Z]*/;
    var exNumero = /[a-zA-Z]+[0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+|[0-9]+[a-zA-Z]+/;
    var exNumero1 = /[0-9]+/;
    var exNumeroDecimal = /[a-zA-Z]+[0-9]+.[0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+.[0-9]+|[0-9]+.[0-9]+[a-zA-Z]+/;
    var exNumeroDecimal1 = /[0-9]+.[0-9]+/;

    for (var i = 0; i < longitudArrayPreToken1; i++) {
        if (exidentificador.test(arrayPreToken1[i])) {
            arrayPreTokensIdentificadores[cont3] = arrayPreToken1[i].match(exidentificador);
            cont3++;
        } else if (exNumeroDecimal.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exNumeroDecimal);
            contI++;
        } else if (exNumeroDecimal1.test(arrayPreToken1[i])) {
            arrayPreTokensNumerosDecimales[cont4] = arrayPreToken1[i].match(exNumeroDecimal1);
            cont4++;
        } else if (exNumero.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exNumero);
            contI++;
        } else if (exNumero1.test(arrayPreToken1[i])) {
            arrayPreTokensNumeros[cont2] = arrayPreToken1[i].match(exNumero1);
            cont2++;
        } else if (texto.test(arrayPreToken1[i])) {
            arrayPreTokensTextos[cont5] = arrayPreToken1[i].match(texto1);
            cont5++;
        } else if (exPrincipal.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exPrincipal);
            contI++;
        } else if (exPrincipal1.test(arrayPreToken1[i])) {
            arrayPreTokensIdentificadores[cont3] = arrayPreToken1[i].match(exPrincipal1);
            cont3++;
        } else if (exNombreFuncion.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exNombreFuncion);
            contI++;
        } else if (exNombreFuncion1.test(arrayPreToken1[i])) {
            arrayPreTokensIdentificadores[cont3] = arrayPreToken1[i].match(exNombreFuncion1);
            cont3++;
        } else if (exVy.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exVy);
            contI++;
        } else if (exVy1.test(arrayPreToken1[i])) {
            arrayPreTokensPalabrasReservadas[cont1] = arrayPreToken1[i].match(exVy1);
            cont1++;
        } else if (exYv.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exYv);
            contI++;
        } else if (exYv1.test(arrayPreToken1[i])) {
            arrayPreTokensPalabrasReservadas[cont1] = arrayPreToken1[i].match(exYv1);
            cont1++;
        } else if (exEntero.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exEntero);
            contI++;
        } else if (exEntero1.test(arrayPreToken1[i])) {
            arrayPreTokensPalabrasReservadas[cont1] = arrayPreToken1[i].match(exEntero1);
            cont1++;
        } else if (exDecimal.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exDecimal);
            contI++;
        } else if (exDecimal1.test(arrayPreToken1[i])) {
            arrayPreTokensPalabrasReservadas[cont1] = arrayPreToken1[i].match(exDecimal1);
            cont1++;
        } else if (exCadena.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exCadena);
            contI++;
        } else if (exCadena1.test(arrayPreToken1[i])) {
            arrayPreTokensPalabrasReservadas[cont1] = arrayPreToken1[i].match(exCadena1);
            cont1++;
        } else if (exPara.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exPara);
            contI++;
        } else if (exPara1.test(arrayPreToken1[i])) {
            arrayPreTokensPalabrasReservadas[cont1] = arrayPreToken1[i].match(exPara1);
            cont1++;
        } else if (exMientras.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exMientras);
            contI++;
        } else if (exMientras1.test(arrayPreToken1[i])) {
            arrayPreTokensPalabrasReservadas[cont1] = arrayPreToken1[i].match(exMientras1);
            cont1++;
        } else if (exImprimir.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exImprimir);
            contI++;
        } else if (exImprimir1.test(arrayPreToken1[i])) {
            arrayPreTokensPalabrasReservadas[cont1] = arrayPreToken1[i].match(exImprimir1);
            cont1++;
        } else if (exSiCumple.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exSiCumple);
            contI++;
        } else if (exSiCumple1.test(arrayPreToken1[i])) {
            arrayPreTokensPalabrasReservadas[cont1] = arrayPreToken1[i].match(exSiCumple1);
            cont1++;
        } else if (exSino.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exSino);
            contI++;
        } else if (exSino1.test(arrayPreToken1[i])) {
            arrayPreTokensPalabrasReservadas[cont1] = arrayPreToken1[i].match(exSino1);
            cont1++;
        } else if (exBoleano.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exBoleano);
            contI++;
        } else if (exBoleano1.test(arrayPreToken1[i])) {
            arrayPreTokensPalabrasReservadas[cont1] = arrayPreToken1[i].match(exBoleano1);
            cont1++;
        } else if (exVerdadero.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exVerdadero);
            contI++;
        } else if (exVerdadero1.test(arrayPreToken1[i])) {
            arrayPreTokensPalabrasReservadas[cont1] = arrayPreToken1[i].match(exVerdadero1);
            cont1++;
        } else if (exFalso.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exFalso);
            contI++;
        } else if (exFalso1.test(arrayPreToken1[i])) {
            arrayPreTokensPalabrasReservadas[cont1] = arrayPreToken1[i].match(exFalso1);
            cont1++;
        } else if (exVacio.test(arrayPreToken1[i])) {
            arrayErrores[contI] = arrayPreToken1[i].match(exVacio);
            contI++;
        } else if (exVacio1.test(arrayPreToken1[i])) {
            arrayPreTokensPalabrasReservadas[cont1] = arrayPreToken1[i].match(exVacio1);
            cont1++;
        } else if (exError.test(arrayPreToken1[i]) && arrayPreToken1[i] != 'vacio' && arrayPreToken1[i] != 'VY' && arrayPreToken1[i] != 'entero' && arrayPreToken1[i] != 'decimal' &&
            arrayPreToken1[i] != 'cadena' && arrayPreToken1[i] != 'boleano' && arrayPreToken1[i] != 'para' && arrayPreToken1[i] != 'mientras' && arrayPreToken1[i] != 'sicumple' &&
            arrayPreToken1[i] != 'sino' && arrayPreToken1[i] != 'imprimir' && arrayPreToken1[i] != 'verdadero' && arrayPreToken1[i] != 'falso'
        ) {
            arrayErrores[contI] = arrayPreToken1[i].match(exError);
            contI++;
        }

    }

    //operadores
    var arrayPreTokensOperadores = [];
    var cont6 = 0;
    for (var i = 0; i < longitudArrayPreToken; i++) {
        if (arrayPreToken[i] == '*' || arrayPreToken[i] == '/' || arrayPreToken[i] == '+' ||
            arrayPreToken[i] == '-'
        ) {
            arrayPreTokensOperadores[cont6] = arrayPreToken[i];
            cont6++;
        }
    }

    //simbolos especiales
    var arrayPreTokensSimbolosEspeciales = [];
    var cont7 = 0;
    for (var i = 0; i < longitudArrayPreToken; i++) {
        if (arrayPreToken[i] == '<' || arrayPreToken[i] == '>' || arrayPreToken[i] == '='
        ) {
            arrayPreTokensSimbolosEspeciales[cont7] = arrayPreToken[i];
            cont7++;
        }
    }

    htmlAnalisisLexico += '<div class="tabla-lexico">';
    htmlAnalisisLexico += '<table>';
    htmlAnalisisLexico += '<thead>';
    htmlAnalisisLexico += '<tr>';
    htmlAnalisisLexico += '<th>Tokens</th>';
    htmlAnalisisLexico += '<th>Categoría</th>';
    htmlAnalisisLexico += '</tr>';
    htmlAnalisisLexico += '</thead>';
    htmlAnalisisLexico += '</table>';
    htmlAnalisisLexico += '</div>';
    htmlAnalisisLexico += '<div class="tabla-lexico2">';
    htmlAnalisisLexico += '<table>';
    htmlAnalisisLexico += '<tbody>';
    for (var index = 0; index < arrayPreTokensDelimitadores.length; index++) {

        htmlAnalisisLexico += '<tr>';
        htmlAnalisisLexico += '<td >' + arrayPreTokensDelimitadores[index] + '</td>';
        htmlAnalisisLexico += '<td>Delimitador</td>';
        htmlAnalisisLexico += '</tr>';

    }
    for (var index = 0; index < arrayPreTokensPalabrasReservadas.length; index++) {

        htmlAnalisisLexico += '<tr>';
        htmlAnalisisLexico += '<td>' + arrayPreTokensPalabrasReservadas[index] + '</td>';
        htmlAnalisisLexico += '<td>Palabra Reservada</td>';
        htmlAnalisisLexico += '</tr>';

    }
    for (var index = 0; index < arrayPreTokensIdentificadores.length; index++) {

        htmlAnalisisLexico += '<tr>';
        htmlAnalisisLexico += '<td>' + arrayPreTokensIdentificadores[index] + '</td>';
        htmlAnalisisLexico += '<td>Identificador</td>';
        htmlAnalisisLexico += '</tr>';

    }
    for (var index = 0; index < arrayPreTokensOperadores.length; index++) {

        htmlAnalisisLexico += '<tr>';
        htmlAnalisisLexico += '<td>' + arrayPreTokensOperadores[index] + '</td>';
        htmlAnalisisLexico += '<td>Operadores</td>';
        htmlAnalisisLexico += '</tr>';

    }
    for (var index = 0; index < arrayPreTokensSimbolosEspeciales.length; index++) {

        htmlAnalisisLexico += '<tr>';
        htmlAnalisisLexico += '<td>' + arrayPreTokensSimbolosEspeciales[index] + '</td>';
        htmlAnalisisLexico += '<td>Simbolos especiales</td>';
        htmlAnalisisLexico += '</tr>';

    }
    for (var index = 0; index < arrayPreTokensNumeros.length; index++) {

        htmlAnalisisLexico += '<tr>';
        htmlAnalisisLexico += '<td>' + arrayPreTokensNumeros[index] + '</td>';
        htmlAnalisisLexico += '<td>Numeros</td>';
        htmlAnalisisLexico += '</tr>';

    }
    for (var index = 0; index < arrayPreTokensNumerosDecimales.length; index++) {

        htmlAnalisisLexico += '<tr>';
        htmlAnalisisLexico += '<td>' + arrayPreTokensNumerosDecimales[index] + '</td>';
        htmlAnalisisLexico += '<td>Numeros Decimales</td>';
        htmlAnalisisLexico += '</tr>';

    }
    for (var index = 0; index < arrayPreTokensTextos.length; index++) {

        htmlAnalisisLexico += '<tr>';
        htmlAnalisisLexico += '<td>' + arrayPreTokensTextos[index] + '</td>';
        htmlAnalisisLexico += '<td>Textos</td>';
        htmlAnalisisLexico += '</tr>';

    }
    for (var index = 0; index < arrayErrores.length; index++) {

        htmlAnalisisLexico += '<tr>';
        htmlAnalisisLexico += '<td>' + arrayErrores[index] + '</td>';
        htmlAnalisisLexico += '<td>No identificado</td>';
        htmlAnalisisLexico += '</tr>';

    }
    htmlAnalisisLexico += '</tbody>';
    htmlAnalisisLexico += '</table>';
    htmlAnalisisLexico += '</div>';


    $('#analisisLexico').html(htmlAnalisisLexico);
}