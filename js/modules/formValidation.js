import { creditCardList, zipCodeList } from "../data/regExp.js";

export function cardNumberValidation(type , number) {
    let regEx = /pattern/;
    creditCardList.forEach((el) => {
        if (el.type === type) {
            regEx = el.regEx;
        }
    })
    return regEx.test(number);
}

export function monthYearValidation(number) {
    let regEx = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/
    return regEx.test(number);
}

export const cvcValidation = (cvc) => {
    let regEx = /\d{3}/;
    return regEx.test(cvc);
}

export const emailValidation = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
}

export const phoneValidation = (phone) => {
    if (phone.trim().length > 0) {
        const regEx = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/;
        return regEx.test(phone);
    } else {
        return false;
    }
}

export const zipCodeValidation = (country, zip) => {
    let regEx = /pattern/;
    zipCodeList.forEach((el) => {
        if (el.country === country) {
            regEx = el.regEx;
        }
    });
    return regEx.test(zip);
}

export const passwordStrenghtValidation = (password) => {
    //moderate strength 1 lowercase 1 uppercase 1 number and atleast 8 chr long
    let regEx = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
    return regEx.test(password);
}

