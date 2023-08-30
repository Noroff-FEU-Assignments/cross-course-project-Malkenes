import { createPricetag } from "./functions/createElement.js";

const gameDescription = document.querySelector(".description");
const additionInformation = document.querySelector(".additional_information")

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const gamesId = params.get("id");
//console.log(gamesId);
const url = "https://api.noroff.dev/api/v1/gamehub/" + gamesId;

async function getGameData() {
    try {
        const response = await fetch(url);

        const result = await response.json();
        console.log(result);
        createHtml(result);
    } catch(error) {
        console.log(error);
    }
}
getGameData();


function createHtml(data) {

    const gameCover = document.querySelector("#cover");
    gameCover.src = data.image;
    
    gameDescription.innerHTML = 
    `<h1>${data.title}</h1>
    <h2>${data.description}</h2>
    <a href="../checkout.html" class="button">Add to cart</a>
    <div class= "test"></div>
    <div class="tags">
        <p>${data.genre}</p>
    </div>
    `
    const price = document.querySelector(".test")
    price.append(createPricetag(data));

    additionInformation.innerHTML = `
    <div>
        <h2>Parental advisory</h2>
        <p>${data.ageRating}</p>
      </div>
      <div>
        <h2>System requirments</h2>
        <p>Playbox</p>
      </div>
      <div>
        <h2>Additional information</h2>
        <p>Release date: ${data.released}</p>
        <p>developer:</p>
      </div>
    `
}