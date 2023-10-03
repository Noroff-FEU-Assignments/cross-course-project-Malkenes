import { createPricetag } from "../functions/createElement.js";

export let searchItem = (data) => {
    return `
    <div class ="search-image"style="background-image: url(${data.image})"></div>
    <div class="search-info">
        <h3>${data.title}</h3>
        <div class="row">
            ${createPrice(data)}
        </div>
    </div>
    <a href="/games/template.html?id=${data.id}">view</a>
    `
}
export let createPrice = (data) => {
    if (data.onSale) {
        return `
            <p class="price">$${data.discountedPrice}</p>
            <p class="old-price">$${data.price}</p>
            `;
    } else {
        return `
        <p class= "price">$${data.price}</p>
        `;
    }
};

export function createCarousel(data) {
    let i = 0;
    let intervalID = null;
    const carouselNav = document.querySelector(".carousel-navbar");
    data.forEach((element) => {
        carouselNav.append(createCarouselItem(element));
    
    });
    const boxes = document.querySelectorAll(".box");
    const overlays = document.querySelectorAll(".overlay");
    boxes.forEach((box , index) => {
        box.addEventListener("click" , function() {
            overlays[i].classList.remove("active");
            i = index;
            overlays[i].classList.add("active");
            createMainItem(data[i]);
            clearInterval(intervalID);
            setTimeout(startInterval, 6000)
        })
    })

    function onNext() {
        overlays[i].classList.remove("active");     
        i = (i+1) % data.length; 
        overlays[i].classList.add("active");  
        createMainItem(data[i]);
    }
    function startInterval() {
        intervalID = setInterval(onNext,3000);
    }
    createMainItem(data[i]);
    overlays[i].classList.add("active");
    startInterval();
}
function createCarouselItem(el) {
   const carouselItem = document.createElement("div");
   carouselItem.classList.add("box");
   carouselItem.innerHTML =`
    <div class="overlay"></div>`;
   return carouselItem;
}
function createMainItem(el) {
    const carouselWrapper = document.querySelector(".carousel-wrapper");
    carouselWrapper.style.backgroundImage = "url(" + el.image + ")";
    carouselWrapper.setAttribute("href", "../games/template.html?id=" + el.id + "&title=" + el.title);
    carouselWrapper.innerHTML = `
    <div class="carousel-text">
        <h3>${el.title}</h3>
        <p>${el.description}</p>
    </div>
    <div>
        ${createPrice(el)}
    </div>
    `
}

