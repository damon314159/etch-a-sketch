"use strict";

function createGrid (size) {
    let array=[];
    const grid = document.createElement("div");
    const dimensions = 600/size;

    for (let i=0; i<size; i++){
        array[i] = document.createElement("div");
        array[i].classList.add("row");
        array[i].setAttribute("style", 
        "width:"+600+"px;"
        + "height:"+dimensions+"px;"
        + "display:flex;");

        grid.appendChild(array[i]);
        for (let j=0; j<size; j++) {
            array[i][j] = document.createElement("div");
            array[i][j].classList.add("grid-element");
            array[i][j].setAttribute("style", 
            "width:"+dimensions+"px;"
            + "height:"+dimensions+"px;");
            grid.childNodes[i].appendChild(array[i][j]);

        };
    };
    return grid;
};


const canvas = document.querySelector(".canvas");
const tenGrid = createGrid(10);
canvas.appendChild(tenGrid);