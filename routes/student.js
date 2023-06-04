const express = require('express')
const router = express.Router()
const studentModel = require('../models/students')

router.get('/', async  (request, response)=>{
    const students = await studentModel.find();
    try{
        response.status(200).json(students);
    }
    catch(errorMessage){
        response.status(500).json({message:errorMessage});
    }
})

// router.route('/').get().post()
// router.route('/:id').get().patch().delete()

router.post('/',async (request,response)=>{
    const newStudent = new studentModel({
        name:request.body.name,
        enrollmentDepartment:request.body.enrollmentDepartment,
        enrollmentDate:request.body.enrollmentDate
    })
    try{
        const student = await newStudent.save();
        response.status(200).json(student); 
    }
    catch(errorMessage){
        response.status(500).json({message:errorMessage});
    }
})


router.get('/:id',getStudent,(request,response)=>{
    response.status(200).json(response.studenthh)
})


router.patch('/:id',getStudent ,async (request,response)=>{
    if(request.body.name != null){
        response.student.name = request.body.name;
    }
    if(request.body.enrollDepartment != null){
        response.student.enrollDepartment = request.body.enrollDepartment;
    }
    try{
        const updatedStudent = await response.student.save();
        response.status(200).json(updatedStudent);
    }
    catch(error){
        return response.status(400).json({message: error.message})
    }
})


router.delete('/:id',getStudent,async (request,response)=>{
    try{
        await response.student.deleteOne();
        response.json({message: `Deleted the user ${response.params.id}`})
    }
    catch(error){
        return response.status(500).json({message: error.message})
    }
})

async function getStudent(request,response,next){
    let student 
    try{
        student = await studentModel.findById(request.params.id)
        if(student == null){
            return response.status(200).json({message: `Cannot find user with ${request.params.id}`})
        }
    }
    catch(error){
        return response.status(500).json({message: error.message})
    }
    response.studenthh = student;
    next()
}

module.exports = router