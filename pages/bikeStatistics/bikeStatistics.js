import { API_URL } from "../../settings.js"
import { sanitizeStringWithTableRows } from "../../utils.js"
const URL = API_URL + "statistics-bike"

export async function initFindBikes(match){
    document.getElementById("btn-fetch-bike").onclick = () => {
        fetchBikeData()
        document.getElementById("btn-fetch-quarterly").style.display = "block"
    }
    if(match?.params?.id){
        const id = match.params.id 
        try{
            loadStats(id)
        } catch (err) {
            document.getElementById("error").innerText = "Der fandtes ingen cykler fra dette år: " + id
        } 
     }

}

async function fetchBikeData(){
    const id = document.getElementById("year").value
    if(!id){
        document.getElementById("error").innerText = "Indtast venligst et årstal"
        return
    }
    try{
        loadStats(id)
    } catch (err){
        console.log("UPS" + err.message)
    }
}

async function loadStats(id){
    try{
        const data = await fetch(URL + "/" + id)
        .then(res => res.json())

        if(Object.keys(data).length === 0){
            throw new Error("Ingen cykler at finde, dette år: " + id)
        }

        loadYNumbers(data)

       loadBikes(data)

       loadQNumbers(data)

       loadQPrices(data)
        
    }catch (e){
        console.error(e)
    }
}

async function loadYNumbers(data){
    const number = data.numberOfSoldBikesYearly
    const price = data.totalPriceYearly

    document.getElementById("totalNumberOfBikes").innerText = number
    document.getElementById("TotalPrice").innerText = price + " kr."
}

async function loadBikes(data){
    const bikes = data.bikesSold
    const rows = bikes.map(bike => `
        <tr>
        <td>${bike.frameNumber}</td>
        <td>${bike.model}</td>
        <td>${bike.brand}</td>
        <td>${bike.price}</td>
        <td>${bike.status}</td>
        <td>${bike.sellDate}</td>
        </tr>
    `).join("")
    document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(rows)
}

async function loadQNumbers(data){

    const quarterNum = data.quarterlyNumbers
    let quart1 = quarterNum[0]
    let quart2 = quarterNum[1]
    let quart3 = quarterNum[2]
    let quart4 = quarterNum[3]

   
    const tableRow = `
    <tr>
    <td>${quart1}</td>
    <td>${quart2}</td>
    <td>${quart3}</td>
    <td>${quart4}</td>
    </tr>`
    document.getElementById("qn-tbl-body").innerHTML = sanitizeStringWithTableRows(tableRow)
}

async function loadQPrices(data){

    const quarterPrice = data.totalPriceQuarterly
    let quart1 = quarterPrice[0]
    let quart2 = quarterPrice[1]
    let quart3 = quarterPrice[2]
    let quart4 = quarterPrice[3]

   
    const tableRow = `
        <tr>
        <td>${quart1 + " ,-"}</td>
        <td>${quart2 + " ,-"}</td>
        <td>${quart3 + " ,-"}</td>
        <td>${quart4 + " ,-"}</td>
        </tr>`
    document.getElementById("qp-tbl-body").innerHTML = sanitizeStringWithTableRows(tableRow)
}

export async function showquarterly(){
    document.getElementById("btn-fetch-quarterly").onclick = () => {
        document.getElementById("qstats").style.display = "block"
    }
} 


