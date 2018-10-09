//variables de lectura
let targetPosition, currentPosition, alarm1, auto;
//variables calculadas
let posPorcentage, contadorCiclos = 0,
  ultimaAlarmaTiempo = null,
  ultimaAlarmaCodigo = null,
  registroAlarmas = [],
  contadorTiempo = 0;

////carga de datos
$(document).ready(function() {
  $.ajaxSetup({
    cache: false
  });
  setInterval(function() {
    $.get("htm/TargetPosition.htm", function(result) {
      targetPosition = result.toString();
      $("#tar_pos").text(targetPosition);
    });

    $.get("htm/CurrentPosition.htm", function(result) {
      currentPosition = result.toString();
      $("#cur_pos").text(currentPosition);
      posPorcentage = (parseInt(currentPosition) / 50000 * 100).toFixed(2);
      if (currentPosition >= 49900) {
        contadorCiclos++;
      }
    });

    $.get("htm/MAUTO.htm", function(result) {
      auto = result.toString();
      if (auto == 0){
          document.getElementById("a").display = "none";
          document.getElementById("m").display = "block";
      }else {
          document.getElementById("a").display = "block";
          document.getElementById("m").display = "none";
      }    });

    $.get("htm/alarm1.htm", function(result) {
      alarm1 = result.toString();
      if (alarm1 != 0) {
        ultimaAlarmaTiempo = Date.now();
        ultimaAlarmaCodigo = alarm1;
        document.getElementsByClassName("alarma")[0].innerHTML = "Alarma: " + alarm1 +
            "\nPor favor solucione el problema y pulse el boton de rearme."
      } else if (ultimaAlarmaTiempo != null) {
        registroAlarmas.push([ultimaAlarmaTiempo, ultimaAlarmaCodigo]);
        document.getElementsByClassName("alarma")[0].innerHTML = ""
      }
    });

    contadorTiempo++;

    localStorage.contadorTiempo = contadorTiempo;
    localStorage.contadorCiclos = contadorCiclos;
    localStorage.registroAlarmas = registroAlarmas;
    // TODO: reemplazar el temporal por un booleano real y a�adir lo de las alarmas
    if (booleanoHistoricoTEMPORALTEMPORALTEMPORALTEMPORALTEMPORAAAAAAAAAAAAAAAAAAAAAL) {
      $("#tie_eje").text(new Date(contadorTiempo * 100).toISOString().substr(11, 8));
      $("#cis_ses").text(contadorCiclos);
    } else {
      $("#tie_eje").text(new Date(localStorage.contadorTiempo * 100)
        .toISOString().substr(11, 8));
      $("#cis_ses").text(localStorage.contadorCiclos);
    }
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

function leerVariable(variable) {
  $.get('"webdata".' + variable, function(result) {
    return result
  })
}

function habilitarElemento(elemento, booleano) {
  //habilita o deshabilita un elemento dependiendo del valor del booleano
  document.getElementById(elemento).disabled = !booleano;
}


////funcionamiento de botones especiales
function auto() {
  if (auto == 1) {
    cambiarValor("MAUTO", false)
    auto = false;
  } else {
    cambiarValor("MAUTO", true)
    auto = true;
  }
}