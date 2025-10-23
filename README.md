# E-Commerce Web Application

A full-stack E-Commerce web application built with React, Node.js, Express, MongoDB, and n8n integration.

## Features

### Core Features
- **User Authentication**: Login, Register, Logout with JWT-based authentication
- **Role-based Access**: Admin and customer roles with different permissions
- **Product Management**: Admin can add, edit, delete products with full CRUD operations
- **Shopping Cart**: Add/remove items, update quantities, persist using localStorage
- **Checkout & Orders**: Complete order placement with order tracking
- **Admin Dashboard**: Order management, status updates, and analytics

### Technical Features
- **RESTful API**: Well-structured backend API with proper HTTP methods
- **Database Integration**: MongoDB with Mongoose ODM
- **n8n Integration**: Automated workflows for order notifications
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: React Context for authentication and cart management

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- React Router DOM
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Integration
- n8n for workflow automation
- Webhook integration for order notifications

## Project Structure

```
ecommerce-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── App.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── scripts/           # Utility scripts
│   └── server.js
└── package.json           # Root package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- n8n (optional, for workflow automation)

### 1. Clone the repository
```bash
git clone <repository-url>
cd ecommerce-app
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install all dependencies (client + server)
npm run install-all
```

### 3. Environment Setup

#### Server Environment
Create a `.env` file in the `server` directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
N8N_WEBHOOK_URL=http://localhost:5678/webhook/order-created
```

#### MongoDB Setup
Make sure MongoDB is running on your system or update the `MONGODB_URI` in the `.env` file.

### 4. Seed the database
```bash
cd server
npm run seed
```

This will create:
- Admin user (email: admin@example.com, password: admin123)
- Sample products with categories

### 5. Start the application

#### Development mode (both frontend and backend)
```bash
npm run dev
```

#### Or start individually
```bash
# Backend (port 5000)
npm run server

# Frontend (port 3000)
npm run client
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with pagination, search, category filter)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)
- `GET /api/products/categories` - Get all categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `GET /api/orders/admin/all` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Users
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/stats` - Get user statistics (Admin only)

## n8n Integration

The application includes n8n webhook integration for order notifications. When an order is created, it triggers a webhook to your n8n instance.

### Setup n8n Webhook
1. Install and run n8n
2. Create a webhook node with the URL: `http://localhost:5678/webhook/order-created`
3. Configure the webhook to handle order data:
   ```json
   {
     "orderId": "order_id",
     "userId": "user_id", 
     "userEmail": "user@example.com",
     "totalPrice": 199.99,
     "status": "pending",
     "createdAt": "2024-01-01T00:00:00.000Z"
   }
   ```

## Default Admin Account

After seeding the database, you can login with:
- **Email**: admin@example.com
- **Password**: admin123

## Features Overview

### Customer Features
- Browse products with search and category filters
- Add products to cart
- View product details
- Place orders
- Track order status
- Update profile information

### Admin Features
- All customer features
- Add/edit/delete products
- View all orders
- Update order status
- View analytics dashboard
- Manage user accounts

## Development

### Adding New Features
1. Backend: Add routes in `server/routes/`
2. Frontend: Add components in `client/src/components/`
3. Update API calls in frontend components

### Database Models
- **User**: User authentication and profile data
- **Product**: Product information and inventory
- **Order**: Order details and status tracking

## Deployment

### Backend Deployment
1. Set up MongoDB database (MongoDB Atlas recommended)
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or AWS

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or AWS S3

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.
