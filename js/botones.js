//variables de lectura
let targetPosition, currentPosition, alarm1, auto;
//variables calculadas
let posPorcentage, contadorCiclos = 0,
  ultimaAlarmaTiempo = null,
  ultimaAlarmaCodigo = null,
  contadorTiempo = 0,
  historico = false,
  final = false,
  fechaInicio = new Date();
//inicializacion de variables almacenadas
if (!localStorage.getItem("contadorTiempo")) {
  localStorage.setItem("contadorCiclos", 0);
  localStorage.setItem("contadorTiempo", 0);
}

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
        if (!final) {
          contadorCiclos++;
          final = true;
        }
      } else {
        final = false;
      }
    });

    //controla la variable de auto
    $.get("htm/MAUTO.htm", function(result) {
      auto = result.toString();
      //habilitamos y deshabilitamos parte de la interfaz
      if (auto == false) {
        document.getElementsByClassName("auto")[0].style.display = "none";
        document.getElementsByClassName("manual")[0].style.display = "block";
      } else {
        document.getElementsByClassName("auto")[0].style.display = "block";
        document.getElementsByClassName("manual")[0].style.display = "none";
      }
    });

    //controla las posibles alarmas
    $.get("htm/alarm1.htm", function(result) {
      alarm1 = result.toString();
      //si no hay ningun error, la variable es zero
      //asi que tenemos que controlar otros valores
      if (alarm1 != 0) {
        ultimaAlarmaTiempo = Date.now();
        ultimaAlarmaCodigo = alarm1;
        $(".alarma").html("Alarma: " + alarm1 +
          "\nPor favor solucione el problema y pulse el boton de rearme.")
      } else if (ultimaAlarmaTiempo != null) {
        $(".alarma").html("")
      }
    });

    //sumamos a este contador, que lleva las decimas de segundo
    contadorTiempo = parseInt(new Date() - fechaInicio);

    localStorage.setItem("contadorTiempo", contadorTiempo += parseInt(localStorage.getItem("contadorTiempo")));
    localStorage.setItem("contadorCiclos", contadorCiclos += parseInt(localStorage.getItem("contadorCiclos")));

    // mostramos datos de sesion o historicos dependiendo un booleano controlado por un boton
    if (!historico) {
      //new Date(contadorTiempo).toISOString().substr(11, 8)
      $("#tie_eje").text(new Date(contadorTiempo).toISOString().substr(11, 8));
      $("#cis_ses").text(contadorCiclos);
    } else {
      $("#tie_eje").text(new Date(localStorage.getItem("contadorTiempo")).toISOString().substr(11, 8));
      $("#cis_ses").text(localStorage.getItem("contadorCiclos"));
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

function autoManual() {
  //actua como interruptor, activando o desactivando el booleano intermitentemente
  //no cambiamos la variable auto aqui para evitar problemas, de todos modos se actualiza diez veces por segundo
  if (auto == 1) {
    cambiarValor("MAUTO", false)
  } else {
    cambiarValor("MAUTO", true)
  }
}

function sesionHistorico() {
  //no creo que esto requiera explicacion
  historico = !historico
  if (historico) {
    $("#ses_his").text("Ver Sesion");
  } else {
    $("#ses_his").text("Ver Historico");
  }

}