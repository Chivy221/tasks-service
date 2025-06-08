const express = require('express');
const Task = require('../models/Task');
const { encrypt, decrypt } = require('../utils/crypto');
const cache = require('../utils/cache');
const { publishTask } = require('../utils/queue');
const { sendLog } = require('../utils/logger');

const router = express.Router();

router.post('/', async (req, res) => {
try {
const encrypted = {
...req.body,
title: encrypt(req.body.title),
description: encrypt(req.body.description),
};
const task = new Task(encrypted);
await task.save();
  cache.set(`task:${task._id}`, task);
await publishTask({ id: task._id.toString(), status: task.status });
sendLog(`New task created: ${task._id}`);
res.status(201).json({ id: task._id });

  } catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to create task' });
}
});

router.get('/', async (_, res) => {
try {
const cached = cache.get('taskList');
if (cached) return res.json(cached);
  const tasks = await Task.find();
const decrypted = tasks.map(t => ({
  ...t.toObject(),
  title: decrypt(t.title),
  description: decrypt(t.description)
}));
cache.set('taskList', decrypted);
res.json(decrypted);
} catch (err) {
res.status(500).json({ error: 'Failed to get tasks' });
}
});

module.exports = router;
