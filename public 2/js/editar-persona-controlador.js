'use strict';
let identificacion = localStorage.getItem('identificacion_persona');
let _id;

const boton_guardar = document.querySelector('#btn-guardar');
const lista_tipo_persona = document.querySelector('#slt-tipo-persona');
const input_identificacion = document.querySelector('#txt-identificacion');
const input_nombre = document.querySelector('#txt-nombre');
const input_nacimiento = document.querySelector('#txt-nacimiento');
const input_edad = document.querySelector('#txt-edad');
const input_foto = document.querySelector('#user-photo')

let llenar_campos = async() => {
    let persona = await obtener_persona_id(identificacion);
    _id = persona._id;
    switch (persona.tipo_persona) {
        case 'física':
            lista_tipo_persona.selectedIndex = 1;
            break;
        case 'jurídica':
            lista_tipo_persona.selectedIndex = 2;
            break;
        default:
            lista_tipo_persona.selectedIndex = 0;
            break;
    }

    input_identificacion.value = persona.identificacion;
    input_nombre.value = persona.nombre;
    input_foto.src = persona.foto;

    switch (persona.sexo) {
        case 'Femenino':
            document.querySelector('#rbt-femenino').checked = true;
            break;
        case 'Masculino':
            document.querySelector('#rbt-masculino').checked = true;
            break;
        default:
            document.querySelector('#rbt-otro').checked = true;
            break;
    }
    input_nacimiento.value = moment(persona.nacimiento).format('YYYY-MM-DD');
    input_edad.value = persona.edad;
    console.log(persona)

};

let validar = () => {
    let error = false;
    let elementos_requeridos = document.querySelectorAll('[required]');
    let input_sexo = document.querySelector('#sexo input[type=radio]:checked');
    let input_intereses = document.querySelectorAll('#intereses input[type=checkbox]:checked');

    for (let i = 0; i < elementos_requeridos.length; i++) {
        if (elementos_requeridos[i].value == '') {
            elementos_requeridos[i].classList.add('input-error');
            error = true;
        } else {
            elementos_requeridos[i].classList.remove('input-error');
        }
    }
    if (new Date(input_nacimiento.value) > new Date()) {
        input_nacimiento.classList.add('input-error');
        error = true;
    }
    if (Number(input_edad.value) < Number(input_edad.min) || Number(input_edad.value) > Number(input_edad.max)) {
        input_edad.classList.add('input-error');
        error = true;
    }

    if (!input_sexo) {
        error = true;
        document.querySelector('#sexo').classList.add('input-error');
    } else {
        document.querySelector('#sexo').classList.remove('input-error');
    }

    if (input_intereses.length < 1) {
        error = true;
        document.querySelector('#intereses').classList.add('input-error');
    } else {
        document.querySelector('#intereses').classList.remove('input-error');
    }


    return error;
};
let limpiar = () => {
    lista_tipo_persona.value = '';
    input_identificacion.value = '';
    input_nacimiento.value = '';
    input_edad.value = '';
};

let obtener_datos = () => {
    let error_validacion = validar();
    if (!error_validacion) {
        let tipo_persona = lista_tipo_persona.value;
        let identificacion = input_identificacion.value;
        let nombre = input_nombre.value;
        let sexo = document.querySelector('#sexo input[type=radio]:checked').value;
        let fecha = input_nacimiento.value;
        let edad = input_edad.value;
        let foto = input_foto.src;


        modificar_persona(_id, tipo_persona, identificacion, nombre, sexo, fecha, edad, foto);


    } else {
        Swal.fire({
            title: 'No se han podido enviar sus datos',
            text: 'Por favor revise los campos resaltados',
            icon: 'warning'
        })
    }

};


llenar_campos();
boton_guardar.addEventListener('click', obtener_datos);