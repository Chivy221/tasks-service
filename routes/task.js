const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Task = require("../models/Task");
const { encrypt, decrypt } = require("../utils/encryption");
const cache = require("../utils/cache");
const sendLog = require("../utils/logger");

const router = express.Router();

// Create a task
router.post("/", async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    const id = uuidv4();

    const encryptedTask = {
      id,
      title: encrypt(title),
      description: encrypt(description),
      assignedTo: encrypt(assignedTo),
    };

    await Task.create(encryptedTask);
    cache.set(id, encryptedTask);
    
    sendLog(`New task created: ${JSON.stringify(encryptedTask)}`); // локальное логирование

    res.status(201).json({ id, title, description, assignedTo });
  } catch (err) {
    console.error("POST /tasks error:", err.message);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    const decryptedTasks = tasks.map(task => ({
      id: task.id,
      title: decrypt(task.title),
      description: decrypt(task.description),
      assignedTo: decrypt(task.assignedTo),
    }));

    res.status(200).json(decryptedTasks);
  } catch (err) {
    console.error("GET /tasks error:", err.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

module.exports = router;
