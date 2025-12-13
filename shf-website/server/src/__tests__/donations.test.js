const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
const Donation = require('../models/Donation');
const DonationCategory = require('../models/DonationCategory');

describe('Donations API', () => {
  let categoryId;

  // Setup before all tests
  beforeAll(async () => {
    // Create a donation category for testing
    const category = new DonationCategory({
      name: 'Education',
      description: 'Education support donations'
    });
    await category.save();
    categoryId = category._id;
  });

  // Clear the database before each test
  beforeEach(async () => {
    await Donation.deleteMany({});
  });

  // Close database connection after all tests
  afterAll(async () => {
    await DonationCategory.deleteMany({});
    await mongoose.connection.close();
  });

  describe('GET /api/donations', () => {
    it('should return an empty array when no donations exist', async () => {
      const res = await request(app)
        .get('/api/donations')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(0);
    });

    it('should return all donations sorted by creation date', async () => {
      // Create test donations
      const donation1 = new Donation({
        donorName: 'John Doe',
        donorEmail: 'john@example.com',
        amount: 50000,
        currency: 'UGX',
        paymentMethod: 'card',
        status: 'completed',
        categoryId: categoryId
      });

      const donation2 = new Donation({
        donorName: 'Jane Smith',
        donorEmail: 'jane@example.com',
        amount: 100000,
        currency: 'UGX',
        paymentMethod: 'mobile-money',
        status: 'pending',
        categoryId: categoryId
      });

      await donation1.save();
      await donation2.save();

      const res = await request(app)
        .get('/api/donations')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(2);
      // Should be sorted by createdAt descending (newest first)
      expect(res.body[0].donorName).toBe('Jane Smith');
      expect(res.body[1].donorName).toBe('John Doe');
    });
  });

  describe('POST /api/donations', () => {
    it('should create a new donation with auto-generated transaction ID', async () => {
      const newDonation = {
        donorName: 'Alice Johnson',
        donorEmail: 'alice@example.com',
        donorPhone: '+256700123456',
        amount: 75000,
        currency: 'UGX',
        paymentMethod: 'card',
        status: 'completed',
        categoryId: categoryId
      };

      const res = await request(app)
        .post('/api/donations')
        .send(newDonation)
        .expect(201);

      expect(res.body.donorName).toBe(newDonation.donorName);
      expect(res.body.donorEmail).toBe(newDonation.donorEmail);
      expect(res.body.amount).toBe(newDonation.amount);
      expect(res.body.transactionId).toMatch(/^TXN-/);
      expect(res.body.transactionId).toHaveLength(25);

      // Verify the donation was saved to the database
      const donations = await Donation.find();
      expect(donations).toHaveLength(1);
      expect(donations[0].donorName).toBe(newDonation.donorName);
    });

    it('should return 400 for invalid donation data', async () => {
      const invalidDonation = {
        // Missing required fields
        donorName: 'Incomplete Donation'
      };

      await request(app)
        .post('/api/donations')
        .send(invalidDonation)
        .expect(400);
    });
  });

  describe('GET /api/donations/status/:status', () => {
    it('should return donations filtered by status', async () => {
      // Create test donations with different statuses
      const completedDonation = new Donation({
        donorName: 'Completed Donor',
        donorEmail: 'completed@example.com',
        amount: 50000,
        currency: 'UGX',
        paymentMethod: 'card',
        status: 'completed',
        categoryId: categoryId
      });

      const pendingDonation = new Donation({
        donorName: 'Pending Donor',
        donorEmail: 'pending@example.com',
        amount: 25000,
        currency: 'UGX',
        paymentMethod: 'mobile-money',
        status: 'pending',
        categoryId: categoryId
      });

      await completedDonation.save();
      await pendingDonation.save();

      // Test filtering by 'completed' status
      let res = await request(app)
        .get('/api/donations/status/completed')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].donorName).toBe('Completed Donor');

      // Test filtering by 'pending' status
      res = await request(app)
        .get('/api/donations/status/pending')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].donorName).toBe('Pending Donor');
    });
  });

  describe('PUT /api/donations/:id', () => {
    it('should update an existing donation', async () => {
      // Create a donation first
      const donation = new Donation({
        donorName: 'Original Donor',
        donorEmail: 'original@example.com',
        amount: 30000,
        currency: 'UGX',
        paymentMethod: 'card',
        status: 'pending',
        categoryId: categoryId
      });

      await donation.save();

      const updatedDonation = {
        donorName: 'Updated Donor',
        donorEmail: 'updated@example.com',
        amount: 45000,
        status: 'completed'
      };

      const res = await request(app)
        .put(`/api/donations/${donation._id}`)
        .send(updatedDonation)
        .expect(200);

      expect(res.body.donorName).toBe(updatedDonation.donorName);
      expect(res.body.donorEmail).toBe(updatedDonation.donorEmail);
      expect(res.body.amount).toBe(updatedDonation.amount);
      expect(res.body.status).toBe(updatedDonation.status);
      // Unchanged fields should remain the same
      expect(res.body.currency).toBe('UGX');
      expect(res.body.paymentMethod).toBe('card');
    });
  });

  describe('DELETE /api/donations/:id', () => {
    it('should delete a donation', async () => {
      // Create a donation first
      const donation = new Donation({
        donorName: 'Donor to delete',
        donorEmail: 'delete@example.com',
        amount: 20000,
        currency: 'UGX',
        paymentMethod: 'card',
        status: 'completed',
        categoryId: categoryId
      });

      await donation.save();

      await request(app)
        .delete(`/api/donations/${donation._id}`)
        .expect(200);

      // Verify the donation was deleted
      const deletedDonation = await Donation.findById(donation._id);
      expect(deletedDonation).toBeNull();
    });
  });
});