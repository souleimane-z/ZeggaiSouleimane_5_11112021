

let productLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(productLocalStorage);


const cartContent = document.getElementById("cart__items");
//console.log(cartContent);


const formContact = document.querySelector(".cart__order__form");
/*
 *
 *  Function that deletes products from the cart 
 * 
 */

// Calcule de la quantité total
function computeQuantity() {
  let totalQuantity = 0;
  const itemQuantity = document.querySelectorAll(".itemQuantity");
  const quantityAtTheEnd = document.querySelector("#totalQuantity");
  itemQuantity.forEach((quantity) => {
    totalQuantity += parseInt(quantity.value);
  });
  quantityAtTheEnd.innerText = totalQuantity;
}

// Calcule du prix total
function computePrice() {
  let totalPrice = 0;
  const itemPrices = document.querySelectorAll(".newPrice");
  const finalPrice = document.querySelector("#totalPrice");
  itemPrices.forEach((price) => {
    totalPrice += parseInt(price.innerText);
  });
  finalPrice.innerText = totalPrice;
}
// Appel de la fonction "Supprimer"
function deleteItem(btn) {
  const deleteButton = document.querySelectorAll(".deleteItem");
  let index = [...deleteButton].indexOf(btn);
  productLocalStorage.splice(index, 1);
  localStorage.setItem("produit", JSON.stringify(productLocalStorage));
  cartTable();
  computeQuantity();
  computePrice();
  
    location.reload();
}

function deleteListener() {
  const deleteButton = document.querySelectorAll(".deleteItem");
  deleteButton.forEach((btn) => {
    btn.addEventListener("click", () => deleteItem(btn));
  });
}

// prix qui change en fonction de la quantité
function priceChangesWithQuantity() {
  quantityTotal = 0;
  const itemQuantity = document.querySelectorAll(".itemQuantity"); //itemQuantity tableau d'une collection d'éléments
  const itemPrices = document.querySelectorAll(".newPrice");
  itemQuantity.forEach((quantity) => {
    quantity.addEventListener("change", (e) => {
      let index = [...itemQuantity].indexOf(quantity);
      productLocalStorage[index].quantity = parseInt(e.target.value);
      let newPrice = productLocalStorage[index].price * productLocalStorage[index].quantity;
      localStorage.setItem("produit", JSON.stringify(productLocalStorage));

      itemPrices[index].innerText = `${newPrice} €`;
      computeQuantity();
      computePrice();
    });
  });
} 

// affichage du produit dans la page panier grâce au HTML
function cartTable() {
  document.querySelector("#cart__items").innerHTML = "";

  productLocalStorage.forEach((product) => {
    document.querySelector("#cart__items").innerHTML += `
                    <article class="cart__item" data-id="${product.id}">
                        <div class="cart__item__img">
                        <img src="${product.image}" alt="Photographie d'un canapé">
                        </div>
                        <div class="cart__item__content">
                        <div class="cart__item__content__titlePrice">
                            <h2>${product.name}</h2>
                            <p>${product.colors}</p>
                            <p class="newPrice">${product.price * product.quantity}€</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                              <p>Qté : </p>
                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}"/>
                            </div>
                            <div class="cart__item__content__settings__delete">
                              <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                        </div>
                    </article>`;
  });

  deleteListener();
}
cartTable();
priceChangesWithQuantity();
computeQuantity();
computePrice();

/*
 *
 * FORM:
 * 
 */

const formBtn = document.getElementById("order");
formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  const contactInput = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    mail: document.querySelector("#email").value,
  };
// permets de valider les champs du formulaire
  const regexTexts = (value) => { return /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(value); };
  const regexAddress = (value) => { return /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/.test(value); };
  const regexMail = (value) => { return /([a-z0-9.\-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value); }


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
      const displayError = document.querySelector("#firstNameErrorMsg");
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
      const displayError = document.querySelector("#lastNameErrorMsg");
      displayError.innerHTML = alertError;
      return false;
    }
  }
  function validationAddress() {
    const address = contactInput.address;
    if (regexAddress(address)) {
      return true;
    } else {
      const alertError = "Les données fournis ne respectent pas les critères des champs";
      const displayError = document.querySelector("#addressErrorMsg");
      displayError.innerHTML = alertError;
      return false;
    }
  }
  function validationCity() {
    const city = contactInput.city;
    if (regexTexts(city)) {
      return true;
    } else {
      const alertError = "Les données fournis ne respectent pas les critères des champs";
      const displayError = document.querySelector("#cityErrorMsg");
      displayError.innerHTML = alertError;
      return false;
    }
  }
  function validationMail() {
    const mail = contactInput.mail;
    if (regexMail(mail)) {
      return true;
    } else {
      const alertError = "Les données fournis ne respectent pas les critères des champs";
      const displayError = document.querySelector("#emailErrorMsg");
      displayError.innerHTML = alertError;
      return false;
    }
  
  }
  // envoi dans le localstorage pour la page de confirmation
  if (
    validationFirstName() &&
    validationLastName() &&
    validationAddress() &&
    validationCity() &&
    validationMail()
  ) { 
    localStorage.setItem("formulaireValues", JSON.stringify(contactInput));
    
    const products = productLocalStorage.map((product) => product.id);
    const orderMade = {
      products,
      contactInput,
    };
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(orderMade),
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
