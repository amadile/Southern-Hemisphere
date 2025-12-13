// API Test Script - Run with node test-api.js
const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";
let authToken = "";

// Test Results
const results = {
  passed: 0,
  failed: 0,
  tests: [],
};

function logTest(name, passed, message) {
  results.tests.push({ name, passed, message });
  if (passed) {
    results.passed++;
    console.log(`✅ ${name}`);
  } else {
    results.failed++;
    console.log(`❌ ${name}: ${message}`);
  }
}

// 1. Authentication Tests
async function testAuth() {
  console.log("\n📋 Testing Authentication APIs...\n");

  try {
    // Test 1.1: Register User
    const registerData = {
      name: "Test Admin",
      email: `testadmin${Date.now()}@shf.org`,
      password: "TestPass123!",
      role: "admin",
    };

    const registerRes = await axios.post(
      `${BASE_URL}/auth/register`,
      registerData
    );
    logTest("POST /api/auth/register", registerRes.status === 201, "");

    // Test 1.2: Login User
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: registerData.email,
      password: registerData.password,
    });
    logTest(
      "POST /api/auth/login",
      loginRes.status === 200 && loginRes.data.token,
      ""
    );
    authToken = loginRes.data.token;

    // Test 1.3: Get Current User
    const meRes = await axios.get(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    logTest(
      "GET /api/auth/me (with token)",
      meRes.status === 200 && meRes.data.user,
      ""
    );

    // Test 1.4: Unauthorized Access
    try {
      await axios.get(`${BASE_URL}/auth/me`);
      logTest(
        "GET /api/auth/me (without token)",
        false,
        "Should have returned 401"
      );
    } catch (err) {
      logTest(
        "GET /api/auth/me (without token)",
        err.response?.status === 401,
        ""
      );
    }
  } catch (error) {
    logTest("Authentication Tests", false, error.message);
  }
}

