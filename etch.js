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

  // Create a function to change the color of the squares
  let squares = document.querySelectorAll(".sq");
  squares.forEach((square) => {
    square.addEventListener("mouseover", () => {
      square.style.backgroundColor = "black";
    });
  });
}

function clearGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
}

const button = document.querySelector("#btn-generate");
button.addEventListener("click", () => {
  let gridSize = prompt("Please enter a grid size. (maximum 100)");
  if (gridSize > 100 || gridSize < 1) {
    alert("Please enter a number less than 100");
    return;
  }
  clearGrid();
  drawGrid(gridSize);
});
