// получаем поле для игры
let canvas = document.getElementById('life-body');

let canvasContext = canvas.getContext('2d');
canvasContext.fillStyle = '#fff';

let arrayOfCells = [];

const cellSize = 30;
const canvasSize = 300;
const rectSize = 10;

// рисуем игроков (точки) при клике
canvas.onclick = function(event) {
    // определяем координаты клика мыши
    let x = event.offsetX;
    let y = event.offsetY;
    console.log(x, y);

    // разбить поле на кубики
    x = Math.floor(x/10);
    y = Math.floor(y/10);
    // присвоить ячейке по которой кликнули 1
    arrayOfCells[y][x] = 1;
    console.log('arrayOfCells', arrayOfCells);

    drawCell();
}

// создание игрового поля
function createLife() {
    let cellWidth = cellSize;
    let cellHeight = cellSize;
    // заполняем массив значениями

    for (let i = 0; i < cellHeight; i++) {
        arrayOfCells[i] = [];
        for (let j = 0; j < cellWidth; j++) {
            arrayOfCells[i][j] = 0;
        }
    }
}

createLife();

function drawCell() {
    canvasContext.clearRect(0, 0, canvasSize, canvasSize);

    // находим единичку в массиве и рисуем в ней квадратик
    for (let i = 0; i < cellSize; i++) {
        for (let j = 0; j < cellSize; j++) {
            if (arrayOfCells[i][j] == 1) {
                canvasContext.fillRect(j * rectSize, i * rectSize, rectSize, rectSize)
            }
        }
    }
}