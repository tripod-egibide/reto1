//variables de lectura
let targetPosition, currentPosition, alarm1, auto;
//variables calculadas
let posPorcentage, contCiclos = 0,
  ultimaAlarmaTiempo = null,
  ultimaAlarmaCodigo = null,
  contTiempo = 0,
  historico = false,
  final = false,
  fechaInicio = new Date();
//inicializacion de variables relacionadas con el almacenamiento
if (!localStorage.getItem("contadorTiempo")) {
  localStorage.setItem("contadorCiclos", "0");
  localStorage.setItem("contadorTiempo", "0");
}
let tiempoTotal = localStorage.getItem("contadorTiempo"),
  ciclosTotal = localStorage.getItem("contadorCiclos"),
  cicSeg = 0;


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
      //y actualizamos el css en base a eso
      posPorcentage = (parseInt(currentPosition) / 50000 * 100).toFixed(2);
      document.getElementById("marcadorAni").style.setProperty("--porcentageAnimacion", posPorcentage + "%");
      //cada vez que llega al final, aumentamos el contador
      if (currentPosition >= 49900) {
        if (!final) {
          contCiclos++;
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
        $("#tie_eje").text("Auto");
      } else {
        document.getElementsByClassName("auto")[0].style.display = "block";
        document.getElementsByClassName("manual")[0].style.display = "none";
        $("#tie_eje").text("Manual");
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
    contTiempo = parseInt(new Date() - fechaInicio);


    localStorage.setItem("contadorTiempo", contTiempo + parseInt(tiempoTotal));
    localStorage.setItem("contadorCiclos", contCiclos + parseInt(ciclosTotal));

    // mostramos datos de sesion o historicos dependiendo un booleano controlado por un boton
    if (!historico) {
      $("#tie_eje").text(new Date(contTiempo).toISOString().substr(11, 8));
      $("#cic_ses").text(contCiclos);
      cicSeg = (contTiempo / 1000) / contCiclos;
    } else {
      $("#tie_eje").text(new Date(parseInt(localStorage.getItem("contadorTiempo"))).toISOString().substr(11, 8))
      $("#cic_ses").text(localStorage.getItem("contadorCiclos"));
      cicSeg = (parseInt(localStorage.getItem("contadorTiempo")) / 1000) / parseInt(localStorage.getItem("contadorCiclos"));
    }
    $("#cic_seg").text((cicSeg == Infinity) ? 0 : cicSeg.toFixed(2));

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