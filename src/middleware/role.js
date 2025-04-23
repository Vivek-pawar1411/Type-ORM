function rolecheck(req,res,next){
    const role=req.user.role;
    if(role!=='admin'||'sub-admin'){
        return res.status(403).json({message:'You are not admin , Dont Access it '});
    }
    next();

}
module.exports={
    rolecheck
}