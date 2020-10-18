const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    specialite: {
        type: String,
        required: true
    },
    telPortable: String,

    telFixe: String,

    adresse: {
        type: String,
        required: true
    },
    typeEtabl: {
        type: String,
        enum: ['publique', 'privé']
    },
    mail:{
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
    }
});

module.exports = mongoose.model('medecins', PostSchema);