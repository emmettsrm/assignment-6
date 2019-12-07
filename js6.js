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
    let toolsTitle = document.createElement('h1');
    toolsTitle.innerText = "TOOLS";
    sideBar.append(toolsTitle);
    let tools = ["pickaxe", "shovel", "axe"];
    for (let i=0; i<tools.length; i++){
        tool = document.createElement('div');
        tool.classList.add('toolButton');
        tool.setAttribute('id', tools[i]);
        tool.innerHTML = (tools[i].toUpperCase());
        sideBar.append(tool);
    }
}

const inventory = {
    dirt: 0,
    grass: 0,
    leaves: 0,
    bark: 0,
    stone: 0,
}

function createInventory() {
    var sideBar = document.getElementById('sideBar');
    let invTitle = document.createElement('h1');
    invTitle.innerText = "INVENTORY";
    sideBar.append(invTitle);
    let items = ["grass", "dirt", "leaves", "bark", "stone"];
    for (let i=0; i<items.length; i++){
        invBox = document.createElement('div');
        invBox.classList.add('invButton', items[i]);
        invBox.setAttribute('id', items[i]+"Inv")
        invBox.innerHTML = 0;
        sideBar.append(invBox);
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
    createButtons();
    createInventory();
}


const groundHeight = Math.floor(Math.random() * (9 - 4 + 1)) + 4; 

let arrOfRows = document.getElementsByClassName('row');


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
   if (bushStart <= (treeCenter + 2) && bushStart >= (treeCenter - 2)){
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
        if ((currentlySelectedTool == "shovel")&&(e.target.classList[1] == 'dirt')){
            inventory.dirt += 1;
            let dirtInv = document.getElementById("dirtInv");
            dirtInv.innerHTML = inventory.dirt;
            e.target.classList = 'box';
        }
        else if ((currentlySelectedTool == "shovel")&&(e.target.classList[1] == 'grass')){
            inventory.grass += 1;
            let grassInv = document.getElementById("grassInv");
            grassInv.innerHTML = inventory.grass;
            e.target.classList = 'box';
        }

        else if ((currentlySelectedTool == "pickaxe")&&(e.target.classList[1] == 'stone')){
            inventory.stone += 1;
            let stoneInv = document.getElementById("stoneInv");
            stoneInv.innerHTML = inventory.stone;
            e.target.classList = 'box';
        }
        else if ((currentlySelectedTool == "axe")&&(e.target.classList[1] == 'bark')){
            inventory.bark += 1;
            let barkInv = document.getElementById("barkInv");
            barkInv.innerHTML = inventory.bark;
            e.target.classList = 'box';
        }
        else if ((currentlySelectedTool == "axe")&&(e.target.classList[1] == 'leaves')){
            inventory.leaves += 1;
            let leavesInv = document.getElementById("leavesInv");
            leavesInv.innerHTML = inventory.leaves;
            e.target.classList = 'box';
        }
    }
}

let droppingClass = "";
function addInventoryEventListeners(){
    let arrOfInv = document.getElementsByClassName('invButton');
    for (let i=0;i<arrOfInv.length;i++){
        arrOfInv[i].addEventListener('click',function(el){
            for (let j=0;j<toolArray.length;j++){
                if (toolArray[j].classList.length == 2){
                    toolArray[j].classList = "toolButton"
                }
            }
            droppingClass = el.target.classList[1]
            addingEventListenersToGame();
        })
    }
}

function isBelow(x,y) {
    if (x < meshSize-1){
        if (arrOfRows[x + 1].childNodes[y].classList.length == 2){
            return true
        }
    } else if (x == meshSize-1){
        return true
    } else {return false}
}

function addingEventListenersToGame(){
    for (let i = 0; i<meshSize;i++){
         for (let j = 0; j<meshSize;j++) {
            if (arrOfRows[i].childNodes[j].classList.length == 2){
                arrOfRows[i].childNodes[j].addEventListener('click', deleteClass);
            }
            if ((arrOfRows[i].childNodes[j].classList.length == 1)&&(droppingClass.length > 0)){//&&(isBelow)){  //&&((if (i<meshSize - 1){arrOfRows[i + 1].childNodes[j].classList.length == 2}))){
                arrOfRows[i].childNodes[j].addEventListener('click', function(){
                    if (isBelow(i,j)){
                        if ((droppingClass == "grass")&& (inventory.grass > 0)){
                            arrOfRows[i].childNodes[j].classList.add(droppingClass);
                            inventory.grass += -1;
                            let grassInv = document.getElementById("grassInv");
                            grassInv.innerHTML = inventory.grass;
                            droppingClass = "";
                        };
                        if ((droppingClass == "dirt")&& (inventory.dirt > 0)){
                            arrOfRows[i].childNodes[j].classList.add(droppingClass);
                            inventory.dirt += -1;
                            let dirtInv = document.getElementById("dirtInv");
                            dirtInv.innerHTML = inventory.dirt;
                            droppingClass = "";
                        };
                        if ((droppingClass == "stone")&& (inventory.stone > 0)){
                            arrOfRows[i].childNodes[j].classList.add(droppingClass);
                            inventory.stone += -1;
                            let stoneInv = document.getElementById("stoneInv");
                            stoneInv.innerHTML = inventory.stone;
                            droppingClass = "";
                        };
                        if ((droppingClass == "bark")&& (inventory.bark > 0)){
                            arrOfRows[i].childNodes[j].classList.add(droppingClass);
                            inventory.bark += -1;
                            let barkInv = document.getElementById("barkInv");
                            barkInv.innerHTML = inventory.bark;
                            droppingClass = "";
                        };
                        if ((droppingClass == "leaves")&& (inventory.leaves > 0)){
                            arrOfRows[i].childNodes[j].classList.add(droppingClass);
                            inventory.leaves += -1;
                            let leavesInv = document.getElementById("leavesInv");
                            leavesInv.innerHTML = inventory.leaves;
                            droppingClass = "";
                        };
                    }
                })
            }
         }
    }
};

let currentlySelectedTool = "";
let toolArray = document.getElementsByClassName("toolButton");

function addingEventListenersToTools(){
    let isAToolSelected = false;
    for (let i=0; i<toolArray.length; i++){
        toolArray[i].addEventListener('click', function(el){
        if (!isAToolSelected){
            currentlySelectedTool = el.target.id;
            el.target.classList.add("selectedTool");
            isAToolSelected = true;
            }
        else if ((isAToolSelected) && (el.target.classList.length == 1)){
            for (let j=0;j<toolArray.length; j++){
                if (toolArray[j].id == currentlySelectedTool) {
                    toolArray[j].classList = "toolButton"
                }
            };
            currentlySelectedTool = el.target.id;
            el.target.classList.add("selectedTool");
        }
        else if ((isAToolSelected) && (el.target.classList.length == 2)){
            currentlySelectedTool = "";
            el.target.classList = "toolButton";
            isAToolSelected = false}
        })};
}

//sets side menu and div for matrix
matrixCreator();
// createButtons();

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
    addingEventListenersToGame();
    addingEventListenersToTools();
    addInventoryEventListeners()
}

