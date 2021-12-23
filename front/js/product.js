let productInfos = {};

const getProductInfos = async (id) => {
  kanap = await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => data);
  loadCanapes(kanap);
};

const productIdUrl = window.location.search;
const urlProduct = new URLSearchParams(productIdUrl);

function getKanapInfo(id) {
  getProductInfos(id);
}

getKanapInfo(urlProduct.get("id"));

function loadCanapes(dataItem) {
  productInfos = dataItem;
  const { imageUrl, altTxt, name, price, description, colors } = dataItem;

  insertElement(".item__img", `<img src=${imageUrl} alt=${altTxt}>`);
  insertElement("#title", name);
  insertElement("#price", price);
  insertElement("#description", description);

  for (index in colors) {
    insertElement(
      "#colors",
      `<option value="${colors[index]}">${colors[index]}</option>`
    );
  }
}

function insertElement(id, text) {
  document.querySelector(id).innerHTML += text;
}


const itemColor = document.querySelector("#colors");
const itemQuantity = document.querySelector("#quantity");
const addToCartBtn = document.querySelector("#addToCart");

addToCartBtn.addEventListener("click", (event) => {
  event.preventDefault();
  
  const colorChoice = itemColor.value;
  
  const quantityChoice = itemQuantity.value;

  let itemOptions = {
    id: urlProduct.get("id"),
    name: productInfos.name,
    quantity: quantityChoice,
    colors: colorChoice,
    price: productInfos.price,
    description: productInfos.description,
    image: productInfos.imageUrl,
  };

  console.log(itemOptions);

  let productLocalStorage = JSON.parse(localStorage.getItem("product"));

  const confirmationAlert = () => {
    if (
      window.confirm(`Confirmation de l'ajout au panier : ${quantityChoice} ${productInfos.name} ${colorChoice}`)
    ) {
      window.location.href = "./cart.html";
    }
  };
  if (productLocalStorage) {
    productLocalStorage.push(itemOptions);

    localStorage.setItem("product", JSON.stringify(productLocalStorage));
    confirmationAlert();
  } else {
    productLocalStorage = [];
    productLocalStorage.push(itemOptions);
    localStorage.setItem("product", JSON.stringify(productLocalStorage));
    confirmationAlert();

    console.log(productLocalStorage);
  }
});