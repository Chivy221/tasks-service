const request = require('supertest');
const app = require('../index');

describe('Task Service', () => {
it('should return pong', async () => {
const res = await request(app).get('/ping');
expect(res.text).toBe('pong');
});
});
