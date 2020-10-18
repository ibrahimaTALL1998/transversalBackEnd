const express = require('express');
const router = express.Router();
const RendezVous = require('../models/rendezVous');

//get all objects
router.get('/', async (req, res) => {
    try {
        const rendezVous = await RendezVous.find();
        res.json(rendezVous);
    } catch (error) {
        res.json({message : error});
    }
});

//insert
router.post('/', async (req, res) => {
    const rendezVous = new RendezVous({
        idPatient: req.body.idPatient,
        idMedecin: req.body.idMedecin,
        date: new Date(req.body.date)
    });

    try{
    const savedRendezVous = await rendezVous.save();
    res.json(savedRendezVous);
    } catch(err){
        res.json({message: err});
    }
});

//get specific object
router.get('/:patientID', async (req, res) => {
    try {
        const singleRendezVous = await RendezVous.findById(req.params.patientID);
        res.json(singleRendezVous);
    } catch (error) {
        res.json({message : error});
    }
});

//delete patient
router.delete('/:patientID', async (req, res) => {
    try {
        const removedRendezVous = await RendezVous.deleteOne({_id: req.params.patientID});
        res.json(removedRendezVous);
    } catch (error) {
        res.json({message : error});
    }
});

module.exports = router;