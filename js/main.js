import { makeApiCall } from "./render/renderGames.js";
import { updateCartItemCount } from "./functions/cart.js";
import { searchItem } from "./modules/elementGenerator.js";
const search = document.querySelector("#search");
const searchResults = document.querySelector("#search-results");
let listOfGames = await makeApiCall();
updateCartItemCount();


search.addEventListener("input" , function() {
    searchResults.innerHTML = "";
    let sValue = search.value.toLowerCase();
    if (sValue.length > 0) {
        searchResults.classList.add("results");
        listOfGames.forEach(el => {
            if (el.title.toLowerCase().substr(0,sValue.length) === sValue) {
                let gameTitle = document.createElement("div");
                gameTitle.classList.add("search-card");
                gameTitle.innerHTML = searchItem(el);
                searchResults.append(gameTitle);
            }
        })
    } else {
        searchResults.classList.remove("results");
    }
})
