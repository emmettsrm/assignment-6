const meshSize = 20;
function createFullContainer() {
    var fullContainer = document.createElement('div');
    fullContainer.setAttribute('id', 'fullContainer');
    document.body.append(fullContainer);
}

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


function matrixCreator(){
    createFullContainer();
    tutorialCreator();
    rowContainerCreator();
    for (let i = 0; i<meshSize;i++){
        var row = document.createElement('div');
        row.setAttribute("class","row");
        row.setAttribute("row",i)
        document.getElementById("gameBoard").append(row);
//        rowCreator();
    }
    let arrOfRows = document.getElementsByClassName('row');
    for (let j=0;j<meshSize;j++){
        for (let k=0;k<meshSize;k++){
            var box = document.createElement('div');
            box.setAttribute("class","box");
            box.setAttribute('col',k);
            box.setAttribute('row',j);
            arrOfRows[j].append(box);
        }
    }
    createSideBar();
}



let arrOfRows = document.getElementsByClassName('row');


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
};


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

const inventory = {
    ground: 0,
    tree: 0,
    stone: 0,
}



function deleteClass(e){
    let targetRow = parseInt(e.target.getAttribute('row'));
    let targetCol = parseInt(e.target.getAttribute('col'));
    let check = ""
    if (targetRow > 0){
        check += "(arrOfRows[targetRow - 1].childNodes[targetCol].classList.length == 1)"
    };

    if (targetCol > 0){
        if (check.length > 0) {
            check += " || (arrOfRows[targetRow].childNodes[targetCol - 1].classList.length == 1)"
        }
        else {check += "(arrOfRows[targetRow].childNodes[targetCol - 1].classList.length == 1)"}
    };
    if (targetCol < meshSize - 1){
        if (check.length > 0) {
            check += " || (arrOfRows[targetRow].childNodes[targetCol + 1].classList.length == 1)"
        }
        else {check += "(arrOfRows[targetRow].childNodes[targetCol + 1].classList.length == 1)"}
    };
    if (eval(check)){
        if ((currentlySelectedTool == "shovel")&&((e.target.classList[1] == 'dirt')||(e.target.classList[1] == 'grass'))){
            inventory.ground += 1;
            e.target.classList = 'box';
        }
        else if ((currentlySelectedTool == "pickaxe")&&(e.target.classList[1] == 'stone')){
            inventory.stone += 1;
            e.target.classList = 'box';
        }
        else if ((currentlySelectedTool == "axe")&&((e.target.classList[1] == 'bark')||(e.target.classList[1] == 'leaves'))){
            inventory.tree += 1;
            e.target.classList = 'box';
        }
    }
}

function addingEventListenersToGame(){
    for (let i = 0; i<meshSize;i++){
         for (let j = 0; j<meshSize;j++) {
            arrOfRows[i].childNodes[j].addEventListener('click', deleteClass);
         }
    }
};

let currentlySelectedTool = "";

function addingEventListenersToTools(){
    let isAToolSelected = false;
    let toolArray = document.getElementById("sideBar").childNodes;
    for (let i=0; i<toolArray.length; i++){
        toolArray[i].addEventListener('click', function(el){
        if (!isAToolSelected){
            currentlySelectedTool = el.target.id;
            el.target.classList.add("selectedTool");
            console.log(el.target.classList);
            isAToolSelected = true;
            }
        else if ((isAToolSelected) && (el.target.classList.length == 2)){
            currentlySelectedTool = "";
            el.target.classList = "toolButton";
            isAToolSelected = false}
        })};
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
    addTree(15, 4);
    addBush(3);
    addStones(7);
    addCloud(5, 2);
    addingEventListenersToGame();
    addingEventListenersToTools();

};

