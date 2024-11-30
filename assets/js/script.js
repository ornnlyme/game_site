function goFullscreen(id) {
    var element = document.getElementById(id);

    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Check for iPad or PC
    const isIPadOrPC = /iPad|Macintosh/i.test(navigator.userAgent) || (!/iPhone|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent));
    const isMobile = /iPhone|Android/i.test(navigator.userAgent) && !/iPad|Macintosh/i.test(navigator.userAgent);

    if (isMobile) {
        // Mobile logic (iPhone, Android, excluding iPad)
        const gameSection = document.querySelector('.game-mobile');
        const gameContainer = document.getElementById('the-game');
        const exitButton = gameContainer.querySelector('.hide-game-btn');
        let iframe;

        // Function to request fullscreen mode
        function requestFullScreen(element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }

        // Function to detect when fullscreen mode changes
        function handleFullscreenChange() {
            if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                if (iframe) {
                    iframe.remove();
                    iframe = null;
                }
                gameSection.classList.remove('game-active');
                gameSection.classList.add('game-passive');
            }
        }

        window.startGame = function () {
            if (!iframe) {
                iframe = document.createElement('iframe');
                iframe.onload = function () {
                    gameLoadedMobile();
                };
                iframe.id = 'gamingFrame';
                iframe.src = 'https://wowtbc.net/sprunkin/sprunki-original/index.html';
                iframe.width = '100%';
                iframe.height = '100%';
                iframe.scrolling = 'none';
                iframe.frameBorder = '0';
                iframe.setAttribute('webkitallowfullscreen', 'webkitallowfullscreen');
                iframe.setAttribute('mozallowfullscreen', 'mozallowfullscreen');
                iframe.setAttribute('allowfullscreen', 'allowfullscreen');
                iframe.style.position = 'absolute';
                iframe.style.top = '0';
                iframe.style.left = '0';
                iframe.style.zIndex = '5';

                gameContainer.appendChild(iframe);
            }

            gameSection.classList.remove('game-passive');
            gameSection.classList.add('game-active');

            requestFullScreen(gameSection);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        exitButton.addEventListener('click', function () {
            gameSection.classList.remove('game-active');
            gameSection.classList.add('game-passive');

            if (iframe) {
                iframe.remove();
                iframe = null;
            }

            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        });
    } else if (isIPadOrPC) {
        // iPad and PC logic
        window.startGame = function () {
            // Hide the game preloader
            const gamePreloader = document.querySelector('.game-preloader');
            if (gamePreloader) {
                gamePreloader.style.display = 'none';
            }

            // Add the 'expanded' class to make the game container expand
            const homeGame = document.querySelector('.home-game');
            if (homeGame) {
                homeGame.classList.add('expanded');
            }

            // Delay setting the game iframe source until after the animation completes (1 second)
            setTimeout(() => {
                const gameFrame = document.querySelector('#gameframe');
                if (gameFrame) {
                    gameFrame.style.display = 'initial';
                    gameFrame.src = gameFrame.getAttribute('data-src');
                }
            }, 1000); // Delay for 1 second to match the CSS transition duration
        };
    }
});