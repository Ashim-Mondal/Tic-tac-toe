let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;

let turn0 = true;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turn0 = true;
  enableboxes();
  msgContainer.classList.add("hide");
};

const disableboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (Winner) => {
  msg.innerText = `Congratulation, Winner is ${Winner}`;
  msgContainer.classList.remove("hide");
  disableboxes();
};

const draw = () => {
  if (count === 9) {
    msg.innerText = "The match is Draw";
    msgContainer.classList.remove("hide");
    count = 0;
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
      box.classList.add("colorO");
    } else {
      box.innerText = "X";
      turn0 = true;
      box.classList.add("colorX");
    }
    box.disabled = true;
    count++;
    checkWinner();
  });
});

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;
    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
      } else {
        draw();
      }
    }
  }
};

newgamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
