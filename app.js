const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require('cors');

require('dotenv/config');

//import routes
const Patient = require('./routes/patient');
const Medecin = require('./routes/medecin');
const Traitement = require('./routes/traitement');
const RendezVous = require('./routes/rendezVous');


//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/patient', Patient);
app.use('/medecin', Medecin);
app.use('/traitement', Traitement);
app.use('/rendezVous', RendezVous);



//routes
app.get('/', (req, res) => {
    res.send("We are on home");
});


//connect to db
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true,  useUnifiedTopology: true}, () =>{
    try {
        console.log('connected to db');
    }catch(error){
        throw error;
    }
});


//Listen on port 3000
const port = process.env.PORT || '3000';
app.listen(port, function(){
    console.log(`listening on port ${port}`);
});
