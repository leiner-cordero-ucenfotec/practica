'use strict';


const tbody = document.querySelector('#tbl-personas tbody');
const input_filtro = document.querySelector('#txt_filtro');
let lista_personas = [];
moment.locale('es');

let mostrar_datos = async() => {
    lista_personas = await listar_personas();
    tbody.innerHTML = '';

    for (let i = 0; i < lista_personas.length; i++) {
        let fila = tbody.insertRow();

        fila.insertCell().innerHTML = lista_personas[i]['tipo_persona'];
        fila.insertCell().innerHTML = lista_personas[i]['identificacion'];
        fila.insertCell().innerHTML = lista_personas[i]['nombre'];
        fila.insertCell().innerHTML = lista_personas[i]['sexo'];
        fila.insertCell().innerHTML = moment(lista_personas[i]['nacimiento']).format('LL');
        fila.insertCell().innerHTML = lista_personas[i]['edad'];

        let celda_editar = fila.insertCell();
        let boton_editar = document.createElement('button');
        boton_editar.type = 'button';
        boton_editar.innerText = 'Editar';

        boton_editar.addEventListener('click', () => {
            localStorage.setItem('identificacion_persona', lista_personas[i]['identificacion']);
            window.location.href = 'editar-persona.html';
        });

        celda_editar.appendChild(boton_editar);
    }
};

let filtrar_datos = () => {

    tbody.innerHTML = '';
    let filtro = input_filtro.value.toLowerCase();
    let hay_coincidencias = false;

    for (let i = 0; i < lista_personas.length; i++) {
        let nombre = lista_personas[i]['nombre'].toLowerCase();
        let identificacion = lista_personas[i]['identificacion'];

        if (nombre.includes(filtro) || identificacion.includes(filtro)) {
            let fila = tbody.insertRow();

            let celda_tipo = fila.insertCell().innerHTML = lista_personas[i]['tipo_persona'];
            let celda_identificacion = fila.insertCell().innerHTML = lista_personas[i]['identificacion'];
            let celda_nombre = fila.insertCell().innerHTML = lista_personas[i]['nombre'];
            let celda_sexo = fila.insertCell().innerHTML = lista_personas[i]['sexo'];
            let celda_nacimiento = fila.insertCell().innerHTML = moment(lista_personas[i]['nacimiento']).format('MMMM Do YYYY');



            let celda_edad = fila.insertCell().innerHTML = lista_personas[i]['edad'];
            hay_coincidencias = true;
        } else {

        }

    }
    if (hay_coincidencias == false) {
        tbody.innerHTML = 'No hay datos que mostrar';
    }
};

mostrar_datos();
input_filtro.addEventListener('keyup', filtrar_datos);