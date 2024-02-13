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
            if(data.length <= 500) {
                Swal.fire({
                    title: '¡ Upps !<br><p style="font-size: 18px;">URL no existe en <a style="color: orange;" href="https://www.datos.gov.co/browse?q=invima&sortBy=relevance" target="_blank">Datos Abiertos</a></p>',
                    icon: "error",
                    text: 'Not Found',
                    color: "white",
                    background: "linear-gradient(to right, transparent 0%, rgb(216, 44, 162) 100%)",
                    backdrop: "rgba(0, 0, 0, 0.705)",
                    customClass: {
                        popup: 'rounded-border'
                    },
                    inputAttributes: {
                    autocapitalize: "off"
                    },
                });
            }
            else {
                let porcent=1;
                let timerInterval;
                Swal.fire({
                  title: "Downloading ...!",
                  html: `<a></a><br><br><b style="font-size: 24px";></b>%`,
                  color: "white",
                  background: "linear-gradient(to right, transparent 0%, rgb(216, 44, 162) 100%)",
                  backdrop: "rgba(0, 0, 0, 0.705)",
                  timer: 1000,
                  position: "center",
                  timerProgressBar: true,
                  customClass: {
                    popup: 'rounded-border'
                  },
                  didOpen: () => {
                      Swal.showLoading();
                      const timer = Swal.getPopup().querySelector("b");
                      const message = Swal.getPopup().querySelector("a");
                      timerInterval = setInterval(() => {
                        porcent++;
                      timer.textContent = `${porcent*10}`;
                      message.textContent = `${progressDownload(porcent*10)}`;
                    }, 100);
                  },
                  willClose: () => {
                    clearInterval(timerInterval);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Descarga Finalizada",
                        color: "white",
                        background: "linear-gradient(to right, transparent 0%, rgb(216, 44, 162) 100%)",
                        backdrop: "rgba(0, 0, 0, 0.705)",
                        customClass: {
                            popup: 'rounded-border'
                        },
                        showConfirmButton: false,
                        timer: 3500
                    });
                  }
                }).then((result) => {
                  if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                  }
                });

                // Swal.fire({
                //     title: `Descargado`,
                //     icon: "success",
                //     color: "white",
                //     background: "linear-gradient(to right, transparent 0%, rgb(216, 44, 162) 100%)",
                //     backdrop: "rgba(0, 0, 0, 0.705)",
                //     customClass: {
                //         popup: 'rounded-border'
                //     }
                // });
            }
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
            title: 'Ingrese la URL de <a style="color: orange;" href="https://www.datos.gov.co/browse?q=invima&sortBy=relevance" target="_blank">Datos Abiertos</a>',
            icon: "info",
            text: '¡ Recuerde al pegar el link quede sin ".json" o cualquier otra extensión !',
            input: "text",
            color: "white",
            background: "linear-gradient(to right, transparent 0%, rgb(216, 44, 162) 100%)",
            backdrop: "rgba(0, 0, 0, 0.705)",
            customClass: {
                popup: 'rounded-border'
            },
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
            }
          });
    }
    else {
        createUrlMoreData(`${statusSelect()}.csv?$select=expediente,producto,titular,registrosanitario,fechavencimiento,
        estadoregistro,consecutivocum,cantidadcum,descripcioncomercial,estadocum,unidad,atc,descripcionatc,
        viaadministracion,concentracion,principioactivo,unidadmedida,cantidad,formafarmaceutica limit 100000000`);
    }
}

function progressDownload(porcent) {
    if(porcent>=80) {
        return "Datos Obtenidos";
    }
    else if(porcent>=60) {
        return "Extrayendo los Datos";
    }
    else if(porcent>=40) {
        return "Consultado link de descarga";
    }
    else if(porcent>=20) {
        return "Conectando al Servidor de Datos Abiertos";
    }
    else {
        return "Iniciando proceso de Descarga";
    }
}
