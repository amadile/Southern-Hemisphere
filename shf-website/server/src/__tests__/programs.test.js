const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
const Program = require('../models/Program');

describe('Programs API', () => {
  // Clear the database before each test
  beforeEach(async () => {
    await Program.deleteMany({});
  });

  // Close database connection after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/programs', () => {
    it('should return an empty array when no programs exist', async () => {
      const res = await request(app)
        .get('/api/programs')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(0);
    });

    it('should return all active programs', async () => {
      // Create test programs
      const program1 = new Program({
        title: 'Education Program',
        description: 'Supporting children education',
        goals: ['Goal 1', 'Goal 2'],
        isActive: true
      });

      const program2 = new Program({
        title: 'Skills Program',
        description: 'Teaching skills to youth',
        goals: ['Goal A', 'Goal B'],
        isActive: true
      });

      await program1.save();
      await program2.save();

      const res = await request(app)
        .get('/api/programs')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(2);
      expect(res.body[0].title).toBe('Education Program');
      expect(res.body[1].title).toBe('Skills Program');
    });

    it('should not return inactive programs', async () => {
      // Create test programs
      const activeProgram = new Program({
        title: 'Active Program',
        description: 'This program is active',
        goals: ['Goal 1'],
        isActive: true
      });

      const inactiveProgram = new Program({
        title: 'Inactive Program',
        description: 'This program is inactive',
        goals: ['Goal 1'],
        isActive: false
      });

      await activeProgram.save();
      await inactiveProgram.save();

      const res = await request(app)
        .get('/api/programs')
        .expect(200);

      expect(res.body).toHaveLength(1);
      expect(res.body[0].title).toBe('Active Program');
    });
  });

  describe('POST /api/programs', () => {
    it('should create a new program', async () => {
      const newProgram = {
        title: 'New Program',
        description: 'A newly created program',
        goals: ['Goal 1', 'Goal 2'],
        isActive: true
      };

      const res = await request(app)
        .post('/api/programs')
        .send(newProgram)
        .expect(201);

      expect(res.body.title).toBe(newProgram.title);
      expect(res.body.description).toBe(newProgram.description);
      expect(res.body.goals).toEqual(newProgram.goals);
      expect(res.body.isActive).toBe(newProgram.isActive);

      // Verify the program was saved to the database
      const programs = await Program.find();
      expect(programs).toHaveLength(1);
      expect(programs[0].title).toBe(newProgram.title);
    });

    it('should return 400 for invalid program data', async () => {
      const invalidProgram = {
        // Missing required fields
        description: 'Missing title'
      };

      await request(app)
        .post('/api/programs')
        .send(invalidProgram)
        .expect(400);
    });
  });

  describe('PUT /api/programs/:id', () => {
    it('should update an existing program', async () => {
      // Create a program first
      const program = new Program({
        title: 'Original Program',
        description: 'Original description',
        goals: ['Original goal'],
        isActive: true
      });

      await program.save();

      const updatedProgram = {
        title: 'Updated Program',
        description: 'Updated description',
        goals: ['Updated goal 1', 'Updated goal 2'],
        isActive: false
      };

      const res = await request(app)
        .put(`/api/programs/${program._id}`)
        .send(updatedProgram)
        .expect(200);

      expect(res.body.title).toBe(updatedProgram.title);
      expect(res.body.description).toBe(updatedProgram.description);
      expect(res.body.goals).toEqual(updatedProgram.goals);
      expect(res.body.isActive).toBe(updatedProgram.isActive);
    });
  });

  describe('DELETE /api/programs/:id', () => {
    it('should soft delete a program', async () => {
      // Create a program first
      const program = new Program({
        title: 'Program to delete',
        description: 'This program will be deleted',
        goals: ['Goal 1'],
        isActive: true
      });

      await program.save();

      await request(app)
        .delete(`/api/programs/${program._id}`)
        .expect(200);

      // Verify the program is soft deleted (isActive = false)
      const deletedProgram = await Program.findById(program._id);
      expect(deletedProgram).toBeTruthy();
      expect(deletedProgram.isActive).toBe(false);
    });
  });
});