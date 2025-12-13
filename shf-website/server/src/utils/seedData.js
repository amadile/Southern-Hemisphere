const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Program = require('../models/Program');
const News = require('../models/News');
const DonationCategory = require('../models/DonationCategory');
const Settings = require('../models/Settings');

// Connect to database
const connectDB = require('../config/db');
connectDB();

// Sample data
const programs = [
  {
    title: 'Child Education Support',
    description: 'The Child Education Support Program ensures that orphaned, vulnerable, and underserved children have access to quality education, emotional support, and a safe learning environment. Through school sponsorships, scholastic materials, mentorship, and community follow-ups, the program gives children the opportunity to stay in school and pursue their dreams without interruption. We work closely with caregivers, schools, and community leaders to protect each child\'s well-being and academic progress.',
    goals: [
      'To increase school enrollment and retention for vulnerable children.',
      'To provide learning materials, uniforms, and other essential support.',
      'To offer mentorship and guidance to help children thrive academically and socially.',
      'To reduce school dropout rates caused by poverty, abuse, or family instability.'
    ],
    photos: [],
    beneficiaryStories: [
      {
        name: 'Aisha',
        story: 'Before joining SHF, AISHA had missed an entire year of school due to financial hardship. Through the Child Education Support Program, she received full sponsorship and mentorship. Today, AISHA is a confident Primary Seven candidate, dreaming of becoming a nurse.',
        photo: ''
      }
    ]
  },
  {
    title: 'Skills Development Program',
    description: 'The Skills Development Program empowers youth and women with practical, employable skills that increase their opportunities for income generation. Training areas include entrepreneurship, digital literacy, tailoring, hairdressing, financial literacy, and leadership development. By equipping participants with hands-on skills, the program helps build independence, confidence, and long-term economic resilience.',
    goals: [
      'To equip youth and women with market-ready skills.',
      'To support participants in starting small businesses or securing jobs.',
      'To promote innovation, creativity, and self-reliance among young people.',
      'To reduce unemployment and poverty within underserved communities.'
    ],
    photos: [],
    beneficiaryStories: [
      {
        name: 'Wasswa',
        story: 'Wasswa joined the Skills Development Program with no prior training. After three months of digital skills workshops, he secured an internship at a local company and is now earning a stable income while supporting his siblings.',
        photo: ''
      }
    ]
  },
  {
    title: 'Community Outreach Program',
    description: 'The Community Outreach Program strengthens communities through awareness campaigns, health education, environmental initiatives, and humanitarian support. The program focuses on improving the well-being of children, youth, and families by addressing issues such as health, hygiene, gender-based violence, mental wellness, and community safety. SHF mobilizes volunteers and partners to bring services and hope to areas where they are needed most.',
    goals: [
      'To raise community awareness on health, sanitation, and child protection.',
      'To provide outreach services to families in crisis or extreme vulnerability.',
      'To strengthen community participation and volunteerism.',
      'To empower communities to take collective responsibility for their well-being.'
    ],
    photos: [],
    beneficiaryStories: [
      {
        name: 'Elderly Grandmother',
        story: 'During a community outreach in Makindye–Ssabagabo, SHF volunteers discovered an elderly grandmother caring for four grandchildren alone. Through the outreach program, the family received food, health support, and referrals for long-term assistance.',
        photo: ''
      }
    ]
  }
];

const newsItems = [
  {
    title: 'SHF Launches New Skills Development Hub in Bunamwaya',
    content: 'Southern Hemisphere Foundation has opened a small skills-training hub designed to equip youth with hands-on abilities in tailoring, and digital literacy. The hub will support over 60 young people annually, helping them access employment and entrepreneurship opportunities.',
    excerpt: 'Southern Hemisphere Foundation has opened a small skills-training hub designed to equip youth with hands-on abilities in tailoring, and digital literacy.',
    category: 'news',
    date: new Date('2025-03-15')
  },
  {
    title: 'Partnership With Absa Bank Strengthens Financial Literacy Programs',
    content: 'SHF has partnered with Absa Bank Uganda to deliver financial literacy sessions to youth and single mothers in the community. Through the partnership, learners will receive training in savings, budgeting, and small business management.',
    excerpt: 'SHF has partnered with Absa Bank Uganda to deliver financial literacy sessions to youth and single mothers in the community.',
    category: 'news',
    date: new Date('2025-02-28')
  },
  {
    title: 'SHF Receives Textbook Support From The Tamales Company',
    content: 'The Tamales, a corporate partner, has donated textbooks, storybooks, and learning aids to support classroom learning for vulnerable children at SHF Community School.',
    excerpt: 'The Tamales, a corporate partner, has donated textbooks, storybooks, and learning aids to support classroom learning for vulnerable children.',
    category: 'news',
    date: new Date('2025-02-10')
  },
  {
    title: 'Community Health Outreach – March 2025',
    content: 'SHF, together with Voice Life Health Organisation, will conduct a community medical outreach offering deworming, general checkups, and health education for children and mothers. The event aims to serve over 300 community members.',
    excerpt: 'SHF, together with Voice Life Health Organisation, will conduct a community medical outreach offering deworming, general checkups, and health education.',
    category: 'event',
    date: new Date('2025-03-22')
  },
  {
    title: 'From Vulnerable to Valedictorian – Meet Sarah',
    content: 'Sarah joined SHF in 2010 after losing both parents. Struggling academically and emotionally, she was supported with school fees, counselling, and mentorship. Today, she is one of the top-performing learners and dreams of becoming a nurse so she can give back to her community.',
    excerpt: 'Sarah joined SHF in 2010 after losing both parents. Today, she is one of the top-performing learners.',
    category: 'story',
    date: new Date('2025-01-15')
  }
];

const donationCategories = [
  {
    name: 'Education',
    description: 'Support school fees, materials, and learning programs for vulnerable children'
  },
  {
    name: 'Food Support',
    description: 'Provide nutritious meals for children in our programs'
  },
  {
    name: 'Skills Training',
    description: 'Fund vocational training for youth and women'
  }
];

const settings = {
  siteTitle: 'Southern Hemisphere Foundation',
  siteDescription: 'Empowering orphaned and underprivileged children in Uganda',
  contactEmail: 'southernhemispherefoundation@gmail.com',
  phoneNumbers: ['+256 762 658 295', '+256 753 044 889'],
  whatsappNumbers: ['+256 762 658 295', '+256 753 044 889'],
  address: 'Bunamwaya, Makindye, Wakiso District, Uganda',
  socialLinks: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  },
  primaryColor: '#0A3D62',
  secondaryColor: '#3DC1D3',
  accentColor: '#F6B93B'
};

// Seed function
const seedData = async () => {
  try {
    // Clear existing data
    await Program.deleteMany({});
    await News.deleteMany({});
    await DonationCategory.deleteMany({});
    await Settings.deleteMany({});

    // Insert new data
    await Program.insertMany(programs);
    console.log('Programs seeded successfully');

    await News.insertMany(newsItems);
    console.log('News items seeded successfully');

    await DonationCategory.insertMany(donationCategories);
    console.log('Donation categories seeded successfully');

    const settingsDoc = new Settings(settings);
    await settingsDoc.save();
    console.log('Settings seeded successfully');

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData();