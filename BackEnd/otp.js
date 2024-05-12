const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'sakthiadhu@gmail.com',
        pass: 'rtqm dntj ohqu ujhu' 
    }
});

// Function to send OTP via email
function sendOTP(email) {
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    
    // Calculate expiration time (15 minutes from now)
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 15);

    const mailOptions = {
        from: 'sakthiadhu@gmail.com',
        to: email,
        subject: 'Your OTP for Verification',
        text: `Your OTP is: ${otp}. It will expire in 15 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    return { otp, expirationTime };
}

// Function to validate OTP with expiration time checking
function validateOTP(enteredOTP, sentOTP, expirationTime) {
    // Check if the entered OTP matches the sent OTP
    if (enteredOTP === sentOTP) {
        // Check if the expiration time has not passed
        if (new Date() <= new Date(expirationTime)) {
            return { status: 200, message: 'OTP is valid' };
        } else {
            return { status: 400, message: 'OTP has expired' };
        }
    } else {
        return { status: 400, message: 'Incorrect OTP' };
    }
}

// Export both functions as properties of a single object
module.exports = {
    sendOTP: sendOTP,
    validateOTP: validateOTP
};
