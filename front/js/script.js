//-------------------------------------------------------//
//Récupération des données
const urlApi = "http://localhost:3000/api/products";
fetch(urlApi)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (value) {
    // pour chaque objet récupéré, création article
    for (var i = 0; i < value.length; i++) {
      creationArticle(value, i);
    }
  })
  .catch(function (err) {
    console.log(err);
  });
//-------------------------------------------------------//

//-------------------------------------------------------//
function creationArticle(value, i) {
  //Creation des éléments
  var newA = document.createElement("a");
  var newArticle = document.createElement("article");
  var newImage = document.createElement("img");
  var newTitle = document.createElement("h3");
  var newPara = document.createElement("p");

  //Installation attributs
  newA.setAttribute("href", `./product.html?id=${value[i]._id}`);
  newImage.setAttribute("src", value[i].imageUrl);
  newImage.setAttribute("alt", value[i].altTxt);
  newTitle.setAttribute("class", "productName");
  newPara.setAttribute("class", "producDescription");

  //valeur textuel
  newTitle.innerHTML = value[i].name;
  newPara.innerHTML = value[i].description;

  //Nesting des elements
  document.querySelector("#items").appendChild(newA);
  newA.appendChild(newArticle);
  newArticle.appendChild(newImage);
  newArticle.appendChild(newTitle);
  newArticle.appendChild(newPara);
}
//-------------------------------------------------------//
