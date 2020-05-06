'use strict';
// Archivos controladores tienen las siguientes funciones:

// - Leer valores del html (formulario)
// - Muestra / imprime valores en el html
// - Realiza validaciones
// - Se comunica con el archivo servicio js

// let  es lo que vamos a utilizar
// const se utiliza para valores que no van a cambiar (el valor con el que se inicializar la variable no puede ser modificado)
// var ya no se suele utilizar

const boton_guardar = document.querySelector('#btn-guardar');
const lista_tipo_persona = document.querySelector('#slt-tipo-persona');
const input_identificacion = document.querySelector('#txt-identificacion');
const input_nombre = document.querySelector('#txt-nombre');
const input_nacimiento = document.querySelector('#txt-nacimiento');
const input_edad = document.querySelector('#txt-edad');
const input_foto = document.querySelector('#user-photo');

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
        let inputs_intereses = document.querySelectorAll('#intereses input[type=checkbox]:checked');
        let intereses = [];

        inputs_intereses.forEach(input => {
            intereses.push(input.value);
        });

        registrar_persona(tipo_persona, identificacion, nombre, sexo, fecha, edad, foto, JSON.stringify(intereses));

    } else {
        Swal.fire({
            title: 'No se han podido enviar sus datos',
            text: 'Por favor revise los campos resaltados',
            icon: 'warning'
        })
    }

};


boton_guardar.addEventListener('click', obtener_datos);