import { makeApiCall } from "./render/renderGames.js";
import { updateCartItemCount } from "./functions/cart.js";
import { searchItem , createCarousel , createSalePromotion, createSellItem} from "./modules/elementGenerator.js";
import { sortByDateNew , sortByTitle , sortByPrice , sortOnSale } from "./modules/sortData.js";
import { signIn , register , submitDeliveryForm , submitBillingForm , toggleCollapse , verticalToggleCollapse} from "./modules/formValidation.js";
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

/* index */
const carouselContainer = document.querySelector(".carousel-wrapper");
if (carouselContainer) {
    createCarousel(sortByDateNew(listOfGames).slice(0,4));
}

const salesPromotion = document.querySelector(".sales");
if (salesPromotion) {
    createSalePromotion();
    salesPromotion.addEventListener("click", function(){
        localStorage.setItem("genre", "on-sale");
        document.location.href = "../browse_games.html";
    })
    sortOnSale(listOfGames).slice(0,4).forEach(el => {
        salesPromotion.append(createSellItem(el));
    })
}

const browseByCategory = document.querySelectorAll(".category li");
if (browseByCategory) {
    browseByCategory.forEach(el => {
        el.addEventListener("click", function(){
        localStorage.setItem("genre", el.id);
        document.location.href = "../browse_games.html";
        })
    })   
}

/* */

const signInForm = document.querySelector("#sign-in-form");
if (signInForm) {
    signInForm.addEventListener("submit" , signIn);
    const signInToggle = document.querySelector("#sign-in-toggle");
    if (signInToggle) {
        signInToggle.addEventListener("click" , function() {
            toggleCollapse(signInForm);
        });
    }
    const signInToggleVertical = document.querySelector("#sign-in-btn");
    if (signInToggleVertical) {
        signInToggleVertical.addEventListener("click" , verticalToggleCollapse);
    }
}

const registerForm = document.querySelector("#register-form");
if (registerForm) {
    registerForm.addEventListener("submit" , register);
    const signInToggleVertical = document.querySelector("#register-btn");
    if (signInToggleVertical) {
        signInToggleVertical.addEventListener("click" , verticalToggleCollapse)  
    }
}

const deliveryForm = document.querySelector("#delivery-form");
if (deliveryForm) {
    deliveryForm.addEventListener("submit" , submitDeliveryForm);
    const deliveryToggle = document.querySelector("#deliveryToggle");
    deliveryToggle.addEventListener("click" , function() {
        toggleCollapse(deliveryForm);
    });

}

const billingForm = document.querySelector("#billing-form");
if (billingForm) {
    billingForm.addEventListener("submit" , submitBillingForm);
    const billingToggle = document.querySelector("#billing-toggle");
    billingToggle.style.display = "none";
    billingToggle.addEventListener("click" , function() {
    toggleCollapse(billingForm);
    });
}

