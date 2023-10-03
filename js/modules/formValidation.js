import { creditCardList, zipCodeList } from "../data/regExp.js";

function cardNumberValidation(type , number) {
    let regEx = /pattern/;
    creditCardList.forEach((el) => {
        if (el.type === type) {
            regEx = el.regEx;
        }
    })
    return regEx.test(number);
}

function monthYearValidation(number) {
    let regEx = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/
    return regEx.test(number);
}

const cvcValidation = (cvc) => {
    let regEx = /\d{3}/;
    return regEx.test(cvc);
}

const emailValidation = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
}

const phoneValidation = (phone) => {
    if (phone.trim().length > 0) {
        const regEx = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/;
        return regEx.test(phone);
    } else {
        return false;
    }
}

const zipCodeValidation = (country, zip) => {
    let regEx = /pattern/;
    zipCodeList.forEach((el) => {
        if (el.country === country) {
            regEx = el.regEx;
        }
    });
    return regEx.test(zip);
}

const passwordStrenghtValidation = (password) => {
    //moderate strength 1 lowercase 1 uppercase 1 number and atleast 8 chr long
    let regEx = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
    return regEx.test(password);
}

const stringValidation = (string) => {
    if (string.trim().length > 2) {
        return true;
    } else {
        return false;
    }
}


export const signIn = (event) => {
    event.preventDefault();
    const email = document.querySelector("#sign-in-email");
    const emailError = document.querySelector
    ("#sign-in-email-error");
    const emailUnregistered = document.querySelector("#email-unregistered");

    const password = document.querySelector("#password");
    const passwordError = document.querySelector("#password-error");

    if (emailValidation(email.value)) {
        emailError.style.display = "none";
        if (email.value === "admin@gmail.com") {
            emailUnregistered.style.display = "none";
            if (password.value === "password") {
                passwordError.style.display = "none";
                alert("Signed In");
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
}

export const register = (event) => {
    event.preventDefault();
    var checklist = 0;

    const email = document.querySelector("#new-email")
    const emailError = document.querySelector("#new-email-error");
    if (emailValidation(email.value)) {
        emailError.style.display = "none";
        checklist += 1;
    } else {
        emailError.style.display = "block";
    }

    const password = document.querySelector("#new-password");
    const passwordError = document.querySelector("#new-password-error");
    const repeatPassword = document.querySelector("#repeat-password");
    const repeatPasswordError = document.querySelector("#repeat-password-error");
    if (passwordStrenghtValidation(password.value)) {
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
} 

export function submitDeliveryForm(event) {
    event.preventDefault();
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

    if (emailValidation(email.value)) {
        emailError.style.display = "none";
        checklist += 1;
    } else {
        emailError.style.display = "block";
    }

    const phone = document.querySelector("#phone");
    const phoneError = document.querySelector("#phone-error");
    if (phoneValidation(phone.value)) {
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
    if (zipCodeValidation(country.value , zipCode.value)) {
        zipCodeError.style.display = "none";
        checklist += 1;
    } else {
        zipCodeError.style.display = "block";
    }

    const deliveryForm = document.querySelector("#delivery-form");
    const billingForm = document.querySelector("#billing-form");
    const billingToggle = document.querySelector("#billing-toggle");
    if (checklist === 8) {
       toggleCollapse(deliveryForm);
       toggleCollapse(billingForm);
        billingToggle.style.display = "block";
    }
}

export const submitBillingForm = (event) => {
    event.preventDefault();
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

    if (cardNumberValidation(creditCardType , cardInfo.value)) {
        cardInfoError.style.display = "none";
        checklist += 1;
    } else {
        cardInfoError.style.display = "block";
    }

    const experationDate = document.querySelector("#experation");
    const experationDateError = document.querySelector("#experation-error");

    if (monthYearValidation(experationDate.value)) {
        experationDateError.style.display = "none";
        checklist += 1;
    } else {
        experationDateError.style.display = "block";
    }

    const cvc = document.querySelector("#cvc");
    const cvcError = document.querySelector("#cvc-error");

    if (cvcValidation(cvc.value)) {
        cvcError.style.display = "none";
        checklist += 1;
    } else {
        cvcError.style.display = "block";
    }

    if (checklist === 4) {
        document.location.href = "../checkout_success.html"
    }

}

export function toggleCollapse(form) {
    form.classList.toggle("collapsed");
}

export function verticalToggleCollapse() {
    const existingFormContainer = document.querySelector(".existing-account");
    const newFormContainer = document.querySelector(".new-account");
    const existingAccount = document.querySelector("#register-btn");
    const newAccount = document.querySelector("#sign-in-btn");
    if (!this.classList.contains("sign-in_active")) {
        existingFormContainer.classList.toggle("vertical-collapse");
        newFormContainer.classList.toggle("vertical-collapse");
        existingAccount.classList.toggle("sign-in_active");
        newAccount.classList.toggle("sign-in_active");
    }
}