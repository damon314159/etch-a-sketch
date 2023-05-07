"use strict";

function createGrid(size) {
    let array=[];
    const grid = document.createElement("div");
    grid.classList.add("grid");
    const dimensions = 600/size; //height and width of cells

    for (let i=0; i<size; i++){  //define rows
        array[i] = document.createElement("div");
        array[i].classList.add("row");
        array[i].setAttribute("style", 
        "width:"+600+"px;"
        + "height:"+dimensions+"px;");
        grid.appendChild(array[i]);
    
        for (let j=0; j<size; j++) { //define cells in each row
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

function createInvisGrid(size) {
    const invisGrid = createGrid(size);
    invisGrid.classList.add("invis-grid");
    const gridElements=invisGrid.querySelectorAll(".grid-element");
    gridElements.forEach(element=>{
        element.classList.add("invis-element");
        element.addEventListener("click", event=>console.log(event));
    });
    return(invisGrid);
}

function initializeGrids() {
    /*first create visible and invisible copies of each grid,
    where the visible is sent to back for shading, and invis
    is put on top for click events*/
    const tenGrid = createGrid(10); 
    const invisTenGrid = createInvisGrid(10);
    const twentyGrid = createGrid(20);
    const invisTwentyGrid = createInvisGrid(20);
    const thirtyGrid = createGrid(30);
    const invisThirtyGrid = createInvisGrid(30);

    let gridsArray = [tenGrid, twentyGrid, thirtyGrid];
    let invisGridsArray = [invisTenGrid, invisTwentyGrid, invisThirtyGrid];
    canvas.appendChild(gridsArray[0]);
    canvas.appendChild(invisGridsArray[0]);
    //start page with a 10x10 grid

    const sizeBtnList = document.querySelectorAll(".size-buttons>*")
    sizeBtnList.forEach(element => {
        element.addEventListener("click", (event)=> {
            const size = event.target.classList[0].slice(-2); //eg button.sqr10 -> 10
            while (canvas.firstChild) {
                canvas.removeChild(canvas.lastChild);
            };
            switch (size) {
                case "10":
                    canvas.appendChild(gridsArray[0]);
                    canvas.appendChild(invisGridsArray[0]);
                    break;
                case "20":
                    canvas.appendChild(gridsArray[1]);
                    canvas.appendChild(invisGridsArray[1]);
                    break;
                case "30":
                    canvas.appendChild(gridsArray[2]);
                    canvas.appendChild(invisGridsArray[2]);
                    break;
                default:
                    console.log("something went wrong");
            };
            
        });
    });
};

function initializeClearBtn () {
    const clearBtn = document.querySelector(".clear");
    clearBtn.addEventListener("click", ()=> {
        const grid = document.querySelector(".grid");
        const gridElements = grid.querySelectorAll(".grid-element");
        gridElements.forEach(element => {
            element.style.backgroundColor = "#DEC6C6";
        });
    });
};

function initializeColor() {
    const colorBtns = document.querySelectorAll(".left-wall .button-container>*");
    colorBtns.forEach(element => {
        element.addEventListener("click", (event)=> {
            color = event.target.classList[0];
        });
    });
};

const canvas = document.querySelector(".canvas");
let color = "dark"; //needs to be accessible outside of initializeColor
initializeColor();
initializeGrids();
initializeClearBtn();
