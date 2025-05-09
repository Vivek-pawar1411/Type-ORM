const { registerUser, getalluser, loginuser, getbyid, logoutuser,
    changerole, changename,changemail,alterpassword,removeuser,proof } = require("../service/user.service .js");
const { RegisterDto, registerdto } = require('../dto/registerdto.js');
const { LoginDto, logindto } = require('../dto/logindto.js');
const {upload}=require('../Multer/multer.js');
const { response } = require("express");



async function register(req, res) {
   const dto = new RegisterDto(req.body);
   const errors = registerdto(dto);
   if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
   }
   const result = await registerUser(dto);
   res.status(201).json(result);
}

async function login(req, res) {
   const { email, password } = new LoginDto(req.body);
   const errors = logindto(req.body);

   const result = await loginuser(email, password);
   if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
   }
   if (result.message === 'User not found') {
      return res.status(404).json(result);
   }

   res.status(200).json(result);
}

async function getAll(req, res) {
   const result = await getalluser();
   res.status(200).json(result);
}

async function getbyuserid(req, res) {
   const id = parseInt(req.params.id);
   const result = await getbyid(id);
   res.status(200).json(result);
}


async function updaterole(req, res) {
   const id = parseInt(req.params.id);
   const role = req.body.role;
   if (!role) {
      return res.status(400).json({ message: 'Role is required' });
   }
   const result = await changerole(id, role);
   if (result.message === 'User not found') {
      return res.status(404).json(result);
   }
   res.status(200).json( result );

}

async function updatename(req, res) {
   const id = parseInt(req.params.id);
   const name = req.body.name;
   if (!name) {
      return res.status(400).json({ message: 'Name is required' });
   }
   const result = await changename(id, name);
   if (result.message === 'User not found') {
      return res.status(404).json(result);
   }
   res.status(200).json(result);


}

async function updatemail(req,res){
   const id=parseInt(req.params.id);
   const email=req.body.email;
   if(!email){
      return res.status(400).json({message:'Email is required'});
   }const result=await changemail(id,email);
   if(result.message==='User not found'){
      return res.status(404).json(result);
   }
   res.status(200).json(result);
}


async function changepassword(req, res) {
   const id = parseInt(req.params.id);
   const oldpassword = req.body.oldpassword;
   const newpassword = req.body.newpassword;

   if (!oldpassword || !newpassword) {
       return res.status(400).json({ message: 'Old password and new password are required' });
   }

   const user = await getbyid(id);
   if (!user) {
       return res.status(404).json({ message: 'User not found' });
   }

   if (oldpassword !== user.password) {
       return res.status(400).json({ message: 'Old password is incorrect' });
   }

   const result = await alterpassword(id, newpassword);
   if (result.message === 'User not found') {
       return res.status(404).json(result);
   }

   res.status(200).json(result);
}

async function deleteuser(req,res){
   const id=parseInt(req.params.id);
   const result=await removeuser(id);
   if (result.message === 'User not found') {
      return res.status(404).json(result);
  }
   res.status(200).json(result);
}

async function uploadproof(req,res){
   const id=parseInt(req.params.id);
   const file=req.file;
   console.log("file",file);
   if(!req.file){
      return res.status(400).json({message:'Proof file is required'});
   }
   const proofFilePath=req.file.path;
   if(!proofFilePath){
      return res.status(400).json({message:'Proof file is required'});
   }
   const result=await proof(id,proofFilePath);
   if(result.message==='User not found'){
      return res.status(404).json(result);
   }
   const combine={...result,...file};
   res.status(200).json({ message:result.message, data: combine });
}

async function logout(req,res){
   const id = parseInt(req.params.id);

   const token = req.header('Authorization')?.split(' ')[1];
 const result=logoutuser(token,id);
   res.status(200).json({ message: 'User logged out successfully' });
}





module.exports = { register, getAll, login, getbyuserid, 
   updaterole, updatename,updatemail,changepassword,
   deleteuser,uploadproof,logout};

