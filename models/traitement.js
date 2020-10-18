const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    idPatient: {
        type: String,
        required: true
    },
    idMedecin: {
        type: String,
        required: true
    },
    DateDebut:{
        type: String,
        required: true
    },
    DateFin: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('traitements', PostSchema);