function resetGame() {
    // remove "Try Again" button
    const container = document.querySelector(".container");
    const tryAgainButton = document.querySelector(".try-again");
    container.removeChild(tryAgainButton);
    
    const message = document.querySelector(".message");
    message.textContent = "Make a choice to start the game";

    document.getElementById("player-icon").src="./icons/question-mark.svg";
    document.getElementById("computer-icon").src="./icons/question-mark.svg";

    playerWins = 0;
    computerWins = 0;
    updateResult(playerWins, computerWins);
    
    // enable buttons
    const buttons = document.querySelectorAll(".choices");
    buttons.forEach((button) => {
        button.addEventListener("click", handleClick);
        button.disabled = false;
    });
}

function gameResult(playerWins, computerWins) {
    // add "Try Again" button
    const container = document.querySelector(".container");
    const referenceNode = document.querySelector(".result");
    const tryAgainButton = document.createElement("button");
    tryAgainButton.classList.add("try-again");
    tryAgainButton.textContent = "Try Again";
    tryAgainButton.addEventListener("click", resetGame); 

    container.insertBefore(tryAgainButton, referenceNode);
    
    const message = document.querySelector(".message");
    if (playerWins === computerWins) message.textContent = "It's a tie!";
    else if (playerWins > computerWins) message.textContent = "You win!";
    else message.textContent = "Computer wins!";

    // disable buttons
    const buttons = document.querySelectorAll(".choices");
    buttons.forEach((button) => {
        button.removeEventListener("click", handleClick);
        button.disabled = true;
    })
}

function updateResult(playerWins, computerWins) {
    let playerCurrentResult = document.querySelector(".player .counter");
    playerCurrentResult.textContent = playerWins;
    let computerCurrentResult = document.querySelector(".computer .counter");
    computerCurrentResult.textContent = computerWins;
}

function updateMessage(result) {
    const message = document.querySelector(".message");
    if (result === -1) message.textContent = "It's a tie in this round";
    else if (result === 1) message.textContent = "You win in this round";
    else message.textContent = "Computer wins in this round";
}

function updateIcon(playerSelection, computerSelection) {
    document.getElementById("player-icon").src=`./icons/${playerSelection}.svg`;
    document.getElementById("computer-icon").src=`./icons/${computerSelection}.svg`;
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

const buttons = document.querySelectorAll(".choices");
buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});
