const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { encrypt, decrypt } = require('../utils/encryption');
const fs = require('fs');
const path = require('path');

// Простая локальная запись логов в файл
const logToFile = (message) => {
  const logPath = path.join(__dirname, '../logs/task.log');
  const logEntry = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFile(logPath, logEntry, (err) => {
    if (err) console.error('Failed to write log:', err);
  });
};

// In-memory хранилище задач (вместо базы)
let taskStore = [];

router.post('/tasks', async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    const encrypted = encrypt({ title, description, assignedTo });
    const id = Date.now().toString();

    taskStore.push({ id, ...encrypted });

    logToFile(`Created task ${id} assigned to ${assignedTo}`);

    res.status(201).json({ id, title, description, assignedTo });
  } catch (err) {
    console.error("POST /tasks error:", err.message);
    res.status(500).json({ error: "Failed to create task" });
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const decryptedTasks = taskStore.map(task => {
      const decrypted = decrypt({
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo
      });
      return {
        id: task.id,
        ...decrypted
      };
    });

    res.status(200).json(decryptedTasks);
  } catch (err) {
    console.error("GET /tasks error:", err.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

module.exports = router;
