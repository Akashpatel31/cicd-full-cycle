import request from 'supertest';
import { app } from '../server'; // Ensure this path is correct

describe('Backend API Tests', () => {
  it('should return a welcome message from the backend', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  it('should handle user interactions (store and retrieve)', async () => {
    const newUserInteraction = { user: 'Alice', action: 'clicked button' };

    // Send user interaction to backend
    const postRes = await request(app)
      .post('/interactions')
      .send(newUserInteraction);

    expect(postRes.statusCode).toBe(201);
    expect(postRes.body).toEqual(expect.objectContaining(newUserInteraction));

    // Retrieve interactions
    const getRes = await request(app).get('/interactions');
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body).toEqual(
      expect.arrayContaining([expect.objectContaining(newUserInteraction)])
    );
  });
});
