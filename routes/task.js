const { v4: uuidv4 } = require('uuid'); 

router.post('/', async (req, res) => {
  try {
    const id = uuidv4(); 

    const encrypted = {
      id,
      title: encrypt(req.body.title),
      description: encrypt(req.body.description),
      assignedTo: req.body.assignedTo,
    };

    const task = new Task(encrypted);
    await task.save();
    cache.set(`task:${task._id}`, task);
    await publishTask({ id: task._id.toString(), status: task.status });
    sendLog(`New task created: ${task._id}`);

    res.status(201).json({
      id,
      title: req.body.title,
      description: req.body.description,
      assignedTo: req.body.assignedTo,
      status: task.status,
      createdAt: task.createdAt,
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to create task', details: e.message });
  }
});
