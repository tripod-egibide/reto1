////universales
function Boton(variable) {
  //funcionalidad de botones normales, enciende y luego apaga
  booTrue(variable);
  setTimeout((() => booFalse(variable)), 200);
}

function cambiarValor(variable, valor) {
  //cambia el valor de la variable
  $($.ajax({
    type: "POST",
    data: '"WEBSTORAGE".' + variable + ' = ' + valor
  }));
}

function booTrue(variable) {
  //cambia un booleano a verdadero
  cambiarValor(variable, "true");
}

function booFalse(variable) {
  //cambia un booleano a falso
  cambiarValor(variable, "false");
}

function obtenerValor(elemento) {
  //como no podemos usar $(#elemento).val(), usamos esto
  //aprovecho esta oportunidad para expresar mi descontento con estas absurdas limitaciones
  return document.getElementById(elemento).value;
}

function habilitarElemento(elemento, booleano) {
  //habilita o deshabilita un elemento dependiendo del valor del booleano
  document.getElementById(elemento).disabled = !booleano;
}
////animacion
//puede que aquí no entre nada, ya veremos

////milimetros
$("#slt_pos_bt").click(() => cambiarValor("POSICION", obtenerValor("#slt_pos_in")));

////posicion
$("#pos-").click(() => Boton("POS-"));
$("#pos+").click(() => Boton("POS+"));
$("#slt_fase_bt").click(() => cambiarValor("POSICION", obtenerValor("#slt_fase_in")));

////col33

//si está apagado, enciende, y pone en posición 0
function OnReset() {
  boton("ON");
}

// función para PARAR en modo emergencia

function marcha() {
  boton("MARCHA");
}

//funcion para PARAR
function parar() {
  boton("STOP");
}

//cambia el estado automatico a manual y viceversa
function automaticoManual() {
  let estado = true;
  // COMPROBAR ESTADO INSERT COD


  $(document).ready(function() {

    $.get("leer_variable.html", function(result) {
      if (isNaN(result.trim)) {

      } else {

      }
      alert(result.trim())

    });
  });

  //
  if (estado == true) {
    booTrue("AUTOMATICO")
  } else {
    booFalse("AUTOMATICO")
  }
}

////por organizar