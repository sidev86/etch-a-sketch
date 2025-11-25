// Create a for loop to create the grid

const grid = document.getElementById("grid");

for (let i = 0; i < 16; i++) {
  let row = document.createElement("div");
  row.classList.add("row");
  for (let j = 0; j < 16; j++) {
    let square = document.createElement("div");
    square.classList.add("sq");
    row.appendChild(square);
  }
  grid.appendChild(row);
}
