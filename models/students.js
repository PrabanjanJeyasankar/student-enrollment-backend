const mongoose = require('mongoose')

const studentsSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    enrollmentDepartment:{
        type: String,
        require: true
    },
    enrollmentDate:{
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('studentModel', studentsSchema)