const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");
const Program = require("../models/Program");
const News = require("../models/News");
const DonationCategory = require("../models/DonationCategory");
const Settings = require("../models/Settings");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/shf_website"
    );
    console.log("MongoDB Connected for seeding");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await User.deleteMany({});
    // await Program.deleteMany({});
    // await News.deleteMany({});
    // await DonationCategory.deleteMany({});
    // await Settings.deleteMany({});

    // Create admin user
    const adminExists = await User.findOne({ email: "admin@shf.org" });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("Admin@123", salt);

      await User.create({
        firstName: "Admin",
        lastName: "User",
        email: "admin@shf.org",
        password: hashedPassword,
        role: "admin",
      });
      console.log(
        "✓ Admin user created (email: admin@shf.org, password: Admin@123)"
      );
    } else {
      console.log("✓ Admin user already exists");
    }

    // Create Programs
    const programsData = [
      {
        title: "Child Education Support",
        description:
          "The Child Education Support Program ensures that orphaned, vulnerable, and underserved children have access to quality education, emotional support, and a safe learning environment. Through school sponsorships, scholastic materials, mentorship, and community follow-ups, the program gives children the opportunity to stay in school and pursue their dreams without interruption.",
        goals: [
          "To increase school enrollment and retention for vulnerable children",
          "To provide learning materials, uniforms, and other essential support",
          "To offer mentorship and guidance to help children thrive academically and socially",
          "To reduce school dropout rates caused by poverty, abuse, or family instability",
        ],
        photos: [],
        beneficiaryStories: [],
        isActive: true,
      },
      {
        title: "Skills Development Program",
        description:
          "The Skills Development Program empowers youth and women with practical, employable skills that increase their opportunities for income generation. Training areas include entrepreneurship, digital literacy, tailoring, hairdressing, financial literacy, and leadership development.",
        goals: [
          "To equip youth and women with market-ready skills",
          "To support participants in starting small businesses or securing jobs",
          "To promote innovation, creativity, and self-reliance among young people",
          "To reduce unemployment and poverty within underserved communities",
        ],
        photos: [],
        beneficiaryStories: [],
        isActive: true,
      },
      {
        title: "Community Outreach Program",
        description:
          "The Community Outreach Program strengthens communities through awareness campaigns, health education, environmental initiatives, and humanitarian support. The program focuses on improving the well-being of children, youth, and families by addressing issues such as health, hygiene, gender-based violence, mental wellness, and community safety.",
        goals: [
          "To raise community awareness on health, sanitation, and child protection",
          "To provide outreach services to families in crisis or extreme vulnerability",
          "To strengthen community participation and volunteerism",
          "To empower communities to take collective responsibility for their well-being",
        ],
        photos: [],
        beneficiaryStories: [],
        isActive: true,
      },
    ];

    for (const programData of programsData) {
      const exists = await Program.findOne({ title: programData.title });
      if (!exists) {
        await Program.create(programData);
        console.log(`✓ Program created: ${programData.title}`);
      }
    }

    // Create Donation Categories
    const categoriesData = [
      {
        name: "Education",
        description:
          "Support quality education for orphaned and vulnerable children",
        isActive: true,
      },
      {
        name: "Food Support",
        description:
          "Provide nutritional support for children and families in need",
        isActive: true,
      },
      {
        name: "Skills Training",
        description: "Fund skills development programs for youth empowerment",
        isActive: true,
      },
      {
        name: "General Support",
        description: "General support for all foundation activities",
        isActive: true,
      },
    ];

    for (const categoryData of categoriesData) {
      const exists = await DonationCategory.findOne({
        name: categoryData.name,
      });
      if (!exists) {
        await DonationCategory.create(categoryData);
        console.log(`✓ Donation category created: ${categoryData.name}`);
      }
    }

    // Create Settings
    const settingsExists = await Settings.findOne();
    if (!settingsExists) {
      await Settings.create({
        siteName: "Southern Hemisphere Foundation",
        siteDescription:
          "Building Brighter Tomorrows - Empowering orphaned and underprivileged children through education, mentorship, and skills development",
        contactEmail: "southernhemispherefoundation@gmail.com",
        contactPhone: "+256 762 658 295",
        contactPhone2: "+256 753 044 889",
        whatsappNumber: "256762658295",
        whatsappNumber2: "256753044889",
        address: "Bunamwaya, Makindye-Ssabagabo, Wakiso District, Uganda",
        socialMedia: {
          facebook: "",
          twitter: "",
          instagram: "",
          linkedin: "",
        },
      });
      console.log("✓ Settings created");
    }

    // Create sample news
    const newsData = [
      {
        title: "SHF Launches New Skills Development Hub in Bunamwaya",
        content:
          "Southern Hemisphere Foundation has opened a small skills-training hub designed to equip youth with hands-on abilities in tailoring, and digital literacy. The hub will support over 60 young people annually, helping them access employment and entrepreneurship opportunities.",
        excerpt: "New skills training hub to support 60+ youth annually",
        featuredImage: "",
        category: "news",
        date: new Date(),
        isActive: true,
      },
      {
        title:
          "Partnership With Absa Bank Strengthens Financial Literacy Programs",
        content:
          "SHF has partnered with Absa Bank Uganda to deliver financial literacy sessions to youth and single mothers in the community. Through the partnership, learners will receive training in savings, budgeting, and small business management.",
        excerpt:
          "Partnership brings financial education to underserved communities",
        featuredImage: "",
        category: "news",
        date: new Date(),
        isActive: true,
      },
    ];

    for (const newsItem of newsData) {
      const exists = await News.findOne({ title: newsItem.title });
      if (!exists) {
        await News.create(newsItem);
        console.log(`✓ News created: ${newsItem.title}`);
      }
    }

    console.log("\n✅ Database seeding completed!");
    console.log("\n📝 Login credentials:");
    console.log("   Email: admin@shf.org");
    console.log("   Password: Admin@123\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
