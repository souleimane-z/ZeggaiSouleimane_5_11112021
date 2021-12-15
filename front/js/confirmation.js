const urlProduct = new URLSearchParams(window.location.search); 
const orderId = urlProduct.get("order");
let order = document.querySelector("#orderId");

order.textContent = orderId;

localStorage.clear();