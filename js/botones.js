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
      $("#tar_pos").text(result)
    });
    $.get("htm/CurrentPosition.htm", function(result) {
      currentPosition = result.toString()
      $("#cur_pos").text(result)
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

click("auto", () => {
  if (auto == 1) {
    cambiarValor("MAUTO", false)
    auto = false;
  } else {
    cambiarValor("MAUTO", true)
    auto = true;
  }
});