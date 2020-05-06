'use strict'

let registrar_persona = async (ptipo_persona, pidentificacion, pnombre, psexo, pfecha, pedad, pfoto, pintereses) => {

    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-persona',
        responseType: 'json',
        data: {
            'tipo_persona': ptipo_persona,
            'identificacion': pidentificacion,
            'nombre': pnombre,
            'sexo': psexo,
            'fecha_nacimiento': pfecha,
            'edad': pedad,
            'foto': pfoto
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            switch (res.data.err.code) {
                case 11000:
                    Swal.fire({
                        title: 'No se pudo registrar la persona',
                        text: 'Ya existe una persona registrada con esa identificación',
                        icon: 'error'
                    });
                    break;
            }
        } else {
            registrar_intereses(res.data.personaDB._id, pintereses);
            Swal.fire({
                title: 'El proceso se realizó correctamente',
                text: 'Sus datos han sido almacenados',
                icon: 'success'
            }).then(() => {
                limpiar();
            });
        }
    }).catch((err) => {
        console.log(err);
    });

};


let listar_personas = async () => {
    let lista_personas = [];

    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-personas',
        responseType: 'json',
    }).then((res) => {
        lista_personas = res.data.lista_personas
    }).catch((err) => {
        console.log('No se pudo establecer la comunicación con el servidor, ocurrió el siguiente error: ', err)
    });

    return lista_personas;
};

let obtener_persona_id = async (identificacion) => {
    try {
        const response = await axios({
            method: 'get',
            params: { identificacion: identificacion },
            url: `http://localhost:3000/api/buscar-persona-identificacion`,
            responseType: 'json'
        });
        return response.data.persona;
    } catch (error) {
        console.log(error);
    }
};

let modificar_persona = async (p_id, ptipo_persona, pidentificacion, pnombre, psexo, pfecha, pedad, pfoto) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-persona',
        responseType: 'json',
        data: {
            '_id': p_id,
            'tipo_persona': ptipo_persona,
            'identificacion': pidentificacion,
            'nombre': pnombre,
            'sexo': psexo,
            'fecha_nacimiento': pfecha,
            'edad': pedad,
            'foto': pfoto
        }
    }).then((res) => {

        Swal.fire({
            title: 'El proceso se realizó correctamente',
            text: 'Sus datos han sido modificados',
            icon: 'success'
        }).then(() => {
            window.location.href = './listar-personas.html';
        });

    }).catch((err) => {
        console.log(err);
    });
};

let registrar_intereses = async (p_id, pintereses) => {
    await axios({
        method: 'post',
        url: 'http://localhost:3000/api/registrar-intereses',
        responseType: 'json',
        data: {
            '_id': p_id,
            'intereses': pintereses
        }
    }).then((res) => {
        if (res.data.resultado == false) {
            console.log('No se pudieron agregar los intereses');
        } else {
            console.log('Los intereses se registraron exitosamente');
        }
    }).catch((err) => {
        console.log(err);
    });

};