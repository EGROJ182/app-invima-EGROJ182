async function dataBases(APIURL, APIURL2, APIURL3, APIURL4) {
    try {
        const fetchData = async (url) => {
            const response = await fetch(url);
            return response.json();
        };

        const checkAndSetUrl = async (url) => {
            const data = await fetchData(url);
            if (data.length > 0) {
                return url;
            }
        };

        const urls = [APIURL, APIURL2, APIURL3, APIURL4];

        for (const url of urls) {
            const selectedUrl = await checkAndSetUrl(`${url}?$select=expediente,producto,titular,registrosanitario,fechavencimiento,
            estadoregistro,consecutivocum,cantidadcum,descripcioncomercial,estadocum,unidad,atc,descripcionatc,
            viaadministracion,concentracion,principioactivo,unidadmedida,cantidad,formafarmaceutica 
            &$where=expediente='${expedient.value}'`);
            if (selectedUrl) {
                // Si se encuentra un resultado, puedes actualizar variables o hacer lo que necesites aquí
                return url;
            }
        }

        // Mostrar un mensaje si no se encontraron resultados
        div_response.innerHTML = `<div id="response" style="color: white; font-weight: 600; text-shadow: black 2px 2px 3px;">
                                        No se encontraron resultados.
                                   </div>`;
        span.innerText = "";
    } catch (error) {
        // Manejar errores en la solicitud
        console.error('Error fetching data:', error);
    }
}

function colorStatusInvima(status_invima) {
    console.log(status_invima.toUpperCase())
    if(status_invima.toUpperCase()==="VIGENTE"){
        return '<strong style="color: green;">${firstResult.estadoregistro}</strong>';
    }
    else if(status_invima.toUpperCase()==="EN TRAMITE RENOV"){
        return '<strong style="color: blue;">${firstResult.estadoregistro}</strong>';
    }
    else {
        return '<strong style="color: red;">${firstResult.estadoregistro}</strong>';
    }
}