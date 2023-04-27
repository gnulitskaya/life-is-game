// получаем поле для игры
let canvas = document.getElementById('life-body');

let canvasContext = canvas.getContext('2d');
canvasContext.fillStyle = '#fff';

let arrayOfCells = [];

let count = 0;
let timer;

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

function startLife() {
    let arr2 = [];

    for (let i = 0; i < cellSize; i++) {
        arr2[i] = [];
        for (let j = 0; j < cellSize; j++) {
            // считаем количество соседей
            let neighbors = 0;
            // верхний сосед
            if (arrayOfCells[checkTop(i)-1][j]==1) neighbors++;
            // справа
            if (arrayOfCells[i][checkRight(j)+1]==1) neighbors++;
            // снизу
            if (arrayOfCells[checkRight(i)+1][j]==1) neighbors++;
            // слева
            if (arrayOfCells[i][checkTop(j)-1]==1) neighbors++;
            // диагональ
            if (arrayOfCells[checkTop(i)-1][checkRight(j)+1]==1) neighbors++;
            if (arrayOfCells[checkRight(i)+1][checkRight(j)+1]==1) neighbors++;
            if (arrayOfCells[checkRight(i)+1][checkTop(j)-1]==1) neighbors++;
            if (arrayOfCells[checkTop(i)-1][checkRight(j)-1]==1) neighbors++;

            (neighbors == 2 || neighbors == 3) ?
            arr2[i][j] = 1 : arr2[i][j] == 0;
        }
    }

    arrayOfCells = arr2;
    drawCell();
    count ++;

    timer = setTimeout(startLife, 300);

}

// при выходе за пределы поля
function checkTop(i) {
    if (i == 0) return cellSize;
    else return i;
}

function checkRight(i) {
    if (i == (cellSize - 1)) return -1;
    else return i;
}

document.getElementById('start').onclick = startLife;