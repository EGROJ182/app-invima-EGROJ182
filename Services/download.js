function createUrlMoreData(queryUrl) {
    console.log(queryUrl);
    fetch(queryUrl)
        .then(response => response.text())
        .then(data => {
            // Crear un objeto Blob para el archivo CSV con BOM y codificación UTF-8
            const blob = new Blob(['\ufeff', data], { type: 'text/csv;charset=utf-8' });

            const blobURL = window.URL.createObjectURL(blob);

            // Crear un enlace <a> invisible
            const link = document.createElement('a');
            link.href = blobURL;
            link.download = messageStatusSelect()+'.csv'; // Puedes cambiar el nombre del archivo según tus necesidades

            // Agregar el enlace al documento y simular un clic
            document.body.appendChild(link);
            link.click();

            // Limpiar y revocar el objeto URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobURL);
        })
        .catch(error => {
            console.error('Error al descargar el archivo:', error);
        });
}

function downloadReportInvima() {
    if(statusSelect() === PMVMXPC) {
        createUrlMoreData(`${statusSelect()}.csv?$select=* limit 100000000`);
    }
    else if(statusSelect() != CURRENT_MEDICATIONS && statusSelect() != MEDICATIONS_IN_THE_RENEWAL_PROCESS && statusSelect() != EXPIRED_MEDICATIONS && statusSelect() != MEDICATIONS_OTHER_STATES) {
        Swal.fire({
            title: "Ingrese la URL de Datos Abiertos, recuerde eliminar de la cadena (.json):",
            input: "text",
            inputAttributes: {
              autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            preConfirm: (value) => {
                const newUrl = `${value}.csv?$select=* limit 100000000`;
                createUrlMoreData(newUrl);
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              const inputValue = result.value;
              Swal.fire(`Valor ingresado: ${inputValue}`);
            }
          });
    }
    else {
        createUrlMoreData(`${statusSelect()}.csv?$select=expediente,producto,titular,registrosanitario,fechavencimiento,
        estadoregistro,consecutivocum,cantidadcum,descripcioncomercial,estadocum,unidad,atc,descripcionatc,
        viaadministracion,concentracion,principioactivo,unidadmedida,cantidad,formafarmaceutica limit 100000000`);
    }
}