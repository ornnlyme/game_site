// import { games } from './games.js';

let pinGame = games[Math.floor(Math.random() * games.length)]
if (!pinGame) {
    pinGame = games[0]
}

const showPinGame = function () {
    document.getElementById('pin-game-image').src = pinGame.image
    document.getElementById('pin-game-logo').src = pinGame.image
    document.getElementById('pin-game-name').innerHTML = pinGame.name
    document.getElementById('gameframe').setAttribute("data-src", pinGame.url)
    document.getElementById('gameframe').setAttribute("src", pinGame.url)
}


const showGames = function () {
    const gameGrid = document.getElementsByClassName("games-grid")
    if (gameGrid.length == 0) {
        return;
    }
    const promoted_games = games.filter(game => game.id !== pinGame.id);
    for (let game of promoted_games) {
        const gameDiv = document.createElement('div');
        const classes = "col__1qiUz col-1-1-2-3-3-4-5__2oaS1";
        const randomNum = (Math.random() * (5.0 - 1.0) + 1.0).toFixed(1);
        gameDiv.classList.add(...classes.split(" "))
        const html = `<div class="gameWrapper__1Ln90" data-gamecode="">
                <a href="game.html?${game.id}"> <!-- Single anchor tag starts -->
                    <div class="offscreenWrapper">
                        <div class="gameTile__3amEb hoverAnimation__2bJt5">
                            <div class="aspectRatio__157MR">
                                <div class="tileWrapper__3MQtd onClickHandler__I86J3">
                                    <picture>
                                        <img alt="${game.name}"
                                             class="image__1TzIZ wp-post-image" src="${game.image}">
                                    </picture>
                                </div>
                            </div>
                        </div>
                        <div class="banner__3jjHP">
                            <span class="link__2M5Vp gameName__31gZM">${game.name}</span>
                            <div class="gameplayIcon">
                                <svg aria-hidden="true" class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06"
                                     data-testid="SportsEsportsOutlinedIcon" focusable="false" viewBox="0 0 24 24">
                                    <path d="m21.58 16.09-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91zm-2.1.72c-.08.09-.21.19-.42.19-.15 0-.29-.06-.39-.16L15.83 14H8.17l-2.84 2.84c-.1.1-.24.16-.39.16-.21 0-.34-.1-.42-.19-.08-.09-.16-.23-.13-.44l1.09-7.66C5.63 7.74 6.48 7 7.47 7h9.06c.99 0 1.84.74 1.98 1.72l1.09 7.66c.03.2-.05.34-.12.43z"></path>
                                    <path d="M9 8H8v2H6v1h2v2h1v-2h2v-1H9z"></path>
                                    <circle cx="17" cy="12" r="1"></circle>
                                    <circle cx="15" cy="9" r="1"></circle>
                                </svg>
                                <span class="gameplayText">${randomNum}M</span>
                            </div>
                        </div>
                    </div>
                </a> <!-- Single anchor tag ends -->
            </div>`
        gameDiv.innerHTML = html;
        gameGrid[0].appendChild(gameDiv);
    }
}
showPinGame()
showGames()