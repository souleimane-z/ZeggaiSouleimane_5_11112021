  let productLocalStorage = JSON.parse(localStorage.getItem("product"));
  console.log(productLocalStorage);

  const order = document.querySelector("#order");


/*
  Variables Regex, permet de valider les champs du formulaire
*/
  let regexTexts = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;  // Expression régulière : Nom / Prénom / Ville
  let regexAddress = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;  // Expression régulière : Adresse Postale
  let regexMail = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;  // Expression régulière : Adresse eMail

/*
  Variables pour récupérer les id des champs de formulaire
*/
  const firstName = document.querySelector("#firstName");
  const lastName = document.querySelector("#lastName");
  const address = document.querySelector("#address");
  const city = document.querySelector("#city");
  const email = document.querySelector("#email");


/*
  Calcule de la quantité total
*/
  function computeQuantity() {
    let totalQuantity = 0;
    const itemQuantity = document.querySelectorAll(".itemQuantity");
    const finalQuantity = document.querySelector("#totalQuantity");
    itemQuantity.forEach((quantity) => {
      totalQuantity += parseInt(quantity.value);
    });
    finalQuantity.innerText = totalQuantity;
  }

/*
  Calcule du prix total
*/
  function computePrice() {
    let totalPrice = 0;
    const itemPrices = document.querySelectorAll(".newPrice");
    const finalPrice = document.querySelector("#totalPrice");
    itemPrices.forEach((price) => {
      totalPrice += parseInt(price.innerText);
    });
    finalPrice.innerText = totalPrice;
  }

/*
  Fonction "Supprimer"
*/
  function deleteItem(btn) {
    const deleteButton = document.querySelectorAll(".deleteItem");
    let index = [...deleteButton].indexOf(btn);
    productLocalStorage.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(productLocalStorage));
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

/*
  prix et quantité de la totalité des articles dans le panier
*/
  function computeAll() {
    totalQuantity = 0;
    const itemQuantity = document.querySelectorAll(".itemQuantity");
    const itemPrices = document.querySelectorAll(".newPrice");
    itemQuantity.forEach((quantity) => {
      quantity.addEventListener("change", (e) => {
        let index = [...itemQuantity].indexOf(quantity);
        productLocalStorage[index].quantity = parseInt(e.target.value);
        let newPrice = productLocalStorage[index].price * productLocalStorage[index].quantity;
        localStorage.setItem("product", JSON.stringify(productLocalStorage));

        itemPrices[index].innerText = `${newPrice} €`;
        computeQuantity();
        computePrice();
      });
    });
  } ;

/*
  Affichage du produit dans la page panier grâce au HTML
*/
  function cartTable() {
    
    document.getElementById("cart__items").innerHTML =  ""

    productLocalStorage.forEach((product) => {
      
    document.getElementById("cart__items").innerHTML += `
                      <article class="cart__item" data-id="${product._id}">
                          <div class="cart__item__img">
                          <img src="${product.imageUrl}" alt="${product.altTxt}">
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
  computeAll();
  computeQuantity();
  computePrice();


  /*
  *
    FORMULAIRE:
  *
  */

// Validation prénom
firstName.addEventListener("input", (event) => {
  event.preventDefault();
  if (regexTexts.test(firstName.value) == false || firstName.value == "") {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "le prénom ne doit contenir que des lettre et des tirets";
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
  }
});

// Validation nom
lastName.addEventListener("input", (event) => {
  event.preventDefault();
  if (regexTexts.test(lastName.value) == false || lastName.value == "") {
    document.getElementById("lastNameErrorMsg").innerHTML = 
      "le nom ne doit contenir que des lettre et des tirets";
    return false;
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation adresse
address.addEventListener("input", (event) => {
  event.preventDefault();
  if (regexAddress.test(address.value) == false || address.value == "") {
    document.getElementById("addressErrorMsg").innerHTML = 
      "Adresse non valide";
    return false;
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation ville
city.addEventListener("input", (event) => {
  event.preventDefault();
  if (regexTexts.test(city.value) == false || city.value == "") {
    document.getElementById("cityErrorMsg").innerHTML = 
      "le nom de la ville ne doit contenir que des lettre et des tirets";
    return false;
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation email
email.addEventListener("input", (event) => {
  event.preventDefault();
  if (regexMail.test(email.value) == false || email.value == "") {
    document.getElementById("emailErrorMsg").innerHTML = 
      "Email non valide";
    return false;
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
    return true;
  }
});


order.addEventListener("click", (e) => {
  e.preventDefault(); 
  

  let contact = {
    firstName: firstName.value, 
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

/*
  Si le formulaire est vide alors : message erreur
*/
if (
  firstName.value === "" ||
  lastName.value === "" ||
  address.value === "" ||
  city.value === "" ||
  email.value === ""
) {
  window.confirm(
    "Vous devez remplir le formulaire pour confirmer la commande"
  );

/*
  Si le formulaire est mal rempli alors : message erreur
*/
} else if (
  regexTexts.test(firstName.value) == false ||
  regexTexts.test(lastName.value) == false ||
  regexAddress.test(address.value) == false ||
  regexTexts.test(city.value) == false ||
  regexMail.test(email.value) == false
) {
  window.confirm("Le formulaire est mal rempli, veuillez le vérifier. Merci");
} else {
  let products = [];
  productLocalStorage.forEach((order) => {
    products.push(order._id);
  }); 
  // si tout est bien rempli alors envoi vers localStorage
  

  let orderMade = { contact, products };
  

  fetch((`http://localhost:3000/api/products/order`),{
          method: "POST",
          headers :{'Accept':'application/json','Content-type':'application/json'
          },
          body : JSON.stringify(orderMade)
      })
      .then(res =>{
          return res.json();
      })
      .then((confirm)=>{
        //localStorage.removeItem('product');
        window.location.replace(`confirmation.html?order=${confirm.orderId}`);
      })
      .catch((error)=>{
          //alert(error);
          console.log(error);
      })
    }
});


