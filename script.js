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
  invisGrid.classList.replace("grid", "invis-grid");
  const gridElements=invisGrid.querySelectorAll(".grid-element");
  gridElements.forEach(element=>{
    element.classList.add("invis-element");
    element.addEventListener("mouseover", (event)=> {
      if (mouseDown==true) {
        paintSquare(event.x, event.y, color);
      };
    });
    element.addEventListener("mousedown", (event)=> {
      paintSquare(event.x, event.y, color);
    });
  });
  return(invisGrid);
};

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

function clear() {
  const grid = document.querySelector(".grid");
  const gridElements = grid.querySelectorAll(".grid-element");
  gridElements.forEach(element => {
    element.style.backgroundColor = "#DEC6C6";
  });
};

function initializeClearBtn() {
  const clearBtn = document.querySelector(".clear");
  clearBtn.addEventListener("click", ()=> clear());
};

function initializeColor() {
  const colorBtns = document.querySelectorAll(".left-wall .button-container>*");
  colorBtns.forEach(element => {
    element.addEventListener("click", (event)=> {
      color = event.target.classList[0];
    });
  });
};

function paintSquare(x, y, color) {
  const elementsAtXY = document.elementsFromPoint(x, y);
  const gridElementAtXY = elementsAtXY[4]; //picks the correct layer
  if (elementsAtXY.length==12) { //makes sure we're on the canvas still
    switch (color) {

      case "dark":
        gridElementAtXY.style.backgroundColor = "rgb(53,56,57)";
        break;

      case "grey":
        const currentCol = gridElementAtXY.style.backgroundColor;
        if (currentCol.slice(0,4)=="rgba") { //rgba means its grey already
          const opacity = currentCol.slice(-4,-1);
          const newOpacity = +opacity+0.1; //make more grey
          const newCol = currentCol.slice(0,-4) + newOpacity;
          gridElementAtXY.style.backgroundColor = newCol;
          break;
        }
        else if (currentCol!="rgb(53, 56, 57)") {
          gridElementAtXY.style.backgroundColor = "rgba(53,56,57,0.1)";
        };

        break;

      case "rainbow":
        const colors = 
        ["red","orange","yellow","green",
        "lightskyblue", "blue", "purple"];

        const randNum = Math.floor(7*Math.random());
        gridElementAtXY.style.backgroundColor = colors[randNum];
    };
  };
};

function trackLeftMouse(){
  document.body.addEventListener("mousedown",(event)=>{
    if (event.button==0) {
      mouseDown = true;
    };
  });
  document.body.addEventListener("mouseup",(event)=>{
    if (event.button==0) {
      mouseDown = false;
    };
  });
};

const canvas = document.querySelector(".canvas");
let color = "dark";
let mouseDown = false;
trackLeftMouse();
initializeColor();
initializeGrids();
clear();
initializeClearBtn();
