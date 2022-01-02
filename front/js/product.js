
const productIdUrl = new URL(window.location.href);
console.log(window.location.href)
    
/*
  Récupération de l'API
*/
let URLGetId = productIdUrl.searchParams.get("id");
console.log(productIdUrl.searchParams.get("id"))
    
/*
  Variable pour l'API
*/
const URLapi = `http://localhost:3000/api/products/`;
    
/*
  Création d'une variable pour réunir l'id et l'API
*/
let combineURL = URLapi + URLGetId;

/*
  Emplacement des éléments dans le code HTML
*/
const itemImage = document.querySelectorAll(".item__img")[0];
const itemTitle = document.getElementById("title");
const itemPrice = document.getElementById("price");
const itemDescription = document.getElementById("description");
const itemColors = document.getElementById("colors");
let product;

    
/*
  Appel de l'API
*/
getProductInfos()

function getProductInfos() {
  fetch(combineURL)
    .then((res) => res.json())
    .then((dataItem) => {
      itemOptions(dataItem)
    })
    .catch((error) => console.error(error));
}

    
/*
  Récupère les informations sur les produits
*/
function itemOptions(dataItem){ 
  product = dataItem; //dataItem récupère les infos
  let name = dataItem.name;
  let description = dataItem.description;
  let imageUrl = dataItem.imageUrl;
  let altTxt = dataItem.altTxt;
  let colors = dataItem.colors;
  let price = dataItem.price;

  itemImage.innerHTML = `<img src="${imageUrl}" alt="${altTxt}">`;

  itemTitle.innerText = name;

  itemPrice.innerText = price;

  itemDescription.innerText = description;

  for (let color of colors) {
    itemColors.innerHTML += `<option value="${color}">${color}</option>`;
  }
}

    
/*
  Fonction qui gère l'ajout au panier
*/
function addToCart() {
  const addToCartBtn = document.getElementById("addToCart");
  addToCartBtn.addEventListener("click", function () {
    const colorChoice = document.getElementById("colors").value;
    
/*
  Si on essaie d'ajouter un produit sans couleurs
*/
    if (colorChoice === "") {
      return alert("Veillez à bien selectionner une couleur ou un nombre d'article"); //message qui apparait en pop-up
    } else {
      product.colors = colorChoice;
    }

/*
  Si on essaie d'ajouter un produit sans selectionner de quantité
*/
    const quantityChoice = document.getElementById("quantity");
    if (quantityChoice.value == 0 || quantityChoice.value < 0) {
      return alert("Veillez à bien selectionner un nombre d'article à ajouter au panier"); //message qui apparait en pop-up
    }

    const productSelected = {...product, quantity: parseInt(quantityChoice.value)};

    let productLocalStorage = JSON.parse(localStorage.getItem("product")) || [];

/*
  Si un produit de le même id & la même couleur est dans le panier alors : on augmente la quantité
*/
    const ifProductFound = productLocalStorage.find((element) => element._id === productSelected._id && element.colors === productSelected.colors);
    
    if (ifProductFound) {
      ifProductFound.quantity += parseInt(quantityChoice.value);  // Messages de confirmation
      alert("Confirmation d'ajout au panier :  " + quantityChoice.value + "  ||  " + productSelected.name + "  ||  " + productSelected.colors); //message qui apparait en pop-up
    } else {
      productLocalStorage.push(productSelected);
      alert("Confirmation d'ajout au panier :  " + quantityChoice.value + "  ||  " + productSelected.name + "  ||  " + productSelected.colors); //message qui apparait en pop-up
    }
    localStorage.setItem("product", JSON.stringify(productLocalStorage));

    window.location.href = "./cart.html";  //redirection vers la page panier après envois vers localStorage
  });
}
addToCart();
