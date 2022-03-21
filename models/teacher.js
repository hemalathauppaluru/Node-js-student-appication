const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  sName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  sRollNo: {
    type: Number,
    required: true,
    minlength: 2,
    maxlength: 10,
  },
  sMarks: {
    type: Number,
    required: true,
    minlength: 2,
    maxlength: 10,
  },
  sEmail: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("students", studentSchema);
