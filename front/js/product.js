

const urlSearch = new URLSearchParams(window.location.search); 

const productId = urlParams.get("id");
const buttonPanier = document.querySelector("#addToCart");
const itemQuantity = document.querySelector('#quantity');
let isColorPresent = true;

let products; 
let itemTitle = document.querySelector("#title");
let itemDescription = document.querySelector("#description");
let itemPrice = document.querySelector("#price");
let itemImage = document.querySelector(".item__img");
let itemColors = document.querySelector('#colors');

function getProduct() {
  fetch('http://localhost:3000/api/products/' + productId)
  .then(res => res.json())
  .then(products => {
    itemTitle.textContent = '${products.name}';
    itemDescription.textContent = '${products.description}';
    itemPrice.textContent = '${products.price}';
    itemImage.textContent = `<img src=${products.imageUrl} alt="Photographie d'un canapé" /> ` ;
    products.colors.map((color) => {
      itemColors.innerHTML += `<option value="${color}">${color}</option>`;
  })
  })
}