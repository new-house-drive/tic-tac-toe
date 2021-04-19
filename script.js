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

        if(!player2) {
            alert('Not ready yet! :(')
            return;
        }
         
        let ticTacToe = document.createElement('div');
        ticTacToe.classList.add('tic-tac-toe');
        let counter = 1;
        for (let c = 0; c < 9; c++) {
            let cell = document.createElement('button');
            cell.classList.add('tic-tac-toe-cell');
            cell.id = 'cell' + counter;
            counter++;
            ticTacToe.appendChild(cell);
        }
        container.appendChild(ticTacToe)

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

