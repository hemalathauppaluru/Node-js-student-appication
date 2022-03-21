const bcrypt = require("bcryptjs");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { fname, lname, email, password,role } = req.body;
  try {
    const userExists = await userModel.findOne({ email: email }).lean();
    if (userExists) {
      res.status(401).json({
        error: true,
        message: "Email already exists",
        data: null,
      });
    } else {
      const saltRounds = 10;
      // salting
      const salt = await bcrypt.genSalt(saltRounds);
      console.log("SaltRounds", salt);
      // hashing
      const hasedPassword = await bcrypt.hash(password, salt);
      console.log("hasedPassword", hasedPassword);
      await userModel.insertMany([
        {
          fname,
          lname,
          email,
          password: hasedPassword,
          role,
        },
      ]);
      res.status(200).json({
        error: false,
        message: "User registration successfull",
        data: {
          fname,
          lname,
          email,
          password: hasedPassword,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    const userData = await userModel.findOne({ email }).lean();
    if (userData) {
      const { fname, lname,role } = userData;
      const isPasswordMatch = await bcrypt.compare(password, userData.password);
      if (isPasswordMatch) {
        const payload = {
          fname,
          lname,
          role
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: "10h",
        });
        res.status(200).json({
          error: false,
          message: "Login successful",
          data: {
            payload,
            token,
          },
        });
      } else {
        res.status(401).json({
          error: true,
          message: "Invalid password",
          data: null,
        });
      }
    } else {
      res.status(200).json({
        error: true,
        message: "Email doesn't exist, Please create account",
        data: null,
      });
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {
  register,
  login,
};
