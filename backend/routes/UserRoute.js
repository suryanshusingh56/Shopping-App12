const express=require('express')
const {authController,guestUserProfile,registerUser,updateUserProfile} =require('../controllers/usersController')
const {protect}=require('../middlewares/authMiddleware')
const router=express.Router();

//signin route
router.route('/').post(registerUser);
//post email and path 
router.post('/login',authController);
// get user profile protected route
router.route('/profile').get(protect,guestUserProfile).put(protect, updateUserProfile);

module.exports=router;