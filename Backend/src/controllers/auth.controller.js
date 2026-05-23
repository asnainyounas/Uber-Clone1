// const userModel = require('../models/user.model');
// const userService = require('../services/users.services');
// const { validationResult } = require('express-validator');
// const blackListTokenModel = require('../models/blackListToken.model');
// module.exports.registerUser = async (req, res,next) => {
//  const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { fullname, email, password } = req.body;

//     const isUserAlready = await userModel.findOne({ email });

//     if (isUserAlready) {
//         return res.status(400).json({ message: 'User already exist' });
//     }

//     const hashedPassword = await userModel.hashPassword(password);

//     const user = await userService.createUser({// this function is trying to do that hey user service create a user for me in database here is ur data
//         firstname: fullname.firstname,
//         lastname: fullname.lastname,
//         email,
//         password: hashedPassword
//     });

//     const token = user.generateAuthToken();

//     res.status(201).json({ token, user });

// }



// // module.exports.loginUser = async (req, res,next) => {
// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //         return res.status(400).json({ errors: errors.array() });
// //     }
// //     const { email, password } = req.body;

// //     const user = await userModel.findOne({ email }).select('+password');
// //     //to get password which is select:false in schema and Find the user by email, and include the password field too, because I need to check it right now
// //     if (!user) {
// //         return res.status(401).json({ message: 'Invalid email or password' });
// //     }
// //     const isMatch = await user.comparePassword(password);

// //     if (!isMatch) {
// //         return res.status(401).json({ message: 'Invalid email or password' });
// //     }
// //     const token = user.generateAuthToken();
// // res.cookie('token', token);
// //     res.status(200).json({ token, user });
// // }

// module.exports.loginUser = async (req, res,next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email }).select('+password');
//     if (!user) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//     }
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const token = user.generateAuthToken();

//     // ✅ Set the cookie properly here
//     res.cookie('token', token, {
//         httpOnly: true,
//         secure: false,
//         sameSite: 'lax',
//         maxAge: 24 * 60 * 60 * 1000
//     });

//     res.status(200).json({ token, user });
// }


// module.exports.getUserProfile = async (req, res,next) => {
//      res.status(200).json(req.user);
// }


// module.exports.logoutUser = async (req, res,next) => {
//   res.clearCookie('token');
//     const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

//     await blacklistTokenModel.create({ token });

//     res.status(200).json({ message: 'Logged out' });

// }





const userModel = require('../Models/auth.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config.js')
const sessionModel = require('../Models/session.model')
const { sendEmail } =require ('../services/email.service')
const { generateOtp, getOtpHtml } = require('../utils/utils.js')
const otpModel = require('../Models/otp.model')

async function register(req, res) {
  try {

    const { fullname, email, password } = req.body

    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
      return res.status(409).send({
        message: 'email already registered'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname
      },
      email,
      password: hashedPassword
    })

    const otp = generateOtp()
    const html = getOtpHtml(otp)

    const otpHash = await bcrypt.hash(otp, 10)

    await otpModel.create({
      email,
      user: user._id,
      otpHash
    })

    await sendEmail(
      email,
      "OTP Verification",
      `Your OTP code is ${otp}`,
      html
    )

    return res.status(201).send({
      message: 'user registered successfully',
      user: {
        fullname: user.fullname,
        email: user.email
      },
      verified: user.verified
    })

  } catch (err) {
    console.log(err)
    return res.status(500).send({
      message: "Internal server error"
    })
  }
}


async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: 'email and password are required' });
        }

        

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: 'invalid credentials' });
        }

          if (!user.verified) {
        return res.status(401).json({
            message: "Email not verified"
        })
    }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'invalid credentials' });
        }

        const session = await sessionModel.create({
            user: user._id,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            refreshTokenHash: 'temp'
        });

        const refreshToken = jwt.sign(
            { id: user._id, sessionId: session._id },
            config.REFRESH_TOKEN_SECRETE,
            { expiresIn: '7d' }
        );

        const hashedToken = await bcrypt.hash(refreshToken, 10);

        session.refreshTokenHash = hashedToken;
        await session.save();

        const accessToken = jwt.sign(
            { id: user._id },
            config.ACCESS_TOKEN_SECRETE,
            { expiresIn: '15m' }
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).send({
            message: 'login successful',
            user: {
   fullname: user.fullname,
   email: user.email
},
            accessToken
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'internal server error' });
    }
}

async function getMe(req, res) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "token not found" });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRETE);
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await userModel.findById(decoded.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
        message: "user fetched successfully",
         user: {
        fullname: user.fullname,
        email: user.email,
    }
    });
}

