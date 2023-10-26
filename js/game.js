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
const url = "https://dev.malke.no/wp-json/wc/store/products/" + gamesId;

async function getGameData() {
    try {
        const response = await fetch(url);

        const result = await response.json();
        gameDescription.innerHTML = "";
        createHtml(result);
    } catch(error) {
        console.log(error);
    }
}


function createHtml(data) {
  const imageContainer = document.querySelector(".product_images");
  imageContainer.innerHTML = `<img src="${data.images[0].src}"></img>`

  const options = document.getElementsByName("buy-sell");
  options.forEach((option) => {
    option.addEventListener("change" , (event) => {
      if (option.value === "buy-option") {
        gameDescription.innerHTML = `
        <h1>${data.name}</h1>
        <h2>${data.description}</h2>
        <div class="price-tag">${createPrice(data)}</div>
        <button class="button">Add to cart</button>
        <div class="tags">
          <p>${data.categories[0].name}</p>
        </div>
        `
        addToCart(data);  
      } else {
        gameDescription.innerHTML = `
        <h1>${data.name}</h1>
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
  <h1>${data.name}</h1>
  <h2>${data.description}</h2>
  <div class="price-tag">${createPrice(data)}</div>
  <button class="button">Add to cart</button>
  <div class="tags">
    <p>${data.categories[0].name}</p>
  </div>
  `
  additionInformation.innerHTML = `
  <div>
    <h2>Parental advisory</h2>
    <p>${getAttribute(data,3)}</p>
  </div>
  <div>
    <h2>System requirments</h2>
    <p>Playbox</p>
  </div>
  <div>
    <h2>Additional information</h2>
    <p>Release date: ${getAttribute(data,2)}</p>
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
  let sellPrice = ((data.prices.price/100)*percent).toFixed(0);
  
  return `<p class="price">${data.prices.currency_symbol}${sellPrice.slice(0, sellPrice.length-data.prices.currency_minor_unit)}${data.prices.currency_decimal_separator}${sellPrice.slice(sellPrice.length - data.prices.currency_minor_unit)}</p>`  
}

let getAttribute = (data , id) => {
  /* find id for attribute from the api*/
  const attribute = data.attributes.find(item => item.id === id);
  return attribute.terms[0].name;
}
