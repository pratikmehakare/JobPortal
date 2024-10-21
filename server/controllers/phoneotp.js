// const twilio = require('twilio');
// const crypto = require('crypto');
// require('dotenv').config();
// const otpStore = {}; // To store OTPs temporarily

// const client = twilio(process.env.SMS_SERVICE_SID, process.env.SMS_AUTH_TOKEN);

// exports.phonesendOtp = async (req, res) => {
//   const { mobile } = req.body;

//   const otp = crypto.randomInt(100000, 999999).toString();

//   otpStore[mobile] = otp;

//   try {
//     // Send OTP SMS
//     await client.messages.create({
//       body: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
//     //   from: process.env.SMS_FROM_NUMBER,
//       from:'919022781440' ,
//       to: mobile,
//     });

//     res.status(200).json({ message: 'OTP sent successfully!' });
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
//   }
// };

// // Function to verify OTP
// exports.phoneverifyOtp = (req, res) => {
//   const { mobile, otp } = req.body;

//   // Check if OTP is valid
//   if (otpStore[mobile] && otpStore[mobile] === otp) {
//     // Optionally, implement expiration logic for OTPs
//     delete otpStore[mobile]; // Remove OTP after verification
//     return res.status(200).json({ message: 'OTP verified successfully!' });
//   }

//   res.status(400).json({ message: 'Invalid OTP. Please try again.' });
// };
