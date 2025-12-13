# Requirements Mapping Document
## Southern Hemisphere Foundation Website

This document maps the requirements from the Software Requirements Specification (SRS) to our implementation approach using modern JavaScript technologies.

## Functional Requirements

### 1. Organization Website
**SRS Reference**: Section 1, Scope - "Organization Website (Alternative to be provided)"
**Implementation**:
- Next.js frontend application with server-side rendering for optimal SEO
- Responsive design that works on all device sizes
- Implementation of all required pages: Home, About, Programs, Gallery, News/Blog, Contact, Donate

### 2. Branding System
**SRS Reference**: Section 3, Branding Requirements
**Implementation**:
- Tailwind CSS configuration with custom color palette:
  - Primary: Deep Royal Blue (#0A3D62)
  - Secondary: Bright Sky Blue (#3DC1D3)
  - Accent: Sunshine Yellow (#F6B93B)
  - Complementary: White (#FFFFFF)
  - Optional: Warm Green (#78E08F)
- Consistent application of brand colors throughout the website
- Implementation of motto: "Building Brighter Tomorrows"

### 3. Media Gallery
**SRS Reference**: Section 1, Scope - "Media Gallery"
**Implementation**:
- Cloudinary integration for image storage and optimization
- Responsive gallery component with categories:
  - Photos of learners
  - Community activities
  - School environment
- Mobile-optimized display as required

### 4. News & Blog Updates
**SRS Reference**: Section 1, Scope - "News & Blog updates"
**Implementation**:
- Dynamic content management through admin dashboard
- Support for different content types:
  - News updates
  - Events
  - Success stories
- Rich text editor for content creation

### 5. Donation Portal
**SRS Reference**: Section 1, Scope - "Donation Portal (Mobile Money + Flutterwave)"
**Implementation**:
- Flutterwave SDK integration for payment processing
- Support for multiple payment methods:
  - MTN Mobile Money
  - Airtel Money
  - VISA/Mastercard
- Donation categories as specified:
  - Education
  - Food Support
  - Skills Training
- Complete donation flow:
  - User chooses donation amount
  - User enters personal details
  - Payment processed
  - Confirmation message sent
  - Admin receives record in backend

### 6. Contact Forms + WhatsApp Chat Integration
**SRS Reference**: Section 1, Scope - "Contact forms + WhatsApp chat integration"
**Implementation**:
- Contact form with fields:
  - Full Name
  - Email Address
  - Phone Number (optional)
  - Subject
  - Message
- Auto-response email system using Nodemailer
- WhatsApp chat buttons linking to:
  - https://wa.me/256762658295
  - https://wa.me/256753044889

### 7. Admin Dashboard for Content Updates
**SRS Reference**: Section 1, Scope - "Admin dashboard for content updates"
**Implementation**:
- Secure authentication system for admin users
- Content management capabilities:
  - Add/edit/delete news
  - Update gallery
  - Edit home page sections
  - Manage programs
  - Add pages
  - Manage donations records
  - Manage user accounts

### 8. Hosting with SSL + Automated Backups
**SRS Reference**: Section 1, Scope - "Hosting with SSL + automated backups"
**Implementation**:
- Deployment platforms with automatic SSL:
  - Vercel for frontend
  - Railway/Render for backend
- MongoDB Atlas for database with automated backups
- Additional backup strategies for critical data

## User Roles
**SRS Reference**: Section 1, Users of the system

### 1. Director / Leadership
**Access**: Full admin access
**Capabilities**: Complete control over all website features and content

### 2. Staff/Volunteers
**Access**: Content editor access
**Capabilities**: Ability to update programs, news, gallery, and respond to contacts

### 3. Donors
**Access**: Public access with donation capabilities
**Capabilities**: View information, make donations, contact organization

### 4. Well-wishers / Sponsors
**Access**: Public access
**Capabilities**: View information, contact organization

### 5. General Public
**Access**: Public access
**Capabilities**: View all public information about the foundation

### 6. Partners
**Access**: Public access with contact capabilities
**Capabilities**: View information, contact organization for partnerships

## Pages and Content Structure

### Home Page
**SRS Reference**: Section 8.1, Home Page
**Implementation**:
- Banner with branding
- Featured programs section
- Impact statistics
- Mission statement
- Testimonials
- Prominent donate button
- Footer with social links

### About Page
**SRS Reference**: Section 8.2, About Page
**Implementation**:
- Organization history
- Vision & Mission statements
- Leadership profiles
- Core values

### Programs Page
**SRS Reference**: Section 8.3, Programs Page
**Implementation**:
- Child Education Support Program
- Skills Development Program
- Community Outreach Program
- Each program includes:
  - Title
  - Description
  - Photos
  - Beneficiary stories

### Gallery Page
**SRS Reference**: Section 3, Gallery Page
**Implementation**:
- Photo galleries categorized by:
  - Photos of learners
  - Community activities
  - School environment
- Mobile-responsive design

### News/Blog Page
**SRS Reference**: Section 5, News/Blog Page
**Implementation**:
- News updates
- Event announcements
- Success stories
- Date-based sorting and categorization

### Contact Page
**SRS Reference**: Section 6, Contact Page
**Implementation**:
- Contact form linked to SHF email
- Embedded Google Maps location
- Phone contact information
- Direct WhatsApp chat buttons

### Donate Page
**SRS Reference**: Section 7, Donate Page
**Implementation**:
- Mobile Money integration
- Flutterwave integration
- Donation categories
- Secure payment processing

## Non-Functional Requirements

### Performance
**SRS Reference**: Section 5.1, Performance
**Implementation**:
- Optimized images with Cloudinary
- Server-side rendering with Next.js
- CDN for static assets
- Database indexing for fast queries
- Target: Website loads <3 seconds

### Security
**SRS Reference**: Section 5.2, Security
**Implementation**:
- SSL encryption (automatic with Vercel/Railway)
- Input validation and sanitization
- Authentication and authorization for admin areas
- Rate limiting to prevent abuse
- CAPTCHA on contact forms

### Reliability
**SRS Reference**: Section 5.3, Reliability
**Implementation**:
- Daily automated backups of database
- 99%+ uptime through reliable hosting providers
- Error monitoring and alerting
- Graceful degradation for non-critical failures

### Usability
**SRS Reference**: Section 5.4, Usability
**Implementation**:
- Simple, clean user interface
- Accessible fonts and typography
- High contrast for readability
- Screen-reader friendly markup
- Mobile-responsive design

## Technical Requirements

### Hosting
**SRS Reference**: Section 6.1, Hosting
**Implementation**:
- Vercel for frontend hosting with automatic SSL
- Railway/Render for backend hosting
- MongoDB Atlas for database hosting
- Automatic backups configured

### CMS
**SRS Reference**: Section 6.2, CMS
**Implementation**:
- Custom-built CMS using React/Next.js
- Admin dashboard for content management
- Role-based access control

### Plugins/Integrations
**SRS Reference**: Section 6.3, Plugins Required
**Implementation**:
- Yoast SEO equivalent through Next.js SEO practices
- Custom form handling instead of WPForms
- WhatsApp chat integration through direct API
- Gallery/slider functionality through React components
- Flutterwave payment integration
- Backup systems through hosting providers and custom scripts
- Security through input validation, authentication, and rate limiting

## Future Enhancements
**SRS Reference**: Section 9, Future Enhancements
**Implementation Roadmap**:
- Student sponsorship portal
- Online volunteer registration
- Annual reports download section
- SMS donation option
- Learning portal for children
- Mobile app integration

## Acceptance Criteria
**SRS Reference**: Section 10, Acceptance Criteria
**Implementation Verification**:
- ✅ All website pages are live and responsive
- ✅ Logo and brand colors are implemented correctly
- ✅ Donation gateway works end-to-end with all payment methods
- ✅ Contact form delivers emails and sends auto-responses
- ✅ WhatsApp button is functional
- ✅ Gallery displays properly with mobile optimization
- ✅ Admin can update all content types
- ✅ Site loads under 3 seconds on all devices
- ✅ SSL is enabled and security measures are in place
- ✅ Monthly backups are configured and tested