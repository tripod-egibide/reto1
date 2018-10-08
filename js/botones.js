////carga de datos
// TODO: probar este bloque
let targetPosition, currentPosition, alarm1, auto;

$(document).ready(function() {
  $.ajaxSetup({
    cache: false
  });
  setInterval(function() {
    $.get("htm/TargetPosition.htm", function(result) {
      targetPosition = result.toString()
      $("#tar_pos").text(targetPosition)
    });
    $.get("htm/CurrentPosition.htm", function(result) {
      currentPosition = result.toString()
      $("#cur_pos").text(currentPosition)
      // TODO: llamar a las funciones de la animacion dependiendo de la posicion del aparato
    });
    $.get("htm/MAUTO.htm", function(result) {
      auto = result.toString()
      // TODO: habilitar y deshabilitar los divs auto y manual dependiendo del resultado
    });
    $.get("htm/alarm1.htm", function(result) {
      alarm1 = result.toString()
      if (alarm1 != 0) {
        // TODO: mejorar esto, no permitir continuar hasta resolver el problema
        alert("Alarma: " + alarm1 +
          "\nPor favor solucione el problema y pulse el boton de rearme.")
      }
    });

  }, 100);
});

////funciones universales
function boton(variable) {
  //funcionalidad de botones normales, enciende y luego apaga
  cambiarValor(variable, true);
  setTimeout((() => cambiarValor(variable, false)), 200);
}

function cambiarValor(variable, valor) {
  //cambia el valor de la variable
  $($.ajax({
    type: "POST",
    data: '"webdata".' + variable + ' = ' + valor
  }));
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

function habilitarElemento(elemento, booleano) {
  //habilita o deshabilita un elemento dependiendo del valor del booleano
  document.getElementById(elemento).disabled = !booleano;
}

////animacion
//puede que aquí no entre nada, ya veremos

////auto
// click("fc1", boton("FC1"));
// click("fc2", boton("FC2"));
// click("fc3", boton("FC3"));
// click("pos_vel_bt", () => {
//   cambiarValor("pos1", leerElemento("pos1"))
//   cambiarValor("vel1", leerElemento("vel1"))
//   cambiarValor("pos2", leerElemento("pos2"))
//   cambiarValor("vel2", leerElemento("vel2"))
//   cambiarValor("pos3", leerElemento("pos3"))
//   cambiarValor("vel3", leerElemento("vel3"))
// });

////manual
//estas tres luego estarán asociadas a la animacion, pero se quedan aqui por ahora
// click("posicion1", boton("POSICION1"));
// click("posicion2", boton("POSICION2"));
// click("posicion3", boton("POSICION3"));
//
// click("slt_pos_bt", cambiarValor("POSICION", leerElemento("slt_pos_in")));
// click("vel_bt", cambiarValor("POSICION", leerElemento("vel_in")));

////col33
click("auto", () => {
  if (auto == "true" || auto == "1") {
    cambiarValor("MAUTO", false)
    auto = false;
  } else {
    cambiarValor("MAUTO", true)
    auto = true;
  }
});
// click("marcha", boton("MARCHA"));
// click("origen", boton("InicioOrigen"));
// click("rearme", boton("REARME"));
// click("stop", boton("STOP"));