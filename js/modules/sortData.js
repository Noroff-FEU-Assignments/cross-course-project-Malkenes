/* most recent */
export let sortByDateNew = (data) => {
    let sortedData = data.toSorted(
        (date1, date2) => (date1.released < date2.released) ?
            1 : (date1.released > date2.released) ? -1 : 0);
    return sortedData;
}
/* A to Å or Z if you have a small alphabet */
export let sortByTitle = (data) => {
    let sortedData = data.toSorted((a , b) => a.title.localeCompare(b.title));
    return sortedData;
}
/* Price high to low */
export let sortByPrice = (data) => {
    let sortedData = data.toSorted((a , b) => currentPrice(a) < currentPrice(b) ?
        1 : (currentPrice(a) > currentPrice(b)) ? -1 : 0);
    return sortedData;
}

export let sortOnSale = (data) => {
    let sortedData = data.filter((item => item.onSale));
    return sortedData;
}
let currentPrice = (data) => {
    if (data.onSale) {
        return data.discountedPrice;
    } else {
        return data.price;
    }
}