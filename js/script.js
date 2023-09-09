import { makeApiCall, createGameCard, showLoadingIndicator, errorMessage } from "./render/renderGames.js";

const allCheckboxes = document.getElementsByTagName("input");
const container = document.querySelector(".game-list");

async function createPageElements() {
    try {
        showLoadingIndicator(container);
        const apiData = await makeApiCall();
        container.innerHTML = "";
        
        if (localStorage.key("genre")) {
            initialisePage();
            localStorage.removeItem("genre");
        } else {
            apiData.forEach(createGameCard);
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
            reloadPage();
        } else {
            continue;
    }
}
}

//reloads the page when a checkbox is changed
for(let i=0 ; i < allCheckboxes.length ; i++) {
    allCheckboxes[i].addEventListener("change", reloadPage)
}

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

//returns boolean value
function saleStatus(onSale) {
    const salesCheckbox = document.getElementById("on-sale");
    if (!salesCheckbox.checked) {
        return true;
    } else {
        return (onSale);
    }
}
createPageElements();