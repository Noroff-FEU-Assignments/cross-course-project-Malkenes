import {load, save} from "./functions/cart.js"
import * as validators from "./modules/formValidation.js";
import { emailValidation } from "./modules/formValidation.js";
import { phoneValidation } from "./modules/formValidation.js";
import { zipCodeValidation } from "./modules/formValidation.js";
const container = document.querySelector(".checkout-products");
let totalContainer = document.querySelector("#total");
let shoppingCart = load("cart");

let generateShop = () => {
    return (container.innerHTML = shoppingCart.map((item)=>{
        return `
        <div class="checkout-product" id=${item.data.id}>
            <div class="checkout_image" style="background-image: url(${item.data.image})"></div>
            <h3>${item.data.title}</h3>
            <div class="trash">
                <div class="row">
                    <i class="fas fa-plus" data-id=${item.data.id}></i>
                    <p id=${item.data.title.split(" ").join("")}>${item.quantity}</p>
                    <i class="fas fa-minus" data-id=${item.data.id}></i>
                </div>
                <i class="fas fa-trash" data-id=${item.data.id}></i>
            </div>
            ${createPrice(item.data)}
        </div>
    `
    }).join(""));
}

let createPrice = (data) => {
    if (data.onSale) {
        return `<div class="price-container">
            <p class="price">$${data.discountedPrice}</p>
            <p class="old-price">$${data.price}</p>
            </div>
            <p class="discount">${discountPercent(data.price , data.discountedPrice)}%</p>
            `
            
    } else {
        return `<div class="price-container">
        <p class="price">$${data.price}</p>
        </div>`
    }
}
let discountPercent = (price , newPrice) => {
    return (((price - newPrice)*100)/price).toFixed(2)
}
generateShop();



const increments = document.querySelectorAll(".fa-plus");
increments.forEach((element) => {
    element.addEventListener("click" , function() {
        let selectedItem = element.dataset.id;
        let search = shoppingCart.find(item => item.data.id === selectedItem);
        search.quantity += 1;
        save("cart" , shoppingCart);
        update(selectedItem);
    })
})

const decrements = document.querySelectorAll(".fa-minus");
decrements.forEach((element) => {
    element.addEventListener("click" , function() {
        let selectedItem = element.dataset.id;
        let search = shoppingCart.find(item => item.data.id === selectedItem);
        if (search.quantity === 1) return;
        else {
            search.quantity -= 1;
        }
        save("cart" , shoppingCart);
        update(selectedItem);
    })
})

let trashCans = document.querySelectorAll(".fa-trash")

trashCans.forEach((element) => {
    element.addEventListener("click" , function() {
        let selectedItem = element.dataset.id;
        shoppingCart = shoppingCart.filter(item => item.data.id !== selectedItem);
        save("cart" , shoppingCart);
        let removedItem = document.getElementById(selectedItem);
        removedItem.parentNode.removeChild(removedItem);
        totalPrice();

    })
})
let update = (id) => {
    let search = shoppingCart.find(item => item.data.id === id);
    document.getElementById(search.data.title.split(" ").join("")).innerHTML = search.quantity;
    totalPrice();
}

let totalPrice = () => {
    let price = 0;
    let oldPrice = 0;
    shoppingCart.forEach((element) => {
        if(element.data.onSale) {
            price += element.data.discountedPrice*element.quantity;
            oldPrice += element.data.price*element.quantity;
        } else {
            price += element.data.price*element.quantity;
            oldPrice += element.data.price*element.quantity;
        }
    })
    price = price.toFixed(2);
    oldPrice = oldPrice.toFixed(2);
    if (price < 1) {
        totalContainer.innerHTML = `<div>
        <h3>Cart is empty</h3>
        <a href="browse_games.html">Browse Games</a>
        </div>`;
    } else {
        totalContainer.innerHTML = `
        <h2>TOTAL</h2>
        <div class="price-container">
        <p class="price">$${price}</p>
        <p class="old-price">$${oldPrice}</p>
        </div>
        <p class="discount">${discountPercent(oldPrice , price)}%</p>`
    }
}

totalPrice();

const signInForm = document.querySelector("#sign-in-form");
const deliveryForm = document.querySelector("#delivery-form");
const billingForm = document.querySelector("#billing-form");

const signInToggle = document.querySelector("#sign-in-toggle");
signInToggle.addEventListener("click" , function() {
    signInForm.classList.toggle("collapsed");
})

const deliveryToggle = document.querySelector("#deliveryToggle");
deliveryToggle.addEventListener("click" ,function() {
    deliveryForm.classList.toggle("collapsed");
})

const billingToggle = document.querySelector("#billing-toggle");
billingToggle.style.display = "none";
billingToggle.addEventListener("click" , function() {
    billingForm.classList.toggle("collapsed");
})

