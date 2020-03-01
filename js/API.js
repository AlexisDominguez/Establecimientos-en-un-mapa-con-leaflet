export class Api{

    // Este método se encarga de mostrar distintos datos acerca de las gasolineras
    // del pais
    async getGasolineEstablishmentsPrice(){
        
        const totalDataEntries = 100;   // Límita el total de resultados a 100

        const gasolinePrice = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${totalDataEntries}`);

        const data = await gasolinePrice.json();

        return data;
    }

}