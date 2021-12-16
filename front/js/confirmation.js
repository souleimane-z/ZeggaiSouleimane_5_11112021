const params = new URL(document.location).searchParams;
const orderId = params.get("orderId");

document.getElementById("orderId").textContent = orderId;

localStorage.clear();

/*   
 *
 *
 *   Problèmes : 
 *   peut ajouter des produits égal à 0 ou sans couleurs
 *   Affichage des doublons, les produits de même id ou couleurs ne se synchronise pas
 *   Le numéro de commande ne s'affiche pas
 *   
 *   
 */