signInForm.addEventListener("submit" , (e) => {
    e.preventDefault();
    const email = document.querySelector("#sign-in-email");
    const emailError = document.querySelector
    ("#sign-in-email-error");
    const emailUnregistered = document.querySelector("#email-unregistered");

    const password = document.querySelector("#password");
    const passwordError = document.querySelector("#password-error");

    if (validators.emailValidation(email.value)) {
        emailError.style.display = "none";
        if (email.value === "admin@gmail.com") {
            emailUnregistered.style.display = "none";
            if (password.value === "password") {
                passwordError.style.display = "none";
            } else {
                passwordError.style.display = "block";
            }
            
        } else {
            emailUnregistered.style.display = "block";
            passwordError.style.display = "none";
        }
    } else {
        emailError.style.display = "block";
        passwordError.style.display = "none";
    }
})

deliveryForm.addEventListener("submit" , (e) => {
    e.preventDefault();
    var checklist = 0

    const firstName = document.querySelector("#first-name");
    const firstNameError = document.querySelector("#first-name-error");
    if (stringValidation(firstName.value)) {
        firstNameError.style.display = "none";
        firstName.style.border = "";
        checklist += 1;
    } else {
        firstNameError.style.display = "block";
        firstName.style.border = "solid 2px red";
    }

    const lastName = document.querySelector("#last-name");
    const lastNameError = document.querySelector("#last-name-error");
    if (stringValidation(lastName.value)) {
        lastNameError.style.display = "none";
        checklist += 1;
    } else {
        lastNameError.style.display = "block";
    }

    const email = document.querySelector("#email");
    const emailError = document.querySelector("#email-error");

    if (validators.emailValidation(email.value)) {
        emailError.style.display = "none";
        checklist += 1;
    } else {
        emailError.style.display = "block";
    }

    const phone = document.querySelector("#phone");
    const phoneError = document.querySelector("#phone-error");
    if (validators.phoneValidation(phone.value)) {
        phoneError.style.display = "none";
        checklist += 1;
    } else {
        phoneError.style.display = "block";
    }

    const address = document.querySelector("#address");
    const addressError = document.querySelector("#address-error");
    if (stringValidation(address.value)) {
        addressError.style.display = "none";
        checklist += 1;
    } else {
        addressError.style.display = "block";
    }

    const city = document.querySelector("#city");
    const cityError = document.querySelector("#city-error");
    if (stringValidation(city.value)) {
        cityError.style.display = "none";
        checklist += 1;
    } else {
        cityError.style.display = "block";
    }

    const state = document.querySelector("#state");
    const stateError = document.querySelector("#state-error");
    if (stringValidation(state.value)) {
        stateError.style.display = "none";
        checklist += 1;
    } else {
        stateError.style.display = "block";
    }

    const country = document.querySelector("#country");
    const zipCode = document.querySelector("#zip-code");
    const zipCodeError = document.querySelector("#zip-code-error");
    if (validators.zipCodeValidation(country.value , zipCode.value)) {
        zipCodeError.style.display = "none";
        checklist += 1;
    } else {
        zipCodeError.style.display = "block";
    }
    if (checklist === 8) {
        deliveryForm.classList.toggle("collapsed");
        billingForm.classList.toggle("collapsed");
        billingToggle.style.display = "block";
    }

});

billingForm.addEventListener("submit" , (e) => {
    e.preventDefault();
    var checklist = 0;

    const cardType = document.getElementsByName("card-type");
    let creditCardType = "";
    const paymentMethodError = document.querySelector("#payment-method-error");
    cardType.forEach((el) => {
        if (el.checked) {
            creditCardType = el.value;
        }
    })

    if (creditCardType === "") {
        paymentMethodError.style.display = "block";
    } else {
        paymentMethodError.style.display = "none";
    }

    const cardHolder = document.querySelector("#card-holder");
    const cardHolderError = document.querySelector("#card-holder-error");

    if (stringValidation(cardHolder.value)) {
        cardHolderError.style.display = "none";
        checklist += 1;
    } else {
        cardHolderError.style.display = "block";
    }

    const cardInfo = document.querySelector("#card-info");
    const cardInfoError = document.querySelector("#card-info-error");

    if (validators.cardNumberValidation(creditCardType , cardInfo.value)) {
        cardInfoError.style.display = "none";
        checklist += 1;
    } else {
        cardInfoError.style.display = "block";
    }

    const experationDate = document.querySelector("#experation");
    const experationDateError = document.querySelector("#experation-error");

    if (validators.monthYearValidation(experationDate.value)) {
        experationDateError.style.display = "none";
        checklist += 1;
    } else {
        experationDateError.style.display = "block";
    }

    const cvc = document.querySelector("#cvc");
    const cvcError = document.querySelector("#cvc-error");

    if (validators.cvcValidation(cvc.value)) {
        cvcError.style.display = "none";
        checklist += 1;
    } else {
        cvcError.style.display = "block";
    }

    if (checklist === 4) {
        document.location.href = "../checkout_success.html"
    }
})

let stringValidation = (name) => {
    if (name.trim().length > 2) {
        return true;
    } else {
        return false;
    }
}

