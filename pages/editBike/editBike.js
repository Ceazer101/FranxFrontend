import { handleHttpErrors, setStatusMsg, setInfoText} from "../../utils.js"
import { API_URL, FETCH_NO_API_ERROR} from "../../settings.js"


let bikeFrameNumberInput
let bikeInputBrand
let bikeInputModel
let bikeInputPrice
let bikeInputDate
let bikeInputStatus

export async function initFindEditBike(match) {
    document.getElementById("btn-fetch-bike").onclick = getBikeFrameNumberFromInputField
    document.getElementById("btn-submit-edited-bike").onclick = submitEditedBike
    bikeFrameNumberInput = document.getElementById("frame-number")
    bikeInputBrand = document.getElementById("brand")
    bikeInputModel = document.getElementById("model")
    bikeInputPrice = document.getElementById("price")
    bikeInputDate = document.getElementById("buy-date")
    bikeInputStatus = document.getElementById("statusIndicator")
}


function getBikeFrameNumberFromInputField() {
    const frameNumber = document.getElementById("frame-number-bike").value

    if (!frameNumber) {
      setStatusMsg("Venligst indtast et stelnummer", true)
      return
    }
    fetchBike(frameNumber)
  }

  async function fetchBike(frameNumber) {
    setStatusMsg("", false)
    try {
      const bike = await fetch(API_URL + "bikes" + "/" + frameNumber).then(handleHttpErrors)
      renderBike(bike)
      setInfoText("Indtast ændringer og tryk indsend")
    } catch (err) {
      if (err.apiError) {
        setStatusMsg(err.apiError.message, true)
      } else {
        console.log(err.message)
      }
    }
  }

  function renderBike(bike) {
    bikeFrameNumberInput.value = bike.frameNumber;
    bikeInputBrand.value = bike.brand;
    bikeInputModel.value = bike.model;
    bikeInputPrice.value = bike.price;
    bikeInputDate.value = bike.sellDate;
    bikeInputStatus.value = bike.status;
  }

  async function submitEditedBike(evt) {
    evt.preventDefault()
    try {
      const bike = {}
      bike.frameNumber = bikeFrameNumberInput.value
      bike.brand = bikeInputBrand.value
      bike.model = bikeInputModel.value
      bike.price = bikeInputPrice.value
      bike.sellDate = bikeInputDate.value
      bike.status = bikeInputStatus.value
  
      if (bike.frameNumber === "") {
        setStatusMsg(`Manglende felt skal udfyldes`, false)
        return
      }
  
      const options = {}
      options.method = "PUT"
      options.headers = { "Content-type": "application/json" }
      options.body = JSON.stringify(bike)
  
  
      const PUT_URL = API_URL + "bikes" + "/" + bike.frameNumber
      const newBike = await fetch(PUT_URL, options).then(handleHttpErrors)
      clearInputFields()
      setStatusMsg(`Cykel med dette stelnummer '${bike.frameNumber}' er blevet ændret`)
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
    document.getElementById("frame-number").value = ""
   
    bikeFrameNumberInput.value = "";
    bikeInputBrand.value = "";
    bikeInputModel.value = "";
    bikeInputPrice.value = "";
    bikeInputDate.value = "";
    bikeInputStatus.value = "";
  }
