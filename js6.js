const meshSize = 20;
function createFullContainer() {
    var fullContainer = document.createElement('div');
    fullContainer.setAttribute('id', 'fullContainer');
    document.body.append(fullContainer);
}
function rowContainerCreator() {
    var gameBoard = document.createElement('div');
    gameBoard.setAttribute("id","gameBoard");
    document.getElementById("fullContainer").append(gameBoard)
}
function rowCreator() {
    var row = document.createElement('div');
    row.setAttribute("class","row");
    document.getElementById("gameBoard").append(row);
}
function boxCreator(){
    var box = document.createElement('div');
    box.setAttribute("class","box");
    return box

}

function createSideBar() {
    var sideBar = document.createElement('div');
    sideBar.setAttribute('id', 'sideBar');
    document.getElementById("fullContainer").append(sideBar);
}
function createButtons() {
    var sideBar = document.getElementById('sideBar');
    let tools = ["pickaxe", "shovel", "axe"];
        for (let i=0; i<tools.length; i++){
            tool = document.createElement('div');
            tool.classList.add('toolButton');
            tool.setAttribute('id', tools[i]);
            sideBar.append(tool);
        }
}

let arrOfRows = document.getElementsByClassName('row');

function matrixCreator(){
    createFullContainer()
    rowContainerCreator()
    for (let i = 0; i<meshSize;i++){
        rowCreator();
    }
    for (let j=0;j<arrOfRows.length;j++){
        for (let k=0;k<meshSize;k++){
            arrOfRows[j].append(boxCreator())
        }
    }
    createSideBar();
}

matrixCreator()
addGround();
createButtons();

function addGround(){
    let numOfDirtRows = 6;
    for (let i=0;i<numOfDirtRows;i++){
        for (let j=0;j<meshSize;j++){
            arrOfRows[meshSize-i-1].childNodes[j].classList.add('dirt')
        }
    }
    for (let j=0;j<meshSize;j++){
        arrOfRows[meshSize-numOfDirtRows-1].childNodes[j].classList.add('grass')
    }
}


function addTree(treeCenter,trunkHeight){
    for (let i=0;i<trunkHeight;i++){
        arrOfRows[meshSize-7-1-i].childNodes[treeCenter].classList.add('bark'); // 7 is height of ground
    }
    let leavesHeight = 5;
    for (let i=0;i<leavesHeight;i++){
        arrOfRows[meshSize-7-trunkHeight-1-i].childNodes[treeCenter].classList.add('leaves');
    }
    for (let i=0;i<leavesHeight-1;i++){
        arrOfRows[meshSize-7-trunkHeight-1-i].childNodes[treeCenter-1].classList.add('leaves');
    }
    for (let i=0;i<leavesHeight-1;i++){
        arrOfRows[meshSize-7-trunkHeight-1-i].childNodes[treeCenter+1].classList.add('leaves');
    }
}
function addBush(bushStart){
    for (let i=0;i<2;i++){
        for (let j=0;j<2;j++){
            arrOfRows[meshSize-7-1-i].childNodes[bushStart+j].classList.add('leaves');
        }
    }
}

function addStones(stoneStart){
    for (let j=0;j<2;j++){
        arrOfRows[meshSize-7-1].childNodes[stoneStart+j].classList.add('stone');
    }
}

function addCloud(cloudStartX,cloudStartY){
    arrOfRows[1+cloudStartY].childNodes[cloudStartX+2].classList.add('cloud');
    for(let j=0;j<4;j++){
        arrOfRows[2+cloudStartY].childNodes[cloudStartX+j].classList.add('cloud');
    }
    for(let j=1;j<4;j++){
        arrOfRows[2+cloudStartY+1].childNodes[cloudStartX+j].classList.add('cloud');
    }
    for(let j=0;j<3;j++){
        arrOfRows[2+cloudStartY+2].childNodes[cloudStartX+j].classList.add('cloud');
    }
}







