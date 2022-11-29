import { API_URL } from "../../settings.js"
import { sanitizeStringWithTableRows } from "../../utils.js"
const URL = API_URL + "statistics-bike"

export async function initFindBikes(match){
    document.getElementById("btn-fetch-bike").onclick = fetchBikeData
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

 

export async function loadStats(id){
    try{
        const data = await fetch(URL + "/" + id)
        .then(res => res.json())

        if(Object.keys(data).length === 0){
            throw new Error("Ingen cykler at finde, dette år: " + id)
        }
        //document.getElementById("year").innerText = data.id

        const bikes = data.bikesSold

        const number = data.numberOfSoldBikesYearly
        const price = data.totalPriceYearly

        document.getElementById("totalNumberOfBikes").innerText = number
        document.getElementById("TotalPrice").innerText = price 

        const rows = bikes.map(bike => `
        <tr>
        <td>${bike.frameNumber}</td>
        <td>${bike.model}</td>
        <td>${bike.brand}</td>
        <td>${bike.price}</td>
        <td>${bike.status}</td>
        <td>${bike.sellDate}</td>
        `).join("")
        document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(rows)
        
    }catch (e){
        console.error(e)
    }

    
}

