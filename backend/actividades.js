const express = require('express');
const { Router } = require('express');
const router = express.Router();

const conectar = require('../database');



//Obtener lista de actividades registrados
router.get('/GetAllActividadList', (req, res) => {
    const sql = 'SELECT * FROM actvidad';
    
    conectar.query(sql, (error, results) =>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results);
        }else {
            res.json({"status":"success", "message": "NoData"});
        }
    });
});

//Obtener informacion de una sola actividad
router.get('/GetActividad/:id_actividad', (req,res) => {
    const {id_actividad} = req.params;
    const sql = `SELECT * FROM actividad WHERE id_actividad = ${id_actividad}`;
    conectar.query(sql, (error, results) =>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results);
        }else {
            res.json({"status":"error", "message": "Actvidiad no Encontrado"});
        }
    });
});

//Insertar una actvidad en la BD
router.post('/InsertActividad', (req, res) => {
    const sql = 'INSERT INTO actividad SET ?';
    const objeto_actividad = {
        id_actividad: req.body.id_actividad,
        run_usuario: req.body.run_usuario,
        run_paciente: req.body.run_paciente,
        actividad: req.body.actividad,
        subactividad: req.body.subactividad,
        nombre_actividad: req.body.nombre_actividad,
        fecha_actividad: req.body.fecha_actividad
    };
    conectar.query(sql, objeto_actividad, error => {
        if (error) throw error;
        res.send('Actvidad creada');
    });
});

//Actualizar una actividad de la BD
router.put('/UpdateActividad/:id_actividad',(req, res) => {
    const {id_actividad} = req.params;
    const {run_usuario, run_paciente, actividad, subactividad, nombre_actividad, fecha_actividad} = req.body;
    const sql = `UPDATE actividad SET nombre_actividad = '${nombre_actividad}' WHERE id_actividad = ${id_actividad}`;
    conectar.query(sql, error => {
        if (error) throw error;
        res.json({"status":"success", "message": "Actividad actualizado con éxito"});
    });
} );

//Eliminar una actividad de la BD
router.delete('/DeleteActividad/:id_actividad', (req, res) => {
    const {id_actividad} = req.params;
    const sql = `DELETE FROM actividad WHERE id_actividad = ${id_actividad}`;
    conectar.query(sql, error => {
        if (error) throw error;
        res.send('Actividad eliminada');
    });
});

module.exports = router;