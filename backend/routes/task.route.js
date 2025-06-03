
const express = require('express');
const taskRouter = express.Router();

const auth = require('../controllers/task.controller');
const { verifyToken, checkRole } = require("../middlewares/authmiddleware");
taskRouter.post('/create',verifyToken,checkRole(["admin", "manager"]),auth.createTask);
taskRouter.get('/getalltask',verifyToken,auth.getMyTasks);
taskRouter.put("/:id", verifyToken, auth.updateTask);
taskRouter.delete("/:id", verifyToken, auth.deleteTask);

module.exports = taskRouter

