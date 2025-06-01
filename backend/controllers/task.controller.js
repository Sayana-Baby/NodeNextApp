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
