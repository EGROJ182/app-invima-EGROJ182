const check_consecutive = document.getElementById('read-consecutive');
const check_name = document.getElementById('read-name');
const check_principle = document.getElementById('read-principle');
const btn_query = document.getElementById('btn-get-one');
let url = '';
let count_div = 1;

// Consultar un expediente por consecutivo --- GET ONE ONE
function getOneExpedient(APIURL) {
    // event.preventDefault();
    url = APIURL;
    count_div = 1;
    // Construir el query para la consulta utilizando los parámetros de búsqueda
    const queryUrl = `${APIURL}?$select=expediente,producto,titular,registrosanitario,fechavencimiento,
    estadoregistro,consecutivocum,cantidadcum,descripcioncomercial,estadocum,unidad,atc,descripcionatc,
    viaadministracion,concentracion,principioactivo,unidadmedida,cantidad,formafarmaceutica 
    &$where=expediente='${expedient.value}' AND consecutivocum='${consecutive.value}'`;

    // Realizar la solicitud a la API
    fetch(queryUrl)
    .then(response => response.json())
    .then(data => {
        
        if (data.length > 0) {
            /* Como los datos que obtendremos de cada columna son unicos (menos los principios activos y cantidades
                con undidad de medida) dejaremos una variable con la data unica de la primera posicion*/
            
                // Filtrar las instancias de "SIN DATO" en la columna descripcioncomercial
            data = data.map(result => ({
                ...result,
                // descripcioncomercial: result.descripcioncomercial.replace(/\bSIN DATO\b/gi, '').trim()
                descripcioncomercial: result.descripcioncomercial.replace(/SIN DATO/gi, ' ').trim()
            }));
            
            // Manejar la respuesta de la API (los datos obtenidos)
            // console.log(data);

            const firstResult = data[0];

            // ---------- Construir el HTML con los datos obtenidos ----------

            // Crear un mapa para almacenar cantidades y unidades correspondientes a cada principio activo
            const quantitiesByPrincipioActivo = {};

            // Llenar el mapa con las cantidades y unidades correspondientes a cada principio activo
            data.forEach(result => {
                if (!quantitiesByPrincipioActivo[result.principioactivo]) {
                    quantitiesByPrincipioActivo[result.principioactivo] = [];
                    quantitiesByPrincipioActivo[result.principioactivo].push(`${result.cantidad} ${result.unidadmedida}`);
                }
            });

            // Ordenar los principios activos por cantidad (de mayor a menor)
            const principiosActivosOrdenados = Object.keys(quantitiesByPrincipioActivo).sort((a, b) => {
                const cantidadA = quantitiesByPrincipioActivo[a].reduce((total, current) => total + parseFloat(current.split(' ')[0]), 0);
                const cantidadB = quantitiesByPrincipioActivo[b].reduce((total, current) => total + parseFloat(current.split(' ')[0]), 0);
                return cantidadB - cantidadA;
            });

            // Obtener las cantidades y unidades correspondientes a los principios activos ordenados
            const quantitiesWithUnits = principiosActivosOrdenados.map(principioActivo => {
                const quantitiesForPrincipioActivo = quantitiesByPrincipioActivo[principioActivo].join(' + ');
                return quantitiesForPrincipioActivo;
            });

            // Obtener los principios activos únicos ordenados por cantidad (de mayor a menor)
            const concatenatedPrincipiosActivos = principiosActivosOrdenados.length > 1 ? principiosActivosOrdenados.join(' + ') : principiosActivosOrdenados[0];

            // console.log('Cantidades con unidades:', quantitiesWithUnits.join(' + '));
            // console.log('Principios activos ordenados por cantidad:', concatenatedPrincipiosActivos);

            // Obtener valores únicos de ATC
            const uniqueATCValues = [...new Set(data.map(result => result.atc))];
            const concatenated_atc_values = uniqueATCValues.join('; ');

            // console.log('ATC únicos concatenados:', concatenated_atc_values);
            
            // Obtener valores únicos de DESCRIPCIONATC
            const uniqueDescripcionATCValues = [...new Set(data.map(result => result.descripcionatc))];
            const concatenated_descripcionatc_values = uniqueDescripcionATCValues.join('; ');

            // console.log('DESCRIPCIONATC únicos concatenados:', concatenated_descripcionatc_values);
            
            div_response.innerHTML = `
            <div class="view-response" id="view-response">
                    <strong>Cums :</strong> ${firstResult.expediente}-${firstResult.consecutivocum}<br>
                    <strong style="color: white;">Descripción del Cums :</strong><strong> ${firstResult.producto} -
                    ${quantitiesWithUnits.join(' + ')} - ${firstResult.descripcioncomercial} - ${firstResult.formafarmaceutica}</strong><br>
                    <br>
                    <strong>Expediente :</strong> ${firstResult.expediente}<br>
                    <strong>Consecutivo :</strong> ${firstResult.consecutivocum}<br>
                    <strong>Nombre del Producto :</strong> ${firstResult.producto}<br>
                    <strong>Laboratorio Titular :</strong> ${firstResult.titular}<br>
                    <strong>Registro Sanitario :</strong> ${firstResult.registrosanitario}<br>
                    <strong>Fecha de Vencimiento :</strong> ${firstResult.fechavencimiento}<br>
                    <strong>Estado Registro :</strong> <strong style="color: white;">${firstResult.estadoregistro.toUpperCase()}</strong><br>
                    <strong>Cantidad Cum :</strong> ${firstResult.cantidadcum}<br>
                    <strong>Unidad :</strong> ${firstResult.unidad}<br>
                    <strong>Forma Farmaceutica :</strong> ${firstResult.formafarmaceutica}<br>
                    <strong>Principio Activo :</strong> ${firstResult.principioactivo}<br>
                    <strong>Concentración :</strong> ${firstResult.cantidad} ${firstResult.unidadmedida}<br>
                    <strong>Descripcion Comercial :</strong> ${firstResult.descripcioncomercial}<br>
                    <strong>Estado Cum :</strong> ${firstResult.estadocum}<br>
                    <strong>ATC :</strong> ${firstResult.atc}<br>
                    <strong>Descripción del ATC :</strong> ${firstResult.descripcionatc}<br>
                    <strong>Via de Administración :</strong> ${firstResult.viaadministracion}<br>
                    <strong>Tipo de Concentración :</strong> ${firstResult.concentracion}<br>
                    <br>
                    <br>
                    <strong>PA - Principios Activos Transformados :</strong> ${concatenatedPrincipiosActivos}<br>
                    <strong>Cantidades y UM Transformadas (PA) :</strong> ${quantitiesWithUnits.join(' + ')}<br>
                    <strong>Cantidad Cum con Unidad de Medida Transformada :</strong> ${validarUnidad(firstResult.unidad, firstResult.cantidadcum)}<br>
                    <strong>ATC Transformados :</strong> ${concatenated_atc_values}<br>
                    <strong>Descripción ATC Transformados:</strong> ${concatenated_descripcionatc_values}<br>
                </div>
            `;

            span.innerText = `Resultados encontrados ${count_div}`;
            span.classList.add('active');
            count_div++;
            showMessage(4);
            message_info_result.style.left = "-0.3%";
            message_info_result.innerHTML = `Se ha encontrado el CUMS <span style="color: orange; font-weight: bold; font-size: 16px;"> ${expedient.value}-${consecutive.value}</span>`;

            const existing_div_small = document.getElementById(`${firstResult.expediente}`);
            if (!existing_div_small) {
                div_filter.innerHTML += `
                <div class="response-filter" id="${firstResult.expediente}" onclick="getFilterResponse(${firstResult.expediente}, this)" onmouseover="hoverEffect(this)" onmouseout="removeHoverEffect(this)">
                    <p class="row">${firstResult.expediente}</p>
                    <p class="row">${firstResult.producto}</p>
                </div>
                `;
            }
        }
        else {
            // Mostrar un mensaje si no se encontraron resultados
            div_response.innerHTML = `
                <div id="response" style="color: white; font-weight: 600; text-shadow: black 2px 2px 3px;">
                    No se encontraron resultados.
                </div>`;
            span.innerText = "";
        }
    })
    .catch(error => {
        // Manejar errores en la solicitud
        console.error('Error fetching data:', error);
    });
}

