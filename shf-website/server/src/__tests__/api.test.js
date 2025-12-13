const request = require('supertest');
const app = require('../../server');

describe('API Endpoints', () => {
  // Test the root endpoint
  describe('GET /', () => {
    it('should return API information', async () => {
      const res = await request(app)
        .get('/')
        .expect(200);
      
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('version');
    });
  });

  // Test the health endpoint
  describe('GET /health', () => {
    it('should return OK status', async () => {
      const res = await request(app)
        .get('/health')
        .expect(200);
      
      expect(res.body).toHaveProperty('status', 'OK');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  // Test programs endpoint
  describe('GET /api/programs', () => {
    it('should return programs array', async () => {
      const res = await request(app)
        .get('/api/programs')
        .expect(200);
      
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // Test news endpoint
  describe('GET /api/news', () => {
    it('should return news array', async () => {
      const res = await request(app)
        .get('/api/news')
        .expect(200);
      
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});