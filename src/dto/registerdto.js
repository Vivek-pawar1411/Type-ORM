class RegisterDto {
    constructor(body) {
        this.name = body.name;
        this.email = body.email;
        this.password = body.password;
        this.role = body.role || 'employee'; // default to 'employee'
        this.createdAt = new Date(); // this can be optional based on your use case
    }
}

const registerdto = (data) => {
    const errors = [];

    if (!data.name) {
        errors.push({ field: 'name', message: 'Name is required' });
    }

    if (!data.email) {
        errors.push({ field: 'email', message: 'Email is required' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push({ field: 'email', message: 'Invalid email format' });
    }

    if (!data.password) {
        errors.push({ field: 'password', message: 'Password is required' });
    }

    if (!data.role) {
        errors.push({ field: 'role', message: 'Role is required' });
    }

    return errors;
};

module.exports = {
    RegisterDto,
    registerdto,
};
