# Azouya - Luxury Jewelry Store

A modern, responsive jewelry e-commerce website built with React, TypeScript, and Firebase.

## Features

### 🏪 Customer Experience
- **Landing Page**: Hero slider, featured products, testimonials, and newsletter signup
- **Product Catalog**: Browse, filter, search, and sort jewelry collections
- **Product Details**: Image carousel, options selection, and related products
- **Shopping Cart**: Persistent cart with guest and user sessions
- **Checkout**: Guest or authenticated checkout with offline payment processing
- **User Authentication**: Email/password and Google sign-in

### 🛠 Admin Dashboard
- **Order Management**: View, filter, update status, and export orders
- **Customer Management**: View customer information and order history
- **Product Management**: Full CRUD operations for products and categories
- **Image Management**: Upload and manage product images via Firebase Storage

### 🔧 Technical Features
- **Firebase Integration**: Auth, Firestore, Storage, and Cloud Functions
- **Email Notifications**: Order confirmations sent to Zoho Mail via SMTP
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: Zustand for cart and authentication state
- **Form Validation**: React Hook Form with Zod schemas
- **SEO Optimized**: Meta tags, structured data, and sitemap

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Routing**: React Router v6
- **State**: Zustand with persistence
- **Forms**: React Hook Form + Zod validation
- **Backend**: Firebase (Auth, Firestore, Storage, Functions)
- **Email**: Zoho SMTP via Cloud Functions
- **UI Components**: Lucide React icons, React Hot Toast
- **Carousel**: Swiper.js

## Project Structure

```
src/
├── components/
│   ├── admin/          # Admin dashboard components
│   ├── auth/           # Authentication components
│   ├── layout/         # Header, Footer, Layout
│   └── ui/             # Reusable UI components
├── lib/
│   ├── firebase.ts     # Firebase configuration
│   └── utils.ts        # Utility functions
├── pages/              # Page components
│   └── admin/          # Admin pages
├── store/              # Zustand stores
├── types/              # TypeScript type definitions
└── main.tsx           # App entry point
```

## Getting Started

### Prerequisites
- Node.js 18+
- Firebase project with web app configured
- Zoho Mail account for order notifications

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd azouya
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   VITE_ADMIN_EMAIL=admin@yourdomain.com
   ```

4. **Set up Firebase**
   - Enable Authentication (Email/Password and Google)
   - Create Firestore database
   - Set up Storage bucket
   - Configure security rules (see `firebase/` directory)

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## Firebase Setup

### Firestore Collections
- `products` - Product catalog
- `categories` - Product categories
- `users` - User profiles and roles
- `orders` - Customer orders
- `carts` - User shopping carts
- `leads` - Newsletter subscriptions

### Security Rules
The project includes Firestore security rules that:
- Allow public read access to products and categories
- Restrict user data to authenticated users
- Require admin role for product/order management

### Cloud Functions
Set up Cloud Functions for:
- Order email notifications to Zoho Mail
- User role management
- Order status updates

## Admin Access

To create an admin user:
1. Sign up normally through the app
2. Update the user document in Firestore:
   ```javascript
   // In Firestore console
   users/{uid} -> role: "admin"
   ```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

## Development Roadmap

### Sprint 1 ✅
- [x] Project scaffold and Firebase setup
- [x] Routing and layout structure
- [x] Base UI components
- [x] Authentication store

### Sprint 2 (Next)
- [ ] Landing page with hero slider
- [ ] Featured products section
- [ ] Newsletter signup functionality

### Future Sprints
- [ ] Product catalog and filtering
- [ ] Shopping cart functionality
- [ ] Checkout process
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] SEO and analytics

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email hello@azouya.com or create an issue in the repository.
