
const shooter = document.getElementById("player-controller")
const scoreCount = document.querySelector('.score span')
var gameSong = new Audio('../audio/start-game-song.mpeg')
var startButton = document.getElementById("start-Button")
var myVar;
var musicChange = false;
var backgroundChange = false;
var Timerminutes=document.querySelector('#minutes')
var Timersecond=document.querySelector('#second')
var TimerInterval;

startButton.addEventListener("click", (event) => {
    playGame();
    TimerGame();
})


function playGame() {
    startButton.style.display = 'none'
    window.addEventListener("keydown", ShipFly);
    gameSong.play();
    myVar = (setInterval(createMonster, 2000))
}

function TimerGame() {
    let second=0;
    let minutes=0;
     TimerInterval=setInterval(()=>{
        second+=1;
        if(second==60){
            console.log(minutes)
            minutes+=1;
            second=0;
        }

      Timersecond.innerHTML=` ${second}`;
      Timerminutes.innerHTML=` ${minutes}`;
    },1000)
}

//להאיץ את מהירות החללית
function speedMonster() {
    if (scoreCount.innerHTML == "1000") {
        console.log("1000")
        clearInterval(myVar)
        myVar = (setInterval(createMonster, 1500));
    } else if (scoreCount.innerHTML == "2000") {
        console.log("2000")
        clearInterval(myVar)
        myVar = (setInterval(createMonster, 1000));
    }
}
//פונקציה לשינוי השיר
function changeMusic() {
    if (musicChange == false) {
        gameSong.pause();
        gameSong.src = ('../audio/waving.mp3');
        gameSong.play();
        musicChange = true;
    } else {
        gameSong.src = ('../audio/start-game-song.mpeg')
        gameSong.play();
        musicChange = false;
    }
}
//פונקציה לשינוי הרקע
function changeBackground() {
    if (backgroundChange == false) {
        let background = document.querySelector('#main-play-area')
        background.style.backgroundImage = "url('../pictures/game/background2.jpg')";
        backgroundChange = true;
    } else {
        let background = document.querySelector('#main-play-area')
        background.style.backgroundImage = "url('../pictures/game/DD-Space-Background-44012-Preview.jpg')";
        backgroundChange = false;
    }

}
//פונקציה לסיום המשחק

function gameOver() {
    window.removeEventListener("keydown", ShipFly)
    gameSong.pause();
    clearInterval(myVar)
   
    let gameOverSound = new Audio('../audio/game-over-sound.mp3')
    gameOverSound.play();
    let monsters = document.querySelectorAll(".monster")
    monsters.forEach(monster => monster.remove())
    let lasers = document.querySelectorAll(".laser")
    lasers.forEach(laser => laser.remove())
    setTimeout(() => {
        alert(`Game-Over!!! Final Score: ${scoreCount.innerHTML}\n Time-Played Minutes: ${Timerminutes.innerHTML} Seconds: ${Timersecond.innerHTML}`)
        startButton.style.display = "block"
        shooter.style.top = "180px"
        scoreCount.innerHTML = 0
        clearInterval(TimerInterval)
    }, 1000)

}



//שליטה על החללית
function moveUp() {
    let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
    if (shooter.style.top === "0px")
        return;
    else {
        let position = parseInt(topPosition);
        position -= 20;
        shooter.style.top = `${position}px`;
    }
}

function moveDown() {
    let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
    if (shooter.style.top === "420px")
        return
    else {
        let position = parseInt(topPosition);
        position += 20;
        shooter.style.top = `${position}px`;
    }
}
//פונקציה שבודקת מה המשתמש לחץ
function ShipFly(event) {
    if (event.key === "ArrowUp") {
        event.preventDefault();
        moveUp();
    }
    else if (event.key === "ArrowDown") {
        event.preventDefault();
        moveDown();
    }
    else if (event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}
mainPlayArea = document.getElementById('main-play-area')

function fireLaser() {
    var laser = createLaserElement();
    mainPlayArea.appendChild(laser);
    let laserSound = new Audio('../audio/bullet_whizzing.mp3')
    laserSound.play();
    moveLaser(laser);
}

function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = './pictures/game/laser-shot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 20}px`;
    return newLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left)
        let monsters = document.querySelectorAll(".monster")
        monsters.forEach(monster => {
            if (checkLaserColl(laser, monster)) {
                monster.src = './pictures/game/explosion.png';
                monster.classList.remove('monster')
                monster.classList.add("dead-monster");
                laser.remove();
                scoreCount.innerHTML = parseInt(scoreCount.innerHTML) + 100
                speedMonster();
            }
        })
        if (xPosition >= 620) {
            laser.style.display = 'none';
            laser.remove();
            clearInterval(laserInterval);
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10)


}

const monsterImgs = ['./pictures/game/fish-monster.png', './pictures/game/dragon-monster.png'];

function createMonster() {
    let newMonster = document.createElement('img')
    let monsterSpriteImg = monsterImgs[Math.floor(Math.random() * monsterImgs.length)]
    newMonster.src = monsterSpriteImg
    newMonster.classList.add('monster')
    newMonster.classList.add('monster-transition')
    newMonster.style.left = '780px';
    newMonster.style.top = `${Math.floor(Math.random() * 420) + 20}px`
    mainPlayArea.appendChild(newMonster)
    moveMonster(newMonster)
}

function moveMonster(monster) {
    let moveMonsterInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(monster).getPropertyValue('left'))
        if (xPosition <= 90) {
            if (Array.from(monster.classList).includes("dead-monster")) {
                monster.remove()
            } else {
                gameOver();
            }

        } else {
            monster.style.left = `${xPosition - 4}px`
        }
    }, 30)
}

function checkLaserColl(laser, monster) {
    let laserLeft = parseInt(laser.style.left)
    let laserTop = parseInt(laser.style.top)
    let monsterTop = parseInt(monster.style.top)
    let monsterLeft = parseInt(monster.style.left)
    let monsterBootom = parseInt(monsterTop - 60);
    if (laserLeft + 20 >= monsterLeft && laserLeft < 750) {
        if (laserTop <= monsterTop && laserTop >= monsterBootom) {
            return true;
        } else {
            return false;
        }

    } else {
        return false;
    }

}




