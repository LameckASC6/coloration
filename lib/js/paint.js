
let box = { left: 0, top: 0 }

//Canvas
let canvas = document.getElementById('canvas');
let canvasE = document.getElementById('canvasE');
let ctx = canvasE.getContext('2d');

//letiables
let canvasx = canvas.offsetLeft;
let canvasy = canvas.offsetTop;
let lastMouseX = lastMouseY = 0;
let mousex = mousey = 0;
let mousedown = false;
let body = document.querySelector("body");
let div;
let width;
let height;


let mouse = false;
let square = false;
let circle = false;
let pen = false;
let paint = false;
let eraser = false;
let fill = false;
let crop = false;

let search = false;
let text = false;
let eyedropper = false;

document.addEventListener('mousemove', mouseMove);

box = canvas.getBoundingClientRect();
let mouseIn = false;


let newMouse = document.getElementById("newMouse");
let newSquare = document.getElementById("newSquare");
let newCircle = document.getElementById("newCircle");
let newPen = document.getElementById("newPen");
let newPaint = document.getElementById("newPaint");
let newEraser = document.getElementById("newEraser");
let newFill = document.getElementById("newFill");
let newCrop = document.getElementById("newCrop");

let newSearch = document.getElementById("newSearch");
let newText = document.getElementById("newText");

let newEyedropper = document.getElementById("newEyedropper");

newMouse.addEventListener('click', newMouseFunction);
newSquare.addEventListener('click', newSquareFunction);
newCircle.addEventListener('click', newCircleFunction);
newPen.addEventListener('click', newPenFunction);
newPaint.addEventListener('click', newPaintFunction);
newEraser.addEventListener('click', newEraserFunction);
newFill.addEventListener('click', newFillFunction);
newCrop.addEventListener('click', newCropFunction);

newSearch.addEventListener('click', newSearchFunction);
newText.addEventListener('click', newTextFunction);

newEyedropper.addEventListener('click', newEyedropperFunction);

let squareNum = 0;
let circleNum = 0;

// moduled querySelector
function qs(selectEl){
    return document.querySelector(selectEl);
}

// select RGB inputs
let red = qs('#red'), 
green = qs('#green'), 
blue = qs('#blue'); 

// selet num inputs
// select Color Display
let colorDisplay = qs('#color-display');

// select labels
let redLbl = qs('label[for=red]'), 
greenLbl = qs('label[for=green]'), 
blueLbl = qs('label[for=blue]');

// init display Colors
displayColors();
// init Color Vals

// init ColorSliderVals
initSliderColors();
// init Change Range Val
// init Colors controls
colorSliders();

// display colors
function displayColors(){
    colorDisplay.style.backgroundColor = `rgb(${red.value}, ${green.value}, ${blue.value})`;    
}

// initial color val when DOM is loaded 

// initial colors when DOM is loaded
function initSliderColors(){
    // label bg colors
    redLbl.style.background = `rgb(${red.value},0,0)`;
    greenLbl.style.background = `rgb(0,${green.value},0)`;
    blueLbl.style.background = `rgb(0,0,${blue.value})`;

    // slider bg colors
    sliderFill(red);
    sliderFill(green);
    sliderFill(blue);
}

// Slider Fill offset
function sliderFill(clr){
    let val = (clr.value - clr.min) / (clr.max - clr.min);
    let percent = val * 100;

    // clr input
    if(clr === red){
        clr.style.background = `linear-gradient(to right, rgb(${clr.value},0,0) ${percent}%, #cccccc 0%)`;    
    } else if (clr === green) {
        clr.style.background = `linear-gradient(to right, rgb(0,${clr.value},0) ${percent}%, #cccccc 0%)`;    
    } else if (clr === blue) {
        clr.style.background = `linear-gradient(to right, rgb(0,0,${clr.value}) ${percent}%, #cccccc 0%)`;    
    }
}

