//Creation variable ulr
const urlApi = "http://localhost:3000/api/products";

//-------------------------------------------------------//
//Récupération des valeurs de la clef
//et séparation des éléments du tableau dans des variables product allant de product0 jusqu'à myCart.length

let myCart = JSON.parse(localStorage.getItem("basket"));
if (myCart != null) {
  for (i = 0; i < myCart.length; window["product" + i++] = myCart[i - 1]);
} else {
  myCart = "";
}

//-------------------------------------------------------//

//----------------------On appel l'api pour récup les infos des articles du panier comme l'image, le prix, etc---------------------------------//

fetch(urlApi)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (value) {
    //Pour tous les elements du tableau
    for (var x = 0; x < myCart.length; x++) {
      var i = 0;
      //Comparaison de l'id de la var product(from Ls) avec l'id du premier element(api) jusqu'à match et ensuite creation de l'article avec les valeurs correspondantes
      while (window["product" + x].id != value[i]._id) {
        i++;
      }
      createArticle(value, i, x);

      modifyQuantity();
      deleteItem();
      totalPrice();
      firstNameRegex();
      lastNameRegex();
      adresseRegex();
      cityRegex();
      emailRegex();
    }
  })
  .catch(function (err) {
    console.log(err);
  });
//-------------------------------------------------------//

//-------------------Création des elements-------------------------------//
function createArticle(value, i, x) {
  var articleCartItem = document.createElement("article");
  var divCartItemImg = document.createElement("div");
  var imgProduct = document.createElement("img");
  var divCartItemContent = document.createElement("div");
  var divCartItemContentDescription = document.createElement("div");
  var TitleProduct = document.createElement("h2");
  var paraColor = document.createElement("p");
  var paraPrice = document.createElement("p");
  var divCartItemContentSettings = document.createElement("div");
  var divCartItemContentSettingsQuantity = document.createElement("div");
  var paraQuantity = document.createElement("p");
  var inputQuantity = document.createElement("input");
  var divCartItemContentSettingsDelete = document.createElement("div");
  var paraDeleteItem = document.createElement("p");
  //Creation des attributs
  articleCartItem.setAttribute("class", "cart__item");
  articleCartItem.setAttribute("data-id", window["product" + x].id);
  articleCartItem.setAttribute("data-color", window["product" + x].colors);
  divCartItemImg.setAttribute("class", "cart__item__img");
  imgProduct.setAttribute("src", value[i].imageUrl);
  imgProduct.setAttribute("alt", value[i].altTxt);
  divCartItemContent.setAttribute("class", "cart__item__content");
  divCartItemContentDescription.setAttribute(
    "class",
    "cart__item__content__description"
  );
  divCartItemContentSettings.setAttribute(
    "class",
    "cart__item__content__settings"
  );
  divCartItemContentSettingsQuantity.setAttribute(
    "class",
    "cart__item__content__settings__quantity"
  );
  inputQuantity.setAttribute("type", "number");
  inputQuantity.setAttribute("class", "itemQuantity");
  inputQuantity.setAttribute("name", "itemQuantity");
  inputQuantity.setAttribute("min", "1");
  inputQuantity.setAttribute("max", "100");
  inputQuantity.setAttribute("value", window["product" + x].quantity);
  divCartItemContentSettingsDelete.setAttribute(
    "class",
    "cart__item__content__settings__delete"
  );
  paraDeleteItem.setAttribute("class", "deleteItem");
  //valeurs pour les elements
  var texteh2 = document.createTextNode(value[i].name);
  TitleProduct.appendChild(texteh2);
  //..
  var texteParaCouleur = document.createTextNode(window["product" + x].colors);
  paraColor.appendChild(texteParaCouleur);
  //..
  var textParaPrix = document.createTextNode(value[i].price + ",00 €");
  paraPrice.appendChild(textParaPrix);
  //..
  var textParaQuantity = document.createTextNode("Qté :");
  paraQuantity.appendChild(textParaQuantity);
  //..
  var textDeleteItem = document.createTextNode("Supprimer");
  paraDeleteItem.appendChild(textDeleteItem);
  //Nesting des elements
  document.querySelector("#cart__items").appendChild(articleCartItem);
  articleCartItem.appendChild(divCartItemImg);
  divCartItemImg.appendChild(imgProduct);
  articleCartItem.appendChild(divCartItemContent);
  divCartItemContent.appendChild(divCartItemContentDescription);
  divCartItemContentDescription.appendChild(TitleProduct);
  divCartItemContentDescription.appendChild(paraColor);
  divCartItemContentDescription.appendChild(paraPrice);
  divCartItemContent.appendChild(divCartItemContentSettings);
  divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity);
  divCartItemContentSettingsQuantity.appendChild(paraQuantity);
  divCartItemContentSettingsQuantity.appendChild(inputQuantity);
  divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);
  divCartItemContentSettingsDelete.appendChild(paraDeleteItem);
}
//-------------------------------------------------------//

