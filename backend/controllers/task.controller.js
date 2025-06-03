const Group=require("../models/group")
const Task = require("../models/task");
const { genResponse } = require("../helpers/commonHelpers");

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      due_date,
      assigned_to,
      priority,
    } = req.body;

    const created_by = req.user.id; 

    const task = await Task.create({
      title,
      description,
      due_date,
      assigned_to,
      created_by,
      priority,
    });

    res.status(201).json(genResponse(true, "Task created successfully", task));
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json(genResponse(false, "Task creation failed"));
  }
};

exports.getMyTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.findAll({
      where: { assigned_to: userId },
    });

    res.json(genResponse(true, "Fetched tasks", tasks));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json(genResponse(false, "Failed to fetch tasks"));
  }
};


exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json(genResponse(false, "Task not found"));
    }

  
    if (userRole !== "admin" && userRole !== "manager" && task.created_by !== userId) {
      return res.status(403).json(genResponse(false, "You are not authorized to update this task"));
    }

  
    const updatedFields = {
      title: req.body.title || task.title,
      description: req.body.description || task.description,
      status: req.body.status || task.status,
      priority: req.body.priority || task.priority,
      due_date: req.body.due_date || task.due_date,
      assigned_to: req.body.assigned_to || task.assigned_to,
    };

    await task.update(updatedFields);

    return res.status(200).json(genResponse(true, "Task updated successfully", task));
  } catch (error) {
    console.error("Update task error:", error);
    return res.status(500).json(genResponse(false, "Server error"));
  }
};


exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json(genResponse(false, 'Task not found'));
    }


    if (task.created_by !== userId && userRole !== 'admin' && userRole !== 'manager') {
      return res.status(403).json(genResponse(false, 'Forbidden: You cannot delete this task'));
    }

    await task.destroy();

    return res.status(200).json(genResponse(true, 'Task deleted successfully'));
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json(genResponse(false, 'Server error'));
  }
}