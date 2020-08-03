const mysql = require('mysql');

// MySql
const conectar = mysql.createConnection({
    host: 'ftp.talleringswii.cl',
    port: '3306',
    user: 'tallerin_root_equipo1',
    password: 'C0d1g0 F1n4l',
    database: 'tallerin_equipo1'
});

conectar.connect(error => {
    if (error) throw error;
    console.log('Base de datos running');
});

module.exports = conectar;