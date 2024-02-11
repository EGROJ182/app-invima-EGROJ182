const div_response = document.getElementById('content-response');
const span = document.getElementById('span');
const div_filter = document.getElementById('content-filter');
const result_expedients = document.getElementById('get-name-or-principle');
let expedient = document.getElementById('expedient');
let consecutive = document.getElementById('consecutive');
let product_principle = document.getElementById('product-principle');

function startGetExpedient(event) {
    event.preventDefault();
    message_info_result.classList.add('hide-info');
    // validateChecked();// Animación creada para busquedas con condicionales por metodo de entrada
    span.style.display = "none";
    span.innerText = "";

    if (check_consecutive.checked) {
        div_response.innerHTML = `<p style="text-align: center; color: white; font-weight: 600; text-shadow: black 2px 2px 3px;"> Loading ...</p>
            <div class="loader"></div>`;
        
        div_filter.innerHTML = '';

        let contador = 1;
        let timeView = setInterval(()=>{
            contador--;
            if(contador===0){
                clearInterval(timeView);
                // getOneExpedientAll(statusSelect());
                dataBases(CURRENT_MEDICATIONS, MEDICATIONS_IN_THE_RENEWAL_PROCESS, EXPIRED_MEDICATIONS, MEDICATIONS_OTHER_STATES)
                .then(urlData => {
                    getOneExpedientAll(urlData);
                })
                .catch(error => {
                    console.error('Error al obtener la URL:', error);
                });
                span.style.display = "block";
            }
        },1000);

      }
      else if(check_name.checked) {
        // span.style.display = "none";
        div_response.innerHTML = `<p style="text-align: center; color: white; font-weight: 600; text-shadow: black 2px 2px 3px;"> Loading ...</p>
            <div class="loader"></div>`;
        
        div_filter.innerHTML = '';

        let contador = 1;
        let timeView = setInterval(()=>{
            contador--;
            if(contador===0){
                clearInterval(timeView);
                getExpedientForName(statusSelect());
                // dataBases(CURRENT_MEDICATIONS, MEDICATIONS_IN_THE_RENEWAL_PROCESS, EXPIRED_MEDICATIONS, MEDICATIONS_OTHER_STATES)
                // .then(urlData => {
                //     getExpedientForName(urlData);
                // })
                // .catch(error => {
                //     console.error('Error al obtener la URL:', error);
                // });
                span.style.display = "block";
            }
        },1000);

      }
      else if(check_principle.checked) {
        // span.style.display = "none";
        div_response.innerHTML = `<p style="text-align: center; color: white; font-weight: 600; text-shadow: black 2px 2px 3px;"> Loading ...</p>
            <div class="loader"></div>`;
        
        div_filter.innerHTML = '';

        let contador = 1;
        let timeView = setInterval(()=>{
            contador--;
            if(contador===0){
                clearInterval(timeView);
                noLimit(statusSelect());
                // dataBases(CURRENT_MEDICATIONS, MEDICATIONS_IN_THE_RENEWAL_PROCESS, EXPIRED_MEDICATIONS, MEDICATIONS_OTHER_STATES)
                // .then(urlData => {
                //     noLimit(urlData);
                // })
                // .catch(error => {
                //     console.error('Error al obtener la URL:', error);
                // });
                span.style.display = "block";
            }
        },1000);

      }
      else {
        // span.style.display = "none";
        div_response.innerHTML = `<p id="loading" style="text-align: center; color: white; font-weight: 600; text-shadow: black 2px 2px 3px;"> Loading ...</p>
            <div class="loader"></div>`;
        let contador = 1;
        let timeView = setInterval(()=>{
            contador--;
            if(contador===0){
                clearInterval(timeView);
                // getOneExpedient(statusSelect());
                dataBases(CURRENT_MEDICATIONS, MEDICATIONS_IN_THE_RENEWAL_PROCESS, EXPIRED_MEDICATIONS, MEDICATIONS_OTHER_STATES)
                .then(url => {
                    getOneExpedient(url);
                })
                .catch(error => {
                    console.error('Error al obtener la URL:', error);
                });
                span.style.display = "block";
            }
        },1000);
    }
}

// btn_query.onclick = startGetExpedient;
function statusSelect() {
    if(document.getElementById('list-status-invima').value === 'current'){
        console.log('current');
        return CURRENT_MEDICATIONS;
    }
    else if(document.getElementById('list-status-invima').value === 'renewall'){
        console.log('renewall');
        return MEDICATIONS_IN_THE_RENEWAL_PROCESS;
    }
    else if(document.getElementById('list-status-invima').value === 'expired'){
        console.log('expired');
        return EXPIRED_MEDICATIONS;
    }
    else if(document.getElementById('list-status-invima').value === 'other'){
        console.log('other status');
        return MEDICATIONS_OTHER_STATES;
    }
    else if(document.getElementById('list-status-invima').value === '$MV'){
        console.log('Precio Maximo de Venta Medicamentos');
        return PMVMXPC;
    }
    else {
        console.log('more databases');
        return "more";
    }
}