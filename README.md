# Platefull - Food Donation Platform

A modern web application that connects food donors (restaurants, homes, caterers) with NGOs to reduce food waste and help those in need.

## Features

- 🔐 **Firebase Authentication** - Secure user authentication with email/password and Google sign-in
- 📱 **Responsive Design** - Modern UI built with Next.js and Tailwind CSS
- 🗄️ **Real-time Database** - Firestore for real-time data synchronization
- 📸 **Image Upload** - Firebase Storage for donation images
- 👥 **User Management** - Separate dashboards for donors and NGOs
- 📊 **Donation Tracking** - Track donation status and requests
- 🔔 **Real-time Updates** - Live updates for donation status changes

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Platefullwebapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up Firebase**

   a. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   
   b. Enable Authentication with Email/Password and Google providers
   
   c. Create a Firestore database in test mode
   
   d. Enable Storage
   
   e. Copy your Firebase configuration

4. **Configure environment variables**
   ```bash
   cp firebase-config.example.env .env.local
   ```
   
   Edit `.env.local` with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Firebase Setup Guide

### 1. Create Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com/)
- Click "Add project"
- Enter project name (e.g., "platefull-app")
- Follow the setup wizard

### 2. Enable Authentication
- In Firebase Console, go to Authentication > Sign-in method
- Enable Email/Password
- Enable Google (add your domain to authorized domains)

### 3. Create Firestore Database
- Go to Firestore Database
- Click "Create database"
- Start in test mode (for development)
- Choose a location close to your users

### 4. Enable Storage
- Go to Storage
- Click "Get started"
- Choose a location
- Start in test mode

### 5. Get Configuration
- Go to Project Settings (gear icon)
- Scroll to "Your apps"
- Click the web app icon (</>)
- Register app with a nickname
- Copy the configuration object

### 6. Security Rules (Optional)
For production, update Firestore and Storage security rules:

**Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read donations, authenticated users can create
    match /foodDonations/{donationId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.donorId == request.auth.uid;
    }
    
    // NGOs can read/write their own data
    match /ngos/{ngoId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == ngoId;
    }
  }
}
```

**Storage Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Project Structure

```
Platefullwebapp/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── donor-dashboard/   # Donor dashboard
│   ├── ngo-dashboard/     # NGO dashboard
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── auth-provider.tsx # Authentication context
├── lib/                  # Utility libraries
│   ├── firebase.ts       # Firebase configuration
│   ├── firebase-auth.ts  # Authentication utilities
│   ├── firebase-firestore.ts # Database operations
│   └── firebase-storage.ts   # Storage operations
├── hooks/                # Custom React hooks
└── public/              # Static assets
```

## Key Features Implementation

### Authentication
- Email/password sign up and sign in
- Google OAuth integration
- User role management (donor/ngo)
- Protected routes

### Database Operations
- Real-time donation tracking
- User profile management
- NGO registration and verification
- Donation request system

### File Storage
- Image upload for donations
- Profile picture upload
- Image compression and validation
- Secure file access

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
- Netlify
- Firebase Hosting
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@platefull.com or create an issue in the repository.

## Roadmap

- [ ] Push notifications
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Payment integration
- [ ] Multi-language support
- [ ] Advanced search and filtering 