import { makeApiCall, renderImage, createGameCard, filterGames, categoryList, createCarousel } from "./render/renderGames.js";
import { getChecked, sportsFilter, reloadPage } from "./functions/filterGames.js";
//categoryList();
//makeApiCall();
//createGameCard();
//getChecked();
//filterGames();

//const filterSubmit = document.querySelector(".filter-games");
//filterSubmit.action = "../test.html"
//console.log(filterSubmit);
//sportsFilter();

const loadingIndicator = document.querySelector("#loading-indicator")
async function createPageElements() {
    try {
        const container = document.querySelector(".game-list");
        const apiData = await makeApiCall();
        if (container) {
            //container.innerHTML = "";
            apiData.forEach(createGameCard);
        } else {
            console.log("bueno");
        }
        //loadingIndicator.innerHTML = ""
        createCarousel(apiData);
    } catch (error) {
        console.log(error)
    }
}
const genre = localStorage.getItem("genre");
const allCheckboxes = document.getElementsByTagName("input");
for (let i=0 ; i < allCheckboxes.length ; i++) {
    if(genre === allCheckboxes[i].id) {
        console.log(allCheckboxes[i]);
    }
}
for(let i=0 ; i < allCheckboxes.length ; i++) {
    allCheckboxes[i].addEventListener("change", reloadPage)
}
//localStorage.clear();
createPageElements();