"use strict";

function createGrid (size) {
    let array=[];
    const grid = document.createElement("div");
    grid.classList.add("grid");
    const dimensions = 600/size; //height and width of cells

    for (let i=0; i<size; i++){  //define rows
        array[i] = document.createElement("div");
        array[i].classList.add("row");
        array[i].setAttribute("style", 
        "width:"+600+"px;"
        + "height:"+dimensions+"px;"
        + "display:flex;");
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

function initializeGrids() {
    const sizeBtnList = document.querySelectorAll(".size-buttons>*")
    const tenGrid = createGrid(10);
    const twentyGrid = createGrid(20);
    const thirtyGrid = createGrid(30);
    let gridsArray = [tenGrid, twentyGrid, thirtyGrid];
    canvas.appendChild(gridsArray[0]);
    sizeBtnList.forEach(element => {
        element.addEventListener("click", (event)=> {
            const size = event.target.classList[0].slice(-2); //eg button.sqr10 -> 10
            canvas.removeChild(canvas.children[0]);
            switch (size) {
                case "10":
                    canvas.appendChild(gridsArray[0])
                    break;
                case "20":
                    canvas.appendChild(gridsArray[1])
                    break;
                case "30":
                    canvas.appendChild(gridsArray[2])
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
            element.style.backgroundColor = "rgba(0,0,0,0)";
        });
    });
};
                
                
const canvas = document.querySelector(".canvas");
initializeGrids();
initializeClearBtn();