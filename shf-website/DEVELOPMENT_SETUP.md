# Development Setup Guide
## Southern Hemisphere Foundation Website

This guide explains how to set up the development environment for the Southern Hemisphere Foundation website.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or higher)
- npm (comes with Node.js) or yarn
- MongoDB database (local or cloud instance)
- Git
- Code editor (VS Code recommended)

## Project Structure

```
shf-website/
├── client/           # Next.js frontend application
├── server/           # Node.js/Express backend API
├── PROJECT_PLAN.md   # Development plan and requirements
├── README.md         # Project overview
└── REQUIREMENTS_MAPPING.md # SRS to implementation mapping
```

## Backend Setup (server)

1. Navigate to the server directory:
```bash
cd server
```

2. Initialize the Node.js project:
```bash
npm init -y
```

3. Install required dependencies:
```bash
npm install express mongoose dotenv cors helmet morgan
```

4. Install development dependencies:
```bash
npm install --save-dev nodemon jest
```

5. Create the basic project structure:
```
server/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── utils/
├── .env
├── .gitignore
└── server.js
```

## Frontend Setup (client)

1. Navigate to the client directory:
```bash
cd client
```

2. Create a new Next.js application:
```bash
npx create-next-app@latest . --typescript --eslint --tailwind --src-dir --app --import-alias "@/*"
```

3. Install additional dependencies:
```bash
npm install react-hook-form axios
```

4. Project structure will be:
```
client/
├── src/
│   ├── app/          # App router pages
│   ├── components/   # Reusable components
│   ├── lib/          # Utility functions
│   └── styles/       # Global styles
├── public/           # Static assets
├── .env.local
└── next.config.js
```

## Environment Variables

### Backend (.env file in server directory)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shf_website
JWT_SECRET=your_jwt_secret_key
FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
EMAIL_HOST=smtp.your-email-provider.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### Frontend (.env.local file in client directory)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Running the Application

### Backend Development Server
```bash
cd server
npm run dev
```

This will start the Express server on http://localhost:5000

### Frontend Development Server
```bash
cd client
npm run dev
```

This will start the Next.js development server on http://localhost:3000

## Database Setup

1. Install MongoDB locally or sign up for MongoDB Atlas
2. Create a new database named `shf_website`
3. Update the `MONGODB_URI` in your `.env` file with your connection string
4. The application will automatically create collections when first run

## Code Quality and Formatting

### Backend
- ESLint for code linting
- Prettier for code formatting
- Jest for testing

Install ESLint and Prettier:
```bash
cd server
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier
```

### Frontend
- ESLint and Prettier are already configured with Next.js
- Additional React-specific linting rules

## Git Workflow

1. Fork the repository (if applicable)
2. Create a feature branch for your work:
```bash
git checkout -b feature/your-feature-name
```

3. Make your changes and commit:
```bash
git add .
git commit -m "Description of your changes"
```

4. Push to your fork and create a pull request:
```bash
git push origin feature/your-feature-name
```

## Testing

### Backend Testing
Run tests with:
```bash
cd server
npm test
```

### Frontend Testing
Run tests with:
```bash
cd client
npm test
```

## Development Best Practices

1. **Branching Strategy**: Use feature branches for all new work
2. **Commit Messages**: Write clear, descriptive commit messages
3. **Code Reviews**: All code must be reviewed before merging
4. **Documentation**: Keep documentation updated with code changes
5. **Testing**: Write tests for new functionality
6. **Security**: Never commit sensitive information to the repository
7. **Environment Variables**: Use .env files for configuration, never hardcode secrets

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the PORT value in your .env file
   - Kill the process using the port:
   ```bash
   # On Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # On macOS/Linux
   lsof -i :5000
   kill -9 <PID>
   ```

2. **MongoDB connection issues**
   - Verify your MongoDB URI is correct
   - Ensure MongoDB is running
   - Check firewall settings if using a remote database

3. **Dependency installation errors**
   - Delete node_modules folders and package-lock.json files
   - Run `npm install` again
   - Check Node.js version compatibility

### Getting Help

If you encounter issues not covered in this guide:
1. Check the project documentation
2. Review recent commits for related changes
3. Reach out to the development team