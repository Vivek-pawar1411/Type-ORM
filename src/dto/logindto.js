class LoginDto{
    constructor (body) {
        this.email=body.email;
        this.password=body.password;
    }
}

const logindto=(data)=>{
    const errors=[];
    if(!data.email){
        errors.push({field:'email',message:'Email is required'});

    if(!data.password){
        errors.push({field:'password',message:'Password is required'});
    }
    return errors;
}
}

module.exports={
    LoginDto,logindto
}