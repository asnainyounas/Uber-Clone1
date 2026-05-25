// const express=require('express');
// const router=express.Router();
// const userController=require('../controllers/auth.controller');
// const {body}=require('express-validator');
// const authMiddleware=require('../middleware/auth.middleware');

// router.post('/register',[
//     body('email').isEmail().withMessage('Invalid email format'),
//     body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
// ],userController.registerUser);

// router.post('/login',[
//     body('email').isEmail().withMessage('Invalid email format'),
//     body('password').notEmpty().withMessage('Password is required'),
// ],userController.loginUser);

// router.get('/profile',authMiddleware.authUser,userController.getUserProfile);
// router.get('/logout',authMiddleware.authUser,userController.logoutUser);

// module.exports=router;

const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/auth.controller');

authRouter.post('/register', authController.register);

authRouter.post('/login', authController.login);

authRouter.get('/profile', authController.getUserProfile);

authRouter.get('/get-me', authController.getMe);

authRouter.get('/refresh-token', authController.RefreshToken);

authRouter.post('/logout', authController.logout);

authRouter.post('/logout-all', authController.logoutAll);

authRouter.post('/verify-email', authController.verifyEmail);

authRouter.post('/resend-otp', authController.resendOtp);

module.exports = authRouter;
