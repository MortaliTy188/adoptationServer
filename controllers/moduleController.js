const Module = require("../models/moduleModel");

exports.createModule = async (req, res) => {
    try {
        const { code_name, status_id } = req.body;
        const newModule = await Module.create({ code_name, status_id });

        res.status(201).json(newModule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при создании модуля" });
    }
};

exports.getModules = async (req, res) => {
    try {
        const modules = await Module.findAll();
        res.json(modules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении модулей" });
    }
};

exports.getModuleById = async (req, res) => {
    try {
        const { id } = req.params;
        const module = await Module.findByPk(id);

        if (!module) return res.status(404).json({ message: "Модуль не найден" });

        res.json(module);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении модуля" });
    }
};

exports.updateModule = async (req, res) => {
    try {
        const { id } = req.params;
        const { code_name, status_id } = req.body;

        const module = await Module.findByPk(id);
        if (!module) return res.status(404).json({ message: "Модуль не найден" });

        module.code_name = code_name;
        module.status_id = status_id;
        await module.save();

        res.json(module);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при обновлении модуля" });
    }
};

exports.deleteModule = async (req, res) => {
    try {
        const { id } = req.params;

        const module = await Module.findByPk(id);
        if (!module) return res.status(404).json({ message: "Модуль не найден" });

        await module.destroy();
        res.json({ message: "Модуль удален" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при удалении модуля" });
    }
};
