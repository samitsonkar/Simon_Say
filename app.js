let userInput = [];
let gameInput = [];
let color = ["red", "blue", "green", "yellow"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let btns = document.querySelectorAll(".inner");

document.addEventListener("keypress", function() {
    if(!started){
        started = true;
        levelUp();
    }
    for(btn of btns) {
        btn.addEventListener("click", btnPress);
    }
});


function levelUp() {
    userInput = [];
    level++;
    h2.innerText = `Level ${level}`;

    let rnd = Math.floor(Math.random()*3);
    let rndColor = color[rnd];
    let btn = document.querySelector(`.${rndColor}`);
    gameInput.push(rndColor);
    flashUp1(btn);
}


function flashUp(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },500);
}
function flashUp1(btn) {
    btn.classList.add("flash1");
    setTimeout(function() {
        btn.classList.remove("flash1");
    },500);
}


function btnPress() {
    if(level == 0){return;}
    let btn = this;
    flashUp(btn);
    let userCol = btn.getAttribute("id");
    userInput.push(userCol);
    checkAns();
}


function checkAns() {
    let idx = userInput.length-1;
    if(userInput[idx]===gameInput[idx]) {
        if(idx==gameInput.length-1) {
            highScore = Math.max(highScore,level);
            if(highScore>0){
                h2P = document.querySelector(".highScore");
                h2P.innerText = `HighScore is ${highScore}`;
            }
            setTimeout(levelUp,1000);
        }
    }else {
        h2.innerHTML=`Game Over!!!! Your score was ${level-1}.<br> Press any key to restart.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

function reset() {
    started = false;
    gameInput = [];
    userInput = [];
    level = 0;
}

async function dummy(resolve,reject) {
    let rnd = Math.floor(Math.random()*6);
    if(rnd<3){
        reject();
    }
}
dummy()
.then(()=>{
    console.log("passed");
})
.catch(()=>{
    console.log("error occured");
})