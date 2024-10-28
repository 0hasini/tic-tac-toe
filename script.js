let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-game");
let newBtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [3, 4, 5],
    [1, 4, 7],
    [6, 7, 8],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// newBtn.adddEventListener("click", () =>{
//     box.disabled = false
// });

boxes.forEach((box)=> {
    box.addEventListener("click", () => {
        if(turn0 === true){
           box.innerText = "O";
            turn0 = false;
        }
        else{
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const reset = () =>{
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const showWinner = (win) => {
    msgContainer.classList.remove("hide");
    msg.innerText = `Winner is ${win}`;
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}



resetBtn.addEventListener("click", reset);

const checkWinner = () =>{
    for(let pattern of winPatterns){
        let par1 = boxes[pattern[0]].innerText;
        let par2 = boxes[pattern[1]].innerText;
        let par3 = boxes[pattern[2]].innerText;
        if((par1 !== "" && par2 !== "") && par3 !== ""){
            if(par1==par2 && par2==par3){
                console.log(par1);
                let win = par1;
                disableBoxes();
                showWinner(win);
            }
        }
    }
}
