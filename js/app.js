import {Ui} from "../js/UI.js";
const ui = new Ui();

// Muestra las gasolineras del país
ui.showGasolineEstablishments();

const search = document.querySelector("#buscar input");
// Muestra los resultados relacionados según lo que se escriba
search.addEventListener("input", () => {
   if(search.value.length > 1){
      ui.showRelated(search.value);
   }else{
      ui.showGasolineEstablishments();
   }
});