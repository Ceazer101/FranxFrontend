import { API_URL } from "../../settings.js"
import { setStatusMsg } from "../../utils.js"
const URL = API_URL + "bikes"

export function initMakeBike() {
    document.getElementById("btn-submit").onclick = () => {
        createNewBike()
        clearInputFields()
    }
    setStatusMsg("", false)
}

function createNewBike() {
    const newBike = {}
    newBike.frameNumber = document.getElementById("framenumber").value
    newBike.model = document.getElementById("model").value
    newBike.brand = document.getElementById("brand").value
    newBike.price = document.getElementById("price").value
    newBike.status = document.getElementById("status-select").value

    const option = {}
    option.method = 'POST'
    option.headers = { 'Accept': 'application/json', 'Content-type': 'application/json' }
    option.body = JSON.stringify(newBike)
    fetch(URL, option)
        .then(r => r.json())

}

export function initShowInfo() {
    document.getElementById("status").onclick = () => {
        document.getElementById("status-alert").style.display = "none";
    }
}

function clearInputFields() {
    document.getElementById("framenumber").value = ""
    document.getElementById("brand").value = ""
    document.getElementById("model").value = ""
    document.getElementById("price").value = ""
    document.getElementById("status").value = ""
    setStatusMsg('Cykel er blevet tilføjet')
}