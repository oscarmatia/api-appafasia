const express = require('express');
const { Router } = require('express');
const router = express.Router();

const conectar = require('../database');


//Obtener lista de pacientes registrados
router.get('/GetAllPacienteList', (req, res) => {
    const sql = 'SELECT * FROM paciente';
    conectar.query(sql, (error, results) =>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results);
        }else {
            res.json({"status":"success", "message": "NoData"});
        }
    });
});

//Obtener informacion de un solo paciente
router.get('/GetPaciente/:run_paciente', (req,res) => {
    const {run_paciente} = req.params;
    const sql = `SELECT * FROM paciente WHERE run_paciente = ${run_paciente}`;
    conectar.query(sql, (error, results) =>{
        if (error) throw error;
        if (results.length > 0){
            res.json(results);
        }else {
            res.json({"status":"error", "message": "Paciente No Encontrado"});
        }
    });
});

//Insertar un paciente en la BD
router.post('/InsertPaciente', (req, res) => {
    const sql = 'INSERT INTO paciente SET ?';
    const objeto_paciente = {
        run_paciente: req.body.run_paciente,
        nombre_paciente: req.body.nombre_paciente,
        apellido_paciente: req.body.apellido_paciente,
        fecha_nac: req.body.fecha_nac,
        fecha_ingreso: req.body.fecha_ingreso,
        fecha_alta: req.body.fecha_alta,
        descripcion: req.body.descripcion
    };
    conectar.query(sql, objeto_paciente, error => {
        if (error) throw error;
        res.send('Paciente creado');
    });
});

//Actualizar un paciente de la BD
router.put('/UpdatePaciente/:run_paciente',(req, res) => {
    const {run_paciente} = req.params;
    const {nombre_paciente, apellido_paciente, fecha_nac, fecha_ingreso, fecha_alta, descripcion} = req.body;
    const sql = `UPDATE paciente SET nombre_paciente = '${nombre_paciente}', apellido_paciente = '${apellido_paciente}', fecha_nac = '${fecha_nac}', fecha_ingreso = '${fecha_ingreso}', fecha_alta = '${fecha_ingreso}', descripcion = '${descripcion}' WHERE run_paciente = ${run_paciente}`;
    conectar.query(sql, error => {
        if (error) throw error;
        res.json({"status":"success", "message": "Paciente registrado con éxito"});
    });
} );

//Eliminar un paciente de la BD
router.delete('/DeletePaciente/:run_paciente', (req, res) => {
    const {run_paciente} = req.params;
    const sql = `DELETE FROM paciente WHERE run_paciente = ${run_paciente}`;
    conectar.query(sql, error => {
        if (error) throw error;
        res.send('Paciente eliminado');
    });
});

module.exports = router;