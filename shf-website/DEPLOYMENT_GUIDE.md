# Deployment Guide
## Southern Hemisphere Foundation Website

This guide provides instructions for deploying the Southern Hemisphere Foundation website to production environments.

## Prerequisites

Before deploying, ensure you have:

1. **Docker** installed on the target server
2. **Docker Compose** installed
3. **Domain name** configured (southernhemispherefoundation.org)
4. **SSL certificate** (can be obtained through Let's Encrypt)
5. **Flutterwave account** with API keys
6. **Email service** credentials for sending notifications

## Deployment Options

### Option 1: Docker Deployment (Recommended)

This is the recommended approach for easy deployment and scaling.

#### Steps:

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd shf-website
   ```

2. **Configure Environment Variables**
   Copy the example environment file and update with your production values:
   ```bash
   cp .env.example .env.production
   # Edit .env.production with your actual values
   ```

3. **Build and Start Services**
   ```bash
   docker-compose up -d
   ```

4. **Initialize the Database**
   ```bash
   # Run the seed script to populate initial data
   docker-compose exec backend npm run seed
   ```

5. **Verify Deployment**
   - Frontend: http://your-domain:3000
   - Backend API: http://your-domain:5000
   - MongoDB Express: http://your-domain:8081

### Option 2: Manual Deployment

For environments where Docker is not available.

#### Backend Deployment:

1. **Install Dependencies**
   ```bash
   cd server
   npm install --production
   ```

2. **Configure Environment**
   Create a `.env` file with production values:
   ```bash
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/shf_website
   # Add other required environment variables
   ```

3. **Start the Server**
   ```bash
   npm start
   ```

#### Frontend Deployment:

1. **Install Dependencies**
   ```bash
   cd client
   npm install --production
   ```

2. **Build for Production**
   ```bash
   npm run build
   ```

3. **Start the Server**
   ```bash
   npm start
   ```

## Production Configuration

### SSL Certificate Setup

To enable HTTPS, configure a reverse proxy with SSL termination:

#### Using Nginx with Let's Encrypt:

1. **Install Certbot**
   ```bash
   sudo apt-get update
   sudo apt-get install certbot nginx
   ```

2. **Obtain SSL Certificate**
   ```bash
   sudo certbot --nginx -d southernhemispherefoundation.org
   ```

3. **Configure Nginx Reverse Proxy**
   Create `/etc/nginx/sites-available/shf-website`:
   ```nginx
   server {
       listen 80;
       server_name southernhemispherefoundation.org;
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl;
       server_name southernhemispherefoundation.org;

       ssl_certificate /etc/letsencrypt/live/southernhemispherefoundation.org/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/southernhemispherefoundation.org/privkey.pem;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }

       location /api/ {
           proxy_pass http://localhost:5000/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Enable the Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/shf-website /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Database Backup Strategy

Implement regular database backups:

1. **Automated Backups**
   Create a cron job for daily backups:
   ```bash
   # Add to crontab
   0 2 * * * /usr/bin/docker exec shf-website-mongo-1 mongodump --out /backup/$(date +\%Y-\%m-\%d) && tar -czf /backup/$(date +\%Y-\%m-\%d).tar.gz /backup/$(date +\%Y-\%m-\%d)
   ```

2. **Backup Retention**
   Keep 30 days of backups:
   ```bash
   # Add to crontab
   0 3 * * * find /backup -type f -mtime +30 -delete
   ```

### Monitoring and Logging

Set up monitoring for production:

1. **Application Monitoring**
   - Use PM2 for process monitoring
   - Implement application logging
   - Set up error tracking (e.g., Sentry)

2. **Infrastructure Monitoring**
   - Monitor server resources (CPU, memory, disk)
   - Set up alerts for downtime
   - Monitor database performance

3. **Log Management**
   - Centralize logs using ELK stack or similar
   - Implement log rotation
   - Set up log analysis

## Scaling Considerations

### Horizontal Scaling

For high-traffic scenarios:

1. **Load Balancing**
   Use a load balancer (nginx, HAProxy, or cloud provider LB) to distribute traffic.

2. **Database Scaling**
   Consider MongoDB replication or sharding for large datasets.

3. **Caching**
   Implement Redis caching for frequently accessed data.

### Vertical Scaling

Upgrade server resources:
- Increase CPU and memory allocation
- Use SSD storage for better I/O performance
- Optimize database indexes

## Security Considerations

### Application Security

1. **Rate Limiting**
   Implement rate limiting for API endpoints to prevent abuse.

2. **Input Validation**
   Ensure all user inputs are properly validated and sanitized.

3. **Authentication**
   Use strong passwords and consider two-factor authentication for admin access.

### Network Security

1. **Firewall Configuration**
   Restrict access to only necessary ports:
   - 80/443 for web traffic
   - 22 for SSH access (restrict to specific IPs)

2. **Database Security**
   - Do not expose MongoDB to external networks
   - Use strong authentication for database access
   - Regularly update database software

## Maintenance Procedures

### Regular Updates

1. **Application Updates**
   - Regularly update dependencies
   - Apply security patches promptly
   - Test updates in staging environment first

2. **System Updates**
   - Keep OS updated with security patches
   - Update Docker and related tools
   - Monitor for end-of-life software

### Data Management

1. **Content Updates**
   - Regularly update news and events
   - Refresh gallery images
   - Update program information

2. **Donation Records**
   - Regularly export donation data for accounting
   - Archive old records
   - Ensure compliance with data retention policies

## Troubleshooting

### Common Issues

1. **Application Not Starting**
   - Check Docker container logs: `docker-compose logs`
   - Verify environment variables are correctly set
   - Ensure dependencies are properly installed

2. **Database Connection Issues**
   - Verify MongoDB is running
   - Check connection string in environment variables
   - Ensure network connectivity between services

3. **Performance Problems**
   - Monitor resource usage
   - Check database query performance
   - Review application logs for errors

### Recovery Procedures

1. **Database Recovery**
   - Restore from latest backup
   - Verify data integrity
   - Update application to use restored database

2. **Application Rollback**
   - Deploy previous version
   - Verify functionality
   - Investigate cause of failure

## Support and Maintenance

### Contact Information

For ongoing support and maintenance:

- **Primary Developer**: [Your Name/Team]
- **Backup Support**: [Backup Contact]
- **Hosting Provider**: [Provider Contact]

### Documentation Updates

Keep this deployment guide updated with:
- New deployment procedures
- Updated dependencies
- Security patches
- Scaling recommendations

Regular review schedule: Quarterly