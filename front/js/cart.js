

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
    compute();