//----------------------Modification de la quantitée---------------------------------//
function modifyQuantity() {
  document
    .querySelector("input")
    .closest("#cart__items")
    .addEventListener("change", (event) => {
      // Recherche de la valeur changé
      if (event.target.value > 0 && event.target.value < 101) {
        var newValInput = event.target.value;

        //Recherche du data-id
        var dataArticle = event.target.closest("article");
        var idFocused = dataArticle.dataset.id;
        var colorFocused = dataArticle.dataset.color;

        //Récup chaine de char LS et conversion en objet
        let basket = localStorage.getItem("basket");
        if (basket == null) {
          return [];
        } else {
          basket = JSON.parse(basket);
        }
        //Pour tous les elements de baskets
        for (var element of basket) {
          //si l'id de l'element est égal à la valeur de l'attribut data-id et pareil pour la couleur, alors on a la quantité de l'élément
          if (element.id == idFocused && element.colors == colorFocused) {
            element.quantity = newValInput;
            localStorage.setItem("basket", JSON.stringify(basket));
            totalPrice();
          }
        }
      } else {
        alert("Quantité de 1 à 100 articles");
      }
    });
}

//-------------------------------------------------------//

//----------------------Suppression d'un item---------------------------------//
function deleteItem() {
  document.querySelectorAll(".deleteItem").forEach((element) => {
    element.addEventListener("click", (event) => {
      //Recherche du data-id
      var dataArticle = event.target.closest("article");
      var idFocused = dataArticle.dataset.id;
      var colorFocused = dataArticle.dataset.color;

      //Récup chaine de char LS et convertion en objet
      let basket = localStorage.getItem("basket");
      if (basket == null) {
        basket = [];
      } else {
        basket = JSON.parse(basket);
      }

      for (var element2 of basket) {
        if (element2.id == idFocused && element2.colors == colorFocused) {
          ok1 = {};
          ok1 = JSON.parse(localStorage.getItem("basket"));
          ok1.splice(basket.indexOf(element2), 1);
          localStorage.setItem("basket", JSON.stringify(ok1));
          location.reload(); // rafraichit la page et rerenseigne les valeurs des elements pour enlever les elements supprimés
        }
      }
    });
  });
}
//-------------------------------------------------------//

//----------------------Total price---------------------------------//
function totalPrice() {
  var cumulPrix = 0;
  var cumulArticles = 0;
  //Pour tous les cart_item et pour chaque element du cartItem
  document.querySelectorAll(".cart__item").forEach((element) => {
    var prixSelection = element.querySelector(
      ".cart__item__content__description p:last-child"
    );
    var articleSelection = element.querySelector(
      ".cart__item__content__settings__quantity .itemQuantity"
    );
    //Selection du prix et transformation en integer
    var prixSelectionHTML = prixSelection.innerHTML;
    var integerPrixSelectionHTML = parseInt(prixSelectionHTML, 10);

    //Selection de la quantité et transformation en int
    articleSelection = articleSelection.value;
    var integerArticleSelectionValue = parseInt(articleSelection, 10);

    //Total cumulé des articles
    cumulArticles = cumulArticles + integerArticleSelectionValue;

    //Le prix = quantité * prix
    var vraiPrix = integerPrixSelectionHTML * integerArticleSelectionValue;
    //Total cumulé des prix
    cumulPrix = cumulPrix + vraiPrix;

    document.querySelector("#totalQuantity").innerHTML = cumulArticles;
    document.querySelector("#totalPrice").innerHTML = cumulPrix + ",00";
  });
}
//-------------------------------------------------------//