// change range values by number input
function changeRangeNumVal(){

    // Validate number range
    redNumVal.addEventListener('change', ()=>{
        // make sure numbers are entered between 0 to 255
        if(redNumVal.value > 255){
            alert('cannot enter numbers greater than 255');
            redNumVal.value = red.value;
        } else if(redNumVal.value < 0) {
            alert('cannot enter numbers less than 0');  
            redNumVal.value = red.value;            
        } else if (redNumVal.value == '') {
            alert('cannot leave field empty');
            redNumVal.value = red.value;
            initSliderColors();
            displayColors();
        } else {
            red.value = redNumVal.value;
            initSliderColors();
            displayColors();
        }
    });

    // Validate number range
    greenNumVal.addEventListener('change', ()=>{
        // make sure numbers are entered between 0 to 255
        if(greenNumVal.value > 255){
            alert('cannot enter numbers greater than 255');
            greenNumVal.value = green.value;
        } else if(greenNumVal.value < 0) {
            alert('cannot enter numbers less than 0');  
            greenNumVal.value = green.value;            
        } else if(greenNumVal.value == '') {
            alert('cannot leave field empty');
            greenNumVal.value = green.value;
            initSliderColors();
            displayColors();
        } else {
            green.value = greenNumVal.value;            
            initSliderColors();
            displayColors();
        }
    });

    // Validate number range
    blueNumVal.addEventListener('change', ()=>{
        // make sure numbers are entered between 0 to 255
        if (blueNumVal.value > 255) {
            alert('cannot enter numbers greater than 255');
            blueNumVal.value = blue.value;
        } else if (blueNumVal.value < 0) {
            alert('cannot enter numbers less than 0');
            blueNumVal.value = blue.value;
        } else if(blueNumVal.value == '') {
            alert('cannot leave field empty');
            blueNumVal.value = blue.value;
            initSliderColors();
            displayColors();
        } else {
            blue.value = blueNumVal.value;            
            initSliderColors();
            displayColors();
        }
    });
}

// Color Sliders controls
function colorSliders(){
    red.addEventListener('input', () => {
        displayColors();
        initSliderColors();
        changeRangeNumVal();
        colorNumbrVals();
    });

    green.addEventListener('input', () => {
        displayColors();
        initSliderColors();
        changeRangeNumVal();
        colorNumbrVals();
    });

    blue.addEventListener('input', () => {
        displayColors();
        initSliderColors();
        changeRangeNumVal();
        colorNumbrVals();
    });
}


