async function validate(req, res, next) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    const token = req.user;
    //console.log('token:', token);
    console.log('req.params.id:', req.params.id);
    if (!token || parseInt(token.id) !== id) {
        return res.status(403).json({ message: `You are not authorized to access this UserId: ${req.params.id}` });
    }

    next();
}

module.exports = { validate };