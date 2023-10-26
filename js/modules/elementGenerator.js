import { sortByTitle , sortByPrice } from "./sortData.js";
export let searchItem = (data) => {
    return `
    <div class ="search-image"style="background-image: url(${data.images[0].src})"></div>
    <div class="search-info">
        <h3>${data.name}</h3>
        <div class="row">
            ${createPrice(data)}
        </div>
    </div>
    <a href="/games/template.html?id=${data.id}&title=${data.name}">view</a>
    `
}
export let createPrice = (data) => {
    const sPrice = data.prices.sale_price;
    const rPrice = data.prices.regular_price;
    if (data.on_sale) {
        return `
            <p class="price">${data.prices.currency_symbol}${sPrice.slice(0, sPrice.length-data.prices.currency_minor_unit)}${data.prices.currency_decimal_separator}${sPrice.slice(sPrice.length - data.prices.currency_minor_unit)}</p>
            <p class="old-price">${data.prices.currency_symbol}${rPrice.slice(0, rPrice.length-data.prices.currency_minor_unit)}${data.prices.currency_decimal_separator}${sPrice.slice(sPrice.length - data.prices.currency_minor_unit)}</p>
            `;
    } else {
        return `
        <p class="price">${data.prices.currency_symbol}${sPrice.slice(0, sPrice.length-data.prices.currency_minor_unit)}${data.prices.currency_decimal_separator}${sPrice.slice(sPrice.length - data.prices.currency_minor_unit)}</p>
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
    const homeHero = document.querySelector(".home-hero");
    const carouselWrapper = document.querySelector(".carousel-wrapper");
    homeHero.style.backgroundImage = "url(" + el.images[0].src + ")";
    carouselWrapper.setAttribute("href", "../games/template.html?id=" + el.id + "&title=" + el.title);
    carouselWrapper.innerHTML = `
    <div class="carousel-text">
        <h3>${el.name}</h3>
        <p>${el.description}</p>
    </div>
    <div>
        ${createPrice(el)}
    </div>
    `
}
export function createSalePromotion() {
    const dayNames = ["SUNDAY", "MONDAY", "TUESDAY" , "WEDNESDAY" , "THURSDAY" , "FRIDAY" , "SATURDAY"];
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const dayToday = document.querySelector("#today-day");
    dayToday.innerHTML = dayNames[currentDay];
    const hours = document.querySelector("#hours");
    const minutes = document.querySelector("#minutes");
    const seconds = document.querySelector("#seconds");
    const hoursLeft = 23-currentDate.getHours();
    const minutesLeft = 60-currentDate.getMinutes();
    const secondsLeft = 60-currentDate.getSeconds();
    hours.textContent = hoursLeft.toString().padStart(2,"0");
    minutes.textContent = minutesLeft.toString().padStart(2,"0");
    seconds.textContent = secondsLeft.toString().padStart(2,"0");
}
export function createSellItem(el) {
    const sellItem = document.createElement("div");
    sellItem.innerHTML = `
    <a class="sale-image"
    style="background-image: url(${el.images[0].src})"
    href="games/template.html?id=${el.id}">
    </a>
    <div class="sale-tag">
        <p>${discountPercent(el.prices.regular_price, el.prices.sale_price)}%</p>
    </div>
    `
    return sellItem;
}
let discountPercent = (price , newPrice) => {
    return (((price - newPrice)*100)/price).toFixed(0)
}

export function createPageElements(data) {
    const allCheckboxes = document.querySelectorAll(".choose-category input");
    var someData = data;
    if (localStorage.getItem("genre") === null) {
        reloadPage(someData);
    } else {
        initialisePage(someData);
    }

    /*
    reloads the page when any checkbox is changed
    */

    for(let i=0 ; i < allCheckboxes.length ; i++) {
        allCheckboxes[i].addEventListener("change", function() {
            reloadPage(someData);      
        })
    }
    
    const sort = document.querySelector("#sort-by");
    sort.addEventListener("change" , (event) => {
        switch (event.target.value) {
            case "price-lh":
                someData = sortByPrice(data).reverse();
                break;
            case "price-hl":
                someData = sortByPrice(data);
                break;
            case "name-az":
                someData = sortByTitle(data);
                break;
            case "name-za":
                someData = sortByTitle(data).reverse();
                break;
            default:
                someData = data;
                break;
        }
        reloadPage(someData);
    })
}

function initialisePage(data) {
    const genre = localStorage.getItem("genre");
    const allCheckboxes = document.querySelectorAll(".choose-category input");
    for (let i=0 ; i < allCheckboxes.length ; i++) {
        if(genre === allCheckboxes[i].id) {
            allCheckboxes[i].checked = true;
            localStorage.removeItem("genre");
            reloadPage(data);
        } else {
            continue;
        }
    }
}

function reloadPage(data) {
    const container = document.querySelector(".game-list");
    container.innerHTML = "";
    const genreCheckboxes = document.getElementsByName("category");
    var genreList = [];
    for (let i = 0; i < genreCheckboxes.length; i++) {
        if (genreCheckboxes[i].checked) {
            genreList.push(genreCheckboxes[i].id);
        }
    }
    let checker = (arr , target) => target.every(v => arr.includes(v));
    for (let i = 0; i < data.length; i++) {
        if(checker([data[i].categories[0].name.toLowerCase()] , genreList) && saleStatus(data[i].on_sale)) {
            createGameCard(data[i]);
        }
    }
    if (container.innerHTML === "") {
        container.innerHTML = "<p>no matches</p>"
    }
}

function saleStatus(onSale) {
    const salesCheckbox = document.getElementById("on-sale");
    if (!salesCheckbox.checked) {
        return true;
    } else {
        return (onSale);
    }
}

export function createRowElements(data) {
    data.forEach((element) => {
        createGameCard(element);
    });
}
export function createGameCard(el) {

    const container = document.querySelector(".game-list");
    const card = document.createElement("a");

    card.setAttribute("class", "game-container " + el.categories[0].name.toLowerCase());
    card.href = "../../games/template.html?id=" + el.id + "&title=" + el.name;
    card.innerHTML = `<h3>${el.name}</h3>
   <div class="game-container_image" style="background-image: url(${el.images[0].src})"></div>
   <div class=game-container_background>
    <div class= "game-container_console">
        <img src="${"../../images/playbox_logo.jpg"}" alt="for playbox"></img>
        ${getRating(el)}
    </div>
   </div>
   <div class="game-container_discount">${createPrice(el)}</div>`;
    container.append(card);
}

function getRating(el) {
    const starRating = document.createElement("div");
    for ( let i= 0 ; i < 5 ; i++){
        const star = document.createElement("i");
        star.className ="fas fa-star";
        starRating.append(star);
    }
    starRating.append("(0)")
    return `<i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    (0)`;
}


