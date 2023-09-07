import { createGameCard } from "../render/renderGames.js";
export function getChecked(genre) {
    //const filter = document.querySelector(".filter-games");
    //console.log("working");
    const something = document.getElementById("sports");
    //something.style.display = "flex";
    console.log(something);
}

//const allCheckboxes = document.getElementsByTagName("input");
//console.log(allCheckboxes);
//for (let i = 0; i < allCheckboxes.length; i++) {
  //  allCheckboxes[i].addEventListener("change", reloadPage)
        
       // const genre = allCheckboxes[i].id;
        //const isChecked = event.target.checked;
        //console.log(isChecked);
        //console.log(genre);
        //const queryString = document.location.search;
        //console.log(queryString);
        //const params = new URLSearchParams(queryString);
        //console.log(params);
        //const gameGenre = params.get("genre");
        //console.log(gameGenre);
        //console.log(document.location.href);
        //location.replace(location.href + "&" + genre);

        //const listOfGames = document.querySelectorAll(".game-container");
        //if(isChecked) {
          //  for (let i = 0; i < listOfGames.length; i++) {
            //    var li = listOfGames[i];
              //  console.log(li.classList);
                //if (li.classList.contains(genre)) {
                  //  li.style.display = "";
                //} else {
                  //  li.style.display = "none";
                //}
            //}
        //} else {
          //  for (let i =0; i < listOfGames.length; i++) {
            //    var li = listOfGames[i];
            //    li.style.display = "";
            //}
        //}
    //})
//}
const checkBox = document.getElementById("sports")
export function sportsFilter() {
    checkBox.addEventListener("change", reloadPage)
}

export async function reloadPage() {
    const allCheckboxes = document.getElementsByName("genre");
    const container = document.querySelector(".game-list");
    container.innerHTML ="";
    var genreList = [];
    console.log("-------");
    for (let i = 0; i < allCheckboxes.length; i++) {
        if (allCheckboxes[i].checked) {
            //console.log(allCheckboxes[i].id);
            genreList.push(allCheckboxes[i].id);
            //console.log(genreList);
        }
    }
    //console.log(genreList);
    const data = await makeApiCall();
    //console.log(data[0]);
    let checker = (arr , target) => target.every(v => arr.includes(v));
    //console.log(data)
    for (let i = 0; i < data.length; i++) {
        if(checker([data[i].genre.toLowerCase()] , genreList) && saleStatus(data[i].onSale)) {
            createGameCard(data[i]);
        }
    }
    //console.log(saleStatus(data[0].onSale))

    //console.log(checker([data[0].genre.toLowerCase()], genreList));

}

function saleStatus(onSale) {
    const salesCheckbox = document.getElementById("on-sale");
    if(!salesCheckbox.checked) {
        return true;
    } else {
        return (onSale);
    }
}
const url = "https://api.noroff.dev/api/v1/gamehub"

async function makeApiCall() {
    try {
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
    }
}

