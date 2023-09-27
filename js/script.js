import { makeApiCall, createGameCard, showLoadingIndicator, errorMessage } from "./render/renderGames.js";
const allCheckboxes = document.querySelectorAll(".choose-category input");
const container = document.querySelector(".game-list");

async function createPageElements() {
    try {
        showLoadingIndicator(container);
        let apiData = await makeApiCall();
        container.innerHTML = "";

        if (container.classList.contains("short-list")) {
            apiData = apiData.slice(0,4);
        }
        
        if (localStorage.getItem("genre") === null) {
            apiData.forEach(createGameCard);
        } else {
            initialisePage();
        }

    } catch (error) {
        console.log(error);
        errorMessage(container);
    }
}

function initialisePage() {
    const genre = localStorage.getItem("genre");

    for (let i=0 ; i < allCheckboxes.length ; i++) {
        if(genre === allCheckboxes[i].id) {
            allCheckboxes[i].checked = true;
            localStorage.removeItem("genre");
            reloadPage();
        } else {
            continue;
    }
}
}

/*
reloads the page when any checkbox is changed
*/
for(let i=0 ; i < allCheckboxes.length ; i++) {
    allCheckboxes[i].addEventListener("change", reloadPage)
}

/* 
loops over all genres and stores the values that are checked in an array
then makes an API call and renders objects that have all the genre's
in the array
*/
async function reloadPage() {
    const genreCheckboxes = document.getElementsByName("category");
    container.innerHTML ="";
    var genreList = [];
    for (let i = 0; i < genreCheckboxes.length; i++) {
        if (genreCheckboxes[i].checked) {
            genreList.push(genreCheckboxes[i].id);
        }
    }
    try {
        showLoadingIndicator(container);
        const data = await makeApiCall();
        container.innerHTML = "";

        let checker = (arr , target) => target.every(v => arr.includes(v));

        for (let i = 0; i < data.length; i++) {
            if(checker([data[i].genre.toLowerCase()] , genreList) && saleStatus(data[i].onSale)) {
                createGameCard(data[i]);
            }
        }
    } catch (error) {
        console.log(error);
        errorMessage(container);
    }

    if (container.innerHTML === "") {
        container.innerHTML = "<p>no matches</p>"
    }

}

function saleStatus(onSale) {
    const salesCheckbox = document.getElementById("on-sale");
    if (!salesCheckbox.checked) {
        return true;
    } else {
        return (onSale);
    }
}

createPageElements();