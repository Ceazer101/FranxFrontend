import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import {
    setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from "./utils.js"

import { load } from "./pages/getBikes/getBikes.js"
import { initMakeBike, initShowInfo } from "./pages/addBike/addBike.js"
import { initFindEditBike } from "./pages/editBike/editBike.js"
import { initFindBikes } from "./pages/bikeStatistics/bikeStatistics.js"
import { loadProducts } from "./pages/getProducts/getProducts.js"
import { initMakeProduct } from "./pages/addProduct/addProduct.js"

window.addEventListener("load", async () => {

    const templatehome = await loadHtml("./pages/home/home.html")
    const templateAddBike = await loadHtml("./pages/addBike/addBike.html")
    const templateGetBikes = await loadHtml("./pages/getBikes/getBikes.html")
    const templateEditBikes = await loadHtml("./pages/editBike/editBike.html")
    const templateBikeStatistics = await loadHtml("./pages/bikeStatistics/bikeStatistics.html")
    const templateGetProducts = await loadHtml("./pages/getProducts/getProducts.html")
    const templateAddProduct = await loadHtml("./pages/AddProduct/AddProduct.html")
  
    adjustForMissingHash()
  
    const router = new Navigo("/", { hash: true });
    //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
    window.router = router
  
    router
      .hooks({
        before(done, match) {
          setActiveLink("menu", match.url)
          done()
        }
      })
      .on({
    
        "/": () => renderTemplate(templatehome, "content"),
  
        "/addBike": () => {
          renderTemplate(templateAddBike, "content")
          initMakeBike()
          initShowInfo()
        },
  
        "/showBikes": () => {
          renderTemplate(templateGetBikes, "content")
          load()
        },

        "/editBikes": () => {
          renderTemplate(templateEditBikes, "content")
          initFindEditBike()
      
        },
        
        "/bikeStatistics": () => {
          renderTemplate(templateBikeStatistics, "content")
          initFindBikes()
        },

        "/showProducts": () => {
          renderTemplate(templateGetProducts, "content")
          loadProducts()
        },

        "/addProduct": () => {
          renderTemplate(templateAddProduct, "content")
          initMakeProduct()
        
        },
     
      })
      .notFound(() => {
        renderTemplate(templateNotFound, "content")
      })
      .resolve()
  });
  
  
  window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
      + ' Column: ' + column + ' StackTrace: ' + errorObj);
  }