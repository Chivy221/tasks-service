const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const taskRoutes = require('./routes/tasks');
app.use(express.json());
app.use('/tasks', taskRoutes);
app.get('/ping', (_, res) => res.send('pong'));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Tasks DB connected');
  app.listen(3000, () => console.log('Tasks service on port 3000'));
}).catch(err => console.error(err));
