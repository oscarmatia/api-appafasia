const express = require('express');
const morgan = require('morgan');


//Initializations
const app = express();

//Settings
const PORT = process.env.PORT || 3000;
app.set('json spaces', 2);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Routes
app.use(require('./backend/fonos'));
app.use(require('./backend/pacientes'));
app.use(require('./backend/actividades'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
