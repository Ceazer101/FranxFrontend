import { API_URL} from "../../settings.js"
const URL = API_URL + "products"

export function initMakeProduct(){
    document.getElementById("btn-submit-product").onclick = ()=>{
        createNewProduct()
    }
}

    function createNewProduct(){
        const newProduct = { }
        newProduct.productNumber = document.getElementById("product-number").value
        newProduct.productName = document.getElementById("product-name").value
        newProduct.productDesc = document.getElementById("product-description").value
        newProduct.distributor = document.getElementById("distributor").value
        newProduct.taxCode = document.getElementById("tax-code").value
        newProduct.numberOfUnits = document.getElementById("number-of-units").value
        newProduct.unitPrice = document.getElementById("unit-price").value

    const option = {}
        option.method = 'POST'
        option.headers = {'Accept': 'application/json', 'Content-type': 'application/json'}
        option.body = JSON.stringify(newProduct)
    fetch(URL, option)
    .then(r => r.json())
}