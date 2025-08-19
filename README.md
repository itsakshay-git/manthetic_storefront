# 🛍️ Menthetic Storefront

A modern, responsive e-commerce storefront built with React, featuring a beautiful UI, authentication system, shopping cart, wishlist functionality, and seamless user experience.

## 🌐 Live Demo

**🔗 Live Application**: [https://menthetic-storefront.vercel.app](https://menthetic-storefront.vercel.app) *(Coming Soon)*



## ✨ Features

### 🎨 **User Interface**
- **Modern Design**: Clean, responsive design with Tailwind CSS
- **Mobile-First**: Optimized for all device sizes
- **Smooth Animations**: Framer Motion animations and transitions
- **Interactive Elements**: Hover effects, loading states, and micro-interactions

### 🔐 **Authentication & User Management**
- **User Registration & Login**: Secure authentication system
- **Protected Routes**: Route protection for authenticated users
- **Profile Management**: User profile and settings
- **Password Management**: Change password functionality

### 🛒 **Shopping Experience**
- **Product Catalog**: Browse products with filtering and search
- **Product Details**: Detailed product information and variants
- **Shopping Cart**: Add/remove items with persistent storage
- **Wishlist**: Save favorite products for later
- **Order Management**: Track order status and history

### 📱 **Responsive Design**
- **Mobile Optimized**: Touch-friendly interface
- **Tablet Support**: Optimized layouts for medium screens
- **Desktop Experience**: Full-featured desktop interface
- **Cross-Platform**: Works seamlessly across all devices

### 🚀 **Performance & UX**
- **Infinite Scroll**: Efficient product loading
- **Lazy Loading**: Optimized image loading
- **Smooth Navigation**: React Router with transitions
- **Toast Notifications**: User feedback and alerts

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 19**: Latest React with modern features
- **Vite**: Fast build tool and development server
- **TypeScript Support**: Full TypeScript compatibility

### **State Management**
- **Redux Toolkit**: Efficient state management
- **React Query**: Server state management and caching
- **React Hook Form**: Form handling and validation

### **Styling & UI**
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Framer Motion**: Animation library

### **Backend Integration**
- **Axios**: HTTP client for API calls
- **RESTful API**: Clean API integration
- **JWT Authentication**: Secure token-based auth

### **Development Tools**
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Hot Reload**: Fast development experience

## 📦 Installation

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### **Clone the Repository**
```bash
git clone https://github.com/yourusername/menthetic-storefront.git
cd menthetic-storefront
```

### **Install Dependencies**
```bash
npm install
# or
yarn install
```

### **Environment Setup**
1. Copy the environment example file:
```bash
cp .env.example .env
```

2. Update the `.env` file with your configuration:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Menthetic Storefront
VITE_APP_VERSION=1.0.0
```

### **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 🚀 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint for code quality |

## 🏗️ Project Structure

```
menthetic-storefront/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and static files
│   ├── components/        # Reusable UI components
│   │   ├── auth/         # Authentication components
│   │   ├── common/       # Shared components
│   │   ├── home/         # Homepage components
│   │   ├── layout/       # Layout components
│   │   ├── modal/        # Modal components
│   │   ├── Products/     # Product-related components
│   │   └── settings/     # User settings components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   ├── pages/            # Page components
│   ├── redux/            # Redux store and slices
│   └── utils/            # Helper functions
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

## 🔧 Configuration

### **Environment Variables**
Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=Menthetic Storefront
VITE_APP_VERSION=1.0.0

# Optional: Analytics and Monitoring
VITE_ANALYTICS_ID=your_analytics_id
```

### **API Configuration**
The application uses Axios for API calls. The base URL is configured in `src/lib/axios.js` and can be customized through environment variables.

## 🎯 Key Components

### **ProductCard**
- Displays product information with variants
- Wishlist functionality with authentication check
- Add to cart functionality
- Responsive design for all screen sizes

### **Authentication System**
- Protected routes for authenticated users
- Login/Register forms with validation
- JWT token management
- User profile management

### **Shopping Cart**
- Persistent cart storage
- Add/remove items
- Quantity management
- Checkout process

### **Wishlist**
- Save favorite products
- Authentication required
- Visual feedback and tooltips

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Route protection for sensitive pages
- **Input Validation**: Form validation with Zod schemas
- **Secure API Calls**: Authenticated API requests

## 📱 Responsive Design

The application is built with a mobile-first approach and includes:

- **Breakpoints**: Tailwind CSS responsive breakpoints
- **Touch-Friendly**: Optimized for mobile devices
- **Adaptive Layouts**: Different layouts for different screen sizes
- **Performance**: Optimized for mobile performance

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

## 📝 Code Style

- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **React Hooks**: Follow React hooks best practices
- **Component Structure**: Consistent component organization

## 🐛 Troubleshooting

### **Common Issues**

1. **Port Already in Use**
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   ```

2. **Dependencies Issues**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Environment Variables Not Loading**
   - Ensure `.env` file is in root directory
   - Restart development server
   - Check variable names start with `VITE_`



## 🙏 Acknowledgments

- **React Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Vite**: For the fast build tool
- **Community**: For all the amazing open-source packages



---

**Built with ❤️ using React, Vite, and Tailwind CSS**
