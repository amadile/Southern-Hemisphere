# Database Design
## Southern Hemisphere Foundation Website

This document outlines the MongoDB database schema design for the Southern Hemisphere Foundation website.

## Database Collections

### 1. Users
Stores administrator and staff user accounts for the admin dashboard.

```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: String, // hashed
  role: String, // 'admin', 'editor', 'staff'
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date
}
```

### 2. Programs
Stores information about the foundation's programs.

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  goals: [String],
  photos: [String], // URLs to Cloudinary images
  beneficiaryStories: [{
    name: String,
    story: String,
    photo: String // URL to Cloudinary image
  }],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. News
Stores news articles, events, and success stories.

```javascript
{
  _id: ObjectId,
  title: String,
  content: String, // Rich text content
  excerpt: String,
  featuredImage: String, // URL to Cloudinary image
  category: String, // 'news', 'event', 'story'
  date: Date,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Gallery
Stores images for the media gallery.

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  imageUrl: String, // URL to Cloudinary image
  category: String, // 'learners', 'community', 'school'
  uploadDate: Date,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Donations
Stores donation records and processing information.

```javascript
{
  _id: ObjectId,
  donorName: String,
  donorEmail: String,
  donorPhone: String,
  amount: Number,
  currency: String, // UGX
  paymentMethod: String, // 'mobile-money', 'card', 'bank'
  transactionId: String, // From Flutterwave
  status: String, // 'pending', 'completed', 'failed', 'refunded'
  categoryId: ObjectId, // Reference to donation category
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 6. DonationCategories
Stores categories for donations.

```javascript
{
  _id: ObjectId,
  name: String, // 'Education', 'Food Support', 'Skills Training'
  description: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 7. ContactMessages
Stores messages submitted through the contact form.

```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  isRead: Boolean,
  responseSent: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 8. Settings
Stores site-wide settings and configuration.

```javascript
{
  _id: ObjectId,
  siteTitle: String,
  siteDescription: String,
  contactEmail: String,
  phoneNumbers: [String],
  whatsappNumbers: [String],
  address: String,
  socialLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String
  },
  primaryColor: String,
  secondaryColor: String,
  accentColor: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 9. HomePageSections
Stores editable sections for the homepage.

```javascript
{
  _id: ObjectId,
  sectionName: String, // 'banner', 'mission', 'programs', 'testimonials', 'stats'
  title: String,
  content: String,
  imageUrl: String, // URL to Cloudinary image
  order: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Relationships

1. **Donations** reference **DonationCategories** through categoryId
2. **HomePageSections** are ordered by the `order` field
3. All collections have timestamps (createdAt, updatedAt) for audit trails
4. **Settings** collection contains one document with site-wide configuration

## Indexes

To optimize query performance, the following indexes will be created:

1. Users
   - email (unique)
   - role

2. Programs
   - isActive
   - createdAt

3. News
   - category
   - date
   - isActive

4. Gallery
   - category
   - uploadDate
   - isActive

5. Donations
   - status
   - transactionId (unique)
   - createdAt

6. ContactMessages
   - isRead
   - createdAt

## Data Validation

All collections will implement schema validation at the application level using Mongoose schemas with:
- Required fields validation
- Data type validation
- Format validation (emails, phone numbers, URLs)
- Custom validation for business rules

## Backup Strategy

1. MongoDB Atlas automated backups (daily snapshots)
2. Manual export scripts for critical data
3. Version control for content through updatedAt timestamps
4. Regular backup verification procedures

## Security Considerations

1. All sensitive data (passwords) will be encrypted
2. Database connections will use SSL/TLS
3. Role-based access control at the application level
4. Regular security audits and updates
5. Input validation to prevent injection attacks