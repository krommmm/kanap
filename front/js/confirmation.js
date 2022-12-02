//Récupération de l'id du nav
var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");

document.querySelector("#orderId").innerHTML = id;

//reset de la clef (effacemenent du localStorage);
localStorage.clear();
