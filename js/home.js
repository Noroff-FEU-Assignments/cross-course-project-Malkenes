import { makeApiCall, showLoadingIndicator, sortByDate , errorMessage } from "./render/renderGames.js";
import { createPricetag } from "./functions/createElement.js";

const container = document.querySelector(".carousel-wrapper");

async function renderCarousel() {
    try {
        showLoadingIndicator(container);
        const apiData = await makeApiCall();
        sortByDate(apiData);
        container.innerHTML = "";
        createCarousel(apiData);
    } catch(error) {
        console.log(error);
        errorMessage(container);
    }
}

function createCarousel(data) {
    var i = 0;
    var carouselItem = data[i];
    createCarouselItem(carouselItem);
    const optionPrevious = document.getElementById("previous");
    const optionNext = document.getElementById("next");
    

    optionNext.onclick = function() {
        if (i < data.length -1) {
            i = i + 1;
        } else {
            i = 0;
        }
        carouselItem = data[i];
        createCarouselItem(carouselItem);
    }

    optionPrevious.onclick = function () {
        if (i > 0) {
            i = i - 1;
        } else {
            i = data.length - 1;
        }
        carouselItem = data[i];
        createCarouselItem(carouselItem);
    }
}
function createCarouselItem(el) {
    const carouselWrapper = document.querySelector(".carousel-wrapper");
    carouselWrapper.innerHTML = "";
    carouselWrapper.setAttribute("href" , "../games/template.html?id=" + el.id + "&title=" + el.title)
    let gameTitle = document.createElement("h3");
    gameTitle.textContent = el.title;
    let gameDescription = document.createElement("p");
    gameDescription.textContent = el.description;
    let gamePriceTag = createPricetag(el);
    carouselWrapper.style.backgroundImage = "url(" + el.image + ")";
    carouselWrapper.appendChild(gameTitle);
    carouselWrapper.appendChild(gameDescription);
    carouselWrapper.appendChild(gamePriceTag);
}


const salesPromotion = document.querySelector(".sales");
salesPromotion.addEventListener("click", function(){
    localStorage.setItem("genre", "on-sale");
    document.location.href = "../browse_games.html";
})

const browseByCategory = document.querySelectorAll(".category li");
for(let i = 0 ; i < browseByCategory.length ; i++) {
    browseByCategory[i].addEventListener("click", function(){
    localStorage.setItem("genre", browseByCategory[i].id);
    document.location.href = "../browse_games.html";
})}
renderCarousel();