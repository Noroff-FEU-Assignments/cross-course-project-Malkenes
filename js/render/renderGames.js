import { createBackground, createPricetag } from "../functions/createElement.js";
const url = "https://api.noroff.dev/api/v1/gamehub"

export async function makeApiCall() {
    try {
        const response = await fetch(url);

        const result = await response.json();

        for (let i = 0; i < result.length; i++) {
            createGameCard(result[i]);
        }
        //createGameCard(result);
        //renderImage(imageUrl);
    } catch(error) {
        console.log(error);
    }
}

export function renderImage(thing) {

    const imageElement = document.createElement("img");
    imageElement.src = thing.image;

    //const container = document.getElementById("testing");
    //container.appendChild(imageElement);
    return imageElement;
}

export function createGameCard(thing) {
    const container = document.querySelector(".game-list");
    const card = document.createElement("a");
    card.setAttribute("class", "game-container");
    card.href = "../../games/template.html?id=" + thing.id;

    card.innerHTML = `<h3>${thing.title}</h3>`;
    const background = createBackground();
    console.log(background);

    console.log(thing.title);
    //card.innerHTML = `<h3>${thing.title}</h3>
    //<div class = game-container_background></div>`;
    const imageElement = document.createElement("img");
    imageElement.src = thing.image;
    const imageContainer = document.createElement("div");
    imageContainer.setAttribute("class", "game-container_image");
    imageContainer.appendChild(imageElement);
    card.appendChild(imageContainer);
    card.append(background);
    const priceTag = createPricetag(thing);
    card.append(priceTag);

    console.log(container);
    console.log(card);

    container.append(card);
}

export async function filterGames() {
    try {
        const response = await fetch(url);

        const result = await response.json();


        for (let i = 0 ; i < result.length ; i++) {
            if (result[i].genre === "Sports") {
                createGameCard(result[i]);
            }
            else {
                continue
            }
                
        }

    } catch(error) {
        console.log(error)
    }
}

const categorys = document.querySelector(".filter");

export async function categoryList() {
    try {
        const response = await fetch(url);
        const result = await response.json();
        const arrayList = new Array();

        for (let i = 0 ; i < result.length ; i++) {
            const genre = result[i].genre;
            //const category = document.createElement("input");
            //category.id = genre;
            //category.setAttribute("type", "checkbox");
            //category.innerHTML = `<span>
            //<label for "${genre}">${genre}</label>
            //</span>
            //`
            //categorys.append(category);
            if (!arrayList.includes(genre)) {
                arrayList.push(genre);
            }
            else {
                continue;
            }
        }
        console.log(arrayList);
        for (let i = 0 ; i < arrayList.length ; i++) {
            const genre = arrayList[i];
            const categories = document.createElement("label");
            categories.innerHTML = `
            <input type="checkbox">${genre}</input>
            `
            //categories.addEventListener("change");
            categorys.append(categories);
        }
    } catch(error) {
        console.log(error)
    }
}