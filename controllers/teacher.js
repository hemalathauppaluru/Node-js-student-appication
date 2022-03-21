const student = require("../models/teacher");

const particularSDetail =async(req,res,next) =>{
  const {sRollNo} = req.query;
  try{
    const studentExists =await student.findOne({sRollNo:sRollNo}).lean();
    if(studentExists){
    res.json({
      error:false,
      message:"Student Detail fetched Successfully",
      data:studentExists
    });
  }else{
    res.status(401).json({
      error: true,
      message: "Student Details are not present",
      data: null,
    });
  }
  }catch(err){
    next(err)
  }
}


const getAllSDetails = async (req, res, next) => {
  try {
    const students = await student.find().lean();
    res.json({
      error: false,
      message: "All Students Details",
      data: students,
    });
  } catch (err) {
    next(err);
  }
};

const addSDetails = async (req, res, next) => {
  try {
    let { sName, sRollNo, sMarks,sEmail } = req.body;
    await student.insertMany([
      {
        sName,
        sRollNo,
        sMarks,
        sEmail
      },
    ]);
    res.status(200).json({
      error: false,
      message: "Student Details Added Successful",
      data: { sName, sRollNo, sMarks, sEmail },
    });
  } catch (err) {
    next(err);
  }
};

const editSDetails = async (req, res, next) => {
  const { _id, sName, sRollNo, sMarks, sEmail } = req.body;
  try {
    await student.updateOne(
      {
        _id: _id,
      },
      {
        $set: {
          sName,
          sRollNo,
          sMarks,
          sEmail
        },
      }
    );
    res.json({
      error: false,
      message: "Student Detail updated Successfully",
      data: { _id, sName, sRollNo, sMarks,sEmail },
    });
  } catch (err) {
    next(err);
  }
};
const deleteSDetails = async (req, res, next) => {
  let { _id } = req.body;
  try {
    await student.deleteOne({ _id: _id });
    res.status(200).json({
      error: false,
      message: "Student details deleted successfill",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {particularSDetail, getAllSDetails, addSDetails, editSDetails, deleteSDetails };
