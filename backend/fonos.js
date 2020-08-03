const express = require('express');
const { Router } = require('express');
const router = Router();

const conectar = require('../database');

//Obtener lista de fonoaudiologos registrados
router.get('/GetAllFonosList', (req, res) => {
    const sql = 'SELECT * FROM fonoaudiologo';
    conectar.query(sql, (error, results) =>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results);
        }else {
            res.json({"status":"success", "message": "NoData"});
        }
    });
});

//Obtener informacion de un solo fonoaudilogo
router.get('/GetFono/:run_usuario', (req,res) => {
    const {run_usuario} = req.params;
    const sql = `SELECT * FROM fonoaudiologo WHERE run_usuario = ${run_usuario}`;
    conectar.query(sql, (error, results) =>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results);
        }else {
            res.json({"status":"error", "message": "Usuario No Encontrado"});
        }
    });
});

//Insertar un fonoaudilogo en la BD
router.post('/InsertFono', (req, res) => {
    const sql = 'INSERT INTO fonoaudiologo SET ?';
    const objeto_fono = {
        run_usuario: req.body.run_usuario,
        nombre_usuario: req.body.nombre_usuario,
        apellido_usuario: req.body.nombre_usuario,
        contraseña_usuario: req.body.contraseña_usuario,
        administrador: req.body.administrador,
        genero_usuario: req.body.genero_usuario
    };
    conectar.query(sql, objeto_fono, error => {
        if (error) throw error;
        res.send('Fonoaudiologo creado');
    });
});

//Actualizar un fonoaudilogo de la BD
router.put('/UpdateFono/:run_usuario',(req, res) => {
    const {run_usuario} = req.params;
    const {nombre_usuario, apellido_usuario, contraseña_usuario, administrador, genero_usuario} = req.body;
    const sql = `UPDATE fonoaudiologo SET nombre_usuario = '${nombre_usuario}' , apellido_usuario = '${apellido_usuario}', contraseña_usuario = '${contraseña_usuario}', administrador = '${administrador}', genero_usuario = '${genero_usuario}'  WHERE run_usuario = ${run_usuario}`;
    conectar.query(sql, error => {
        if (error) throw error;
        res.json({"status":"success", "message": "Fonoaudiologo registrado con éxito"});
    });
} );

//Eliminar un fonoaudiologo de la BD
router.delete('/DeleteFono/:run_usuario', (req, res) => {
    const {run_usuario} = req.params;
    const sql = `DELETE FROM fonoaudiologo WHERE run_usuario = ${run_usuario}`;
    conectar.query(sql, error => {
        if (error) throw error;
        res.send('Fonoaudiologo eliminado');
    });
});

module.exports = router;