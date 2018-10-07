var origen = 0;
var destino = 0;
function go() {
    if (document.getElementById('goAnimacion').style.animationPlayState === "paused"){
        document.getElementById('goAnimacion').style.animationPlayState="running";
    }
    document.getElementById('goAnimacion').classList.add('c');
}
function stop() {
    document.getElementById('goAnimacion').style.animationPlayState="paused";
}
function fase12() {
    if (document.getElementById('goAnimacion').style.animationPlayState === "paused"){
        document.getElementById('goAnimacion').style.animationPlayState="running";
    }
    document.getElementById('goAnimacion').style.WebkitAnimationName = "fase12";
    document.getElementById('goAnimacion').classList.add('a');
}
function fase23() {
    if (document.getElementById('goAnimacion').style.animationPlayState === "paused"){
        document.getElementById('goAnimacion').style.animationPlayState="running";
    }
    document.getElementById('goAnimacion').style.WebkitAnimationName = "fase23";
}
function fase31() {
    if (document.getElementById('goAnimacion').style.animationPlayState === "paused"){
        document.getElementById('goAnimacion').style.animationPlayState="running";
    }
    document.getElementById('goAnimacion').classList.add('a');
    document.getElementById('goAnimacion').style.WebkitAnimationName = "fase31";
}