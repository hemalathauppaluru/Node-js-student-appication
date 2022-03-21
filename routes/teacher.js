const express =require('express')

const router =express.Router()
const auth=require('../middlewares/auth')

const teacherController =require('../controllers/teacher')

router.get('/get-student',auth.authorizeStudent,teacherController.particularSDetail)
router.get('/get-students',auth.authorizeTeacher ,teacherController.getAllSDetails)
router.post('/add-students',auth.authorizeTeacher,teacherController.addSDetails)
router.put('/edit-students',auth.authorizeTeacher,teacherController.editSDetails)
router.delete('/delete-students',auth.authorizeTeacher,teacherController.deleteSDetails)

module.exports=router
