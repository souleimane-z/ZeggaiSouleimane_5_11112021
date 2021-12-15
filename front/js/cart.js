/*   
 *   Problème : peut ajouter des produits égal à 0    suppérieurs à 100
 *   Refaire la function delete , ne fonctionnait pas
 *   
 *   Function delete(index) { productLocalStorage.filter( I => I != index) }
 * 
 * 
 *   Mêmes produits dupliqué dans le panier
 */


let productLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(productLocalStorage);

const displayProduct = document.getElementById("cart__items");

/*
 *
 *  Function that deletes products from the cart 
 * 
 */

document.getElementById("cart__items").addEventListener("click", function (e) {
  if (e.target.className === "deleteItem") {
    let productId =
    e.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
    e.target.parentNode.parentNode.parentNode.parentNode.remove();

    productLocalStorage = productLocalStorage.filter(
      (x) => x.id !== productId
    );
    localStorage.setItem("produit", JSON.stringify(productLocalStorage));
    compute();
    location.reload()
  }
  if (e.target.className === "itemQuantity") {
    let productId =
      e.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
    let quantityKanap = productLocalStorage.findIndex(
      (x) => x.id === productId
    );

    productLocalStorage[quantityKanap].quantity = e.target.value;
    
    localStorage.setItem("produit", JSON.stringify(productLocalStorage));
    compute();
  }
});

/*
 *
 * Function that calculates the sum of Quantity & Price
 * 
 */
function compute() {
    let priceTotal = 0;
    let quantityTotal = 0;
    
    for (let t = 0; t < productLocalStorage.length; t++) {
      quantityTotal += parseInt(productLocalStorage[t].quantity);
      priceTotal += parseInt(
        productLocalStorage[t].price * productLocalStorage[t].quantity
      );
    }
    
    document.getElementById("totalQuantity").innerHTML = quantityTotal;
    document.getElementById("totalPrice").innerHTML = priceTotal;
}

/*
 *
 * Function that displays the list of the items in the cart
 * 
 */

let cartTable = [];

    for (i = 0; i < productLocalStorage.length; i++) {
      cartTable +=
        `<article class="cart__item" data-id="${ productLocalStorage[i].id }">
          <div class="cart__item__img">
            <img src="${ productLocalStorage[i].image }" alt="Photographie d'un canapé">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
            <h2>${productLocalStorage[i].name}</h2>
            <p>${productLocalStorage[i].colors}</p>
            <p>${productLocalStorage[i].price} €</p>
            </div>
            <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${ productLocalStorage[i].quantity }>
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
          </div>
        </article>`;
    }

    if (i == productLocalStorage.length) {
      displayProduct.innerHTML = cartTable;
    }

compute();



const formBtn = document.querySelector("#order");
formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  const contactInput = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  const regexTexts = (value) => {
    return /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(value);
  };

  validationFirstName();
  validationLastName();
  validationCity();
  validationAddress();
  validationMail();

  function validationFirstName() {
    const firstName = contactInput.firstName;
    if (regexTexts(firstName)) {
      return true;
    } else {
      const alertError = "Les données fournis ne respectent pas les critères des champs";
      const displayError = document.querySelector("#firstNameAlertError");
      displayError.innerHTML = alertError;
      return false;
    }
  }
  function validationLastName() {
    const lastName = contactInput.lastName;
    if (regexTexts(lastName)) {
      return true;
    } else {
      const alertError = "Les données fournis ne respectent pas les critères des champs";
      const displayError = document.querySelector("#lastNameAlertError");
      displayError.innerHTML = alertError;
      return false;
    }
  }
  function validationAddress() {
    const adressInput = contactInput.address;
    if (/^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/.test(adressInput)) {
      return true;
    } else {
      const alertError = "Les données fournis ne respectent pas les critères des champs";
      const displayError = document.querySelector("#addressAlertError");
      displayError.innerHTML = alertError;
      return false;
    }
  function validationCity() {
    const city = contactInput.city;
    if (regexTexts(city)) {
      return true;
    } else {
      const alertError = "Les données fournis ne respectent pas les critères des champs";
      const displayError = document.querySelector("#cityAlertError");
      displayError.innerHTML = alertError;
      return false;
    }
  }
  function validationMail() {
    const mail = contactInput.email;
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/.test(mail)) {
      return true;
    } else {
      const alertError = "Les données fournis ne respectent pas les critères des champs";
      const displayError = document.querySelector("#emailAlertError");
      displayError.innerHTML = alertError;
      return false;
    }
  }
  }
  if (
    validationFirstName() &&
    validationLastName() &&
    validationLastName() &&
    validationAddress() &&
    validationMail()
  ) {
    localStorage.setItem("formulaireValues", JSON.stringify(contactInput));
    
    const products = productRegister.map((product) => product.id);
    const toSend = {
      products,
      contactInput,
    };
    
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(toSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem("order", JSON.stringify(response));
        document.location.href =
          "confirmation.html?orderId=" + response.orderId;
      });
  }
});


