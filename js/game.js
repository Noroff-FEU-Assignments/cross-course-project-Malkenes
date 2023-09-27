import { showLoadingIndicator , errorMessage} from "./render/renderGames.js";
import { createPricetag } from "./functions/createElement.js";
import { save , load } from "./functions/cart.js";

const gameDescription = document.querySelector(".description");
const additionInformation = document.querySelector(".additional_information")

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const gamesId = params.get("id");
const gameTitle = params.get("title");
const pageTitle = document.getElementById("page-title");
pageTitle.textContent = "Game Hub | " + gameTitle;
const url = "https://api.noroff.dev/api/v1/gamehub/" + gamesId;

async function getGameData() {
    try {
        showLoadingIndicator(gameDescription);
        const response = await fetch(url);

        const result = await response.json();
        gameDescription.innerHTML = "";
        createHtml(result);
    } catch(error) {
        console.log(error);
        errorMessage(gameDescription);
    }
}


function createHtml(data) {

    const gameCover = document.querySelector("#cover");
    gameCover.src = data.image;
    
    gameDescription.innerHTML = 
    `<h1>${data.title}</h1>
    <h2>${data.description}</h2>
    <button class="button" 
      data-image=${data.image}
      data-title=${data.title}
      data-price=${data.price}>
      Add to cart
    </button>
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
    const callToAction = document.querySelector(".button");

    callToAction.addEventListener("click", function() {
      let cart = load("cart") || [];
      const gameInCart = cart.find(item => item.data.id === data.id);
      if (gameInCart) {
        gameInCart.quantity++
      } else {
      cart.push({
        data,
        quantity: 1
      });
      }
      save("cart" , cart);
      document.location.href = "../checkout.html";
    });
}


getGameData();
