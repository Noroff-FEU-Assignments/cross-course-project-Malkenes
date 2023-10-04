import { showLoadingIndicator , errorMessage} from "./render/renderGames.js";
import { createPrice } from "./modules/elementGenerator.js";
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
  const imageContainer = document.querySelector(".product_images");
  imageContainer.innerHTML = `<img src="${data.image}"></img>`

  const options = document.getElementsByName("buy-sell");
  options.forEach((option) => {
    option.addEventListener("change" , (event) => {
      if (option.value === "buy-option") {
        gameDescription.innerHTML = `
        <h1>${data.title}</h1>
        <h2>${data.description}</h2>
        <div class="game-container_discount">${createPrice(data)}</div>
        <button class="button">Add to cart</button>
        <div class="tags">
          <p>${data.genre}</p>
        </div>
        `
        addToCart(data);  
      } else {
        gameDescription.innerHTML = `
        <h1>${data.title}</h1>
        <div>
          <h2>New condition get up to:</h2>
          ${getSellPrice(data,50)}
        </div>
        <div>
          <h2>Used condition get up to:</h2>
          ${getSellPrice(data,30)}
        </div>
        <button class="button">Sell now</button>
        `
      }
    })
  })
  
  gameDescription.innerHTML = `
  <h1>${data.title}</h1>
  <h2>${data.description}</h2>
  <div class="game-container_discount">${createPrice(data)}</div>
  <button class="button">Add to cart</button>
  <div class="tags">
    <p>${data.genre}</p>
  </div>
  `
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
  addToCart(data);
}

getGameData();

function addToCart(data) {
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

function getSellPrice(data , percent) {
  let sellPrice = 0;
  if (data.onSale) {
    sellPrice = (data.discountedPrice/100)*percent;
  } else {
    sellPrice = (data.price/100)*percent;
  }
  return `<p class="price">$${sellPrice.toFixed(2)}</p>`
}
