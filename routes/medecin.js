const express = require('express');
const router = express.Router();
const Medecin = require('../models/medecin');

//get all objects
router.get('/', async (req, res) => {
    try {
        const medecins = await Medecin.find();
        res.json(medecins);
    } catch (error) {
        res.json({message : error});
    }
});

//insert
router.post('/', async (req, res) => {
    const medecin = new Medecin({
        nom: req.body.nom,
        prenom: req.body.prenom,
        specialite: req.body.specialite,
        telPortable: req.body.telPortable,
        telFixe: req.body.telFixe,
        adresse: req.body.adresse,
        typeEtabl: req.body.typeEtabl,
        mail: req.body.mail,
        login: req.body.login,
        password: req.body.password
    });

    try{
    const savedMedecin = await medecin.save();
    res.json(savedMedecin);
    } catch(err){
        res.json({message: err});
    }
});

//get specific object
router.get('/:patientID', async (req, res) => {
    try {
        const singleMedecin = await Medecin.findById(req.params.patientID);
        res.json(singleMedecin);
    } catch (error) {
        res.json({message : error});
    }
});

//delete patient
router.delete('/:patientID', async (req, res) => {
    try {
        const removedMedecin = await Medecin.deleteOne({_id: req.params.patientID});
        res.json(removedMedecin);
    } catch (error) {
        res.json({message : error});
    }
});

module.exports = router;