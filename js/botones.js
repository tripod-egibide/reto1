//variables de lectura
let targetPosition, currentPosition, alarm1, auto;
//variables calculadas
let posPorcentage, contadorCiclos = 0,
  ultimaAlarmaTiempo = null,
  ultimaAlarmaCodigo = null,
  registroAlarmas = [],
  contadorTiempo = 0;



////carga y manupulacion de datos

$(document).ready(function() {
  $.ajaxSetup({
    cache: false
  });
  setInterval(function() {
    //posicion actual del automata
    $.get("htm/TargetPosition.htm", function(result) {
      targetPosition = result.toString();
      $("#tar_pos").text(targetPosition);
    });
    //destino del automata
    $.get("htm/CurrentPosition.htm", function(result) {
      currentPosition = result.toString();
      $("#cur_pos").text(currentPosition);
      //calculamos el porcentage de la posicion del automata para la animacion
      posPorcentage = (parseInt(currentPosition) / 50000 * 100).toFixed(2);
      //cada vez que llega al final, aumentamos el contador
      if (currentPosition >= 49900) {
        contadorCiclos++;
      }
    });

    //controla la variable de alarma
    $.get("htm/MAUTO.htm", function(result) {
      auto = result.toString();
    });
    if (auto == 0) {
      document.getElementsByClassName("auto").display = "none";
      document.getElementsByClassName("manual").display = "block";
    } else {
      document.getElementsByClassName("auto").display = "block";
      document.getElementsByClassName("manual").display = "none";
    }
  });

  $.get("htm/alarm1.htm", function(result) {
    alarm1 = result.toString();
    //si no hay ningun error, la variable es zero
    //asi que tenemos que controlar otros valores
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
  //mostramos datos de sesion o historicos dependiendo un booleano controlado por un boton
  if (booleanoHistoricoTEMPORALTEMPORALTEMPORALTEMPORALTEMPORAAAAAAAAAAAAAAAAAAAAAL) {
    $("#tie_eje").text(new Date(contadorTiempo * 100).toISOString().substr(11, 8));
    $("#cis_ses").text(contadorCiclos);
  } else {
    $("#tie_eje").text(new Date(localStorage.contadorTiempo * 100)
      .toISOString().substr(11, 8));
    $("#cis_ses").text(localStorage.contadorCiclos);
  }
}, 100);



////funciones universales
function boton(variable) {
  //funcionalidad de botones normales, enciende y luego apaga
  cambiarValor(variable, true);
  setTimeout((() => cambiarValor(variable, false)), 200);
}

function cambiarValor(variable, valor) {
  //cambia el valor una variable del automata
  $($.ajax({
    type: "POST",
    data: '"webdata".' + variable + ' = ' + valor
  }));
}

function leerVariable(variable) {
  //lee una variable del automata
  $.get('"webdata".' + variable, function(result) {
    return result
  })
}

////funcionamiento de botones especiales
function autoManual() {
  //actua como interruptor, activando o desactivando el booleano intermitentemente
  //no cambiamos la variable auto aqui para evitar problemas, de todos modos se actualiza diez veces por segundo
  if (auto == 1) {
    cambiarValor("MAUTO", false)
  } else {
    cambiarValor("MAUTO", true)
  }
}