// Consultar un expediente sin consecutivo --- GET ONE ALL
function getOneExpedientAll(APIURL) {
    // event.preventDefault();
    url = APIURL;
    count_div = 1;
    // Construir el query para la consulta utilizando los parámetros de búsqueda
    const queryUrl = `${APIURL}?$select=expediente,producto,titular,registrosanitario,fechavencimiento,
    estadoregistro,consecutivocum,cantidadcum,descripcioncomercial,estadocum,unidad,atc,descripcionatc,
    viaadministracion,concentracion,principioactivo,unidadmedida,cantidad,formafarmaceutica 
    &$where=expediente='${expedient.value}'
    &$order=consecutivocum ASC`;

    // Realizar la solicitud a la API
    fetch(queryUrl)
    .then(response => response.json())
    .then(data => {
        // Manejar la respuesta de la API (los datos obtenidos)
        // console.log(data);

        div_response.innerHTML = "";

        if (data.length > 0) {

            // Filtrar las instancias de "SIN DATO" en la columna descripcioncomercial
            data = data.map(result => ({
                ...result,
                // descripcioncomercial: result.descripcioncomercial.replace(/\bSIN DATO\b/gi, '').trim()
                descripcioncomercial: result.descripcioncomercial.replace(/SIN DATO/gi, '').trim()
            }));

            for(var i=0; i<data.length; i++) {
                /* Como los datos que obtendremos de cada columna son unicos (menos los principios activos y cantidades
                con undidad de medida) dejaremos una variable con la data unica de la primera posicion*/

                const firstResult = data[i];

                // ---------- Construir el HTML con los datos obtenidos ----------

                // Crear un mapa para almacenar cantidades y unidades correspondientes a cada principio activo
                const quantitiesByPrincipioActivo = {};

                // Llenar el mapa con las cantidades y unidades correspondientes a cada principio activo
                data.forEach(result => {
                    if (!quantitiesByPrincipioActivo[result.principioactivo]) {
                        quantitiesByPrincipioActivo[result.principioactivo] = [];
                        quantitiesByPrincipioActivo[result.principioactivo].push(`${result.cantidad} ${result.unidadmedida}`);
                    }
                });

                // Ordenar los principios activos por cantidad (de mayor a menor)
                const principiosActivosOrdenados = Object.keys(quantitiesByPrincipioActivo).sort((a, b) => {
                    const cantidadA = quantitiesByPrincipioActivo[a].reduce((total, current) => total + parseFloat(current.split(' ')[0]), 0);
                    const cantidadB = quantitiesByPrincipioActivo[b].reduce((total, current) => total + parseFloat(current.split(' ')[0]), 0);
                    return cantidadB - cantidadA;
                });

                // Obtener las cantidades y unidades correspondientes a los principios activos ordenados
                const quantitiesWithUnits = principiosActivosOrdenados.map(principioActivo => {
                    const quantitiesForPrincipioActivo = quantitiesByPrincipioActivo[principioActivo].join(' + ');
                    return quantitiesForPrincipioActivo;
                });

                // Obtener los principios activos únicos ordenados por cantidad (de mayor a menor)
                const concatenatedPrincipiosActivos = principiosActivosOrdenados.length > 1 ? principiosActivosOrdenados.join(' + ') : principiosActivosOrdenados[0];

                // console.log('Cantidades con unidades:', quantitiesWithUnits.join(' + '));
                // console.log('Principios activos ordenados por cantidad:', concatenatedPrincipiosActivos);

                // Obtener valores únicos de ATC
                const uniqueATCValues = [...new Set(data.map(result => result.atc))];
                const concatenated_atc_values = uniqueATCValues.join('; ');
                
                // console.log('ATC únicos concatenados:', concatenated_atc_values);
                
                // Obtener valores únicos de DESCRIPCIONATC
                const uniqueDescripcionATCValues = [...new Set(data.map(result => result.descripcionatc))];
                const concatenated_descripcionatc_values = uniqueDescripcionATCValues.join('; ');

                // console.log('DESCRIPCIONATC únicos concatenados:', concatenated_descripcionatc_values);

                const existingDiv = document.getElementById(`view-response-${firstResult.consecutivocum}`);

                if (!existingDiv) {
                    div_response.innerHTML += `
                        <div class="view-response" id="view-response-${firstResult.consecutivocum}">
                            <strong>Cums :</strong> ${firstResult.expediente}-${firstResult.consecutivocum}<br>
                            <strong style="color: white;">Descripción del Cums :</strong><strong> ${firstResult.producto} -
                            ${quantitiesWithUnits.join(' + ')} - ${firstResult.descripcioncomercial} - ${firstResult.formafarmaceutica}</strong><br>
                            <br>
                            <strong>Expediente :</strong> ${firstResult.expediente}<br>
                            <strong>Consecutivo :</strong> ${firstResult.consecutivocum}<br>
                            <strong>Nombre del Producto :</strong> ${firstResult.producto}<br>
                            <strong>Laboratorio Titular :</strong> ${firstResult.titular}<br>
                            <strong>Registro Sanitario :</strong> ${firstResult.registrosanitario}<br>
                            <strong>Fecha de Vencimiento :</strong> ${firstResult.fechavencimiento}<br>
                            <strong>Estado Registro :</strong> <strong style="color: white;">${firstResult.estadoregistro.toUpperCase()}</strong><br>
                            <strong>Cantidad Cum :</strong> ${firstResult.cantidadcum}<br>
                            <strong>Unidad :</strong> ${firstResult.unidad}<br>
                            <strong>Forma Farmaceutica :</strong> ${firstResult.formafarmaceutica}<br>
                            <strong>Principio Activo :</strong> ${firstResult.principioactivo}<br>
                            <strong>Concentración :</strong> ${firstResult.cantidad} ${firstResult.unidadmedida}<br>
                            <strong>Descripcion Comercial :</strong> ${firstResult.descripcioncomercial}<br>
                            <strong>Estado Cum :</strong> ${firstResult.estadocum}<br>
                            <strong>ATC :</strong> ${firstResult.atc}<br>
                            <strong>Descripción del ATC :</strong> ${firstResult.descripcionatc}<br>
                            <strong>Via de Administración :</strong> ${firstResult.viaadministracion}<br>
                            <strong>Tipo de Concentración :</strong> ${firstResult.concentracion}<br>
                            <br>
                            <br>
                            <strong>PA - Principios Activos Transformados :</strong> ${concatenatedPrincipiosActivos}<br>
                            <strong>Cantidades y UM Transformadas (PA) :</strong> ${quantitiesWithUnits.join(' + ')}<br>
                            <strong>Cantidad Cum con Unidad de Medida Transformada :</strong> ${validarUnidad(firstResult.unidad, firstResult.cantidadcum)}<br>
                            <strong>ATC Transformados :</strong> ${concatenated_atc_values}<br>
                            <strong>Descripción ATC Transformados:</strong> ${concatenated_descripcionatc_values}<br>
                        </div>
                    `;
                    span.innerText = `Resultados encontrados ${count_div++}`;
                    span.classList.add('active');
                }

                showMessage(4);
                message_info_result.style.left = "-3%";
                message_info_result.innerHTML = `Se han encontrado <span style="color: orange; font-weight: bold; font-size: 16px;">${count_div-1}</span> presentaciones comerciales del Expediente <span style="color: orange; font-weight: bold; font-size: 16px;">${expedient.value}</span>`;

                const existing_div_small = document.getElementById(`${firstResult.consecutivocum}`);
                if (!existing_div_small) {
                    div_filter.innerHTML += `
                    <div class="response-filter" id="${firstResult.consecutivocum}" onclick="getFilterOneResponse(${firstResult.expediente},${firstResult.consecutivocum}, this)" onmouseover="hoverEffect(this)" onmouseout="removeHoverEffect(this)">
                        <p class="row">${count_div-1}.</p>
                        <p class="row">${firstResult.expediente}-${firstResult.consecutivocum}</p>
                        <p class="row">${firstResult.producto}</p>
                    </div>
                    `;
                }
            }
        }
        else {
            // Mostrar un mensaje si no se encontraron resultados
            div_response.innerHTML = `
                <div id="response" style="Color: white;">
                    No se encontraron resultados.
                </div>`;
                span.innerText = "";
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function validarUnidad(unidad, cantidadcum) {
    if(unidad==="U") return cantidadcum+" Unds";
    else return cantidadcum+" "+unidad
}

function clearInputs() {
    expedient.value = "";
    consecutive.value = "";
    product_principle.value = "";
    check_consecutive.checked = false;
    check_name.checked = false;
    check_principle.checked = false;
}

function getExpedientForName(APIURL) {
    // event.preventDefault();
    url = APIURL;
    count_div = 1;
    // Construir el query para la consulta utilizando los parámetros de búsqueda
    const queryUrl = `${APIURL}?$select=expediente,producto,titular,registrosanitario,fechavencimiento,
    estadoregistro,consecutivocum,cantidadcum,descripcioncomercial,estadocum,unidad,atc,descripcionatc,
    viaadministracion,concentracion,principioactivo,unidadmedida,cantidad,formafarmaceutica
    &$q=${product_principle.value}
    &$order=consecutivocum
    &$limit=100000000`;
    // const queryUrl = `${apiUrl}?$select=expediente,producto,titular,registrosanitario,fechavencimiento,
    // estadoregistro,consecutivocum,cantidadcum,descripcioncomercial,estadocum,unidad,atc,descripcionatc,
    // viaadministracion,concentracion,principioactivo,unidadmedida,cantidad,formafarmaceutica,
    // concat(expediente,'-',consecutivocum) as expediente_consecutivo
    // &$where producto like '%25${product_principle.value}%25'
    // &$group=expediente_consecutivo`;

    // Realizar la solicitud a la API
    fetch(queryUrl)
    .then(response => response.json())
    .then(data => {        
        // Manejar la respuesta de la API (los datos obtenidos)
//        alert("largo resultado : "+ data.length);
        // console.log(data);
        div_response.innerHTML = "";

        if (data.length > 0) {
            // Filtrar las instancias de "SIN DATO" en la columna descripcioncomercial
            data = data.map(result => ({
                ...result,
                // descripcioncomercial: result.descripcioncomercial.replace(/\bSIN DATO\b/gi, '').trim()
                descripcioncomercial: result.descripcioncomercial.replace(/SIN DATO/gi, '').trim()
            }));
            
            for(var i=0; i<data.length; i++) {
                /* Como los datos que obtendremos de cada columna son unicos (menos los principios activos y cantidades
                con undidad de medida) dejaremos una variable con la data unica de la primera posicion*/

                const firstResult = data[i];

                // ---------- Construir el HTML con los datos obtenidos ----------

                // Crear un mapa para almacenar cantidades y unidades correspondientes a cada principio activo
                // const quantitiesByPrincipioActivo = {};

                // Llenar el mapa con las cantidades y unidades correspondientes a cada principio activo
                // data.forEach(result => {
                //     if (!quantitiesByPrincipioActivo[result.principioactivo]) {
                //         quantitiesByPrincipioActivo[result.principioactivo] = [];
                //         quantitiesByPrincipioActivo[result.principioactivo].push(`${result.cantidad} ${result.unidadmedida}`);
                //     }
                // });

                // Ordenar los principios activos por cantidad (de mayor a menor)
                // const principiosActivosOrdenados = Object.keys(quantitiesByPrincipioActivo).sort((a, b) => {
                //     const cantidadA = quantitiesByPrincipioActivo[a].reduce((total, current) => total + parseFloat(current.split(' ')[0]), 0);
                //     const cantidadB = quantitiesByPrincipioActivo[b].reduce((total, current) => total + parseFloat(current.split(' ')[0]), 0);
                //     return cantidadB - cantidadA;
                // });

                // Obtener las cantidades y unidades correspondientes a los principios activos ordenados
                // const quantitiesWithUnits = principiosActivosOrdenados.map(principioActivo => {
                //     const quantitiesForPrincipioActivo = quantitiesByPrincipioActivo[principioActivo].join(' + ');
                //     return quantitiesForPrincipioActivo;
                // });

                // Obtener los principios activos únicos ordenados por cantidad (de mayor a menor)
                // const concatenatedPrincipiosActivos = principiosActivosOrdenados.length > 1 ? principiosActivosOrdenados.join(' + ') : principiosActivosOrdenados[0];

                // console.log('Cantidades con unidades:', quantitiesWithUnits.join(' + '));
                // console.log('Principios activos ordenados por cantidad:', concatenatedPrincipiosActivos);

                // // Obtener valores únicos de ATC
                // const uniqueATCValues = [...new Set(data.map(result => result.atc))];
                // const concatenated_atc_values = uniqueATCValues.join('; ');
                
                // console.log('ATC únicos concatenados:', concatenated_atc_values);
                
                // // Obtener valores únicos de DESCRIPCIONATC
                // const uniqueDescripcionATCValues = [...new Set(data.map(result => result.descripcionatc))];
                // const concatenated_descripcionatc_values = uniqueDescripcionATCValues.join('; ');

                // console.log('DESCRIPCIONATC únicos concatenados:', concatenated_descripcionatc_values);

                // const existingDiv = document.getElementById(`view-response-${firstResult.expediente}-${firstResult.consecutivocum}-${firstResult.consecutivocum}`);
                const existingDiv = document.getElementById(`view-response-${firstResult.expediente}`);

                if (!existingDiv) {

                    div_response.innerHTML += `
                        <div class="view-response" id="view-response-${firstResult.expediente}">
                            <strong>Cums :</strong> ${firstResult.expediente}-${firstResult.consecutivocum}<br>
                            <br>
                            <strong>Expediente :</strong> ${firstResult.expediente}<br>
                            <strong>Consecutivo :</strong> ${firstResult.consecutivocum}<br>
                            <strong>Nombre del Producto :</strong> ${firstResult.producto}<br>
                            <strong>Laboratorio Titular :</strong> ${firstResult.titular}<br>
                            <strong>Registro Sanitario :</strong> ${firstResult.registrosanitario}<br>
                            <strong>Fecha de Vencimiento :</strong> ${firstResult.fechavencimiento}<br>
                            <strong>Estado Registro :</strong> <strong style="color: white;">${firstResult.estadoregistro.toUpperCase()}</strong><br>
                            <strong>Cantidad Cum :</strong> ${firstResult.cantidadcum}<br>
                            <strong>Unidad :</strong> ${firstResult.unidad}<br>
                            <strong>Forma Farmaceutica :</strong> ${firstResult.formafarmaceutica}<br>
                            <strong>Principio Activo :</strong> ${firstResult.principioactivo}<br>
                            <strong>Concentración :</strong> ${firstResult.cantidad} ${firstResult.unidadmedida}<br>
                            <strong>Descripcion Comercial :</strong> ${firstResult.descripcioncomercial}<br>
                            <strong>Estado Cum :</strong> ${firstResult.estadocum}<br>
                            <strong>ATC :</strong> ${firstResult.atc}<br>
                            <strong>Descripción del ATC :</strong> ${firstResult.descripcionatc}<br>
                            <strong>Via de Administración :</strong> ${firstResult.viaadministracion}<br>
                            <strong>Tipo de Concentración :</strong> ${firstResult.concentracion}<br>
                            <br>
                            <br>
                            <strong>Cantidad Cum con Unidad de Medida Transformada :</strong> ${validarUnidad(firstResult.unidad, firstResult.cantidadcum)}<br>
                            </div>
                            `;
                        }
                        // <strong>PA - Principios Activos Transformados :</strong> ${concatenatedPrincipiosActivos}<br>
                        // <strong>Cantidades y UM Transformadas (PA) :</strong> ${quantitiesWithUnits.join(' + ')}<br>
                const existing_div_small = document.getElementById(`${firstResult.expediente}`);

                if (!existing_div_small) {
                    div_filter.innerHTML += `
                    <div class="response-filter" id="${firstResult.expediente}" onclick="getFilterResponse(${firstResult.expediente}, this)" onmouseover="hoverEffect(this)" onmouseout="removeHoverEffect(this)">
                        <p class="row">${count_div}.</p>
                        <p class="row">${firstResult.expediente}</p>
                        <p class="row">${firstResult.producto}</p>
                    </div>
                    `;
                    span.innerText = `Resultados encontrados ${count_div++}`;
                    span.classList.add('active');
                }
                showMessage(4);
                message_info_result.style.left = "-2.8%";
                message_info_result.innerHTML = `Se han encontrado <span style="color: orange; font-weight: bold; font-size: 16px;">${count_div-1}</span> Expedientes que cuentan con el filtro <span style="color: orange; font-weight: bold; font-size: 16px;">${product_principle.value.toUpperCase()}</span>`;
            }
        }
        else {
            // Mostrar un mensaje si no se encontraron resultados
            div_response.innerHTML = `
                <div id="response" style="Color: white;">
                    No se encontraron resultados.
                </div>`;
                span.innerText = "";
        }
    })
    .catch(error => {
        // Manejar errores en la solicitud
        console.error('Error fetching data:', error);
    });
}

function validateChecked() {
    if((check_name.checked && check_principle.checked && check_consecutive.checked) || 
    (check_name.checked && check_principle.checked) || (check_name.checked && check_consecutive.checked) || 
    (check_principle.checked && check_consecutive.checked)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Seleccionaste varios filtros !!!",
            footer: `<a style="color: rgba(255, 0, 0, 0.61);"><strong>Recuerda, 
                para una consultar personalizada, selecciona solo un filtro</strong></a>`,
            background: "white",
            backdrop: "rgba(0, 0, 0, 0.705)"
        });
        clearInputs();
    }
    else {
        if(check_name.checked) {
            if(expedient.value==="") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ingresa el expediente!",
                    background: "white",
                    backdrop: "rgba(0, 0, 0, 0.705)"
                });
                check_consecutive.checked = false;
                check_principle.checked = false;
            }
            else {
                let porcent=1;
                let timerInterval;
                Swal.fire({
                  title: "Loading ...!",
                  html: `<a></a><br><br><b style="font-size: 24px";></b>%`,
                  timer: 1000,
                  position: "center",
                  timerProgressBar: true,
                  didOpen: () => {
                      Swal.showLoading();
                      const timer = Swal.getPopup().querySelector("b");
                      const message = Swal.getPopup().querySelector("a");
                      timerInterval = setInterval(() => {
                        porcent++;
                      timer.textContent = `${porcent*10}`;
                      message.textContent = `${messageProgress(porcent*10)}`;
                    }, 100);
                  },
                  willClose: () => {
                    clearInterval(timerInterval);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Busqueda Realizada",
                        showConfirmButton: false,
                        timer: 800
                    });
                    getOneExpedientAll(CURRENT_MEDICATIONS);
                  }
                }).then((result) => {
                  if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                  }
                });
            }
        }
        else if(check_principle.checked) {
            if(expedient.value==="") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ingresa el expediente!",
                    background: "white",
                    backdrop: "rgba(0, 0, 0, 0.705)"
                });
                check_consecutive.checked = false;
                check_name.checked = false;
            }
            else {
                let porcent=1;
                let timerInterval;
                Swal.fire({
                  title: "Loading ...!",
                  html: `<a></a><br><br><b style="font-size: 24px";></b>%`,
                  timer: 1000,
                  position: "center",
                  timerProgressBar: true,
                  didOpen: () => {
                      Swal.showLoading();
                      const timer = Swal.getPopup().querySelector("b");
                      const message = Swal.getPopup().querySelector("a");
                      timerInterval = setInterval(() => {
                        porcent++;
                      timer.textContent = `${porcent*10}`;
                      message.textContent = `${messageProgress(porcent*10)}`;
                    }, 100);
                  },
                  willClose: () => {
                    clearInterval(timerInterval);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Busqueda Realizada",
                        showConfirmButton: false,
                        timer: 800
                    });
                    getOneExpedientAll(CURRENT_MEDICATIONS);
                  }
                }).then((result) => {
                  if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                  }
                });
            }
        }
        else if(check_consecutive.checked) {
            if(expedient.value==="") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ingresa el expediente!",
                    background: "white",
                    backdrop: "rgba(0, 0, 0, 0.705)"
                });
            }
            else{
                let porcent=1;
                let timerInterval;
                Swal.fire({
                  title: "Loading ...!",
                  html: `<a></a><br><br><b style="font-size: 24px";></b>%`,
                  timer: 1000,
                  position: "center",
                  timerProgressBar: true,
                  didOpen: () => {
                      Swal.showLoading();
                      const timer = Swal.getPopup().querySelector("b");
                      const message = Swal.getPopup().querySelector("a");
                      timerInterval = setInterval(() => {
                        porcent++;
                      timer.textContent = `${porcent*10}`;
                      message.textContent = `${messageProgress(porcent*10)}`;
                    }, 100);
                  },
                  willClose: () => {
                    clearInterval(timerInterval);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Busqueda Realizada",
                        showConfirmButton: false,
                        timer: 800
                    });
                    getOneExpedientAll(CURRENT_MEDICATIONS);
                  }
                }).then((result) => {
                  if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                  }
                });
            }
        }
        else {
            if(consecutive.value==="" && expedient.value==="") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ingresa los datos solicitados!",
                    background: "white",
                    backdrop: "rgba(0, 0, 0, 0.705)"
                });
            }
            else if(expedient.value==="") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ingresa el expediente!",
                    background: "white",
                    backdrop: "rgba(0, 0, 0, 0.705)"
                }); 
            }
            else if(consecutive.value==="") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ingresa el consecutivo!",
                    background: "white",
                    backdrop: "rgba(0, 0, 0, 0.705)"
                }); 
            }
            else {
                let porcent=1;
                let timerInterval;
                Swal.fire({
                  title: "Loading ...!",
                  html: `<a></a><br><br><b style="font-size: 24px";></b>%`,
                  timer: 1000,
                  position: "center",
                  timerProgressBar: true,
                  didOpen: () => {
                      Swal.showLoading();
                      const timer = Swal.getPopup().querySelector("b");
                      const message = Swal.getPopup().querySelector("a");
                      timerInterval = setInterval(() => {
                        porcent++;
                      timer.textContent = `${porcent*10}`;
                      message.textContent = `${messageProgress(porcent*10)}`;
                    }, 100);
                  },
                  willClose: () => {
                    clearInterval(timerInterval);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Busqueda Realizada",
                        showConfirmButton: false,
                        timer: 800
                    });
                    getOneExpedient(CURRENT_MEDICATIONS);
                  }
                }).then((result) => {
                  if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                  }
                });
            }
        }
    }
}

