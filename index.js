import "https://unpkg.com/navigo"  //Will create the global Navigo object used below

import {
    setActiveLink, adjustForMissingHash, renderTemplate, loadHtml
} from "./utils.js"

window.addEventListener("load", async () => {

    const templatehome = await loadHtml("./projectPages/home.html")
    const templateAbout = await loadHtml("./projectPages/about/about.html")
    const templateReservation = await loadHtml("./projectPages/reservation/reservationData.html")
    const templateBooking = await loadHtml("./projectPages/reservation/booking.html")
    const templateActivities = await loadHtml("./projectPages/activities/activityOverview.html")
    const templateNotFound = await loadHtml("./pages/notFound/notFound.html")
    const templateFindReservation = await loadHtml("./ProjectPages/reservation/findReservation.html")
  
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
  
        "/addBike": () => renderTemplate(templateAbout, "content"),
  
        "/showBikes": () => {
          renderTemplate(templateReservation, "content")
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