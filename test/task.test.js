jest.mock('../utils/crypto', () => ({
  encrypt: (str) => str,
  decrypt: (str) => str,
}));

const request = require('supertest');
const express = require('express');
const routes = require('../routes/tasks');

const app = express();
app.use(express.json());
app.use('/tasks', routes);

describe('Task API', () => {
  it('GET /tasks should return 200', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
  });

  it('POST /tasks should return 201', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'Test Task',
        description: 'Test description',
        assignedTo: 'user@example.com'
      });
    expect(res.statusCode).toBe(201);
  });
});
