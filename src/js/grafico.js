var origen = 0;
var destino = 0;
function go() {
    document.getElementById('goAnimacion').classList.remove('a');
    if (document.getElementById('goAnimacion').style.animationPlayState === "paused"){
        document.getElementById('goAnimacion').style.animationPlayState="running";
    }
    document.getElementById('goAnimacion').classList.add('c');
}
function stop() {
    document.getElementById('goAnimacion').classList.remove('a');
    document.getElementById('goAnimacion').classList.remove('c');
}
function pause() {
    document.getElementById('goAnimacion').style.animationPlayState="paused";
}
function fase12() {
    document.getElementById('goAnimacion').classList.remove('c');
    if (document.getElementById('goAnimacion').style.animationPlayState === "paused"){
        document.getElementById('goAnimacion').style.animationPlayState="running";
    }
    document.getElementById('goAnimacion').style.WebkitAnimationName = "fase12";
    document.getElementById('goAnimacion').classList.add('a');
}
function fase23() {
    document.getElementById('goAnimacion').classList.remove('c');
    if (document.getElementById('goAnimacion').style.animationPlayState === "paused"){
        document.getElementById('goAnimacion').style.animationPlayState="running";
    }
    document.getElementById('goAnimacion').style.WebkitAnimationName = "fase23";
    document.getElementById('goAnimacion').classList.add('a');
}
function fase31() {
    document.getElementById('goAnimacion').classList.remove('c');
    if (document.getElementById('goAnimacion').style.animationPlayState === "paused"){
        document.getElementById('goAnimacion').style.animationPlayState="running";
    }
    document.getElementById('goAnimacion').style.WebkitAnimationName = "fase31";
    document.getElementById('goAnimacion').classList.add('a');
}