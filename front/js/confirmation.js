const productIdUrl = window.location.search;
const urlProduct = new URLSearchParams(productIdUrl); 
const orderId = urlProduct.get("order");
let order = document.querySelector("#orderId");

order.textContent = orderId;

localStorage.clear();