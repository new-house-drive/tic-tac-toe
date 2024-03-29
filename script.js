'use strict';
const Gameboard = (function(){
    let container = document.querySelector('.gameboard');

    const _addUI = () => {
        
        let gameUI = document.createElement('div');
        gameUI.classList.add('game-ui');

        /** Number of players */

        let playersLabel = document.createElement('label');
        playersLabel.innerText = 'Players: ';

        gameUI.appendChild(playersLabel);

        let singlePlayerLabel = document.createElement('label');
        singlePlayerLabel.innerText = '1';

        let singlePlayer = document.createElement('input');
        singlePlayer.setAttribute('type', 'radio');
        singlePlayer.setAttribute('name', 'playersInput');
        singlePlayer.id = 'rOnePlayer';
        singlePlayer.onclick = _hidePlayerTwo;
        
        gameUI.appendChild(singlePlayerLabel);
        gameUI.appendChild(singlePlayer);


        let twoPlayersLabel = document.createElement('label');
        twoPlayersLabel.innerText = '2';

        let twoPlayers = document.createElement('input');
        twoPlayers.setAttribute('type', 'radio');
        twoPlayers.setAttribute('name', 'playersInput');
        twoPlayers.id = 'rTwoPlayers';
        twoPlayers.checked = true;
        twoPlayers.onclick = _displayPlayerTwo;

        gameUI.appendChild(twoPlayersLabel);
        gameUI.appendChild(twoPlayers);

        


        /** Player name */
        
        let playerNameLabel = document.createElement('label');
        playerNameLabel.innerText = 'Player:';
        playerNameLabel.classList.add('game-ui-player-name-label');
        gameUI.appendChild(playerNameLabel);

        let playerNameInput = document.createElement('input');
        playerNameInput.classList.add('game-ui-player-name');
        playerNameInput.setAttribute('maxlength', 12);
        playerNameInput.id = 'player-one-name-input';
        gameUI.appendChild(playerNameInput);

        let playerTwoNameLabel = document.createElement('label');
        playerTwoNameLabel.innerText = 'Player II:';
        playerTwoNameLabel.classList.add('game-ui-player-name-label');
        playerTwoNameLabel.id = 'player-two-label';

        let playerTwoNameInput = document.createElement('input');
        
        playerTwoNameInput.setAttribute('maxlength', 12);
        playerTwoNameInput.classList.add('game-ui-player-name');
        playerTwoNameInput.id = 'player-two-name-input';


        gameUI.appendChild(playerTwoNameLabel);
        gameUI.appendChild(playerTwoNameInput);

        /* weapons */
        
        let weaponLabel = document.createElement('label');
        weaponLabel.innerText = 'Weapon:';
        weaponLabel.id = 'weapon-label';

        let weaponX = document.createElement('label');
        weaponX.innerText = 'X';

        let weaponXInput = document.createElement('input');
        weaponXInput.setAttribute('type', 'radio');
        weaponXInput.setAttribute('name', 'weaponInput');
        weaponXInput.checked = true;
        weaponXInput.id = 'rWeaponX';
        
        gameUI.appendChild(weaponLabel)
        gameUI.appendChild(weaponX);
        gameUI.appendChild(weaponXInput); 

        let weaponO = document.createElement('label');       
        weaponO.innerText = 'O';

        let weaponOInput = document.createElement('input');
        weaponOInput.setAttribute('type', 'radio');
        weaponOInput.setAttribute('name', 'weaponInput');
        weaponOInput.id = 'rWeaponO';

        gameUI.appendChild(weaponO);
        gameUI.appendChild(weaponOInput);


        gameUI.childNodes.forEach(element => {
            element.classList.add('game-ui-cell');
        });


        /* new game button */ 

        let startNewGame = document.createElement('button');
        startNewGame.classList.add('game-ui-new-game');
        startNewGame.innerText = 'New Game!';
        startNewGame.onclick = _startNewGame;
        gameUI.appendChild(startNewGame);


        container.appendChild(gameUI);
    }

    const _create =  (player1, player2) => {

        /** STATUS BAR */
        let statusBar = document.createElement('div');
        statusBar.classList.add('gameboard-status-bar');
        container.appendChild(statusBar);

        /** TIC TAC TOE  */
        let ticTacToe = document.createElement('div');
        ticTacToe.classList.add('tic-tac-toe');
        
        for (let c = 0; c < 9; c++) {
            let cell = document.createElement('button');
            cell.classList.add('tic-tac-toe-cell');
            ticTacToe.appendChild(cell);
        }
        container.appendChild(ticTacToe)

        /* RESTART GAME BUTTON */
        let restartGame = document.createElement('button');
        restartGame.classList.add('restart-game-button');
        restartGame.innerText = 'Restart';
        restartGame.onclick = setDefault;

        container.appendChild(restartGame);

        /** EXTRACTED VARIABLES */
        let gameCells = Array.from(document.querySelectorAll('.tic-tac-toe-cell'));



        if(!player2) {
            alert('Not ready yet! :(');
            setDefault();
            return;
        }

        /** 2 PLAYERS ARE PLAYING THE GAME  */

        let currentPlayer = player1;
        if (currentPlayer.getWeapon() == 'O') currentPlayer = player2;

        statusBar.innerText = `Current player: ${currentPlayer.getName()}(${currentPlayer.getWeapon()})`; 

        for (let cell of gameCells) {
            cell.onclick = () => {
                _сhangeButtonAppearance(cell, currentPlayer);
                let combination = _getWinCombination();
                if (combination) {
                    _endTheGame(combination, currentPlayer.getName());
                    return;
                }
                currentPlayer = _newCurrentPlayer(player1, player2, currentPlayer);
                _updateStatusBar(currentPlayer);
            }
        } 

    }

    const _endTheGame = (winCombination, winner) => {
        let selectedCells = Array.from(document.querySelector('.tic-tac-toe').childNodes);
        for (let button of selectedCells) button.disabled = true;

        let statusBar = document.querySelector('.gameboard-status-bar');


        /** IF DRAW */
        if (winCombination === true) {
            statusBar.innerText = `It\'s a Draw! The winner is friendship! ^__^`;
            for (let button of selectedCells) button.className = 'tic-tac-toe-cell-game-over';
            return;
        }
        
        /** IF ONE OF THE PLAYERS IS WINNER */
        statusBar.innerText = `${winner} won! Congratulations!`;

        let winCells = winCombination.split('');
        for (let c of winCells) {
            let winCell = selectedCells[c];
            winCell.className = 'tic-tac-toe-cell-game-over';            
        }
        
    }

    const _getWinCombination = () => {
        let selectedCells = Array.from(document.querySelector('.tic-tac-toe').childNodes);
        
        
        
        /***  +++ 0 1 2
         *    --- 3 4 5
         *    --- 6 7 8
        */
        if (checkWinConditions(selectedCells[0], selectedCells[1], selectedCells[2])) return '012';
        
        /***  --- 0 1 2
         *    +++ 3 4 5
         *    --- 6 7 8
        */
        if (checkWinConditions(selectedCells[3], selectedCells[4], selectedCells[5])) return '345';
        
        /***  --- 0 1 2
         *    --- 3 4 5
         *    +++ 6 7 8
        */
        if (checkWinConditions(selectedCells[6], selectedCells[7], selectedCells[8])) return '678';
        
        /***  +-- 0 1 2
         *    +-- 3 4 5
         *    +-- 6 7 8
        */
        if (checkWinConditions(selectedCells[0], selectedCells[3], selectedCells[6])) return '036';
        
        /***  -+- 0 1 2
         *    -+- 3 4 5
         *    -+- 6 7 8
        */
        if (checkWinConditions(selectedCells[1], selectedCells[4], selectedCells[7])) return '147';
        
        /***  --+ 0 1 2
         *    --+ 3 4 5
         *    --+ 6 7 8
        */
        if (checkWinConditions(selectedCells[2], selectedCells[5], selectedCells[8])) return '258';
        
        /***  +-- 0 1 2
         *    -+- 3 4 5
         *    --+ 6 7 8
        */
        if (checkWinConditions(selectedCells[0], selectedCells[4], selectedCells[8])) return '048';
        
        /***  --+ 0 1 2
         *    -+- 3 4 5
         *    +-- 6 7 8
        */
        if (checkWinConditions(selectedCells[2], selectedCells[4], selectedCells[6])) return '246';

        if (!document.querySelector('.tic-tac-toe-cell')) return true;

        return false;
    }

    const checkWinConditions = (cell1, cell2, cell3) => {
        if (cell1.className == 'tic-tac-toe-cell') return false;
        if (cell2.className == 'tic-tac-toe-cell') return false;
        if (cell3.className == 'tic-tac-toe-cell') return false;

        if (cell1.innerText == cell2.innerText && cell1.innerText == cell3.innerText) return true;
    }

    const _сhangeButtonAppearance = (cell, currentPlayer) => {
        
        /** CHANGE THE BUTTON */
        cell.disabled = 'true';
        cell.innerText = currentPlayer.getWeapon();
        cell.className = 'tic-tac-toe-cell-selected';

        /** Rewrite the color of Os for better UI */
        if (currentPlayer.getWeapon() === 'O') {
            cell.className = 'tic-tac-toe-cell-selected-O';
        }
        let body = document.querySelector('body');
        body.style.backgroundColor = _getRandomGreenColor();
        setTimeout(() => {body.style.backgroundColor = 'black'}, 300);


    }

    const _newCurrentPlayer = (player1, player2, currentPlayer) => {
        return player1 === currentPlayer ? player2 : player1;
    }

    const _updateStatusBar = (currentPlayer) => {
        console.log(currentPlayer.getName());
        console.log(currentPlayer.getWeapon());
        let statusBar = document.querySelector('.gameboard-status-bar');
        statusBar.innerText = `Current player: ${currentPlayer.getName()}(${currentPlayer.getWeapon()})`; 
    }


    const _getRandomGreenColor = () => {
        let r = Math.floor(Math.random() * 50);
        let g = 100;
        let b = Math.floor(Math.random() * 50);

        let a = 0.9;

        return `rgba(${r},${g},${b}, ${a})`;
    }

    const _displayPlayerTwo = () => {
        let xLabel = document.getElementById('player-two-label');
        xLabel.style.display = 'inherit';
        let xInput = document.getElementById('player-two-name-input');
        xInput.style.display = "inherit";

        let xWeaponLabel = document.getElementById('weapon-label');
        xWeaponLabel.innerText = '1st Weapon:';

    }

    const _hidePlayerTwo = () => {
        let xLabel = document.getElementById('player-two-label');
        xLabel.style.display = 'none';
        let xInput = document.getElementById('player-two-name-input');
        xInput.style.display = "none";
        xInput.innerText = '';
        let xWeaponLabel = document.getElementById('weapon-label');
        xWeaponLabel.innerText = 'Weapon:'
    }
 

    const _startNewGame = () => {
        let xPlayers = _checkPlayers();
        let playerName = document.getElementById('player-one-name-input').value;
        if (!playerName) {
            alert('Please enter your name :D');
            return;
        }

        let gameUI = document.querySelector('.game-ui');
        let playerWeapon = _getWeapon();
        let playerOne = Player(playerName, playerWeapon);

        gameUI.classList.add('game-ui-dissappeating');

        if (xPlayers == '1') {
            setTimeout(() => {      
                gameUI.style.display = 'none';
                _create(playerOne);
                }, 200)
            return;
        }

        let playerTwoName = document.getElementById('player-two-name-input').value;
        let playerTwoWeapon = _getSecondWeapon(playerOne.getWeapon());
        let playerTwo = Player(playerTwoName, playerTwoWeapon);

        setTimeout(()=> {
            gameUI.style.display = 'none';
            _create(playerOne, playerTwo);
        }, 200)
    

    }

    const _getWeapon = () => {
        let playerChoice = document.getElementById('rWeaponX');
        return playerChoice.checked ? 'X': 'O'; 
    }

    const _getSecondWeapon = (first_weapon) =>  {
        return first_weapon == 'X' ? 'O': 'X';
    }

    const _checkPlayers = () => {
        let isOnePlayer = document.getElementById('rOnePlayer').checked;
        return isOnePlayer? '1': '2';
    }

    const setDefault = () => {
        let container = document.querySelector('.gameboard');
        container.innerHTML = '';
        _addUI();
    }

    return {
        setDefault
    }
})();




const Player = (name, weapon) => {
    const getName = () => { return name; }
    const getWeapon = () => { return weapon}
    return {
        getName,
        getWeapon
    }
}


const Module = (function() {
    Gameboard.setDefault();
})();

