require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const userRoutes = require('./routes/userRoutes');
const moduleRoutes = require("./routes/moduleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use("/api/modules", moduleRoutes);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Соединение с БД установлено');
        app.listen(5000, () => console.log('Сервер запущен на порту 5000'));
    } catch (error) {
        console.error('Ошибка подключения к БД:', error);
    }
}

startServer();
