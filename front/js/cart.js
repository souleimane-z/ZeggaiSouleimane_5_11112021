let productLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(productLocalStorage);


cart();

function cart() {
    if ( productLocalStorage.lenght > 0) { 
      let cartTable = ""; 

    for ( let x = 0 ; x < productLocalStorage.lenght; x++ ) {
        cartTable += 
        ` <article class="cart__item" data-index = "${x}">
        <div class="cart__item__img">
          <img src="${productLocalStorage[x].imageUrl}" alt="${productLocalStorage[x].alt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__titlePrice">
            <h2>${productLocalStorage[x].itemName}</h2>
            <p class="itemTotal">${productLocalStorage[x].price * productLocalStorage[x].productQuantity} euros</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productRegister[x].productQuantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
    }

}
}