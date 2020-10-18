const express = require('express');
const router = express.Router();
const Patient = require('../models/patient');
const jwt = require('jsonwebtoken');
require('cookie-parser');

//get all objects
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.json({message : error});
    }
});

//insert
router.post('/', async (req, res) => {
    const patient = new Patient({
        nom: req.body.nom,
        prenom: req.body.prenom,
        telPortable: req.body.telPortable,
        telFixe: req.body.telFixe,
        adresse: req.body.adresse,
        login: req.body.login,
        password: req.body.password,
        mail: req.body.mail,
        CIN: req.body.CIN
    });

    try{
    const savedPatient = await patient.save();
    res.json(savedPatient);
    } catch(err){
        res.json({message: err});
    }
});

//get specific object
router.get('/:patientID', async (req, res) => {
    try {
        const singlePatient = await Patient.findById(req.params.patientID);
        res.json(singlePatient);
    } catch (error) {
        res.json({message : error});
    }
});

//delete patient
router.delete('/:patientID', async (req, res) => {
    try {
        const removedPatient = await Patient.deleteOne({_id: req.params.patientID});
        res.json(removedPatient);
    } catch (error) {
        res.json({message : error});
    }
});

//update patient
// router.patch('/:patientID', async (req, res) => {
//     try {
//         const updatedPatient = await Patient.updateOne({_id: req.params.patientID}, {$set: {password: req.body.password}});
//         res.json(updatedPatient);
//     } catch (error) {
//         res.json({message : error});
//     }
// });

//login
router.post('/auth', (req, res) => {
    Patient.findOne({'login': req.body.login, 'password': req.body.password}, (err, patientAuth) =>{
        if (!patientAuth) return res.json({'Status': 'login or password noy valid'})

        patientAuth.generateToken((err, patientAuth) => {
            if (err) return res.status(400).send(err);
        })

        res.cookie('auth', patientAuth.token).status(200).json({'Login Success': 'True'})
    })
})

//logout
router.get('/logout', (req,res) => {
    Patient.findByIdAndUpdate(
        {'mail': req.body.mail}, 
        {token: ''},
        (err,doc) =>{
            if (err) return res.json({sucess: false}, err)
            return res.status(200).send({sucess: true})
        }
    )
})


module.exports = router;