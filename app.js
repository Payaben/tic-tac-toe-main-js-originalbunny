const gameBoard = document.querySelector('.game__board');
const messageTurn = document.querySelector('.game__turn');
const endGame = document.querySelector('.endgame');
const endGameResult = document.querySelector('.endgame__result');
const buttonReset = document.querySelector('.endgame__button');
// selecciona los elementos span para mostrar el contador
const scoreXElement = document.querySelector(".game__score-x");
const scoreOElement = document.querySelector(".game__score-o");
const scoreTieElementtable = document.querySelector(".game__table tbody tr .game__score-tie");
const scoreTieElement = document.querySelector(".game__score-tie");
// selecciona el elemento botón por su clase
const boton = document.querySelector(".boton");

// crea las variables globales para el contador de victorias
let isTurnX = true;
let turn = 0;
let maxTurn = 9;
let scoreX = 0;
let scoreO = 0;
let scoreTie = 0;
let players = {
    x: 'cross',
    o: 'circle'
}
const winningPosition = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
]

startGame();


function startGame(){
    createBoard();
    messageTurn.textContent = isTurnX ? 'X' : 'O';
    isTurnX = true;
    turn = 0;
    endGame.classList.remove('show');
}

// registra una función que se ejecutará cuando se haga clic en el botón
boton.addEventListener("click", function() {
    // refresca la página
    location.reload ();
  });

function createBoard(){
    const cells = 9;

    while(gameBoard.firstElementChild){
        gameBoard.firstElementChild.remove();
    }

    for (let i = 0; i < cells; i++) {
        const div = document.createElement('div');
    
        div.classList.add('cell');
        div.addEventListener('click', handleGame , {once:true});

        gameBoard.append(div);
    }
}

function handleGame(e){
    const currentCell = e.currentTarget;
    const currentTurn = isTurnX ? players.x : players.o;
    
    turn++;
    drawShape(currentCell, currentTurn);

    if(checkWinner(currentTurn)){
        return;
    }

    if(turn === maxTurn){
        showEndGame(false);
    }

    changeTurn();
}

function drawShape(element, newClass){
    element.classList.add(newClass);
}

function changeTurn(){
    isTurnX = !isTurnX;
    messageTurn.textContent = isTurnX ? 'X' : 'O';
}

function checkWinner(currentPlayer){
    const cells = document.querySelectorAll('.cell');

    const winner = winningPosition.some(array =>{
        
        return array.every(position =>{
            
            return cells[position].classList.contains(currentPlayer);

        });

    });

    if(!winner){
        return;
    }

    updateScore(currentPlayer); // llama a la función updateScore con el jugador ganador
    showEndGame(true);
    return true;
}

function showEndGame(winner){
    endGame.classList.add('show');

    if(winner){
        endGameResult.textContent = `¡${isTurnX ? "X" : "O"} ha ganado el juego!`;

    }else{
        endGameResult.textContent = `¡El juego se ha empatado!`;
        scoreTie++;
        scoreTieElement.textContent = scoreTie;
        scoreTieElementtable.textContent = scoreTie;
        return;
    }

}

buttonReset.addEventListener('click', startGame);

// actualiza el contador cada vez que se declare un ganador
function updateScore(currentPlayer){
    const score = currentPlayer === players.x ? scoreXElement : scoreOElement;
    
    if(currentPlayer === players.x){
        scoreX++;
        document.querySelector('.game__table tbody tr td:first-child span').textContent = scoreX;
        score.textContent = scoreX; // muestra el contador en el elemento span de la tabla
    } else {
        scoreO++;
        document.querySelector('.game__table tbody tr .game__score-o').textContent = scoreO;
        score.textContent = scoreO; // muestra el contador en el elemento span de la tabla
    }
}
