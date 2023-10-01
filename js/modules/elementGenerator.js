export let searchItem = (data) => {
    return `
    <div class ="search-image"style="background-image: url(${data.image})"></div>
    <div class="search-info">
        <h3>${data.title}</h3>
        <div class="row">
            ${createPrice(data)}
        </div>
    </div>
    <a href="/games/template.html?id=${data.id}">view</a>
    `
}
export let createPrice = (data) => {
    if (data.onSale) {
        return `
            <p class="price">$${data.discountedPrice}</p>
            <p class="old-price">$${data.price}</p>
            `;
    } else {
        return `
        <p class= "price">$${data.price}</p>
        `;
    }
};