async function RefreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).send({ message: 'Refresh token not found' });
    }

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRETE);
    } catch (err) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    const { id, sessionId } = decoded;

    const session = await sessionModel.findById(sessionId);
    if (!session || session.user.toString() !== id) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    if (session.revoked) {
        await sessionModel.updateMany({ user: id }, { revoked: true });
        return res.status(401).send({ message: 'Unauthorized' });
    }

    const user = await userModel.findById(id);
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(refreshToken, session.refreshTokenHash);
    if (!isMatch) {
        session.revoked = true;
        await session.save();
        return res.status(401).send({ message: 'Unauthorized' });
    }

    const newAccessToken = jwt.sign(
        { id: user._id },
        config.ACCESS_TOKEN_SECRETE,
        { expiresIn: '15m' }
    );

    const newRefreshToken = jwt.sign(
        { id: user._id, sessionId: session._id },
        config.REFRESH_TOKEN_SECRETE,
        { expiresIn: '7d' }
    );

    const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10);

    try {
        session.refreshTokenHash = newRefreshTokenHash;
        session.lastUsedAt = new Date();
        await session.save();
    } catch (err) {
        console.error('Failed to update session:', err);
        return res.status(500).send({ message: 'Internal server error' });
    }

    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).send({
        message: 'Token refreshed',
        accessToken: newAccessToken
    });
}

async function logout(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).send({ message: 'refresh token not found' });
    }

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRETE);
    } catch (err) {
        return res.status(401).send({ message: 'unauthorized' });
    }

    let session;
    try {
        session = await sessionModel.findById(decoded.sessionId);
    } catch (err) {
        console.error('Failed to find session:', err);
        return res.status(500).send({ message: 'Internal server error' });
    }

    if (!session || session.user.toString() !== decoded.id) {
        return res.status(401).send({ message: 'unauthorized' });
    }

    
    if (session.revoked) {
        await sessionModel.updateMany({ user: decoded.id }, { revoked: true });
        return res.status(401).send({ message: 'unauthorized' });
    }

    const isValid = await bcrypt.compare(refreshToken, session.refreshTokenHash);

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    if (!isValid) {
        session.revoked = true;
        await session.save();
        return res.status(401).send({ message: 'unauthorized' });
    }

    try {
        session.revoked = true;
        await session.save();
    } catch (err) {
        console.error('DB error revoking session:', err);
        return res.status(500).send({ message: 'Internal server error' });
    }

    return res.status(200).send({ message: 'logout success' });
}

async function logoutAll(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).send({ message: 'refresh token not found' });
    }

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRETE);
    } catch (err) {
        return res.status(401).send({ message: 'unauthorized' });
    }

    let session;
    try {
        session = await sessionModel.findById(decoded.sessionId);
    } catch (err) {
        return res.status(500).send({ message: 'internal server error' });
    }

    if (!session || session.user.toString() !== decoded.id) {
        return res.status(401).send({ message: 'unauthorized' });
    }

    if (session.revoked) {
        return res.status(401).send({ message: 'unauthorized' });
    }

    const isValid = await bcrypt.compare(refreshToken, session.refreshTokenHash);
    if (!isValid) {
        return res.status(401).send({ message: 'unauthorized' });
    }

    try {
        await sessionModel.updateMany(
            { user: decoded.id, revoked: false },
            { revoked: true }
        );
    } catch (err) {
        return res.status(500).send({ message: 'internal server error' });
    }

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    return res.status(200).send({ message: 'logged out from all devices' });
}


async function verifyEmail(req, res) {
    try {
        const { otp, email } = req.body

        if (!otp || !email) {
            return res.status(400).json({ message: "OTP and email are required" })
        }

        // normalize email to match what's stored
        const otpDoc = await otpModel
            .findOne({ email: email.toLowerCase().trim() })
            .sort({ createdAt: -1 }) // get most recent OTP

        if (!otpDoc) {
            return res.status(400).json({ message: "Invalid OTP" })
        }

        // safe expiry check only if field exists
        if (otpDoc.expiresAt && otpDoc.expiresAt < new Date()) {
            await otpModel.deleteOne({ _id: otpDoc._id })
            return res.status(400).json({ message: "OTP has expired" })
        }

        const isMatch = await bcrypt.compare(otp.trim(), otpDoc.otpHash)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid OTP" })
        }

        const user = await userModel.findByIdAndUpdate(
            otpDoc.user,
            { verified: true },
            { new: true }
        )

        await otpModel.deleteMany({ user: otpDoc.user })

        return res.status(200).json({
            message: "Email verified successfully",
           user: {
    fullname: user.fullname,
    email: user.email,
    verified: user.verified
}
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = {
    register,
    login,
    getMe,
    RefreshToken,
    logout,
    logoutAll,
    verifyEmail
}


//verify token ,find user ,find session, validate,(Not critical, but cleaner logic)//