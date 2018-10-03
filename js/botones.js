////universales
function Boton(variable) {
  //funcionalidad de botones normales, enciende y luego apaga
  booTrue(variable)
  setTimeout(() =>
    booFalse(variable)), 200)
}

function cambiarValor(variable, valor) {
  //cambia el valor de la variable
  $($.ajax({
    type: "POST",
    data: '"WEBSTORAGE".' + variable + ' = ' + valor
  }))
}

function booTrue(variable) {
  //cambia un booleano a verdadero
  cambiarValor(variable, "true")
}

function booFalse(variable) {
  //cambia un booleano a falso
  cambiarValor(variable, "false")
}

////animacion
//puede que aquí no entre nada, ya veremos

////milimetros


////posicion


////col33

//si está apagado, enciende, y pone en posición 0
function OnReset() {
  boton("ON");
}

// función para PARAR en modo emergencia

function Emergencia() {
  boton("EMERGENCIA");
}

//funcion para PARAR
function Parar() {
  boton("PARAR");
}

//cambia el estado automatico a manual y viceversa
function AutomaticoManual() {
  let estado = true;
  // COMPROBAR ESTADO INSERT COD
  setInterval(function() {
    $.get(":="
      mis_datos ".contador:",
      function(result) {
        $('#etiqueta').text(result.trim());
      });
  }, 1000);

  //
  if (estado == true) {
    booTrue("AUTOMATICO")
  } else {
    booFalse("AUTOMATICO")
  }
}