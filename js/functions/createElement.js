// functions that returns html elements

export function createBackground() {
    const background = document.createElement("div");
    background.setAttribute("class", "game-container_background");

    const consoleType = document.createElement("div");
    consoleType.setAttribute("class", "game-container_console");
    
    const image = document.createElement("img");
    image.setAttribute("src" , "../../images/playbox_logo.jpg");
    image.setAttribute("alt" , "for playbox");
    consoleType.append(image);
    const starRating = getRating();

    background.append(consoleType);
    background.append(starRating);
    return background;
}

export function createImageElement(image) {
    const imageContainer = document.createElement("div");
    imageContainer.setAttribute("class" , "game-container_image");
    const imageElement = document.createElement("img");
    imageElement.src = image
    //imageElement.setAttribute("class" , "clipped")
    imageContainer.append(imageElement);
    return imageContainer;
}
export function createPricetag(thing) {
    const priceTag = document.createElement("div");
    priceTag.setAttribute("class", "game-container_discount");
    const price = document.createElement("p");
    const discountedPrice = document.createElement("p");
    price.innerText = "$" + thing.price;
    discountedPrice.innerText = "$" + thing.discountedPrice;
    if (thing.onSale) {
        priceTag.append(discountedPrice, price);
        price.className = "old-price";
        discountedPrice.className = "price";
    } else {
        priceTag.append(price);
        price.className = "price";
    }

    return priceTag;
}

function getRating() {
    const starRating = document.createElement("div");
    for ( let i= 0 ; i < 5 ; i++){
        const star = document.createElement("i");
        star.className ="fas fa-star";
        starRating.append(star);
    }
    starRating.append("(0)")
    return starRating;
}