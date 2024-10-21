const JobPost = require('../model/post.model')
const crypto = require('crypto');
const mailSender = require('../mail/mailSender');
const emailTemplate = require('../mail/emailTemplate')
const jobDetailsTemplate = require('../mail/jobMail')

const otpStore = {}; 

//Send post to emails
exports.sendJobEmail = async (req, res) => {
  const { emails, company, jobTitle, description, experience, endDate } = req.body;

  try {

    await Promise.all(emails.map(email => 
      mailSender(email, `Job Opening at ${company}`, jobDetailsTemplate(company, jobTitle, description, experience, endDate))
    ));

    const newJobPost = new JobPost({
      jobTitle,
      description,
      experience,
      company,
      emails,
      endDate,
    });

    await newJobPost.save(); 

    res.status(200).json({ message: 'Job details sent successfully and saved to the database!' });
  } catch (error) {
    console.error('Error sending job email or saving to database:', error);
    res.status(500).json({ message: 'Failed to send job email or save to database. Please try again later.' });
  }
};

//Function to send OTP
exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  const otp = crypto.randomInt(100000, 999999).toString();

  otpStore[email] = otp;


  try {

    await mailSender(email,"Your OTP For Verification",emailTemplate(otp));
    res.status(200).json({ message: 'OTP sent successfully!' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
  }
};

// Function to verify OTP
exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  // Check if OTP is valid
  if (otpStore[email] && otpStore[email] === otp) {
    // Optionally, you can implement expiration logic for OTPs
    delete otpStore[email]; // Remove OTP after verification
    return res.status(200).json({ message: 'OTP verified successfully!' });
  }

  res.status(400).json({ message: 'Invalid OTP. Please try again.' });
};
