const canvas = document.getElementById("canvas");
let contex = canvas.getContext("2d");


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
}

function cambiar_color (elemento){
 color = elemento.style.background;
}