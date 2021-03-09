const selectBox = document.querySelector('.selectBox');
const selectBtnX = selectBox.querySelector('.playerX');
const selectBtnO = selectBox.querySelector('.playerO');
const playBoard = document.querySelector('.playBoard');
const allBox = playBoard.querySelectorAll('section span');
const players = playBoard.querySelector('.players');
const resultBox = document.querySelector('.resultBox');
const wonText = resultBox.querySelector('.wonText');
const replay = resultBox.querySelector('.btn button');

let playerIconX = 'fas fa-times';
let playerIconO = 'far fa-circle';
let playerSign = 'X';
let runBot = true;

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");    
    }

    selectBtnX.onclick = () => {
        selectBox.classList.add('hide');
        playBoard.classList.add('show');
    }
    selectBtnO.onclick = () => {
        selectBox.classList.add('hide');
        playBoard.classList.add('show');
        players.setAttribute("class", "players active player");
    }
}

const clickedBox = (element) => {
    if (players.classList.contains('player')) {
        element.innerHTML = `<i class="${playerIconO}"></i>`;
        players.classList.add('active');
        playerSign = 'O';
        element.setAttribute('id', playerSign); 
    } else {
        element.innerHTML = `<i class="${playerIconX}"></i>`;
        players.classList.add('active');
        playerSign = 'X';
        element.setAttribute('id', playerSign);
    }

    selectWinner();
    players.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    let randowDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout (() => {
        bot(runBot);
    }, randowDelayTime);
}

const bot = (runBot) => {
    if (runBot) {
        playerSign = 'O';
        let array = [];
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                array.push(i);
            }
        }

        let randomBox = array[Math.floor(Math.random() * array.length)];
        
        if (array.length > 0) {
            if (players.classList.contains('player')) {
                allBox[randomBox].innerHTML = `<i class="${playerIconX}"></i>`;
                players.classList.remove('active');
                playerSign = 'X';
                allBox[randomBox].setAttribute('id', playerSign);
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerIconO}"></i>`;
                players.classList.remove('active');
                allBox[randomBox].setAttribute('id', playerSign);
            }
            selectWinner();
        }

        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
    }
}

const getClass = (idname) => {
    return document.querySelector('.box' + idname).id;
}

const checkTreeClasses = (val1, val2, val3, sign) => {
    if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
        return true;
    }
}

const selectWinner = () => {
    if (checkTreeClasses(1,2,3,playerSign) || checkTreeClasses(4,5,6,playerSign) || checkTreeClasses(7,8,9,playerSign) || checkTreeClasses(1,4,7,playerSign) || checkTreeClasses(2,5,8,playerSign) || checkTreeClasses(3,6,9,playerSign) || checkTreeClasses(1,5,9,playerSign) || checkTreeClasses(3,5,7,playerSign)) {
        runBot = false;
        bot(runBot);
        setTimeout (() => {
            playBoard.classList.remove('show');
            resultBox.classList.add('show');
        }, 700);

        let winningPlayer = (playerSign == 'O') ? `Player <i class="${playerIconO}"></i> won the game` : `Player <i class="${playerIconX}"></i> won the game`;
        wonText.innerHTML = winningPlayer;

    } else {
        if (getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "") {
            runBot = false;
            bot(runBot);
            setTimeout (() => {
                playBoard.classList.remove('show');
                resultBox.classList.add('show');
            }, 700);

            wonText.textContent = 'Match has been drawn!';
        }
    }
}

replay.onclick = () => {
    window.location.reload();
}