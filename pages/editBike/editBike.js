import { handleHttpErrors, setStatusMsg, setInfoText } from "../../utils.js"
import { API_URL, FETCH_NO_API_ERROR } from "../../settings.js"


let bikeFrameNumberInput
let bikeInputBrand
let bikeInputModel
let bikeInputPrice
let bikeInputStatus

export async function initFindEditBike() {
  document.getElementById("btn-fetch-bike").onclick = getBikeFrameNumberFromInputField
  document.getElementById("btn-submit-edited-bike").onclick = submitEditedBike
  document.getElementById("btn-delete-bike").onclick = deleteBike
  bikeFrameNumberInput = document.getElementById("frame-number")
  bikeInputBrand = document.getElementById("brand")
  bikeInputModel = document.getElementById("model")
  bikeInputPrice = document.getElementById("price")
  bikeInputStatus = document.getElementById("status-select")
  setStatusMsg("", false)

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
    setInfoText("Indtast ├Žndringer og tryk indsend")
  } catch (err) {
    if (err.apiError) {
      setStatusMsg(err.apiError.message, true)
    } else {
      console.log(err.message)
    }
  }
}

async function deleteBike() {
  try {
    const idForBikeToDelete = document.getElementById("frame-number").value
    if (idForBikeToDelete === "") {
      setStatusMsg("No bike found to delete", true)
      return
    }
    const options = {}
    options.method = "DELETE"
    await fetch(API_URL + "bikes" + "/" + idForBikeToDelete, options)
    setStatusMsg("Bike succesfully deleted", false)
    clearInputFields()
  }
  catch (err) {
    if (err.apiError) {
      setStatusMsg(err.apiError.message, true)
    }
    else {
      setStatusMsg(err.message + FETCH_NO_API_ERROR)
      console.log(err.message + FETCH_NO_API_ERROR)
    }
  }
}

function renderBike(bike) {
  bikeFrameNumberInput.value = bike.frameNumber;
  bikeInputBrand.value = bike.brand;
  bikeInputModel.value = bike.model;
  bikeInputPrice.value = bike.price;
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
    setStatusMsg(`Cykel med dette stelnummer '${bike.frameNumber}' er blevet ├Žndret`)
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
  document.getElementById("frame-number-bike").value = ""
  document.getElementById("frame-number").value = ""

  bikeFrameNumberInput.value = "";
  bikeInputBrand.value = "";
  bikeInputModel.value = "";
  bikeInputPrice.value = "";
  bikeInputStatus.value = "";
}
