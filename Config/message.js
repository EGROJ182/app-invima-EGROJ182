const status_select = document.getElementById('list-status-invima');
const message = document.getElementById("message");
const message_info_expedient = document.getElementById('message-info-expedient');
const message_info_consecutive = document.getElementById('message-info-consecutive');
const message_info_filter = document.getElementById('message-info-filter');
const message_info_result = document.getElementById('message-info-response');

function mostrarMensaje() {
    // Muestra el mensaje
    message.classList.remove("hide");
    message.innerHTML = `> ¡ Descargar Base <span style="color: orange; font-weight: bold; font-size: 16px;">(${messageStatusSelect()})</span> !`;
    message.classList.add("active");
}

function ocultarMensaje() {
    // Oculta el mensaje
    message.classList.remove("active");
    message.classList.add("hide");
}

function messageStatusSelect() {
    if(status_select.value === 'current'){
        console.log('current');
        return "Vigentes";
    }
    else if(status_select.value === 'renewall'){
        console.log('renewall');
        return "En Tramite de Renovación";
    }
    else if(status_select.value === 'expired'){
        console.log('expired');
        return "Vencidos";
    }
    else if(status_select.value === 'other'){
        console.log('other');
        return "Otros Estados";
    }
    else if(status_select.value === '$MV'){
        console.log('Precio Maximo de Venta Medicamentos');
        return "$ Max Venta MED";
    }
    else {
        console.log('more databases');
        return "+ Data API";
    }
}

// function showMessageTime(number) {
//     let time_view = 2;
//     let showTime = setInterval(()=>{
//         if(time_view>=0) {
//             time_view--;
//         }
//         else {
//             clearInterval(showTime);
//             showMessage(number)
//         }
//     },1000);
// }

function showMessage(number) {
    switch (number) {
        case 1:
            message_info_expedient.classList.remove('hide-info');
            message_info_expedient.style.left = "19%";
            message_info_expedient.style.top = "17.3%";
            message_info_expedient.innerText = 'Ingrese un Expediente (Ejemplo 29916)';
            message_info_expedient.classList.add('active-info');
            break;
        case 2:
            message_info_consecutive.classList.remove('hide-info');
            message_info_consecutive.style.left = "19.4%";
            message_info_consecutive.style.top = "24%";
            message_info_consecutive.innerText = 'Ingrese el Consecutivo a consultar';
            message_info_consecutive.classList.add('active-info');
            break;
        case 3:
            message_info_filter.classList.remove('hide-info');
            message_info_filter.style.left = "16.4%";
            // message_info.style.left = "16.8%";
            message_info_filter.style.top = "31.3%";
            message_info_filter.innerText = 'Ingrese una palabra para realizar una busqueda (Ejemplo: \n > \tNombre, Principio,'
                +' ATC, Concentración, Laboratorio, registro Invima etc.';
            message_info_filter.classList.add('active-info');
            break;
        case 4:
            message_info_result.classList.remove('hide-info');
            message_info_result.style.left = "1%";
            message_info_result.style.top = "2%";
            message_info_result.classList.add('active-info');
            break;
        // default:
        //     message_info.innerText = "Bienvenido";
    }
}

function hideMessage(number) {
    switch(number) {
        case 1:
            message_info_expedient.classList.remove('active-info');
            message_info_expedient.classList.add('hide-info');
            break;
        case 2:
            message_info_consecutive.classList.remove('active-info');
            message_info_consecutive.classList.add('hide-info');
            break;
        case 3:
            message_info_filter.classList.remove('active-info');
            message_info_filter.classList.add('hide-info');
            break;
        case 4:
            message_info_result.classList.remove('active-info');
            // message_info_result.classList.add('hide-info');
            break;
    }
}
