import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import {
    setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from "./utils.js"

import { load } from "./pages/getBikes/getBikes.js"
import { initMakeBike, initShowInfo } from "./pages/addBike/addBike.js"

window.addEventListener("load", async () => {

    const templatehome = await loadHtml("./pages/home/home.html")
    const templateAddBike = await loadHtml("./pages/addBike/addBike.html")
    const templateGetBikes = await loadHtml("./pages/getBikes/getBikes.html")
  
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