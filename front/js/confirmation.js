const  url = new URL(document.location);
const orderId = url.get("orderId");

document.getElementById("orderId").textContent = orderId;