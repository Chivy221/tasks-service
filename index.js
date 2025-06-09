const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

// Пример простого роутинга
app.get('/', (req, res) => {
  res.send('Task service is running!');
});

// Здесь добавь свои роуты, например:
// app.use('/tasks', require('./routes/tasks'));

const port = process.env.PORT || 8080;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tasks';

// Подключение к MongoDB и запуск сервера
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => {
      console.log(`Task service running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
