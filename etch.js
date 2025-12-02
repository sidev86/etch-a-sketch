// Create a for loop to create the grid

function drawGrid(gridSize) {
  const grid = document.getElementById("grid");
  const gridWidth = grid.clientWidth;
  console.log(gridWidth);
  const squareWidth = gridWidth / gridSize;

  for (let i = 0; i < gridSize; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < gridSize; j++) {
      let square = document.createElement("div");
      square.style.width = squareWidth + "px";
      square.style.height = squareWidth + "px";
      square.classList.add("sq");
      row.appendChild(square);
    }
    grid.appendChild(row);
  }

  document.addEventListener("mousedown", () => {
    isPainting = true;
  });

  document.addEventListener("mouseup", () => {
    isPainting = false;
  });

  // Create a function to change the color of the squares
  let squares = document.querySelectorAll(".sq");
  squares.forEach((square) => {
    if (paintMode === "Normal") {
      paintNormal(square);
    } else if (paintMode === "Rainbow") {
      paintRainbow(square);
    } else if (paintMode === "Fade") {
      paintFade(square);
    }
  });
}

function paintNormal(square) {
  square.addEventListener("mousedown", () => {
    square.style.backgroundColor = "black";
  });
  square.addEventListener("mouseenter", () => {
    if (isPainting) {
      square.style.backgroundColor = "black";
    }
  });
}

function paintRainbow(square) {
  square.addEventListener("mousedown", () => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    square.style.backgroundColor = "#" + randomColor;
  });
  square.addEventListener("mouseenter", () => {
    if (isPainting) {
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      square.style.backgroundColor = "#" + randomColor;
    }
  });
}

function paintFade(square) {
  square.dataset.light = 100;
  square.addEventListener("mousedown", () => {
    let current = parseInt(square.dataset.light);
    if (current > 0) {
      current -= 10; // scurisce di 10% ogni passaggio
      square.dataset.light = current;
      square.style.backgroundColor = `hsl(200, 80%, ${current}%)`;
    }
  });
  square.addEventListener("mouseenter", () => {
    if (isPainting) {
      let current = parseInt(square.dataset.light);
      if (current > 0) {
        current -= 10; // scurisce di 10% ogni passaggio
        square.dataset.light = current;
        square.style.backgroundColor = `hsl(200, 80%, ${current}%)`;
      }
    }
  });
}

function clearGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
}

let isPainting = false;
let paintMode = "Normal";
let gridSize;
const buttonGenerateGrid = document.querySelector("#btn-generate");
buttonGenerateGrid.addEventListener("click", () => {
  gridSize = prompt("Please enter a grid size. (maximum 100)");
  if (gridSize > 100 || gridSize < 1) {
    alert("Please enter a number less than 100");
    return;
  }
  clearGrid();
  drawGrid(gridSize);
});

const buttonRainbow = document.querySelector("#btn-rainbow");
buttonRainbow.addEventListener("click", () => {
  paintMode = "Rainbow";
  console.log(gridSize);
  clearGrid();
  drawGrid(gridSize);
});

const buttonFadeDark = document.querySelector("#btn-fade-dark");
buttonFadeDark.addEventListener("click", () => {
  paintMode = "Fade";
  clearGrid();
  drawGrid(gridSize);
});

const buttonNormal = document.querySelector("#btn-normal-mode");
buttonNormal.addEventListener("click", () => {
  paintMode = "Normal";
  clearGrid();
  drawGrid(gridSize);
});
