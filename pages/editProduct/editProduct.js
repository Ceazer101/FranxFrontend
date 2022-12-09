import { handleHttpErrors, setStatusMsg, setInfoText } from "../../utils.js"
import { API_URL, FETCH_NO_API_ERROR } from "../../settings.js"


let productNumberInput
let productNameInput
let productDescInput
let distributorInput
let taxCodeInput
let numberOfUnitsInput
let unitPriceInput

export async function initFindEditProduct(match) {
  document.getElementById("btn-fetch-product").onclick = getProductNumberFromInputField
  document.getElementById("btn-submit-edited-product").onclick = submitEditedProduct
  productNumberInput = document.getElementById("product-number")
  productNameInput = document.getElementById("product-name")
  productDescInput = document.getElementById("product-description")
  distributorInput = document.getElementById("distributor")
  taxCodeInput = document.getElementById("tax-code")
  numberOfUnitsInput = document.getElementById("number-of-units")
  unitPriceInput = document.getElementById("unit-price")
}


function getProductNumberFromInputField() {
  const productNumber = document.getElementById("product-id-number").value

  if (!productNumber) {
    setStatusMsg("Venligst indtast et produkt nummer", true)
    return
  }
  fetchProduct(productNumber)
}

async function fetchProduct(productNumber) {
  setStatusMsg("", false)
  try {
    const product = await fetch(API_URL + "products" + "/" + productNumber).then(handleHttpErrors)
    renderProduct(product)
    setInfoText("Indtast ændringer og tryk indsend")
  } catch (err) {
    if (err.apiError) {
      setStatusMsg(err.apiError.message, true)
    } else {
      console.log(err.message)
    }
  }
}

function renderProduct(product) {
  productNumberInput.value = product.productNumber;
  productNameInput.value = product.productName;
  productDescInput.value = product.productDesc;
  distributorInput.value = product.distributor;
  taxCodeInput.value = product.taxCode;
  numberOfUnitsInput.value = product.numberOfUnits;
  unitPriceInput.value = product.unitPrice;
}

async function submitEditedProduct(evt) {
  evt.preventDefault()
  try {
    const product = {}
    product.productNumber = productNumberInput.value
    product.productName = productNameInput.value
    product.productDesc = productDescInput.value
    product.distributor = distributorInput.value
    product.taxCode = taxCodeInput.value
    product.numberOfUnits = numberOfUnitsInput.value
    product.unitPrice = unitPriceInput.value

    if (product.productNumber === "") {
      setStatusMsg(`Manglende felt skal udfyldes`, false)
      return
    }

    const options = {}
    options.method = "PUT"
    options.headers = { "Content-type": "application/json" }
    options.body = JSON.stringify(product)


    const PUT_URL = API_URL + "products" + "/" + product.productNumber
    const newProduct = await fetch(PUT_URL, options).then(handleHttpErrors)
    clearInputFields()
    setStatusMsg(`Cykel med dette stelnummer '${product.productNumber}' er blevet ændret`)
  } catch (err) {
    if (err.apiError) {
      setStatusMsg(err.apiError.message, true)
    } else {
      setStatusMsg(err.message + FETCH_NO_API_ERROR, true)
      console.log(err.message + FETCH_NO_API_ERROR)
    }
  }
}

function clearInputFields() {
  document.getElementById("product-number").value = ""

  productNumberInput.value = "";
  productNameInput.value = "";
  productDescInput.value = "";
  distributorInput.value = "";
  taxCodeInput.value = "";
  numberOfUnitsInput.value = "";
  unitPriceInput.value = "";
}
