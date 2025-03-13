const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("adaptation_system", "postgres", "123", {
    dialect: "postgres",
    host: "localhost"
})

module.exports = sequelize