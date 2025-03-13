const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
    try {
        const { first_name, middle_name, last_name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            first_name,
            middle_name,
            last_name,
            email,
            password_hash: hashedPassword,
            role
        });

        res.status(201).json({ id: newUser.id, first_name, last_name, email, role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка регистрации' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(401).json({ message: 'Неверные учетные данные' });

        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) return res.status(401).json({ message: 'Неверные учетные данные' });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка авторизации' });
    }
};
