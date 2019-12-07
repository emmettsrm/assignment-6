const meshSize = 20;

function createFullContainer() {
    var fullContainer = document.createElement('div');
    fullContainer.setAttribute('id', 'fullContainer');
    document.body.append(fullContainer);
}
//adds overlay of tutorial and start game button
function tutorialCreator() {
    var tutorial = document.createElement('div');
    tutorial.setAttribute("id","tutorial");
    document.getElementById("fullContainer").append(tutorial);

    var title = document.createElement('div');
    title.setAttribute("id", "title");
    document.getElementById("tutorial").append(title);

    let tutorialTextbox = document.createElement('div');
    tutorialTextbox.setAttribute("id", "tutorialText");
    document.getElementById("tutorial").append(tutorialTextbox);

    var tutorialBullets = ["USE THE PICKAXE TO REMOVE ROCKS.", "USE THE SHOVEL TO REMOVE DIRT AND GRASS.", "USE THE AXE TO REMOVE TREES AND BUSHES.", "USE THE REMOVED ITEMS STORED IN YOUR INVENTORY TO REINVENT THE WORLD."];
    for (let i=0; i<tutorialBullets.length; i++){
        var li = document.createElement('li');
        li.innerHTML = tutorialBullets[i];
        document.getElementById("tutorialText").append(li);
    };

    let startButton = document.createElement('button');
    startButton.setAttribute("id", "startButton");
    startButton.innerText = "START GAME";
    document.getElementById("tutorial").append(startButton);
    startButton.addEventListener('click', startGame);
};

//creates gameboard space
function rowContainerCreator() {
    var gameBoard = document.createElement('div');
    gameBoard.setAttribute("id","gameBoard");
    document.getElementById("fullContainer").append(gameBoard);
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
            tool.innerHTML = (tools[i].toUpperCase());
            sideBar.append(tool);
        }
}

//
let arrOfRows = document.getElementsByClassName('row');

function matrixCreator(){
    createFullContainer()
    tutorialCreator();
    rowContainerCreator();
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


const groundHeight = Math.floor(Math.random() * (9 - 4 + 1)) + 4; 

function addGround(){
    let numOfDirtRows = groundHeight;
    for (let i=0;i<numOfDirtRows;i++){
        for (let j=0;j<meshSize;j++){
            arrOfRows[meshSize-i-1].childNodes[j].classList.add('dirt')
        }
    }
    for (let j=0;j<meshSize;j++){
        arrOfRows[meshSize-numOfDirtRows-1].childNodes[j].classList.add('grass')
    }
};

const treeCenter = Math.floor(Math.random() * (17 - 2 + 1)) + 2;
const trunkHeight = Math.floor(Math.random() * (5 - 3 + 1)) + 3;

function addTree(treeCenter,trunkHeight){
    for (let i=0;i<trunkHeight;i++){
        arrOfRows[meshSize-groundHeight-2-i].childNodes[treeCenter].classList.add('bark');
    }
    let leavesHeight = 5;
    for (let i=0;i<leavesHeight;i++){
        arrOfRows[meshSize-groundHeight-trunkHeight-1-i].childNodes[treeCenter].classList.add('leaves');
    }
    for (let i=0;i<leavesHeight-1;i++){
        arrOfRows[meshSize-groundHeight-trunkHeight-1-i].childNodes[treeCenter-1].classList.add('leaves');
    }
    for (let i=0;i<leavesHeight-1;i++){
        arrOfRows[meshSize-groundHeight-trunkHeight-1-i].childNodes[treeCenter+1].classList.add('leaves');
    }
}

let bushStart;
function randomizeBush(){
   bushStart = Math.floor(Math.random() * (17 - 1 + 1)) + 1;
   console.log(bushStart);
   if (bushStart <= (treeCenter + 2) && bushStart >= (treeCenter - 2)){
       console.log("bush stopped");
        randomizeBush();
    }else  {
        return bushStart;
    }
};

randomizeBush();

function addBush(bushStart){
    for (let i=0;i<2;i++){
        for (let j=0;j<2;j++){
            arrOfRows[meshSize-groundHeight-2-i].childNodes[bushStart+j].classList.add('leaves');
        }
    }
}

let stoneStart;
function randomizeStone(){
   stoneStart = Math.floor(Math.random() * (17 - 1 + 1)) + 1;
   if (stoneStart <= (treeCenter + 2)  && stoneStart >= (treeCenter - 2) || (stoneStart >= (bushStart -2) && stoneStart <= (bushStart + 2))){
       console.log("stone stopped");
        randomizeStone();
    }else  {
        return stoneStart;
    }
};

randomizeStone();

function addStones(stoneStart){
    for (let j=0;j<2;j++){
        arrOfRows[meshSize-groundHeight-2].childNodes[stoneStart+j].classList.add('stone');
    }
}


let cloudStartY, cloudStartX;

function addCloud(cloudStartX,cloudStartY){
    if (treeCenter > 10){
        cloudStartX = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        cloudStartY = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    }else{
        cloudStartX = Math.floor(Math.random() * (15 - 12 + 1)) + 12;
        cloudStartY = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    }
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

function deleteClass(e){
    e.target.classList = 'box';
}

function addingEventListeners(){
    for (let i = 0; i<meshSize;i++){
         for (let j = 0; j<meshSize;j++) {
            arrOfRows[i].childNodes[j].addEventListener('click', deleteClass);
         }
    }

}

//sets side menu and div for matrix
matrixCreator();
createButtons();

//starts game on button click; adds gameboard and structures
function startGame() {
    let gameBoard = document.getElementById('gameBoard');
    let tutorial = document.getElementById('tutorial');
    gameBoard.style.display = "block";
    tutorial.style.display = "none";
    addGround();
    addTree(treeCenter, trunkHeight);
    addBush(bushStart);
    addStones(stoneStart);
    addCloud(cloudStartX, cloudStartY);
    addingEventListeners();
}

function addToolSelectors() {
    let pickaxe = document.getElementById("pickaxe");
    pickaxe.addEventListener("click", function(){
        pickaxe.classList.toggle("active");
    })
    let axe = document.getElementById("axe");
    axe.addEventListener("click", function(){
        axe.classList.toggle("active");
    })
    let shovel = document.getElementById("shovel");
    shovel.addEventListener("click", function(){
        shovel.classList.toggle("active");
    })

};

addToolSelectors();

