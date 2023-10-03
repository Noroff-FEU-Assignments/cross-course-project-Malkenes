import {load, save , updateCartItemCount} from "./functions/cart.js"
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
        updateCartItemCount();
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
        updateCartItemCount();
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
        updateCartItemCount();
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