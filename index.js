const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/task');
const { sendLog } = require('./utils/logger');
const fs = require('fs');
const path = require('path');


dotenv.config();


const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}


const app = express();
app.use(express.json());


app.use('/tasks', taskRoutes);

app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.get('/metrics', (_, res) => res.send('task_service_total_requests 42'));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Task service running on port ${process.env.PORT}`)
  );
  sendLog('Task service started');
})
.catch(console.error);

module.exports = app;
