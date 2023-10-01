export function save(key , value) {
    const encodedValue = JSON.stringify(value);
    localStorage.setItem(key , encodedValue);
}

export function load(key) {
    const encodedValue = localStorage.getItem(key);
    return JSON.parse(encodedValue);
}

export function remove(key) {
    localStorage.removeItem(key);
}

export let updateCartItemCount = () => {
    let currentCart = document.querySelector("#current-cart");
    let currentCartItems = 0;
    let cart = load("cart");

    cart.forEach((element) => {
        currentCartItems += element.quantity;
    })
    if (currentCartItems > 0) {
        currentCart.classList.add("current-cart");
        if (currentCartItems > 9) {
            currentCart.innerHTML = 9;
        } else {
            currentCart.innerHTML = currentCartItems;
        }
    } else {
        currentCart.innerHTML = "";
        currentCart.classList.remove("current-cart");
    }
}

