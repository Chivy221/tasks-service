const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.post('/', async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    const task = await Task.create({ id: Date.now().toString(), title, description, assignedTo });
    res.status(201).json(task);
  } catch (err) {
    console.error("POST /tasks error:", err.message);
    res.status(500).json({ error: "Failed to create task" });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.error("GET /tasks error:", err.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

module.exports = router;
