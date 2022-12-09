import { API_URL } from "../../settings.js"
import { sanitizeStringWithTableRows } from "../../utils.js"
const URL = API_URL + "products"

let products = [];

export async function loadProducts() {
    try {
        products = await fetch(`${URL}`)
            .then(res => res.json())
    } catch (e) {
        console.error(e)
    }

    createTable()
    document.getElementById("sortProductNumber").onclick = sortingProductNumber
    document.getElementById("sortProductName").onclick = sortingProductName
    document.getElementById("sortDestributer").onclick = sortingDistributer
    document.getElementById("sortTaxCode").onclick = sortingTaxCode
    document.getElementById("sortUnits").onclick = sortingUnits
    document.getElementById("sortUnitPrice").onclick = sortingUnitPrice

}

function createTable() {
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

function sortOnProductNumber(a, b) {
    if (a.productNumber > b.productNumber) {
        return 1;
    }
    if (a.productNumber < b.productNumber) {
        return -1;
    }
    return 0;
}

function sortOnProductName(a, b) {
    if (a.productName > b.productName) {
        return 1;
    }
    if (a.productName < b.productName) {
        return -1;
    }
    return 0;
}

function sortOnDistributer(a, b) {
    if (a.distributor > b.distributor) {
        return 1;
    }
    if (a.distributor < b.distributor) {
        return -1;
    }
    return 0;
}

function sortOnTaxCode(a, b) {
    if (a.taxCode > b.taxCode) {
        return 1;
    }
    if (a.taxCode < b.taxCode) {
        return -1;
    }
    return 0;
}

function sortOnUnits(a, b) {
    if (a.numberOfUnits > b.numberOfUnits) {
        return 1;
    }
    if (a.numberOfUnits < b.numberOfUnits) {
        return -1;
    }
    return 0;
}

function sortOnUnitPrice(a, b) {
    if (a.unitPrice > b.unitPrice) {
        return 1;
    }
    if (a.unitPrice < b.unitPrice) {
        return -1;
    }
    return 0;
}


function sortingProductNumber(evt) {
    evt.preventDefault()
    products = products.sort(sortOnProductNumber)
    createTable()
}

function sortingProductName(evt) {
    evt.preventDefault()
    products = products.sort(sortOnProductName)
    createTable()
}

function sortingDistributer(evt) {
    evt.preventDefault()
    products = products.sort(sortOnDistributer)
    createTable()
}

function sortingTaxCode(evt) {
    evt.preventDefault()
    products = products.sort(sortOnTaxCode)
    createTable()
}

function sortingUnits(evt) {
    evt.preventDefault()
    products = products.sort(sortOnUnits)
    createTable()
}

function sortingUnitPrice(evt) {
    evt.preventDefault()
    products = products.sort(sortOnUnitPrice)
    createTable()
}
