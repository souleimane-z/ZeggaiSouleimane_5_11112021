// ---- Fetch API ----

fetch('http://localhost:3000/api/products')
.then((res) => res.json())

.then((kanap)=> {
    apiData = kanap;
    getAllProducts(kanap);
}) ;


function getAllProducts(apiData) {
    console.log(apiData);
  
    for (index in apiData) {
      const { _id, imageUrl, altTxt, name, description } = apiData[index];
      document.getElementById("items")
      .innerHTML += `<a href="./product.html?id=${_id}">
        <article>
          <img src="${imageUrl}" alt="${altTxt}">
          <h3 class="productName">${name}</h3>
          <p class="productDescription">${description}</p>
        </article>
      </a>`;
    }
  };

  