function mouseMove(e) {
    if (e.clientY >= box.top && e.clientY <= box.bottom && e.clientX >= box.left && e.clientX <= box.right) {
        mouseIn = true;
        if (square == true) {
            canvas.style.cursor = "crosshair";
            document.addEventListener('mouseup', function (e) {
                mousedown = false;
                function myFunction() {
                    let child = canvas.children;
                    let layerNum = child.length;
                    let txt = "";
                    for (let i = 0; i < child.length; i++) {
                        txt = txt + (i + 1) + ":" + child[i].id + "<br>";
                    }
                    document.getElementById("inputLayers").innerHTML = txt;
                }
                myFunction();
            });

            //Mousedown
            canvas.addEventListener('mousedown', function (e) {
                lastMouseX = parseInt(e.clientX - canvasx);
                lastMouseY = parseInt(e.clientY - canvasy);
                div = document.createElement('div');
                div.style.left = parseInt(mousex) + "vw";
                div.style.top = parseInt(mousey) + "vw";
                mousedown = true;
            });
            //Mousemove
            canvas.addEventListener('mousemove', function (e) {
                mousex = parseInt(e.clientX - canvasx);
                mousey = parseInt(e.clientY - canvasy);
                if (mousedown) {
                    div.setAttribute("class", "rect");
                    div.setAttribute("id", `rect: #${squareNum}`);
                    width = mousex - lastMouseX;
                    height = mousey - lastMouseY;
                    div.style.left = width < 0 ? parseInt(mousex) + 'px' : lastMouseX + 'px';
                    div.style.top = height < 0 ? parseInt(mousey) + 'px' : lastMouseY + 'px';
                    div.style.width = Math.abs(parseInt(width)) + "px";
                    div.style.height = Math.abs(parseInt(height)) + "px";
                    div.style.borderColor = `rgb(${red.value}, ${green.value}, ${blue.value})`;    
                    canvas.appendChild(div);
                }
            });

        }
        if (circle == true) {
            canvas.style.cursor = "crosshair";
            document.addEventListener('mouseup', function (e) {
                mousedown = false;
                function myFunction() {
                    let child = canvas.children;
                    let layerNum = child.length;
                    let txt = "";
                    for (let i = 0; i < child.length; i++) {
                        txt = txt + (i + 1) + ":" + child[i].id + "<br>";
                    }
                    document.getElementById("inputLayers").innerHTML = txt;
                }
                myFunction();
            });

            //Mousedown
            canvas.addEventListener('mousedown', function (e) {
                lastMouseX = parseInt(e.clientX - canvasx);
                lastMouseY = parseInt(e.clientY - canvasy);
                div = document.createElement('div');
                div.style.left = parseInt(mousex) + "vw";
                div.style.top = parseInt(mousey) + "vw";
                mousedown = true;
            });
            //Mousemove
            canvas.addEventListener('mousemove', function (e) {
                mousex = parseInt(e.clientX - canvasx);
                mousey = parseInt(e.clientY - canvasy);
                if (mousedown) {
                    div.setAttribute("class", "circle");
                    div.setAttribute("id", `circle: #${circleNum}`);
                    width = mousex - lastMouseX;
                    height = mousey - lastMouseY;
                    div.style.left = width < 0 ? parseInt(mousex) + 'px' : lastMouseX + 'px';
                    div.style.top = height < 0 ? parseInt(mousey) + 'px' : lastMouseY + 'px';
                    div.style.width = Math.abs(parseInt(width)) + "px";
                    div.style.height = Math.abs(parseInt(height)) + "px";
                    canvas.appendChild(div);
                }

            });

        }
        if (mouse == true) {
            document.addEventListener('mouseup', function (e) {
                mousedown = false;
            });

            //Mousedown
            canvas.addEventListener('mousedown', function (e) {
                lastMouseX = parseInt(e.clientX - canvasx);
                lastMouseY = parseInt(e.clientY - canvasy);
                mousedown = true;
            });

            canvas.addEventListener('mousemove', function (e) {
                let layer = document.getElementById("rect: #0");
                canvas.style.cursor = "default";
                layer.addEventListener('mousedown', function (e) {
                    layer.style.borderColor = "blue";
                    layer.style.left = parseInt(mousex) + "px";
                    layer.style.top = parseInt(mousey) + "px";
                });
                layer.addEventListener('mouseover', function (e) {
                    layer.style.borderColor = "blue";
                    layer.style.cursor = "pointer";
                });
                layer.addEventListener('mouseout', function (e) {
                    layer.style.borderColor = "red";
                    layer.style.cursor = "default";
                });
            });

        }
        if (eraser == true) {
            document.addEventListener('mouseup', function (e) {
                mousedown = false;
                function myFunction() {
                    let child = canvas.children;
                    let layerNum = child.length;
                    let txt = "";
                    for (let i = 0; i < child.length; i++) {
                        txt = txt + (i + 1) + ":" + child[i].id + "<br>";
                    }
                    document.getElementById("inputLayers").innerHTML = txt;
                }
                myFunction();
            });

            //Mousedown
            canvas.addEventListener('mousedown', function (e) {
                lastMouseX = parseInt(e.clientX - canvasx);
                lastMouseY = parseInt(e.clientY - canvasy);
                div = document.createElement('div');
                div.style.left = parseInt(mousex) + "vw";
                div.style.top = parseInt(mousey) + "vw";
                mousedown = true;
            });
            document.addEventListener('mousemove', function (e) {
                mousex = parseInt(e.clientX - canvasx);
                mousey = parseInt(e.clientY - canvasy);
                if (mousedown) {
                    div.setAttribute("class", "rect");
                    div.setAttribute("id", `rect: #${squareNum}`);
                    ctx.beginPath();
                    ctx.rect(mousex, mousey, 2, 5);
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 10;
                    ctx.stroke();
                }
            });
        }
        if (square == false) {
            console.log("great");
        }
    } else {
        mouseIn = false;
    }
    console.log(square, circle, mouse, eraser);
}



