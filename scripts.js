const buttons = document.querySelectorAll(".choices");
const container = document.querySelector(".container");
const message = document.querySelector(".message");
const referenceNode = document.querySelector(".result");
const playerIcon = document.getElementById("player-icon");
const computerIcon = document.getElementById("computer-icon");
const tryAgainButton = document.querySelector(".try-again");
tryAgainButton.classList.add("try-again");
tryAgainButton.textContent = "Try Again";

function resetGame() {
    // remove "Try Again" button
    container.removeChild(tryAgainButton);
    message.textContent = "Make a choice to start the game";

    playerIcon.src="./icons/question-mark.svg";
    computerIcon.src="./icons/question-mark.svg";

    playerWins = 0;
    computerWins = 0;
    updateResult(playerWins, computerWins);
    
    // enable buttons
    buttons.forEach((button) => {
        button.addEventListener("click", handleClick);
        button.disabled = false;
    });
}

function gameResult(playerWins, computerWins) {
    // add "Try Again" button
    tryAgainButton.addEventListener("click", resetGame); 
    container.insertBefore(tryAgainButton, referenceNode);
    
    if (playerWins === computerWins) message.textContent = "It's a tie!";
    else if (playerWins > computerWins) message.textContent = "You win!";
    else message.textContent = "Computer wins!";

    // disable buttons
    buttons.forEach((button) => {
        button.removeEventListener("click", handleClick);
        button.disabled = true;
    })
}

function updateResult(playerWins, computerWins) {
    let playerCounter = document.querySelector(".player .counter");
    let computerCounter = document.querySelector(".computer .counter");
    playerCounter.textContent = playerWins;
    computerCounter.textContent = computerWins;
}

function updateMessage(result) {
    if (result === -1) message.textContent = "It's a tie in this round";
    else if (result === 1) message.textContent = "You win in this round";
    else message.textContent = "Computer wins in this round";
}

function updateIcon(playerSelection, computerSelection) {
    playerIcon.src=`./icons/${playerSelection}.svg`;
    computerIcon.src=`./icons/${computerSelection}.svg`;
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) return -1;
    else if (playerSelection === "rock") {
        if (computerSelection === "scissors") return 1;
        else return 0;
    }
    else if (playerSelection === "paper") {
        if (computerSelection === "rock") return 1;
        else return 0;
    }
    else if (playerSelection === "scissors") {
        if (computerSelection === "paper") return 1;
        else return 0;
    }
}

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function handleClick(e) {
    let playerSelection = e.target.getAttribute("id");
    let computerSelection = getComputerChoice();

    let result = playRound(playerSelection, computerSelection);

    if (result === 1) playerWins += 1;
    else if (result === 0) computerWins += 1;

    updateIcon(playerSelection, computerSelection);
    updateMessage(result);
    updateResult(playerWins, computerWins);
    
    // if player of computer wins 5 rounds, game ends
    if (playerWins === 5 || computerWins === 5) gameResult(playerWins, computerWins);
}


let playerWins = 0;
let computerWins = 0;
updateResult(playerWins, computerWins);

buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});
