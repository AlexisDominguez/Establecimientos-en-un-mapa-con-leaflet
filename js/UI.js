import {Api} from "../js/API.js";

export class Ui {
   constructor() {

        // Inicializa el mapa al momento de ejecutar la clase Ui
        this.map = this.initializeMap();

        this.api = new Api();

        // Crea una nueva capa de información sobre el mapa
        this.markers = new L.LayerGroup();

   }
   // Inicializa el mapa y obtiene sus propiedades
   initializeMap() {
        const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
        const mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map);
        return map;

   }

   // Muestra las gasolineras del país
   showGasolineEstablishments(){
       this.api.getGasolineEstablishmentsPrice()
         .then( data => {
            const results = data.results;

            this.showMarkers(results);
         })
         .catch(error => console.log(error));
   }

   // Se encarga de dibujar los markers en la posición de cada gasolinera
   showMarkers(data){
      // Limpia los markers anteriores
      this.markers.clearLayers();
   
      // Este ciclo for itera sobre la cantidad de datos que retorna el fetch
      for(let i = 0, n = data.length; i < n; i++ ){
         const {latitude, longitude, calle, regular, premium} = data[i];

         // Define la estructura del popup al hacer click sobre un marker
         const popup = L.popup().setContent(
            `<b>Calle:</b> ${calle}<br>
             <b>Regular:</b> $${regular}<br>
             <b>Premium:</b> $${premium}<br>`
         );

         // Define la posición en la que se colocará el marker
         const marker = new L.Marker([
            parseFloat(latitude),
            parseFloat(longitude)
         ]).bindPopup(popup);    // Adjunta el popup al marker
         
         // Crea una nueva capa de markers
         this.markers.addLayer(marker);
      }
      //Añade los markers al mapa
      this.markers.addTo(this.map);
   }

   // Se encarga de mostrar los datos relacionados en la búsqueda
   showRelated(search){
      this.api.getGasolineEstablishmentsPrice()
         .then(data =>{
            const results = data.results;

            // Filtra los resultados
            this.filterRelatedResults(results, search);
         })
   }

   // Se encarga de filtrar los resultados en relación a la busqueda
   filterRelatedResults(results, search){
      const filter = results.filter(filter => filter.calle.indexOf(search) !== -1);
      
      // Muestra los markers con los datos del filtro
      this.showMarkers(filter);
   }
}