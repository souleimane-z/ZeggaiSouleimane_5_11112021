//  ------------ PAGE PRODUIT ------------ PAGE PRODUIT ------------ PAGE PRODUIT ------------ 

let local = window.location.href;
let url = new URL(local);
let productId = url.searchParams.get("id");

    function getProductInfo() {
        fetch("http://localhost:3000/api/products/" + productId)
          .then(function (response) {
              return response.json();
          })
          .then(function (item) {
              const product = item;
              console.log(product);
              
              let itemImg = document.createElement("img");
              document.querySelector(".item__img").appendChild(itemImg);
              itemImg.src = product.imageUrl;
              itemImg.alt = product.altTxt;
              
              let itemName = document.querySelector('#title');
              itemName.innerHTML = product.name;
              
              let itemPrice = document.querySelector('#price');
              itemPrice.innerHTML = product.price;
              
              let itemDescription = document.querySelector('#description');
              itemDescription.innerHTML = product.description;
              
              for (let colorChoices of product.colors){
                console.log(colorChoices);
                let itemColors = document.createElement("option");
                  document.querySelector("#colors").appendChild(itemColors);
                  itemColors.value = colorChoices;
                  itemColors.innerHTML = colorChoices;
              }
    });


//  ------------ ADD TO CART ------------ ADD TO CART ------------ ADD TO CART ------------ 

     const btnAddToCart = document.getElementById("addToCart");
     btnAddToCart.addEventListener("click", () => {
         let productColor = document.getElementById("colors").value;
         let productQuantity = document.getElementById("quantity").value;
         
         if (productColor == "") {
              alert("Choississez une couleur");
              
          } else if (productQuantity == 0 || productQuantity > 100) {
             alert("Choississez une quantitée valable");
          } else {
              
              let cartContent = localStorage.getItem('cartContent');
              if (cartContent === null){
                 let cartTable = [[productId, productColor, parseInt(productQuantity)]];

                 let cartTableTxt = JSON.stringify(cartTable) 
                 localStorage.setItem('cartContent', cartTableTxt)

             }
             else {
                 let cartTable = JSON.parse(cartContent);
                
                 cartTable.push ([productId, productColor, productQuantity])
                 let cartTableTxt = JSON.stringify(cartTable) 
                 localStorage.setItem('cartContent', cartTableTxt)
            }
            window.location.href = "./cart.html";
        }
    });
}

getProductInfo();