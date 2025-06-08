const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const encrypt = require('../middlewares/encrypt');
const cache = require('../middlewares/cache');
const { sendTaskCreated } = require('../utils/rabbitmq');

router.post('/', encrypt, async (req, res) => {
const task = new Task(req.body);
await task.save();
await sendTaskCreated(task); // RabbitMQ
res.status(201).json(task);
});

router.get('/', cache, async (_, res) => {
const tasks = await Task.find();
res.json(tasks);
});

module.exports = router;
