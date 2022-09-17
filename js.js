const canvas = document.getElementById("canvas");
let contex = canvas.getContext("2d");
const botonlimpiar = document.getElementById("boton_limpiar");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let color = "black";
let ancho = "2";
let estaDibujando = false;

canvas.addEventListener("touchstart",start,false);
canvas.addEventListener("touchmove",draw,false);
canvas.addEventListener("mousedown",start,false);
canvas.addEventListener("mousemove",draw,false);

canvas.addEventListener("touchend",stop,false);
canvas.addEventListener("mouseup",stop,false);
canvas.addEventListener("mouseout",stop,false);

let memoria_de_dibujo = [];
let indice = -1;

function start (event){
    estaDibujando = true;
    contex.beginPath();
    contex.moveTo(  event.clientX - canvas.offsetLeft,
                    event.clientY - canvas.offsetTop);
    event.preventDefault();
};
function draw (event){
    if (estaDibujando){
        contex.lineTo(  event.clientX - canvas.offsetLeft,
                        event.clientY - canvas.offsetTop);

        contex.strokeStyle = color;
        contex.lineCap = "round";
        contex.lineJoin = "round";
        contex.lineWidth = ancho;
        contex.stroke();
    }
    event.preventDefault();
}
function stop(event){
    if (estaDibujando){
        contex.stroke();
        contex.closePath();
        estaDibujando = false;
    }
    event.preventDefault();

    if (event.type != "mouseout"){
        memoria_de_dibujo.push(contex.getImageData(
            0,0, canvas.width, canvas.height
            ));
            indice += 1;
    }
}
function cambiar_color (elemento){
 color = elemento.style.background;
}
function limpiar(){
    contex.fillStyle = "white";
    contex.clearRect(0,0, canvas.width, canvas.height);
    contex.fillRect(0,0, canvas.width, canvas.height);

    memoria_de_dibujo = [];
    indice = -1;
}
function volver(){
    if (indice <= 0 ) {
        limpiar();
    }else {
        indice -= 1;
        memoria_de_dibujo.pop();
        contex.putImageData(memoria_de_dibujo[indice],0,0)
}}