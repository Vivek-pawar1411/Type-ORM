const express = require('express');
const { register,getAll,login,getbyuserid,updaterole,logout,
    updatename,updatemail,changepassword,deleteuser,uploadproof } = require('../controller/user.controller.js');
const authtoken = require('../middleware/user.middleware.js');
const  {validate}  = require('../utils/user.validate.js');
const { rolecheck } = require('../middleware/role.js');
const  upload  = require('../Multer/multer.js');




const router = express.Router();

router.post('/register', register);
router.post('/register',authtoken, validate,rolecheck, register); // Validate before registration
router.get('/getalluser',authtoken,rolecheck, getAll); 
router.post('/login', login);
router.get('/getbyid/:id',authtoken,validate,getbyuserid);
router.put('/updaterole/:id',authtoken,validate,updaterole);
router.put('/updatename/:id',authtoken,validate,updatename);
router.put('/updatemail/:id',authtoken,validate,updatemail);
router.put('/changepassword/:id',authtoken,validate,changepassword);
router.delete('/deleteuser/:id',authtoken,validate,deleteuser);
router.post('/uploadproof/:id',authtoken,validate,upload.single('proof'),uploadproof); // Upload proof of identity
router.post('/logout/:id',authtoken,validate,logout); // Logout user

module.exports = router;
