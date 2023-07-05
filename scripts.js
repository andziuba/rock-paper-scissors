function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) {
        return -1;
    }
    else if (playerSelection == "rock") {
        if (computerSelection == "scissors") {
            return 1;
        }
        else {
            return 0;
        }
    }
    else if (playerSelection == "paper") {
        if (computerSelection == "rock") {
            return 1;
        }
        else {
            return 0;
        }
    }
    else if (playerSelection == "scissors") {
        if (computerSelection == "paper") {
            return 1;
        }
        else {
            return 0;
        }
    }
}

function gameResult(playerWins, computerWins) {
    console.log(`Player: ${playerWins}, Computer: ${computerWins}`);
    if (playerWins == computerWins) {
        console.log("It's a tie.");
    }
    else if (playerWins > computerWins) {
        console.log("Player wins.");
    }
    else {
        console.log("Computer wins.");
    }
}

function game() {
    let playerWins = 0;
    let computerWins = 0;

    for (let i = 0; i < 5; i++) {
        let playerSelection = prompt().toLowerCase();
        let computerSelection = getComputerChoice();
        let result = playRound(playerSelection, computerSelection);
        console.log(result);
        if (result == 1) {
            playerWins += 1;
        }
        else if (result == 0) {
            computerWins += 1;
        }
    }
    
    gameResult(playerWins, computerWins);
}

game();
