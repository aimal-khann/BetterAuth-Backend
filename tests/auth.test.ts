import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { auth } from '../src/auth'; // Adjust path as necessary for testing
import 'dotenv/config';

// Mock the better-auth adapter to prevent actual database connections during testing
// For a real test, you'd mock the database connection or use a test database
jest.mock('better-auth/adapters/pg', () => {
  return jest.fn(() => ({
    // Mock necessary adapter methods
    // In a real scenario, you'd mock the actual interaction with the database
    // For now, we'll just return dummy values for the adapter
    createUser: jest.fn(async (user) => ({ id: 'mock-id', ...user })),
    findUserByEmail: jest.fn(async (email) => (email === 'test@example.com' ? { id: 'mock-id', email, password: 'hashedpassword' } : null)),
    // ... other methods as needed
  }));
});

// Mock the dotenv config to ensure test environment is controlled
jest.mock('dotenv/config', () => ({}));

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use("/api/auth", auth.handler);

describe('Auth Backend Endpoints', () => {
  // Before each test, ensure environment variables are set for better-auth
  beforeAll(() => {
    process.env.DATABASE_URL = 'postgres://user:password@host:port/dbname';
    process.env.BETTER_AUTH_SECRET = 'test-secret';
  });

  // Test registration endpoint
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        softwareBackground: 'React, Node.js',
        hardwareBackground: 'Arduino',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('session');
    expect(res.body.session.user).toHaveProperty('id');
    expect(res.body.session.user).toHaveProperty('email', 'test@example.com');
  });

  // Test login endpoint
  it('should log in an existing user', async () => {
    // Assuming a user 'test@example.com' with password 'password123' exists
    // In a real test, you'd ensure this user is created before login
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('session');
    expect(res.body.session.user).toHaveProperty('email', 'test@example.com');
  });

  // Test session endpoint
  it('should get session for an authenticated user', async () => {
    // This requires a valid session cookie, which is hard to mock with supertest directly
    // A more advanced test would involve logging in first to get cookies
    const res = await request(app)
      .get('/api/auth/session');
    // For this basic test, we'll expect 401 as no session is set in isolated request
    expect(res.statusCode).toEqual(401); 
  });

  // Test logout endpoint
  it('should log out an authenticated user', async () => {
    // Similar to session, requires a set session to effectively test logout
    const res = await request(app)
      .post('/api/auth/logout');
    // Expect 200 even without a session, as logout attempts to clear any session
    expect(res.statusCode).toEqual(200); 
  });
});
