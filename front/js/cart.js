let elementStored = JSON.parse(localStorage.getItem("cartContent"));
console.log(elementStored);

function cart() {
  if (elementStored == 0){
    let noProductInCart = document.querySelector("#cart__items");
    noProductInCart.innerHTML = "Il n'y a rien ici &#128532;";

  } else { for (let cartContent in elementStored) {

    }
  }
}