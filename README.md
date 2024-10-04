
# IvyEstate - Real Estate Marketplace

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://ivyestate-zo0s.onrender.com/)

## Introduction

**IvyEstate** is a fully functional real estate marketplace built using the **MERN stack** (MongoDB, Express.js, React, and Node.js), with advanced features like **JWT authentication**, **Google OAuth**, **Redux Toolkit**, and **image upload capabilities**. This project is designed to provide a seamless experience for users to browse, create, and manage property listings, with advanced search functionality to enhance usability.

## Project Preview

🚀 [Live Project](https://ivyestate-zo0s.onrender.com/)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

- 🔑 **JWT Authentication**: Secure authentication using JSON Web Tokens.
- 🌐 **Google OAuth**: Allow users to sign in with Google for a seamless experience.
- 🏡 **Property Listings**: Create, update, delete, and view property listings.
- 🖼️ **Image Upload**: Upload property images and view image sliders for a better user experience.
- 🔍 **Advanced Search**: Powerful search functionality to filter listings based on user inputs.
- 🚀 **User Profiles**: Private user profile pages for managing personal data and listings.
- 💾 **Redux Toolkit & Persist**: State management using Redux with persistence.
- 📧 **Contact Landlords**: Reach out to landlords directly from the listing page.

## Technologies Used

- **MongoDB**: NoSQL database for data storage.
- **Express.js**: Backend framework for building APIs.
- **React**: Frontend library for building dynamic user interfaces.
- **Node.js**: JavaScript runtime for building the server-side.
- **Tailwind CSS**: Utility-first CSS framework for fast and responsive UI development.
- **Redux Toolkit**: State management for efficient global state handling.
- **JWT**: Secure authentication and authorization system.
- **Google OAuth**: For easy user authentication via Google accounts.
- **Render**: Platform for deploying the full-stack application.

## Installation

### Prerequisites

- **Node.js** (v14 or above)
- **MongoDB** (local or cloud instance)
- **Render** account (optional for deployment)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/bharath0616/IvyEstate.git

2. Navigate to the project directory:
   ```bash
   cd IvyEstate

3. Install backend dependencies:
   ```bash
   cd api
   npm install

4. Install frontend dependencies:
   ```bash
   cd ../client
   npm install

5. Create a .env file in the backend directory and add the following:

   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

6. Start the frontend server:
   ```bash
   npm run dev

7. Start the backend server:
   ```bash
   cd ../api
   npm run dev

## Usage

1. **Create an Account:**
   - Users can sign up using their email and password or sign in with Google via OAuth.

2. **Manage Listings:**
   - Once logged in, users can create new property listings by filling out the listing form and uploading images.
   - Users can view their existing listings, edit the details, or delete them.

3. **Search Properties:**
   - The homepage provides a search bar where users can search for properties based on location or keywords.
   - Advanced search filters allow users to narrow down properties by various criteria like price, property type, and more.

4. **View Property Details:**
   - On the listings page, users can click on any property to view detailed information, including images, price, and landlord contact details.

5. **Contact Landlords:**
   - Users can contact landlords directly through the property details page for inquiries.

6. **User Profile:**
   - Logged-in users can visit their profile page to update personal information and manage their property listings.
   - The profile page also allows users to view their saved listings or contact messages.

7. **Authentication:**
   - Secure authentication is provided via JSON Web Tokens (JWT) for maintaining user sessions.
   - Users can log out securely from the application anytime.

8. **Mobile Responsive:**
   - The site is fully responsive, providing an optimal user experience on both desktop and mobile devices.

9. **Redux Toolkit:**
   - Redux Toolkit is used to manage the global state of the application, ensuring a smooth and efficient user experience when managing listings, user data, and authentication.
