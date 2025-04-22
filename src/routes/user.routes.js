const express = require('express');
const { register,getAll,login,getbyuserid,updaterole,updatename,updatemail,changepassword } = require('../controller/user.controller.js');
const authtoken = require('../middleware/user.middleware.js');
const  {validate}  = require('../utils/user.validate.js');
const { rolecheck } = require('../middleware/role.js');


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


module.exports = router;
