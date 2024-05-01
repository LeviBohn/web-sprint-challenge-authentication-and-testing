const request = require('supertest');
const server = require('./server.js');

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

describe('authentication endpoints', () => {
  it('should return 400 if username or password is missing during registration', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'test' });
    expect(res.status).toBe(400);
  });
  it('should register a user and then log in successfully', async () => {
    const registerRes = await request(server)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'password' });

    expect(registerRes.status).toBe(201);

    const loginRes = await request(server)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password' });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toHaveProperty('token');
  });
});

describe('jokes endpoints', () => {
  it('should return 401 if token is missing', async () => {
    const res = await request(server)
      .get('/api/jokes');
    expect(res.status).toBe(401);
  });
});