const express = require('express');
const { register, login } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'Доступ разрешен', user: req.user });
});

module.exports = router;
