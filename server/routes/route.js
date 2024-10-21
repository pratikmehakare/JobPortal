const express = require('express');
const { sendOtp, verifyOtp, sendJobEmail } = require('../controllers/otpController');
const { register, getUsersDetails} = require('../controllers/authController');
const { auth } = require('../middleware/auth');
//const { phonesendOtp, phoneverifyOtp } = require('../controllers/phoneotp');


const router = express.Router();

router.post('/jobpost',sendJobEmail)

router.post('/register', register);

router.get('/user',auth,getUsersDetails);

// Route to send OTP
router.post('/send', sendOtp);
// Route to verify OTP
router.post('/verify', verifyOtp);

// router.post('/sendphoneotp',phonesendOtp);
// router.post('/verifyphoneotp',phoneverifyOtp)

module.exports = router;
