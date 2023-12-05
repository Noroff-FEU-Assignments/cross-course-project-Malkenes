import {load, save , updateCartItemCount} from "./functions/cart.js"
import { createPrice } from "./modules/elementGenerator.js";
const container = document.querySelector(".checkout-products");
let totalContainer = document.querySelector("#total");
let shoppingCart = load("cart");

let generateShop = () => {
    return (container.innerHTML = shoppingCart.map((item)=>{
        return `
        <div class="checkout-product" id=${item.data.sku}>
            <div class="checkout_image" style="background-image: url(${item.data.images[0].src})"></div>
            <h3>${item.data.name}</h3>
            <div class="trash">
                <div class="row">
                    <i class="fas fa-plus" data-id=${item.data.sku}></i>
                    <p id=${item.data.name.split(" ").join("")}>${item.quantity}</p>
                    <i class="fas fa-minus" data-id=${item.data.sku}></i>
                </div>
                <i class="fas fa-trash" data-id=${item.data.sku}></i>
            </div>
            ${createPrice(item.data)}
            <p class="discount">${discountPercent(item.data.prices.regular_price , item.data.prices.price)}</p>
        </div>
    `
    }).join(""));
}
let discountPercent = (price , newPrice) => {
    if (price != newPrice) {
        return (((price - newPrice)*100)/price).toFixed(2)+"%"
    }else {
        return "";
    }
}
generateShop();



const increments = document.querySelectorAll(".fa-plus");
increments.forEach((element) => {
    element.addEventListener("click" , function() {
        const selectedItem = element.dataset.id;
        console.log(typeof(shoppingCart[0]));
        console.log(selectedItem);
        const search = shoppingCart.find((item) => item.data.sku === selectedItem);
        console.log(search);
        search.quantity += 1;
        save("cart" , shoppingCart);
        update(selectedItem);
        updateCartItemCount();
    })
})

const decrements = document.querySelectorAll(".fa-minus");
decrements.forEach((element) => {
    element.addEventListener("click" , function() {
        let selectedItem = element.dataset.id;
        let search = shoppingCart.find(item => item.data.sku === selectedItem);
        if (search.quantity === 1) return;
        else {
            search.quantity -= 1;
        }
        save("cart" , shoppingCart);
        update(selectedItem);
        updateCartItemCount();
    })
})

let trashCans = document.querySelectorAll(".fa-trash")

trashCans.forEach((element) => {
    element.addEventListener("click" , function() {
        let selectedItem = element.dataset.id;
        shoppingCart = shoppingCart.filter(item => item.data.sku !== selectedItem);
        save("cart" , shoppingCart);
        let removedItem = document.getElementById(selectedItem);
        removedItem.parentNode.removeChild(removedItem);
        totalPrice();
        updateCartItemCount();
    })
})
let update = (id) => {
    let search = shoppingCart.find(item => item.data.sku === id);
    document.getElementById(search.data.name.split(" ").join("")).innerHTML = search.quantity;
    totalPrice();
}

let totalPrice = () => {
    let price = 0;
    let oldPrice = 0;
    shoppingCart.forEach((element) => {
        price += element.data.prices.price*element.quantity;
        oldPrice += element.data.prices.regular_price*element.quantity;
    })
    price = price.toString();
    oldPrice = oldPrice.toString();
    console.log(typeof(price));
    if (price < 1) {
        totalContainer.innerHTML = `<div>
        <h3>Cart is empty</h3>
        <a href="browse_games.html">Browse Games</a>
        </div>`;
    } else {
        totalContainer.innerHTML = `
        <h3>TOTAL</h3>
        <p class="price">$${price.slice(0, price.length-2)},${price.slice(price.length - 2)}</p>
        <p class="old-price">$${oldPrice.slice(0, oldPrice.length-2)},${oldPrice.slice(oldPrice.length - 2)}</p>
        <p class="discount">${discountPercent(oldPrice , price)}</p>`
    }
}

totalPrice();