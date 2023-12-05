/* most recent */
export let sortByDateNew = (data) => {
    let sortedData = data.toSorted(
        /*
        (date1, date2) => (date1.attributes[2].terms[0].name < date2.attributes[2].terms[0].name) ?
            1 : (date1.attributes[2].terms[0].name > date2.attributes[2].terms[0].name) ? -1 : 0);
            */
        (date1,date2) => (getAttribute(date1,2) < getAttribute(date2,2)) ?
        1 : (getAttribute(date1,2) > getAttribute(date2,2)) ? -1 :0);
    return sortedData;
}
/* A to Å or Z if you have a small alphabet */
export let sortByTitle = (data) => {
    let sortedData = data.toSorted((a , b) => a.name.localeCompare(b.name));
    return sortedData;
}
/* Price high to low */
export let sortByPrice = (data) => {
    let sortedData = data.toSorted((a , b) => Number(a.prices.price) < Number(b.prices.price) ?
        1 : (Number(a.prices.price) > Number(b.prices.price) ? -1 : 0));
    return sortedData;
}

export let sortOnSale = (data) => {
    let sortedData = data.filter((item => item.on_sale));
    return sortedData;
}
let currentPrice = (data) => {
    if (data.onSale) {
        return data.discountedPrice;
    } else {
        return data.price;
    }
}

let getAttribute = (data , id) => {
    const attribute = data.attributes.find(item => item.id === id);
    return attribute.terms[0].name;
}