//------------------------regex pour firstName-------------------------------//
function firstNameRegex() {
  let testFirstName =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i;
  let errorMsg = document.querySelector("#firstNameErrorMsg");
  document.querySelector("#firstName").addEventListener("input", (e) => {
    if (testFirstName.test(e.target.value)) {
      errorMsg.innerHTML = "";
    } else {
      errorMsg.innerHTML = "Veuillez entrer un prénom valide";
    }
  });
}
//-------------------------------------------------------//

//------------------------regex pour lastName-------------------------------//
function lastNameRegex() {
  let testLastName =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i;
  let errorMsg = document.querySelector("#lastNameErrorMsg");
  document.querySelector("#lastName").addEventListener("input", (e) => {
    if (testLastName.test(e.target.value)) {
      errorMsg.innerHTML = "";
    } else {
      errorMsg.innerHTML = "Veuillez entrer un nom valide";
    }
  });
}
//-------------------------------------------------------//

//-------------------------regex pour adresse------------------------------//
function adresseRegex() {
  let testAdressName =
    /^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i;
  let errorMsg = document.querySelector("#addressErrorMsg");
  document.querySelector("#address").addEventListener("input", (e) => {
    if (testAdressName.test(e.target.value)) {
      errorMsg.innerHTML = "";
    } else {
      errorMsg.innerHTML = "Veuillez entrer une adresse valide";
    }
  });
}
//-------------------------------------------------------//

//------------------------regex pour ville-------------------------------//
function cityRegex() {
  let testCityName =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/i;
  let errorMsg = document.querySelector("#cityErrorMsg");
  document.querySelector("#city").addEventListener("input", (e) => {
    if (testCityName.test(e.target.value)) {
      errorMsg.innerHTML = "";
    } else {
      errorMsg.innerHTML = "Veuillez entrer une adresse valide";
    }
  });
}
//-------------------------------------------------------//

//----------------------regex pour email---------------------------------//
function emailRegex() {
  let testEmailName = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
  let errorMsg = document.querySelector("#emailErrorMsg");
  document.querySelector("#email").addEventListener("input", (e) => {
    if (testEmailName.test(e.target.value)) {
      errorMsg.innerHTML = "";
    } else {
      errorMsg.innerHTML = "Veuillez entrer une adresse email valide";
    }
  });
}
//-------------------------------------------------------//

//------------------Post Order + get orderId-------------------------------------//

let basket = localStorage.getItem("basket");
basket = JSON.parse(basket);

if (basket != null && basket != "") {
  // Creation d'un tableau avec les valeurs du ls pour la clef basket
  const products = [];
  for (let i = 0; i < basket.length; i++) {
    products.push(basket[i].id);
  }

  //methode pour valider commande

  document.querySelector("#order").addEventListener("click", send);

  //Réception valeurs des inputs dans des variables
  function send(e) {
    if (document.querySelector("#firstName").value == "") {
      alert("veuillez Remplir le champ Prénom");
    } else if (document.querySelector("#lastName").value == "") {
      alert("veuillez Remplir le champ Nom");
    } else if (document.querySelector("#address").value == "") {
      alert("veuillez Remplir le champ Adresse");
    } else if (document.querySelector("#city").value == "") {
      alert("veuillez Remplir le champ Ville");
    } else if (document.querySelector("#email").value == "") {
      alert("veuillez Remplir le champ Email");
    } else {
      var prénom = document.querySelector("#firstName").value;
      var nom = document.querySelector("#lastName").value;
      var adresse = document.querySelector("#address").value;
      var ville = document.querySelector("#city").value;
      var email = document.querySelector("#email").value;

      //Creation objet contact avec les valeurs des inputs
      const contact = {
        firstName: prénom,
        lastName: nom,
        address: adresse,
        city: ville,
        email: email,
      };

      //Envoie donnée à l'API
      e.preventDefault();
      fetch(urlApi + "/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact, products }),
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (value) {
          document.location.href = "confirmation.html?id=" + value.orderId;
        });
    }
  }
}
//-------------------------------------------------------//
