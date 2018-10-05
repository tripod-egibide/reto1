////carga de datos
let targetPosition, currentPosition, alarma1, auto;

$(document).ready(function() {
  $.ajaxSetup({
    cache: false
  });
  setInterval(function() {
    $.get("htm/TargetPosition.htm", function(result) {
      targetPosition = result
    });
    $.get("htm/CurrentPosition.htm", function(result) {
      currentPosition = result
    });
    $.get("htm/MAUTO.htm", function(result) {
      auto = result
    });
    $.get("htm/alert1.htm", function(result) {
      alert1 = result
    });

  }, 100);
});
////universales
function boton(variable) {
  //funcionalidad de botones normales, enciende y luego apaga
  booTrue(variable);
  setTimeout((() => booFalse(variable)), 200);
}

function cambiarValor(variable, valor) {
  //cambia el valor de la variable
  $($.ajax({
    type: "POST",
    data: '"webdata".' + variable + ' = ' + valor
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

function click(elemento, funcion) {
  //como no podemos usar $(#elemento).click(), usamos esto
  document.getElementById(elemento).onclick = funcion
}

function leerElemento(elemento) {
  //como no podemos usar $(#elemento).val(), usamos esto
  //aprovecho esta oportunidad para expresar mi descontento con estas absurdas limitaciones
  return document.getElementById(elemento).value;
}

function leerVariable(variable) {
  $.get('"webdata".' + variable, function(result) {
    return result
  })
}

function estadoAutoManual() {
  //Función al cargar la web, comprueba si está en automático o manual

}

function habilitarElemento(elemento, booleano) {
  //habilita o deshabilita un elemento dependiendo del valor del booleano
  document.getElementById(elemento).disabled = !booleano;
}
////animacion
//puede que aquí no entre nada, ya veremos

////milimetros
click("#slt_pos_bt", cambiarValor("POSICION", leerElemento("#slt_pos_in")));

////posicion
click("#pos1", boton("POSICION1"));
click("#pos2", boton("POSICION2"));
click("#pos3", boton("POSICION3"));

////por organizar
click("#fc1", boton("FC1"));
click("#fc2", boton("FC2"));
click("#fc3", boton("FC3"));

click("#vel_bt", cambiarValor("POSICION", leerElemento("#vel_in")));
click("#pos_vel_bt", () => {
  cambiarValor("pos1", leerElemento("#pos1"))
  cambiarValor("vel1", leerElemento("#vel1"))
  cambiarValor("pos2", leerElemento("#pos2"))
  cambiarValor("vel2", leerElemento("#vel2"))
  cambiarValor("pos3", leerElemento("#pos3"))
  cambiarValor("vel3", leerElemento("#vel3"))
});

////col33
click("#origen", boton("InicioOrigen"))
click("#rearme", boton("REARME"))
click("#stop", boton("STOP"))

//comprueba el estado de la maquina
function estadoAutoManual() {

  let estado = true;
  $(document).ready(function() {
    $.get("leer_variable.html", function(result) {
      if (isNaN(result.trim)) {
        enviarDivs(false);
        return true;
      } else {
        enviarDivs(true);
        return false;
      }
    });
  });
}

//cambia el estado automatico a manual y viceversa
function automaticoManual() {

  if (estadoAutoManual()) {
    booFalse("AUTOMATICO")
    enviarDivs(true);
  } else {
    booTrue("AUTOMATICO")
    enviarDivs(false);
  }
}

//enviar los divs para habilitar y deshabilitar según automatico o Manual
function enviarDivs(estado) {

  habilitarElemento("milimetros", estado);
  habilitarElemento("posicion", estado);
}