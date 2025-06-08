const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const taskRoutes = require('./routes/tasks');
const { logToFile } = require('./utils/logger');

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan('combined', { stream: { write: logToFile } }));

app.use('/tasks', taskRoutes);

app.get('/ping', (, res) => res.send('pong'));
app.get('/health', (, res) => res.json({ status: 'ok' }));

mongoose.connect(process.env.MONGO_URL, {
useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => {
console.log('Connected to MongoDB');
app.listen(3000, () => console.log('Tasks Service running on port 3000'));
}).catch(console.error);
