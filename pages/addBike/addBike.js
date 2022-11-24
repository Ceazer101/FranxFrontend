import { API_URL} from "../../settings.js"
const URL = API_URL + "bikes"

export function initMakeBike(){
    console.log("hello")
    document.getElementById("btn-submit").onclick = ()=>{

        createNewBike()

    }
    console.log(document.getElementById("btn-submit"))
}

    function createNewBike(){
        const newBike = { }
        newBike.frameNumber = document.getElementById("framenumber").value
        newBike.model = document.getElementById("model").value
        newBike.brand = document.getElementById("brand").value
        newBike.price = document.getElementById("price").value
        newBike.status = document.getElementById("status").value
        newBike.sellDate = document.getElementById("sellDate").value

        console.log(newBike)

    const option = {}
        option.method = 'POST'
        option.headers = {'Accept': 'application/json', 'Content-type': 'application/json'}
        option.body = JSON.stringify(newBike)
    fetch(URL, option)
    .then(r => r.json())

}