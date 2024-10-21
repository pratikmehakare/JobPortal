const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config()

exports.register = async (req, res) => {
  const { name, phone, company, email, employeesize } = req.body;

  // Check if all required fields are provided
  if (!name || !phone || !company || !email || !employeesize) {
    return res.status(400).json({
      success: false,
      message: "All details are mandatory",
    });
  }

  try {
    // Check if the user already exists with the given email or phone
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or phone already exists",
      });
    }

    // Create a new user instance
    const user = new User({ name, phone, company, email, employeesize });

    // Save the new user to the database
    await user.save();

    // Generate JWT token for authentication (adjust as needed)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d', // Token validity duration (e.g., 1 day)
    });

    // Send a welcome email using nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Welcome to Our Platform',
      text: `Hi ${name},\n\nThank you for registering with Cuvette.\n\nBest Regards,\nThe Team`,
    };

    await transporter.sendMail(mailOptions);

    // Respond with success and the token
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};


exports.getUsersDetails = async (req,res) =>{
  try{
    const id = req.user.id;

    if(!id){
      return res.status(400).json({
        success:false,
        message:"Id not found"
      })
    }

    const user = await User.findOne({_id:id});

    if(!user){
      return res.status(400).json({
        success:false,
        message:"User not found"
      })
    }

    // console.log("User:",user);

    res.status(200).json({
      success:true,
      message:"User Data fetch successful.",
      data:user
    })

  }catch(err){
    return res.status(500).json({
      message:"Internal Error",
      success:false,
      error:err.message
    })
  }
}

