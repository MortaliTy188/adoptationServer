const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], config.secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Неверный токен' });
    }
};
