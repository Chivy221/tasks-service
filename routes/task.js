const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/', async (_, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

module.exports = router;
