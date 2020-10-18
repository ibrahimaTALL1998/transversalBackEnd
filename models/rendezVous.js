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
    date:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('rendezVous', PostSchema);