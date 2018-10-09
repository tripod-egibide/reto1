var modal = document.getElementById('modalAbout');
var boton = document.getElementById("botonAbout");
var cerrar = document.getElementsByClassName("cerrarAbout")[0];

boton.onclick = function() {
    modal.style.display = "block";
};

cerrar.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};