function clickColor(a) {
    newMouse.style.color = "#666666";
    newSquare.style.color = "#666666";
    newCircle.style.color = "#666666";
    newPen.style.color = "#666666";
    newPaint.style.color = "#666666";
    newEraser.style.color = "#666666";
    newFill.style.color = "#666666";
    newCrop.style.color = "#666666";

    newSearch.style.color = "#666666";
    newText.style.color = "#666666";
    newEyedropper.style.color = "#666666";

    a.style.color = "#1492E6";
}


function newMouseFunction(e) {
    e.preventDefault;
    clickColor(newMouse);
    mouse = true;
    square = false;
    circle = false;
    pen = false;
    paint = false;
    eraser = false;
    fill = false;
    crop = false;

    search = false;
    
    text = false;
    eyedropper = false;
}

function newSquareFunction(e) {
    e.preventDefault;
    clickColor(newSquare);
    mouse = false;
    square = true;
    circle = false;
    pen = false;
    paint = false;
    eraser = false;
    fill = false;
    crop = false;

    search = false;
    
    text = false;
    eyedropper = false;

}

function newCircleFunction(e) {
    e.preventDefault;
    clickColor(newCircle);
    mouse = false;
    square = false;
    circle = true;
    pen = false;
    paint = false;
    eraser = false;
    fill = false;
    crop = false;

    search = false;
    
    text = false;
    eyedropper = false;
}

function newPenFunction(e) {
    e.preventDefault;
    clickColor(newPen);
    mouse = false;
    square = false;
    circle = false;
    pen = true;
    paint = false;
    eraser = false;
    fill = false;
    crop = false;

    search = false;
    
    text = false;
    eyedropper = false;
}

function newPaintFunction(e) {
    e.preventDefault;
    clickColor(newPaint);
    mouse = false;
    square = false;
    circle = false;
    pen = false;
    paint = true;
    eraser = false;
    fill = false;
    crop = false;

    search = false;
    
    text = false;
    eyedropper = false;
}

function newEraserFunction(e) {
    e.preventDefault;
    clickColor(newEraser);
    mouse = false;
    square = false;
    circle = false;
    pen = false;
    paint = false;
    eraser = true;
    fill = false;
    crop = false;

    search = false;
    
    text = false;
    eyedropper = false;
}

function newFillFunction(e) {
    e.preventDefault;
    clickColor(newFill);
    mouse = false;
    square = false;
    circle = false;
    pen = false;
    paint = false;
    eraser = false;
    fill = true;
    crop = false;

    search = false;
    
    text = false;
    eyedropper = false;
}

function newCropFunction(e) {
    e.preventDefault;
    clickColor(newCrop);
    mouse = false;
    square = false;
    circle = false;
    pen = false;
    paint = false;
    eraser = false;
    fill = false;
    crop = true;

    search = false;
    
    text = false;
    eyedropper = false;
}

function newSearchFunction(e) {
    e.preventDefault;
    clickColor(newSearch);
    mouse = false;
    square = false;
    circle = false;
    pen = false;
    paint = false;
    eraser = false;
    fill = false;
    crop = false;

    search = true;
    
    text = false;
    eyedropper = false;
}

function newTextFunction(e) {
    e.preventDefault;
    clickColor(newText);
    mouse = false;
    square = false;
    circle = false;
    pen = false;
    paint = false;
    eraser = false;
    fill = false;
    crop = false;

    search = false;
    
    text = true;
    eyedropper = false;
}


function newEyedropperFunction(e) {
    e.preventDefault;
    clickColor(newEyedropper);
    mouse = false;
    square = false;
    circle = false;
    pen = false;
    paint = false;
    eraser = false;
    fill = false;
    crop = false;

    search = false;
    
    text = false;
    eyedropper = true;
}