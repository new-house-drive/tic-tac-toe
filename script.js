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

        console.log(twoPlayers.select);

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

        let currentPlayer = player1;


        if(!player2) {
            alert('Not ready yet! :(');
            return;
        }


        /** 2 PLAYERS ARE PLAYING THE GAME  */


        /** status bar */
        let statusBar = document.createElement('div');
        statusBar.classList.add('gameboard-status-bar');
        statusBar.innerText = `Current player: ${currentPlayer.getName()}(${currentPlayer.getWeapon()})`; 
        container.appendChild(statusBar);

        /** Tic tac toe ELEMENTS */
        let ticTacToe = document.createElement('div');
        ticTacToe.classList.add('tic-tac-toe');
        
        let counter = 1;
        for (let c = 0; c < 9; c++) {
            let cell = document.createElement('button');
            cell.classList.add('tic-tac-toe-cell');
            cell.id = 'cell' + counter;
            
            /** GAME LOGIC */
            cell.onclick = () => {
                _tttCellEventListener(cell, currentPlayer);
                currentPlayer = _newCurrentPlayer(player1, player2, currentPlayer)
            }

            counter++;
            ticTacToe.appendChild(cell);
        }

        container.appendChild(ticTacToe)

    }

    const _isGameOver = () => {
        selectedCells = document.querySelectorAll('tic-tac-toe-cell-selected');
        
    }

    const _tttCellEventListener = (cell, currentPlayer) => {
        let name = currentPlayer.getName();
        let weapon = currentPlayer.getWeapon();
        /** CHANGE STATUS BAR */
        let statusBar = document.querySelector('.gameboard-status-bar');
        statusBar.innerText = `Current player: ${name}(${weapon})`;
        
        /** CHANGE THE BUTTON */
        cell.disabled = 'true';
        cell.innerText = weapon;
        cell.className = 'tic-tac-toe-cell-selected';

        /** Rewrite the color of Os for better UI */
        if (weapon === 'O') {
            cell.style.backgroundColor = "rgb(173, 255, 173)"; /*Light green color */
            cell.style.color = "rgb(1, 3, 1)";
        }

        let body = document.querySelector('body');
        body.style.backgroundColor = _getRandomGreenColor();
        setTimeout(() => {body.style.backgroundColor = 'black'}, 300);


    }

    const _newCurrentPlayer = (player1, player2, currentPlayer) => {
        return player1 == currentPlayer ? player2 : player1;
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

        let playerTwoName = document.getElementById('player-one-name-input').value;
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
        return first_weapon == 'X' ? 'O' : 'X';
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
})()




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

