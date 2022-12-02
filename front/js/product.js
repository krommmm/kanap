//-------------------------------------------------------//
//Création variables
var couleurs = "";
var nomArticle = "";

//Récupération de l'id de l'url quand on clique sur un article
var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");
//Injection de l'id dans l'url de l'api pour accèder aux produits selon leurs id
const urlApi = `http://localhost:3000/api/products/${id}`;
//-------------------------------------------------------//

//-------------------------------------------------------//
//Connection à l'api et ajout fonctions utilisants ses valeurs
fetch(urlApi)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (value) {
    AddValueToHTML(value); //Rajout d'information pour l'article, concernant l'image, nom de produit, prix, description, couleurs
    ArticleFunctions(value); //Ensemble des fonctions pour choisir la quantité et la couleur
  })
  .catch(function (err) {
    console.log(err);
  });
//-------------------------------------------------------//

//-------------------------------------------------------//
//Création des éléments html(ou plutôt rajout des valeurs)
function AddValueToHTML(value) {
  var img = document.createElement("img");
  img.setAttribute("src", value.imageUrl);
  img.setAttribute("alt", value.altTxt);
  document.querySelector(".item__img").appendChild(img);
  document.querySelector("#title").innerHTML = value.name;
  document.querySelector("#price").innerHTML = value.price;
  document.querySelector("#description").innerHTML = value.description;

  //Boucle de type for pour déterminer le nombre de couleurs dispo par id + creation de option value pour chacune d'entre elle
  for (var x = 0; x < value.colors.length; x++) {
    var option1 = document.createElement("option");
    option1.setAttribute("value", value.colors[x]);
    document.querySelector("#colors").appendChild(option1);
    option1.innerHTML = value.colors[x];
  }
}
//-------------------------------------------------------//

//-------------------------------------------------------//
// Fonction pour methode et creation variables + objet + fonctions LS
function ArticleFunctions(value, i) {
  document.querySelector("#addToCart").addEventListener("click", getValue);

  function getValue() {
    //Variables id
    var str = window.location.href;
    var url = new URL(str);
    var id = url.searchParams.get("id");

    //Variables (quantité et couleurs)
    var quantité = document.querySelector("#quantity").value;
    var couleurs = document.querySelector("#colors").value;

    var choisirCouleur = false;
    var choisirQuantité = false;

    //Contrôle de la quantité
    if (quantité < 1 || quantité > 100) {
      alert("Veuillez choisir une quantité entre 1 et 100");
    } else {
      choisirQuantité = true;
    }

    // Pour toutes les couleurs de l'article
    for (var i = 0; i < value.colors.length; i++) {
      //si l'id de l'article est égal à l'id de l'url du nav (sécurité supplémentaire, mais normalement c'est la bonne)
      if (value._id == id) {
        //pour chaque couleurs de l'article, si la var couleur est égal à la value.colors passé en revue dans la boucle, alors cette couleur est la bonne et on l'indique dans choisirCouleur
        for (const element of value.colors) {
          if (couleurs == element) {
            choisirCouleur = true;
          }
        }
      }
    }

    //Si bonne couleur et bonne quantité ?
    if (choisirCouleur == true && choisirQuantité == true) {
      //Création d'un objet avec les variables des valeurs des inputs
      var tableauValeurs = {
        id: id,
        quantity: quantité,
        colors: couleurs,
      };

      // On place les valeurs de l'objet tableauValeur dans le lS
      function saveBasket(tableauValeurs) {
        localStorage.setItem("basket", JSON.stringify(tableauValeurs));
      }

      //On retourne la chaine de char du LS en objet
      function getBasket() {
        let basket = localStorage.getItem("basket");
        if (basket == null) {
          return [];
        } else {
          return JSON.parse(basket);
        }
      }

      //Ajout produit au LS selon conditions
      function addBasket(product) {
        let basket = getBasket();
        let foundProduct = basket.find(
          (p) => p.id == product.id && p.colors == product.colors
        );

        if (foundProduct != undefined) {
          if (Number(foundProduct.quantity) + Number(product.quantity) > 100) {
            alert(
              "Quantité max pour cet article = 100, vous avez déjà : " +
                foundProduct.quantity +
                " exemplaire(s) de ce produit dans votre panier"
            );
            product.quantity = 0;
          }

          //Transformation des variables en int pour pouvoir les additionner au lieu de les concaténer
          foundProduct.quantity =
            Number(foundProduct.quantity) + Number(product.quantity);
        } else {
          basket.push(product);
        }
        saveBasket(basket);
        alert(
          "Merci pour cet ajout au panier, pour accèder au panier, cliquez sur 'panier'"
        );
      }

      // Appel de la fonction
      addBasket(tableauValeurs);
    } else {
      alert("Veuillez choisir une couleur");
    }
  }
}
//-------------------------------------------------------//
