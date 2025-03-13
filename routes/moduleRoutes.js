const express = require("express");
const { createModule, getModules, getModuleById, updateModule, deleteModule } = require("../controllers/moduleController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createModule);
router.get("/", authMiddleware, getModules);
router.get("/:id", authMiddleware, getModuleById);
router.put("/:id", authMiddleware, updateModule);
router.delete("/:id", authMiddleware, deleteModule);

module.exports = router;
