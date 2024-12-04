import {games} from './games.js';

const init_game = function () {
    if (window.location.href.split('?').length < 2) {
        return;
    }
    const game_id = window.location.href.split('?')[1]
    const game = games.find(game => game.id === game_id);
    if (!game) {
        return;
    }

    document.getElementById("fallback_game_preloader_image").src = game.image
    document.getElementById("fallback_icon_image").src = game.image
    document.getElementById("gameframe").setAttribute("data-src", game.url)
    document.getElementById("gameframe").setAttribute("src", game.url)
    document.getElementById("game-description").innerHTML = game.description
    const gameNameClasses = document.getElementsByClassName("game-name")
    for (let gameNameClass of gameNameClasses) {
        gameNameClass.innerHTML = game.name
    }
    document.getElementById("game-vote").innerHTML = (Math.random() * (1000) + 200).toFixed(0);
}

init_game()

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let game_id = ""
    if (window.location.href.split('?').length >= 2) {
        game_id = window.location.href.split('?')[1]
    }

    const gamesList = document.getElementById("sidebar-games-list");
    if (!gamesList) {
        return;
    }
    const promoted_games = games.filter(game => game.id !== game_id);
    shuffle(promoted_games);
    for (let i = 0; i < 18; i++) {
        const promoted_game = promoted_games[i];
        const gameHtml = `
                        <li>
                            <a href="game.html?${promoted_game.id}" class="as-game-box as-related-game">
                                <div class="as-related-resize">
                                    <picture>
                                        <img alt="${promoted_game.name}" class="game-image" src="${promoted_game.image}">
                                    </picture>
                                </div>
                                <span class="as-game-box-title as-related-title">${promoted_game.name}</span>
                            </a>
                        </li>
                    `;
        gamesList.insertAdjacentHTML("beforeend", gameHtml);
    }

});
