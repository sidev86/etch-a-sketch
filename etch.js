// Create a for loop to create the grid

function createGrid(gridSize) {
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
}

function drawOnGrid() {
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
    square.style.backgroundColor = colorSelected;
  });
  square.addEventListener("mouseenter", () => {
    if (isPainting) {
      square.style.backgroundColor = colorSelected;
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
  const { h, s } = parseHSL(hslColor);
  //console.log(hue, saturation);
  square.addEventListener("mousedown", () => {
    let current = parseInt(square.dataset.light);
    if (current > 0) {
      current -= 10; // scurisce di 10% ogni passaggio
      console.log("current", current);
      square.dataset.light = current;
      square.style.backgroundColor = `hsl(${h}, ${s}%, ${current}%)`;
    }
  });
  square.addEventListener("mouseenter", () => {
    if (isPainting) {
      let current = parseInt(square.dataset.light);
      if (current > 0) {
        current -= 10; // scurisce di 10% ogni passaggio
        square.dataset.light = current;
        square.style.backgroundColor = `hsl(${h}, ${s}%, ${current}%)`;
      }
    }
  });
}

function hexToHsl(hex) {
  // Rimuove eventuale "#"
  hex = hex.replace("#", "");

  // Converte il colore hex in r, g, b
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Conversione RGB → HSL
  let rNorm = r / 255;
  let gNorm = g / 255;
  let bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h, s;
  let l = (max + min) / 2;

  const d = max - min;

  if (d === 0) {
    h = 0;
  } else {
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / d) % 6;
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  if (d === 0) {
    s = 0;
  } else {
    s = d / (1 - Math.abs(2 * l - 1));
  }

  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

function parseHSL(hslString) {
  let values = hslString.replace("hsl(", "").replace(")", "").split(",");

  return {
    h: Number(values[0].trim()),
    s: Number(values[1].trim().replace("%", "")),
    l: Number(values[2].trim().replace("%", "")),
  };
}

function clearGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
}

let isPainting = false;
let paintMode = "Normal";
let gridSize = 16;
let colorSelected = "#000000";
let hslColor = hexToHsl(colorSelected);

const colorPicker = document.querySelector("#color-picker");
colorPicker.addEventListener("input", () => {
  colorSelected = colorPicker.value;
  hslColor = hexToHsl(colorSelected);
});

const buttonGenerateGrid = document.querySelector("#btn-generate");
buttonGenerateGrid.addEventListener("click", () => {
  gridSize = prompt("Please enter a grid size. (maximum 100)");
  if (gridSize > 100 || gridSize < 1) {
    alert("Please enter a number less than 100");
    return;
  }
  clearGrid();
  createGrid(gridSize);
  drawOnGrid();
});

const buttonRainbow = document.querySelector("#btn-rainbow");
buttonRainbow.addEventListener("click", () => {
  paintMode = "Rainbow";
  drawOnGrid();
});

const buttonFadeDark = document.querySelector("#btn-fade-dark");
buttonFadeDark.addEventListener("click", () => {
  paintMode = "Fade";
  drawOnGrid();
});

const buttonNormal = document.querySelector("#btn-normal-mode");
buttonNormal.addEventListener("click", () => {
  paintMode = "Normal";
  drawOnGrid();
});

const buttonClear = document.querySelector("#btn-clear");
buttonClear.addEventListener("click", () => {
  clearGrid();
  createGrid(gridSize);
  drawOnGrid();
});

function start() {
  createGrid(16);
  drawOnGrid();
}

start();
