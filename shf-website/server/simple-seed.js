// Simple seed script - Southern Hemisphere Foundation
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/shf_website";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    return seedDatabase();
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

async function seedDatabase() {
  try {
    // Import models
    const Program = require("./src/models/Program");
    const News = require("./src/models/News");
    const Settings = require("./src/models/Settings");

    console.log("\n📝 Seeding Programs...");

    const programsData = [
      {
        title: "Child Education Support",
        description:
          "Ensuring orphaned and vulnerable children access quality education",
        category: "education",
        targetAudience: "Children",
        location: "Kampala, Uganda",
        status: "active",
      },
      {
        title: "Skills Development Program",
        description: "Empowering youth with practical employable skills",
        category: "skills",
        targetAudience: "Youth and Women",
        location: "Bunamwaya, Uganda",
        status: "active",
      },
      {
        title: "Food Security Initiative",
        description: "Providing nutritious meals to vulnerable families",
        category: "food",
        targetAudience: "Families",
        location: "Makindye, Uganda",
        status: "active",
      },
    ];

    for (const program of programsData) {
      const existing = await Program.findOne({ title: program.title });
      if (!existing) {
        await Program.create(program);
        console.log(`  ✅ Created: ${program.title}`);
      } else {
        console.log(`  ⏭  Exists: ${program.title}`);
      }
    }

    console.log("\n📰 Seeding News...");

    const newsData = [
      {
        title: "SHF Launches New Skills Hub",
        content:
          "Southern Hemisphere Foundation opens a skills training hub to equip youth with practical abilities.",
        excerpt: "New skills hub launched in Bunamwaya",
        category: "news",
        author: "SHF Team",
        featured: true,
      },
      {
        title: "Back to School Campaign Success",
        content:
          "Over 200 children received school supplies and uniforms for the new term.",
        excerpt: "200+ children supported with school supplies",
        category: "events",
        author: "SHF Team",
        featured: false,
      },
    ];

    for (const news of newsData) {
      const existing = await News.findOne({ title: news.title });
      if (!existing) {
        await News.create(news);
        console.log(`  ✅ Created: ${news.title}`);
      } else {
        console.log(`  ⏭  Exists: ${news.title}`);
      }
    }

    console.log("\n⚙️  Seeding Settings...");

    const existingSettings = await Settings.findOne({});
    if (!existingSettings) {
      await Settings.create({
        siteName: "Southern Hemisphere Foundation",
        tagline: "Transforming Lives, Building Communities",
        contactEmail: "info@shf.org",
        contactPhone: "+256-XXX-XXXXXX",
        address: "Kampala, Uganda",
        socialMedia: {
          facebook: "https://facebook.com/shf",
          twitter: "https://twitter.com/shf",
          instagram: "https://instagram.com/shf",
        },
      });
      console.log("  ✅ Created default settings");
    } else {
      console.log("  ⏭  Settings exist");
    }

    console.log("\n✅ Database seeding completed!\n");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error seeding database:", error.message);
    process.exit(1);
  }
}
