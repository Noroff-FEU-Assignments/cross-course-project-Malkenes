import { createBackground, createPricetag , createImageElement} from "../functions/createElement.js";
const url = "https://api.noroff.dev/api/v1/gamehub"


export async function makeApiCall() {
    try {
        showLoadingIndicator();
        const response = await fetch(url);

        const result = await response.json();
        showLoadingIndicator();
        return result;

    } catch(error) {
        console.log(error);
        errorMessage();
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

export function showLoadingIndicator() {
    const loadingIndicator = document.querySelector("#loading-indicator");
    loadingIndicator.classList.toggle("loading-indicator");
}

export function errorMessage() {
    const loadingIndicator = document.querySelector("#loading-indicator");
    loadingIndicator.classList.remove("loading-indicator");
    loadingIndicator.innerHTML = `<p class="error-message">COULD NOT FETCH DATA<p>`
}