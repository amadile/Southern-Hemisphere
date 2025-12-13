# Southern Hemisphere Foundation Website

A modern, responsive website for the Southern Hemisphere Foundation built with JavaScript technologies to replace WordPress.

## Project Overview

This project provides a complete website solution for the Southern Hemisphere Foundation, including:

- Public-facing website with information about programs, news, and donation capabilities
- Admin dashboard for content management
- Secure donation processing through Flutterwave
- Responsive design optimized for all devices
- Database-backed content management

## Technology Stack

### Frontend
- **Next.js 13+** with App Router
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **React** for UI components

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **RESTful API** architecture

### DevOps
- **Docker** for containerization
- **Docker Compose** for multi-container applications
- **GitHub Actions** for CI/CD
- **Nginx** for reverse proxy and SSL termination

### Payment Processing
- **Flutterwave** for secure payments
- Support for credit cards, debit cards, and mobile money

## Project Structure

```
shf-website/
├── client/              # Next.js frontend application
│   ├── src/
│   │   ├── app/         # App router pages
│   │   ├── components/  # Reusable components
│   │   └── lib/         # Utility functions
│   ├── public/          # Static assets
│   └── Dockerfile       # Frontend Docker configuration
├── server/              # Node.js/Express backend API
│   ├── src/
│   │   ├── controllers/ # Route handlers
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   └── config/      # Configuration files
│   ├── Dockerfile       # Backend Docker configuration
│   └── server.js        # Entry point
├── docker-compose.yml   # Multi-container orchestration
├── DEPLOYMENT_GUIDE.md  # Production deployment instructions
└── TESTING_PLAN.md      # Comprehensive testing strategy
```

## Quick Start

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- MongoDB (for local development)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shf-website
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Configure environment variables**
   ```bash
   # Copy example files and update with your values
   cp .env.example .env
   ```

5. **Start development servers**
   ```bash
   # In client directory
   npm run dev
   
   # In server directory
   npm run dev
   ```

### Docker Development

1. **Start all services**
   ```bash
   docker-compose up -d
   ```

2. **Seed the database**
   ```bash
   docker-compose exec backend npm run seed
   ```

3. **Access services**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB Express: http://localhost:8081

## Available Scripts

### Frontend (client/)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run linter

### Backend (server/)
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run seed` - Seed database with initial data
- `npm run lint` - Run linter

## Testing

The project includes comprehensive testing:

- **Unit tests** for components and functions
- **Integration tests** for API endpoints
- **End-to-end tests** for user flows
- **Performance tests** for load and speed
- **Security tests** for vulnerabilities

Run tests with:
```bash
# Frontend tests
cd client && npm test

# Backend tests
cd server && npm test
```

## Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Production Deployment

1. **Configure production environment variables**
2. **Build Docker images**
3. **Deploy to production server**
4. **Run database seeding**
5. **Configure SSL and reverse proxy**

## API Documentation

The backend provides a RESTful API with the following endpoints:

### Programs
- `GET /api/programs` - Get all programs
- `POST /api/programs` - Create a new program
- `GET /api/programs/:id` - Get a specific program
- `PUT /api/programs/:id` - Update a program
- `DELETE /api/programs/:id` - Delete a program

### News & Events
- `GET /api/news` - Get all news items
- `POST /api/news` - Create a new news item
- `GET /api/news/:id` - Get a specific news item
- `PUT /api/news/:id` - Update a news item
- `DELETE /api/news/:id` - Delete a news item

### Gallery
- `GET /api/gallery` - Get all gallery items
- `POST /api/gallery` - Create a new gallery item
- `GET /api/gallery/:id` - Get a specific gallery item
- `PUT /api/gallery/:id` - Update a gallery item
- `DELETE /api/gallery/:id` - Delete a gallery item

### Donations
- `GET /api/donations` - Get all donations
- `POST /api/donations` - Create a new donation
- `GET /api/donations/:id` - Get a specific donation
- `PUT /api/donations/:id` - Update a donation
- `DELETE /api/donations/:id` - Delete a donation

### Contact Messages
- `GET /api/contact` - Get all contact messages
- `POST /api/contact` - Create a new contact message
- `GET /api/contact/:id` - Get a specific contact message
- `PUT /api/contact/:id` - Update a contact message
- `DELETE /api/contact/:id` - Delete a contact message

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is developed specifically for the Southern Hemisphere Foundation and is not licensed for public use.

## Support

For support, contact the development team or refer to the documentation in this repository.