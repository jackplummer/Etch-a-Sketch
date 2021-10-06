let gridSizeColumn = 16; // initial value
let gridSize = gridSizeColumn ** 2; // size of grid
const gridContainer = document.querySelector('.grid-container');

generateGridCells(gridSize); // generates initial grid
gridContainer.setAttribute('style', `grid-template-columns: repeat(${gridSizeColumn}, 1fr)`);
let gridCells = document.querySelectorAll('.grid-container > div');

function generateGridCells(gridSize) {
  while (gridContainer.firstChild) { // removes all cells from grid
    gridContainer.removeChild(gridContainer.lastChild);
  }
  for (i = 1; i <= gridSize; i++) { // generate grid cells
    let newCell = document.createElement('div');
    newCell.classList.add(`cell-${i}`);
    gridContainer.appendChild(newCell);
  }
};

function updateGridSize(e) { // deletes old grid and updates to slider value
  console.log(e.target.value)
  gridSizeColumn = e.target.value;
  gridSize = gridSizeColumn ** 2; 
  generateGridCells(gridSize);
  gridContainer.removeAttribute('grid-template-columns');
  gridContainer.setAttribute('style', `grid-template-columns: repeat(${gridSizeColumn}, 1fr)`);
  gridCells = document.querySelectorAll('.grid-container > div');
  cellEventListener();
}

function changeCellColor(cellClass, color) {
  cellClass.setAttribute('style', `background-color: ${color}`);
};

function resetCellColor() {
  for (const cell of gridCells) {
    changeCellColor(cell,'white')
  }
}

function cellEventListener() {
  for (const cell of gridCells) { // adds eventListener to all cells when mouse hovers over
    cell.addEventListener('mouseover', function(){
      changeCellColor(cell,'black')
    });
  };
};
cellEventListener(); // initialisation call when page loads

// Add divs

const buttons = document.querySelector('.buttons');

let etchSketchHeading = document.createElement('h2');
etchSketchHeading.textContent = 'Etch-a-Sketch';
buttons.appendChild(etchSketchHeading);

let gridSizeLabel = document.createElement('label');
gridSizeLabel.textContent = 'Grid Height/Width';
gridSizeLabel.setAttribute('for','slider')
buttons.appendChild(gridSizeLabel);

let gridSizeInput = document.createElement('input');
gridSizeInput.setAttribute('type','range')
gridSizeInput.setAttribute('min',10);
gridSizeInput.setAttribute('max',50);
gridSizeInput.setAttribute('value',16);
gridSizeInput.setAttribute('name','slider')
buttons.appendChild(gridSizeInput);
gridSizeInput.addEventListener('input', updateGridSize);


let resetButton = document.createElement('button');
resetButton.addEventListener('click', function(){
  resetCellColor();
});
resetButton.textContent = 'Reset';
buttons.appendChild(resetButton);