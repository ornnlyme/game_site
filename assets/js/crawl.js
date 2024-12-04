const get_games = function () {
    // Select the parent element sprunki.com
    let parentElement = document.querySelector('.game-preloader-image');
    let sourceElement = parentElement?.querySelector('source');
    let imgElement = parentElement?.querySelector('img');
    const avif_game_preloader_image = sourceElement?.getAttribute('srcset');
    const fallback_game_preloader_icon_image = imgElement?.getAttribute('src');

    parentElement = document.querySelector('.gameInfo');
    sourceElement = parentElement?.querySelector('source');
    imgElement = parentElement?.querySelector('img');
    let h2Element = parentElement?.querySelector('h2');
    const avif_icon_image = sourceElement?.getAttribute('srcset');
    const fallback_icon_image = imgElement?.getAttribute('src');
    const gameName = h2Element.innerHTML

    let iframeElement = document.querySelector('#gameframe');
    const gameUrl = iframeElement.getAttribute('data-src')

    const gameId = window.location.href.split('/')[4]

    return {
        id: gameId,
        name: gameName,
        avif_game_preloader_image: avif_game_preloader_image,
        fallback_game_preloader_icon_image: fallback_game_preloader_icon_image,
        avif_icon_image: avif_icon_image,
        fallback_icon_image: fallback_icon_image,
        game_url: gameUrl,
    }
}

const get_games_org = function () {
    // sprunki.org
    // Select the parent element
    const wgThumbDiv = document.querySelector('.wgThumb div');
    const backgroundStyle = wgThumbDiv.style.backgroundImage;
    const fallback_game_preloader_icon_image = backgroundStyle.match(/url\("?(.+?)"?\)/)?.[1];
    const gameName = document.querySelector('.wgTitle').innerHTML;

    let iframeElement = document.querySelector('.game-iframe');
    const url = new URL(window.location.href);
    const baseUrl = url.origin;
    const gameUrl = iframeElement.getAttribute('src')

    const gameId = window.location.href.split('/')[3]

    return {
        id: gameId,
        name: gameName,
        avif_game_preloader_image: undefined,
        fallback_game_preloader_icon_image: fallback_game_preloader_icon_image,
        avif_icon_image: undefined,
        fallback_icon_image: undefined,
        game_url: baseUrl + gameUrl,
    }
}