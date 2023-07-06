function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
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

function resetGame() {
    const container = document.querySelector(".results-container");
    const gameResult = container.getElementsByClassName("game-result");
    while (gameResult[0]) {
        gameResult[0].parentNode.removeChild(gameResult[0]);
    }
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
    const container = document.querySelector(".results-container");
    const finalResult = document.createElement("div");
    finalResult.classList.add("game-result");
    const tryAgainButton = document.createElement("button");
    tryAgainButton.classList.add("game-result");
    
    if (playerWins === computerWins) finalResult.textContent = "It's a tie!";
    else if (playerWins > computerWins) finalResult.textContent = "You win!";
    else finalResult.textContent = "Computer wins!";

    tryAgainButton.textContent = "Try Again";
    tryAgainButton.addEventListener("click", resetGame); 
        
    container.appendChild(finalResult);
    container.appendChild(tryAgainButton);

    // disable buttons
    const buttons = document.querySelectorAll(".choices");
    buttons.forEach((button) => {
        button.removeEventListener("click", handleClick);
        button.disabled = true;
    })
}

function updateResult(playerWins, computerWins) {
    let divPlayerResult = document.querySelector(".result-player");
    divPlayerResult.textContent = playerWins;
    let divComputerResult = document.querySelector(".result-computer");
    divComputerResult.textContent = computerWins;
}

function handleClick(e) {
    let playerSelection = e.target.getAttribute("id");
    let computerSelection = getComputerChoice();
    let result = playRound(playerSelection, computerSelection);

    if (result === 1) playerWins += 1;
    else if (result === 0) computerWins += 1;

    updateResult(playerWins, computerWins);
    
    if (playerWins === 5 || computerWins === 5) gameResult(playerWins, computerWins);
}


let playerWins = 0;
let computerWins = 0;
updateResult(playerWins, computerWins);

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});
