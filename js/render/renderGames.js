import { createBackground, createPricetag , createImageElement} from "../functions/createElement.js";
const url = "https://api.noroff.dev/api/v1/gamehub"


export async function makeApiCall() {
    try {
        const response = await fetch(url);

        const result = await response.json();
    
        return result;

    } catch(error) {
        console.log(error);
    }
}

export function createGameCard(el) {
    const container = document.querySelector(".game-list");
    const card = document.createElement("a");
    card.setAttribute("class", "game-container " + el.genre.toLowerCase());
    card.href = "../../games/template.html?id=" + el.id + "&title=" + el.title;

    card.innerHTML = `<h3>${el.title}</h3>`;
    const background = createBackground();
    const imageContainer = createImageElement(el.image);
    const priceTag = createPricetag(el);

    card.append(imageContainer);
    card.append(background);
    card.append(priceTag);

    container.append(card);
}

export function showLoadingIndicator(el) {
    el.innerHTML = `<div id="loading-indicator"></div>`
}

export function errorMessage(el) {
    el.innerHTML = `<p class="error-message">COULD NOT FETCH DATA<p>`
}