# ECOM370 - E-Commerce Web App

Welcome to ECOM370, an E-Commerce web application developed as a part of the Software Design and Development course at SSU.

## Technologies Used

- **[ReactJS](https://reactjs.org)**: A powerful JavaScript library for building user interfaces, providing a robust foundation for our web app.
- **[Material-UI](https://mui.com)**: A popular React UI framework that enables us to create sleek and responsive user interfaces effortlessly.
- **[Commerce.js](https://commercejs.com)**: A feature-rich e-commerce API that facilitates seamless integration of shopping cart functionality, order management, and more.
- **[Stripe](https://stripe.com)**: A secure and efficient payment gateway, ensuring smooth and secure transactions for your customers.
- **[Firebase](https://firebase.google.com)**: Utilized for authentication purposes, Firebase adds a layer of security and simplifies the user authentication process.
- **[notistack](https://github.com/iamhosseindhv/notistack)**: A handy library for implementing toasts/snackbars, enhancing the user experience by providing real-time feedback.

## Project Setup

This project was kickstarted with [Create React App](https://github.com/facebook/create-react-app), a convenient tool that simplifies the process of setting up a React application.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ecom370.git
   cd ecom370
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up your environment variables:**
   - Add the following entries to your `.env` file:

      ```env
      REACT_APP_CHEC_PUBLIC_KEY=your_chec_public_key
      REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
      REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
      REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
      REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
      REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
      REACT_APP_FIREBASE_MSG_SENDER_ID=your_firebase_messaging_sender_id
      REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
      ```

      Replace the placeholders with your actual keys from Commerce.js, Stripe, and Firebase.

4. **Start the development server:**

   ```bash
   npm start
   ```

5. **Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the app.**

## Features

- **User-friendly Interface**: Crafted using Material-UI, providing an intuitive and visually appealing experience for users.
- **Secure Transactions**: Integration with Stripe ensures that all payment transactions are secure and seamless.
- **Authentication**: Firebase is employed for robust user authentication, enhancing the security of the web app.
- **Real-time Feedback**: The notistack library is used to implement toasts/snackbars, keeping users informed with real-time updates.