// 2. Programs Tests
async function testPrograms() {
  console.log("\n📋 Testing Programs APIs...\n");

  try {
    // Test 2.1: Create Program (Admin)
    const programData = {
      title: "Test Education Program",
      description: "Testing program creation",
      category: "education",
      targetAudience: "Children",
      location: "Kampala, Uganda",
      status: "active",
    };

    const createRes = await axios.post(`${BASE_URL}/programs`, programData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    logTest("POST /api/programs (with auth)", createRes.status === 201, "");
    const programId = createRes.data._id;

    // Test 2.2: Get All Programs
    const listRes = await axios.get(`${BASE_URL}/programs`);
    logTest(
      "GET /api/programs",
      listRes.status === 200 && Array.isArray(listRes.data),
      ""
    );

    // Test 2.3: Get Single Program
    const singleRes = await axios.get(`${BASE_URL}/programs/${programId}`);
    logTest(
      "GET /api/programs/:id",
      singleRes.status === 200 && singleRes.data._id === programId,
      ""
    );

    // Test 2.4: Update Program
    const updateRes = await axios.put(
      `${BASE_URL}/programs/${programId}`,
      {
        title: "Updated Test Program",
      },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    logTest("PUT /api/programs/:id", updateRes.status === 200, "");

    // Test 2.5: Delete Program
    const deleteRes = await axios.delete(`${BASE_URL}/programs/${programId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    logTest("DELETE /api/programs/:id", deleteRes.status === 200, "");
  } catch (error) {
    logTest("Programs Tests", false, error.message);
  }
}

// 3. News Tests
async function testNews() {
  console.log("\n📋 Testing News APIs...\n");

  try {
    // Test 3.1: Create News
    const newsData = {
      title: "Test News Article",
      content: "This is a test news article content",
      category: "news",
      author: "Test Author",
      featured: false,
    };

    const createRes = await axios.post(`${BASE_URL}/news`, newsData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    logTest("POST /api/news", createRes.status === 201, "");
    const newsId = createRes.data._id;

    // Test 3.2: Get All News
    const listRes = await axios.get(`${BASE_URL}/news`);
    logTest(
      "GET /api/news",
      listRes.status === 200 && Array.isArray(listRes.data),
      ""
    );

    // Test 3.3: Get Single News
    const singleRes = await axios.get(`${BASE_URL}/news/${newsId}`);
    logTest("GET /api/news/:id", singleRes.status === 200, "");

    // Test 3.4: Search News
    const searchRes = await axios.get(`${BASE_URL}/news?search=Test`);
    logTest("GET /api/news?search=Test", searchRes.status === 200, "");

    // Test 3.5: Filter by Category
    const filterRes = await axios.get(`${BASE_URL}/news?category=news`);
    logTest("GET /api/news?category=news", filterRes.status === 200, "");

    // Test 3.6: Delete News
    await axios.delete(`${BASE_URL}/news/${newsId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    logTest("DELETE /api/news/:id", true, "");
  } catch (error) {
    logTest("News Tests", false, error.message);
  }
}

// 4. Gallery Tests
async function testGallery() {
  console.log("\n📋 Testing Gallery APIs...\n");

  try {
    // Test 4.1: Create Gallery Item
    const galleryData = {
      title: "Test Gallery Image",
      description: "Test description",
      imageUrl: "https://via.placeholder.com/800x600",
      category: "events",
    };

    const createRes = await axios.post(`${BASE_URL}/gallery`, galleryData, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    logTest("POST /api/gallery", createRes.status === 201, "");
    const galleryId = createRes.data._id;

    // Test 4.2: Get All Gallery Items
    const listRes = await axios.get(`${BASE_URL}/gallery`);
    logTest(
      "GET /api/gallery",
      listRes.status === 200 && Array.isArray(listRes.data),
      ""
    );

    // Test 4.3: Filter by Category
    const filterRes = await axios.get(`${BASE_URL}/gallery?category=events`);
    logTest("GET /api/gallery?category=events", filterRes.status === 200, "");

    // Test 4.4: Delete Gallery Item
    await axios.delete(`${BASE_URL}/gallery/${galleryId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    logTest("DELETE /api/gallery/:id", true, "");
  } catch (error) {
    logTest("Gallery Tests", false, error.message);
  }
}

// 5. Donations Tests
async function testDonations() {
  console.log("\n📋 Testing Donations APIs...\n");

  try {
    // Test 5.1: Create Donation
    const donationData = {
      amount: 50,
      currency: "USD",
      donorName: "Test Donor",
      donorEmail: "donor@test.com",
      category: "Education",
      status: "completed",
      transactionId: `TEST-${Date.now()}`,
    };

    const createRes = await axios.post(`${BASE_URL}/donations`, donationData);
    logTest("POST /api/donations", createRes.status === 201, "");

    // Test 5.2: Get All Donations
    const listRes = await axios.get(`${BASE_URL}/donations`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    logTest("GET /api/donations", listRes.status === 200, "");

    // Test 5.3: Get Monthly Statistics
    const statsRes = await axios.get(`${BASE_URL}/donations/stats/monthly`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    logTest("GET /api/donations/stats/monthly", statsRes.status === 200, "");
  } catch (error) {
    logTest("Donations Tests", false, error.message);
  }
}

// 6. Contact Tests
async function testContact() {
  console.log("\n📋 Testing Contact APIs...\n");

  try {
    // Test 6.1: Submit Contact Message
    const contactData = {
      name: "Test User",
      email: "test@example.com",
      subject: "Test Subject",
      message: "This is a test message",
    };

    const submitRes = await axios.post(
      `${BASE_URL}/contact/messages`,
      contactData
    );
    logTest("POST /api/contact/messages", submitRes.status === 201, "");
  } catch (error) {
    logTest("Contact Tests", false, error.message);
  }
}

// Run all tests
async function runAllTests() {
  console.log("🚀 Starting API Tests for Southern Hemisphere Foundation\n");
  console.log("Backend: http://localhost:5000");
  console.log("========================================\n");

  await testAuth();
  await testPrograms();
  await testNews();
  await testGallery();
  await testDonations();
  await testContact();

  // Summary
  console.log("\n========================================");
  console.log("📊 TEST SUMMARY");
  console.log("========================================");
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📝 Total: ${results.passed + results.failed}`);
  console.log("========================================\n");

  if (results.failed === 0) {
    console.log("🎉 All tests passed! Backend is working correctly.\n");
  } else {
    console.log("⚠️  Some tests failed. Please review the results above.\n");
  }
}

runAllTests().catch(console.error);
