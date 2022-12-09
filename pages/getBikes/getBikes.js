import { API_URL } from "../../settings.js"
import { sanitizeStringWithTableRows } from "../../utils.js"
const URL = API_URL + "bikes"

let bikes = []

export async function load(){
    try{
        bikes = await fetch(`${URL}`)
        .then(res => res.json())
    }catch (e){
        console.error(e)
    }
    createTable()
    document.getElementById("sort-model").onclick = sortingModel
    document.getElementById("sort-brand").onclick = sortingBrand
    document.getElementById("sort-status").onclick = sortingStatus
}

function createTable(){
    const rows = bikes.map(bike => `
    <tr>
      <td>${bike.frameNumber}</td>
      <td>${bike.model}</td>
      <td>${bike.brand}</td>
      <td>${bike.price}</td>
      <td>${bike.status}</td>
      <td>${bike.sellDate || ""}</td>
    `).join("")
    document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(rows)
}

function sortOnModel(a,b){
    if (a.model > b.model) {
        return 1;
      }
    if (a.model < b.model) {
        return -1;
    }
        return 0;
}

function sortOnBrand(a,b){
    if (a.brand > b.brand) {
        return 1;
      }
    if (a.brand < b.brand) {
        return -1;
    }
        return 0;
}

function sortOnStatus(a,b){
    if (a.status > b.status) {
        return 1;
      }
    if (a.status < b.status) {
        return -1;
    }
        return 0;
}

function sortingModel(evt){
    evt.preventDefault()
    bikes = bikes.sort(sortOnModel)
    createTable()
}

function sortingBrand(evt){
    evt.preventDefault()
    bikes = bikes.sort(sortOnBrand)
    createTable()
}

function sortingStatus(evt){
    evt.preventDefault()
    bikes = bikes.sort(sortOnStatus)
    createTable()
}



