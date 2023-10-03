
const salesPromotion = document.querySelector(".sales");
salesPromotion.addEventListener("click", function(){
    localStorage.setItem("genre", "on-sale");
    document.location.href = "../browse_games.html";
})

const browseByCategory = document.querySelectorAll(".category li");
for(let i = 0 ; i < browseByCategory.length ; i++) {
    browseByCategory[i].addEventListener("click", function(){
    localStorage.setItem("genre", browseByCategory[i].id);
    document.location.href = "../browse_games.html";
})}
