import { API_URL } from "../../settings.js"
import { sanitizeStringWithTableRows } from "../../utils.js"
const URL = API_URL + "products"

let products = []; 

export async function loadProducts(){
    try{
        products = await fetch(`${URL}`)
        .then(res => res.json())
    }catch (e){
        console.error(e)
    }

    const rows = products.map(product => `
    <tr>
      <td>${product.productNumber}</td>
      <td>${product.productName}</td>
      <td>${product.productDesc}</td>
      <td>${product.distributor}</td>
      <td>${product.taxCode}</td>
      <td>${product.numberOfUnits}</td>
      <td>${product.unitPrice}</td>
    `).join("")
    document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(rows)
}