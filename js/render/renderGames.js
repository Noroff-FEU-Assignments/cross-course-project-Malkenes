const url = "https://dev.malke.no/wp-json/wc/store/products?per_page=15"


export async function makeApiCall() {
    try {
        showLoadingIndicator();
        const response = await fetch(url);

        const result = await response.json();
        showLoadingIndicator();
        return result;

    } catch(error) {
        console.log(error);
        errorMessage();
    }
}

export function showLoadingIndicator() {
    const loadingIndicator = document.querySelector("#loading-indicator");
    loadingIndicator.classList.toggle("loading-indicator");
}

export function errorMessage() {
    const loadingIndicator = document.querySelector("#loading-indicator");
    loadingIndicator.classList.remove("loading-indicator");
    loadingIndicator.innerHTML = `<p class="error-message">COULD NOT FETCH DATA<p>`
}