const bigBoard = document.querySelector("#big-board");
const boxes = document.querySelectorAll(".box");
const newBtn = document.querySelector("#new-game");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true;
let activeBoard = -1;
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let wonBoards = [];

const initGame = () => {
    turnO = true;
    activeBoard = -1;
    wonBoards = [];
    msgContainer.classList.add("hide");
    msg.textContent = "";
    boxes.forEach((box) => {
        box.classList.remove("highlighted", "non-clickable");
        box.innerHTML = `<div class="small-board">
            ${Array.from({ length: 9 })
                .map((_, i) => `<div class="small-box clickable" data-index="${i}"></div>`)
                .join("")}
        </div>`;
    });
    attachSmallBoxListeners();
    highlightBoard(-1);
};
const checkSmallBoardWinner = (smallBoxes) => {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;

        const valA = smallBoxes[a].innerText;
        const valB = smallBoxes[b].innerText;
        const valC = smallBoxes[c].innerText;

        if (valA && valA === valB && valA === valC) {
            return valA; 
        }
    }
    return null; 
};

const checkBigBoardWinner = (boxes) => {
    console.log(boxes)
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;

        const boxA = boxes[a];
        const boxB = boxes[b];
        const boxC = boxes[c];

        if (
            boxA!="" &&
            boxB!="" &&
            boxC!="" &&
            boxA === boxB &&
            boxA === boxC
        ) {
            return boxA; 
        }
    }
    return null; 
};


const handleMove = (smallBox, boardIndex) => {
    const currentMark = turnO ? "O" : "X";
    smallBox.innerText = currentMark;
    smallBox.classList.remove("clickable");
    smallBox.classList.add(currentMark);

    const smallBoxes = boxes[boardIndex].querySelectorAll(".small-box");
    const winner = checkSmallBoardWinner(smallBoxes);

    if (winner) {
        boxes[boardIndex].innerHTML = `<div class="winner-mark">${winner}</div>`;
        boxes[boardIndex].classList.add("non-clickable");
        boxes[boardIndex].classList.remove("highlighted");

        wonBoards.push(boardIndex);
        const bigBoardWinner = checkBigBoardWinner(
            Array.from(bigBoard.querySelectorAll(".box")).map((box) => {
                const winnerMark = box.querySelector('.winner-mark');
                return winnerMark ? winnerMark.innerText : ""; 
            })
        );
        console.log("bigBoardOutput ",bigBoardWinner);
        if (bigBoardWinner) {
            showWinner(bigBoardWinner);
            return;
        }
        console.log("call from winner");

        let validBoardIndex = -1;
        const availableBoards = [];

        for (let i = 0; i < boxes.length; i++) {
            if (!wonBoards.includes(i) && !boxes[i].classList.contains("non-clickable")) {
                availableBoards.push(i);
            }
        }

        if (availableBoards.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableBoards.length);
            validBoardIndex = availableBoards[randomIndex];
        }

        activeBoard = validBoardIndex;
        if (activeBoard !== -1) {
            highlightBoard(activeBoard);
        }


    } else {
        activeBoard = parseInt(smallBox.dataset.index);

if (
    boxes[activeBoard] &&
    boxes[activeBoard].classList.contains("non-clickable")
) {
    const availableBoards = [];
    for (let i = 0; i < boxes.length; i++) {
        if (!boxes[i].classList.contains("non-clickable")) {
            availableBoards.push(i);
        }
    }

    if (availableBoards.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableBoards.length);
        activeBoard = availableBoards[randomIndex];
    } else {
        activeBoard = -1; 
    }
}
    highlightBoard(activeBoard);
    }   
    turnO = !turnO;
};

const highlightBoard = (boardIndex) => {
    console.log(wonBoards);
    boxes.forEach((box, index) => {
        if (
            !wonBoards.includes(index) && 
            (boardIndex === -1 || index === boardIndex) &&
            !box.classList.contains("non-clickable")
        ) {
            box.classList.add("highlighted");
        } else {
            box.classList.remove("highlighted");
        }
    });
};

const showWinner = (winner) => {
    msg.textContent = `${winner} wins the game!`;
    msgContainer.classList.remove("hide");
    highlightBoard(-1);
};

const attachSmallBoxListeners = () => {
    boxes.forEach((box, boardIndex) => {
        box.querySelectorAll(".small-box").forEach((smallBox) => {
            smallBox.addEventListener("click", () => {
                if (
                    (activeBoard === -1 || activeBoard === boardIndex) &&
                    smallBox.classList.contains("clickable")
                ) {
                    handleMove(smallBox, boardIndex);
                }
            });
        });
    });
};

newBtn.addEventListener("click", initGame);
initGame();
//Fixed it 😁
