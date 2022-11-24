const URL = "http://localhost:8080/api/bikes"

let bikes = []; 

export async function load(){
    try{
        bikes = await fetch(`${URL}`)
        .then(res => res.json())
    }catch (e){
        console.error(e)
    }

    const rows = bikes.map(bike => `
    <tr>
      <td>${bike.frameNumber}</td>
      <td>${bike.model}</td>
      <td>${bike.brand}</td>
      <td>${bike.price}</td>
      <td>${bike.status}</td>
      <td>${bike.sellDate}</td>
    `).join("")
    document.getElementById("tbl-body").innerHTML = rows
}

load()