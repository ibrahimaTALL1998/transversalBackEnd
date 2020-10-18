const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const PostSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    telPortable:{
        type: String,
        required: true
    },

    telFixe: String,

    adresse: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    CIN: {
        type: String,
        required: true
    },
    token: String
});

PostSchema.methods.generateToken = function(cb){
    var patient = this;
    var token = jwt.sign(patient._id.toHexString(),process.env.SECRET)
    patient.token = token;
    patient.save(function(err,patient){
        if(err) return cb(err);
        cb(null,patient);
    })
};

module.exports = mongoose.model('patients', PostSchema);