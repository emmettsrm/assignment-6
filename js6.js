

//var MineCraft = {}
const meshSize = 20;
function createFullContainer() {
    var fullContainer = document.createElement('div');
    fullContainer.setAttribute('id', 'fullContainer');
    document.body.append(fullContainer);
}
function rowContainerCreator() {
    var container = document.createElement('div');
    container.setAttribute("id","container");
    document.getElementById("fullContainer").append(container)
}
function rowCreator() {
    var row = document.createElement('div');
    row.setAttribute("class","row");
    document.getElementById("container").append(row);
}
function boxCreator(){
    var box = document.createElement('div');
    box.setAttribute("class","box");
    return box

}

function createSideBar() {
    var sideBar = document.createElement('div');
    sideBar.setAttribute('id', 'sideBar');
    var img1 = document.createElement('img');
    img1.src = "https://www.researchgate.net/profile/Tim_Van_Leeuwerden/publication/292976043/figure/fig2/AS:325350820204547@1454581088304/A-Minecraft-Axe-obtained-in-the-first-minutes-of-the-game.png";
    sideBar.append(img1);
    var img2 = document.createElement('img');
    img2.src = "https://icon-library.net/images/minecraft-pickaxe-icon/minecraft-pickaxe-icon-4.jpg";
    sideBar.append(img2);
    var img3 = document.createElement('img');
    img3.src = "https://i.pinimg.com/originals/fc/75/ea/fc75eaf24453279cd9453200392c1cfa.png";
    sideBar.append(img3);
    document.getElementById('fullContainer').append(sideBar);
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
}

matrixCreator()


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
addGround()

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


addingEventListeners()