function messageProgress(porcent) {
    if(porcent>=80) {
        return "Datos Obtenidos";
    }
    else if(porcent>=60) {
        return "Extrayendo los Datos";
    }
    else if(porcent>=40) {
        return "Consultado en Base Vigentes";
    }
    else if(porcent>=20) {
        return "Conectando al Servidor";
    }
    else {
        return "Iniciando proceso";
    }
}

function noLimit(APIURL) {
    // event.preventDefault();
    url = APIURL;
    count_div = 1;
    // Construir el query para la consulta utilizando los parámetros de búsqueda
    const queryUrl = `${APIURL}?$select=* limit 100000000`;

    // Realizar la solicitud a la API
    fetch(queryUrl)
    .then(response => response.json())
    .then(data => {
        // Manejar la respuesta de la API (los datos obtenidos)
        // console.log(data);

        const firstResult = data[data.length-1]; //Ultimo resultado de la base
        
        // span.innerText = `Resultados encontrados ${data.length}`;
        div_response.innerHTML = "";
        
        if (data.length>0) {

            div_response.innerHTML += `
                <div class="view-response" id="view-response-${firstResult.consecutivocum}">
                    <strong>Cums :</strong> ${firstResult.expediente}-${firstResult.consecutivocum}<br>
                    <br>
                    <strong>Expediente :</strong> ${firstResult.expediente}<br>
                    <strong>Consecutivo :</strong> ${firstResult.consecutivocum}<br>
                    <strong>Nombre del Producto :</strong> ${firstResult.producto}<br>
                    <strong>Laboratorio Titular :</strong> ${firstResult.titular}<br>
                    <strong>Registro Sanitario :</strong> ${firstResult.registrosanitario}<br>
                    <strong>Fecha de Vencimiento :</strong> ${firstResult.fechavencimiento}<br>
                    <strong>Estado Registro :</strong> <strong style="color: white;">${firstResult.estadoregistro.toUpperCase()}</strong><br>
                    <strong>Cantidad Cum :</strong> ${firstResult.cantidadcum}<br>
                    <strong>Unidad :</strong> ${firstResult.unidad}<br>
                    <strong>Forma Farmaceutica :</strong> ${firstResult.formafarmaceutica}<br>
                    <strong>Principio Activo :</strong> ${firstResult.principioactivo}<br>
                    <strong>Concentración :</strong> ${firstResult.cantidad} ${firstResult.unidadmedida}<br>
                    <strong>Descripcion Comercial :</strong> ${firstResult.descripcioncomercial}<br>
                    <strong>Estado Cum :</strong> ${firstResult.estadocum}<br>
                    <strong>ATC :</strong> ${firstResult.atc}<br>
                    <strong>Descripción del ATC :</strong> ${firstResult.descripcionatc}<br>
                    <strong>Via de Administración :</strong> ${firstResult.viaadministracion}<br>
                    <strong>Tipo de Concentración :</strong> ${firstResult.concentracion}<br>
                </div>
            `;
            span.innerText = `Resultados encontrados ${data.length}`;
            count_div++;
        }

        showMessage(4);
        message_info_result.style.left = "-1%";
        message_info_result.innerHTML = `Total Registros en Base ${messageStatusSelect()} : <span style="color: orange; font-weight: bold; font-size: 16px;">${data.length}</span>`;

        const existing_div_small = document.getElementById(`${firstResult.consecutivocum}`);
        if (!existing_div_small) {
            div_filter.innerHTML += `
            <div class="response-filter" id="${firstResult.consecutivocum}" onclick="getFilterOneResponse(${firstResult.expediente},${firstResult.consecutivocum}, this)" onmouseover="hoverEffect(this)" onmouseout="removeHoverEffect(this)">
                <p class="row">${count_div-1}.</p>
                <p class="row">${firstResult.expediente}-${firstResult.consecutivocum}</p>
                <p class="row">${firstResult.producto}</p>
            </div>
            `;
        }
        else {
            // Mostrar un mensaje si no se encontraron resultados
            div_response.innerHTML = `
                <div id="response" style="Color: white;">
                    No se encontraron resultados.
                </div>`;
                span.innerText = "";
        }
    })
    .catch(error => {
        // Manejar errores en la solicitud
        console.error('Error fetching data:', error);
    });
}

function getFilterResponse(expediente, container) {
    changeColor(container);
    expedient.value = expediente;
    getOneExpedientAll(url);
}

function getFilterOneResponse(expediente, consecutivo, container) {
    changeColor(container);
    expedient.value = expediente;
    consecutive.value = consecutivo;
    getOneExpedient(url);
}
