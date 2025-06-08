const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('../routes/task');
const Task = require('../models/Task');

let mongod, app;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);

  app = express();
  app.use(bodyParser.json());
  app.use('/tasks', taskRoutes);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

afterEach(async () => {
  await Task.deleteMany();
});

describe('Task API', () => {
  it('POST /tasks creates a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'Test Task',
        description: 'Test desc',
        assignedTo: 'user@example.com'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'Test Task');
    expect(res.body).toHaveProperty('description', 'Test desc');
    expect(res.body).toHaveProperty('assignedTo', 'user@example.com');
  });

  it('GET /tasks returns tasks', async () => {
    await Task.create({
      title: 'Sample Task',
      description: 'sample',
      assignedTo: 'user@example.com'
    });

    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('title', 'Sample Task');
  });
});
