import { makeApiCall, showLoadingIndicator } from "./render/renderGames.js";
import { createPricetag } from "./functions/createElement.js";

async function renderCarousel() {
    try {
        const container = document.querySelector(".carousel-wrapper");
        showLoadingIndicator(container);
        const apiData = await makeApiCall();
        console.log(container);
        container.innerHTML = "";
        createCarousel(apiData);
    } catch(error) {
        console.log(error);
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
    carouselWrapper.setAttribute("href" , "../games/template.html?id=" + el.id)
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
console.log(salesPromotion);
salesPromotion.addEventListener("click", function(){
    localStorage.setItem("genre", "sales");
    document.location.href = "../test.html";
})
renderCarousel();