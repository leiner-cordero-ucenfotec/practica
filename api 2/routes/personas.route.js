'use strict';
const express = require('express');
const router = express.Router();
const Persona = require('../models/personas.model');
const mailer = require('../templates/registro-template')


router.post('/registrar-persona', (req, res) => {
    let body = req.body;
    let nueva_persona = new Persona({
        tipo_persona: body.tipo_persona,
        identificacion: body.identificacion,
        nombre: body.nombre,
        sexo: body.sexo,
        nacimiento: body.fecha_nacimiento,
        edad: body.edad,
        foto: body.foto,
        estado: 'activo'
    });

    nueva_persona.save((err, personaDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la persona, ocurrió el siguiente error:',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se enviaron de forma exitosa',
                personaDB
            });
            mailer.enviar_mail(personaDB.nombre);
        }
    });

});

router.get('/listar-personas', (req, res) => {
    Persona.find((err, lista_personas) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudieron registrar las personas',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Las personas se listaron adecuadamente',
                lista_personas
            });
        }
    });
});

router.get('/buscar-persona-identificacion', function(req, res) {

    let identificacion = req.query.identificacion

    Persona.findOne({ identificacion: identificacion }, (err, personaDB) => {
        if (err) {
            return res.json({
                success: false,
                msj: 'No se encontró ninguna persona con esa identificación',
                err
            });
        } else {
            return res.json({
                success: true,
                persona: personaDB
            });
        }
    })

});
router.put('/modificar-persona', function(req, res) {
    let body = req.body;

    Persona.updateOne({ _id: body._id }, {
            $set: req.body
        },
        function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar la persona',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
});

router.post('/registrar-intereses', (req, res) => {
    let body = req.body;
    let error;

    let intereses = JSON.parse(body.intereses);

    intereses.forEach(interes => {
        Persona.update({ _id: body._id }, {
                $push: {
                    'intereses': {
                        interes: interes
                    }
                }
            },
            (error) => {
                if (error) {
                    error = error
                }
            }
        )
    });

    if (error) {
        return res.json({
            resultado: false,
            msj: 'No se pudieron agregar los intereses',
            error
        });
    } else {
        return res.json({
            resultado: true,
            msj: 'Se agregaron los intereses de forma correcta'
        })
    }
});




module.exports = router;