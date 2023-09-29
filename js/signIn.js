import * as validators from "./modules/formValidation.js";
let container = document.querySelector(".sign-in");

let imageContainer = document.querySelector(".picture-slider");
let existingFormContainer = document.querySelector(".existing-account");
let newFormContainer = document.querySelector(".new-account");
const existingAccount = document.querySelector("#switch-back");
const newAccount = document.querySelector("#switch");
existingAccount.addEventListener("click" , function() {
    if (!existingFormContainer.classList.contains("vertical-collapse")) {
        existingFormContainer.classList.add("vertical-collapse");
        newFormContainer.classList.remove("vertical-collapse");
        newAccount.classList.toggle("sign-in_active");
        existingAccount.classList.toggle("sign-in_active");
    }
})

newAccount.addEventListener("click" , function() {
    if (!newFormContainer.classList.contains("vertical-collapse")) {
        existingFormContainer.classList.remove("vertical-collapse");
        newFormContainer.classList.add("vertical-collapse");
        newAccount.classList.toggle("sign-in_active");
        existingAccount.classList.toggle("sign-in_active");
    }
})
const signInForm = document.querySelector(".existing-account")
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
                history.back();
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
const registerForm = document.querySelector(".new-account");
registerForm.addEventListener("submit" , (e) => {
    e.preventDefault();
    var checklist = 0;

    const email = document.querySelector("#new-email")
    const emailError = document.querySelector("#new-email-error");
    if (validators.emailValidation(email.value)) {
        emailError.style.display = "none";
        checklist += 1;
    } else {
        emailError.style.display = "block";
    }

    const password = document.querySelector("#new-password");
    const passwordError = document.querySelector("#new-password-error");
    const repeatPassword = document.querySelector("#repeat-password");
    const repeatPasswordError = document.querySelector("#repeat-password-error");
    if (validators.passwordStrenghtValidation(password.value)) {
        passwordError.style.display = "none";
        if (password.value === repeatPassword.value) {
            repeatPasswordError.style.display = "none";
            checklist += 1;
        } else {
            repeatPasswordError.style.display = "block";
        }
    } else {
        passwordError.style.display = "block";
        repeatPasswordError.style.display = "none";
    }

    if (checklist === 2) {
        alert("success");
    }
})

/*
existingAccount.addEventListener("click" , function() {
    imageContainer.className = "picture-slider slider-right"
    container.className ="sign-in sign-right"
    formContainer.innerHTML = `
    <form action="index.html" class="existing-account boxed">
        <input type="email" id="email" placeholder="Email" aria-label="email">
        <input type="password" id="password" placeholder="Password" aria-label="password">
        <button class="button">SIGN IN</button>
    </form>`
})

const newAccount = document.getElementById("switch-back")
newAccount.addEventListener("click" , function() {
    imageContainer.className = "picture-slider slider-left"
    container.className = "sign-in sign-left";
    formContainer.innerHTML = `
    <form action="index.html" class="create-account">
        <div>
            <input type="text" id="first-name" placeholder="First name" aria-label="first name">
            <input type="text" id="last-name" placeholder="Last name" aria-label="Last name">
        </div>
        <input type="email" id="email.new" placeholder="Email" aria-label="email">
        <input type="tel" id="phone" placeholder="Phone" aria-label="phone number">
        <input type="text" id="adress" placeholder="Adress" aria-label="adress">
        <div>
            <select name="country" id="country" aria-label="select country">
            <option value="norway">Norway</option>
            <option value="sweden">Sweden</option>
            <option value="denmark">Denmark</option>
            <option value="united-kingdom">United Kingdom</option>
            </select>
            <input type="text" id="region" placeholder="Region" aria-label="region">
        </div>
        <div>
            <input type="password" id="create-password" placeholder="Password" aria-label="password">
            <input type="password" id="repeat-password" placeholder="Repeat Password" aria-label="repeat password">
        </div>
        <button class="button">CREATE ACCOUNT</button>
    </form>`
})

imageContainer.className = "picture-slider"
container.className ="sign-in sign-right"
formContainer.innerHTML = `
    <form action="index.html" class="existing-account boxed">
        <input type="email" id="email" placeholder="Email" aria-label="email">
        <input type="password" id="password" placeholder="Password" aria-label="password">
        <button class="button">SIGN IN</button>
    </form>`
*/