const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Module = sequelize.define("Module", {
    code_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "module",
    timestamps: false
});

module.exports = Module;
