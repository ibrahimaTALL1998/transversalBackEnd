const express = require('express');
const router = express.Router();
const Traitement = require('../models/traitement');

//get all objects
router.get('/', async (req, res) => {
    try {
        const traitements = await Traitement.find();
        res.json(traitements);
    } catch (error) {
        res.json({message : error});
    }
});

//insert
router.post('/', async (req, res) => {
    const traitement = new Traitement({
        idPatient: req.body.idPatient,
        idMedecin: req.body.idMedecin,
        DateDebut: new Date(req.body.DateDebut),
        DateFin: new Date(req.body.DateFin)
    });

    try{
    const savedTraitement = await traitement.save();
    res.json(savedTraitement);
    } catch(err){
        res.json({message: err});
    }
});

//get specific object
router.get('/:patientID', async (req, res) => {
    try {
        const singleTraitement = await Traitement.findById(req.params.patientID);
        res.json(singleTraitement);
    } catch (error) {
        res.json({message : error});
    }
});

//delete patient
router.delete('/:patientID', async (req, res) => {
    try {
        const removedTraitement = await Traitement.deleteOne({_id: req.params.patientID});
        res.json(removedTraitement);
    } catch (error) {
        res.json({message : error});
    }
});

module.exports = router;