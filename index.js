import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import {
  setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from "./utils.js"

import { load } from "./pages/getBikes/getBikes.js"
import { initMakeBike, initShowInfo } from "./pages/addBike/addBike.js"
import { initFindEditBike } from "./pages/editBike/editBike.js"
import { initFindBikes, showquarterly } from "./pages/bikeStatistics/bikeStatistics.js"
import { loadProducts } from "./pages/getProducts/getProducts.js"
import { initMakeProduct } from "./pages/addProduct/addProduct.js"
import { initFindEditProduct } from "./pages/editProduct/editProduct.js"

window.addEventListener("load", async () => {

  const templateAddBike = await loadHtml("./pages/addBike/addBike.html")
  const templateGetBikes = await loadHtml("./pages/getBikes/getBikes.html")
  const templateEditBikes = await loadHtml("./pages/editBike/editBike.html")
  const templateBikeStatistics = await loadHtml("./pages/bikeStatistics/bikeStatistics.html")
  const templateGetProducts = await loadHtml("./pages/getProducts/getProducts.html")
  const templateAddProduct = await loadHtml("./pages/addProduct/addProduct.html")
  const templateEditProduct = await loadHtml("./pages/editProduct/editProduct.html")

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

      "/": () => {
        renderTemplate(templateAddBike, "content")
        initMakeBike()
        initShowInfo()
      },

      "/addBike": () => {
        renderTemplate(templateAddBike, "content")
        initMakeBike()
        initShowInfo()
      },

      "/showBikes": (n) => {
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
        showquarterly()
      },

      "/showProducts": () => {
        renderTemplate(templateGetProducts, "content")
        loadProducts()
      },

      "/addProduct": () => {
        renderTemplate(templateAddProduct, "content")
        initMakeProduct()

      },

      "/editProduct": () => {
        renderTemplate(templateEditProduct, "content")
        initFindEditProduct()
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