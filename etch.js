// Globals
let isPainting = false;
let paintMode = "Normal";
let gridSize = 16;
let colorSelected = "#000000";
let hslColor = hexToHsl(colorSelected);

function createGrid(gridSize) {
  const grid = document.getElementById("grid");
  const gridWidth = grid.clientWidth;
  const squareWidth = gridWidth / gridSize;

  // Clean grid
  grid.innerHTML = "";

  for (let i = 0; i < gridSize; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < gridSize; j++) {
      let square = document.createElement("div");
      square.style.width = squareWidth + "px";
      square.style.height = squareWidth + "px";
      square.classList.add("sq");
      square.dataset.light = 100; // lightness 100%

      square.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isPainting = true;
        paintSquare(square);
      });

      square.addEventListener("mouseenter", () => {
        if (isPainting) {
          paintSquare(square);
        }
      });

      row.appendChild(square);
    }
    grid.appendChild(row);
  }
}

function paintSquare(square) {
  if (paintMode === "Normal") {
    square.style.backgroundColor = colorSelected;
  } else if (paintMode === "Rainbow") {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    square.style.backgroundColor = "#" + randomColor;
  } else if (paintMode === "Fade") {
    let current = parseInt(square.dataset.light);
    if (current > 0) {
      current -= 10;
      square.dataset.light = current;
      const { h, s } = parseHSL(hslColor);
      square.style.backgroundColor = `hsl(${h}, ${s}%, ${current}%)`;
    }
  }
}

function hexToHsl(hex) {
  // Need the hex string without the initial #
  hex = hex.replace("#", "");

  // Take the r g b values from the hex
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

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

// Get the int values from the hsl string
function parseHSL(hslString) {
  let values = hslString.replace("hsl(", "").replace(")", "").split(",");

  return {
    h: Number(values[0].trim()),
    s: Number(values[1].trim().replace("%", "")),
    l: Number(values[2].trim().replace("%", "")),
  };
}

// Highlight the button of the draw active mode
function highlightActiveModeButton() {
  // To highlight the new active mode, first remove the old highlighted button
  const modeButtons = document.querySelectorAll(".mode-btn");
  modeButtons.forEach((button) => {
    button.classList.remove("active-mode");
  });

  // Now i will highlight the new button active
  if (paintMode === "Normal") {
    buttonNormal.classList.add("active-mode");
  } else if (paintMode === "Rainbow") {
    buttonRainbow.classList.add("active-mode");
  } else if (paintMode === "Fade") {
    buttonFadeDark.classList.add("active-mode");
  }
}

// Clean the grid
function clearGrid() {
  const squares = document.querySelectorAll(".sq");
  squares.forEach((square) => {
    square.style.backgroundColor = "";
    square.dataset.light = "100";
  });
}

function initializeGlobalMouseListeners() {
  document.addEventListener("mousedown", () => {
    isPainting = true;
  });

  document.addEventListener("mouseup", () => {
    isPainting = false;
  });
}

const colorPicker = document.querySelector("#color-picker");
colorPicker.addEventListener("input", () => {
  colorSelected = colorPicker.value;
  hslColor = hexToHsl(colorSelected);
});

const buttonGenerateGrid = document.querySelector("#btn-generate");
buttonGenerateGrid.addEventListener("click", () => {
  let gridSizeTemp = gridSize;
  gridSize = prompt("Please enter a grid size. (maximum 100)");
  if (gridSize > 100 || gridSize < 1 || isNaN(gridSize)) {
    gridSize = gridSizeTemp;
    alert("Please enter a valid number between 1 and 100");
    return;
  }
  createGrid(gridSize);
});

const buttonRainbow = document.querySelector("#btn-rainbow");
buttonRainbow.addEventListener("click", () => {
  paintMode = "Rainbow";
  highlightActiveModeButton();
});

const buttonFadeDark = document.querySelector("#btn-fade-dark");
buttonFadeDark.addEventListener("click", () => {
  paintMode = "Fade";
  highlightActiveModeButton();
});

const buttonNormal = document.querySelector("#btn-normal-mode");
buttonNormal.addEventListener("click", () => {
  paintMode = "Normal";
  highlightActiveModeButton();
});

const buttonClear = document.querySelector("#btn-clear");
buttonClear.addEventListener("click", () => {
  clearGrid();
});

// Called when the page is loaded
function start() {
  createGrid(gridSize);
  initializeGlobalMouseListeners();
}

// Call the function when content is ready
window.addEventListener("DOMContentLoaded", start);
