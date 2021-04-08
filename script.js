'use strict';
const Gameboard = (function(){
    let container = document.querySelector('.gameboard');

    const addUI = () => {
        let gameUI = document.createElement('div');
        gameUI.classList.add('game-ui');

        let weaponInput = document.createElement('input');
        weaponInput.setAttribute('type', 'radio');
        weaponInput.setAttribute('name', 'weaponInput');
        gameUI.appendChild(weaponInput) 

        

        container.appendChild(gameUI);
    }
    
    const create =  () => {
        let ticTacToe = document.createElement('div');
        ticTacToe.classList.add('tic-tac-toe');
        for (let c = 0; c < 9; c++) {
            let cell = document.createElement('button');
            cell.classList.add('tic-tac-toe-cell');
            ticTacToe.appendChild(cell);
        }
        container.appendChild(ticTacToe)

    }

    return {
        addUI,
        create
    }
})()




const Player = (name, weapon) => {
    const sayMyName = `I am ${name} and I play with ${weapon}!`
    return {
        sayMyName
    }
}


const Module = (function() {
    Gameboard.addUI();
    Gameboard.create();
})();

