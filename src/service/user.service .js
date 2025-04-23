const { UserEntity } = require('../entity/user.entity.js');
const { AppDataSource } = require("../config/db.js");
const jwt = require('jsonwebtoken');
const { userdata } = require('../utils/user.output.js');
const { upload } = require('../Multer/multer.js');
const  { blacklistedTokens,addTokenToBlacklist,isBlacklisted}= require('../utils/token.blacklist.js');
const { log } = require('console');

const userrepo = () => AppDataSource.getRepository(UserEntity);


const registerUser = async (userData) => {
    const { name, email, password, role } = userData;
    const existuser = await userrepo().findOne({ where: { email } });
    if (existuser) {
        return { message: 'User already exists' };
    }
    const user = userrepo().create({ name, email, password, role });
    await userrepo().save(user);
    return { message: 'User created successfully', Data: userdata(user) };
};


const loginuser = async (email, password) => {
    const user = await userrepo().findOne({ where: { email } });

    if (!user) {
        return { message: 'User not found' };
    }
    if (user.password !== password) {
        return { message: 'Invalid password' };
    }
    const token = jwt.sign({
        id: user.id, name: user.name,
        email: user.email, role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '11h' });

    return { message: 'Login successful', token, user: userdata(user) };

}


const getalluser = async () => {
    const users = await userrepo().find();
    const userData = users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            createdAt: user.createdAt
        };
    });
    return userData;
}

const getbyid = async (id) => {
    const user = await userrepo().findOne({ where: { id } });
    return user;

}

const changerole = async (id, role) => {
    const user = await userrepo().findOne({ where: { id } });
    if (!user) {
        return { message: 'User not found' };
    }
    user.role = role;
    await userrepo().save(user);
    return { message: 'User role updated successfully', data: userdata(user) };
}


const changename = async (id, name) => {
    const user = await userrepo().findOne({ where: { id } });
    if (!user) {
        return { message: 'User not found' };
    }
    user.name = name;
    await userrepo().save(user);
    return { message: 'User name updated successfully', data: userdata(user) };
}

const changemail = async (id, email) => {
    const user = await userrepo().findOne({ where: { id } });
    if (!user) {
        return { message: 'User not found' };
    }
    user.email = email;
    await userrepo().save(user);
    return { message: 'User email updated successfully', data: userdata(user) };
}
const alterpassword = async (id, password) => {
    const user = await userrepo().findOne({ where: { id } });
    if (!user) {
        return { message: 'User not found' };
    }
    user.password = password;
    await userrepo().save(user);
    return { message: 'User password updated successfully', data: userdata(user) };
};

const removeuser = async (id) => {
    const user = await userrepo().findOne({ where: { id } });
    if (!user) {
        return { message: "User not found" }
    }
    await userrepo().delete({ id });
    return { message: 'User deleted successfully' };
}

const proof = async (id, proofFilepath) => {
    const user = await userrepo().findOne({ where: { id } });
    if (!user) {
        return { message: 'User not found' };
    }
    user.proof = proofFilepath;
    await userrepo().save(user)
    return { message: 'User proof/Attachment updated successfully', data: userdata(user) };

}
const logoutuser = async (token) => {
    if (token) {
        await addTokenToBlacklist(token);
    }

    return { message: 'Logout successfully' };

}


module.exports = {
    registerUser, loginuser,logoutuser,
    getalluser, getbyid, changerole, changename,
    changemail, alterpassword, removeuser, proof

};
