# Wires-and-Cable-Fabricators

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()  [![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)]()  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]() [![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)]()



## Description

The Wires-and-Cable-Fabricators project is a web application built with React, leveraging Firebase for backend services such as authentication, database, and storage. It provides a platform to showcase a product catalog, manage product details, collect user ratings, and facilitate customer inquiries. The application includes features such as user authentication, an admin dashboard for product management, a contact section with company information, and email sending functionality via Firebase Cloud Functions. The use of technologies such as React Bootstrap, MDB React UI Kit, and React Icons enhances the user interface and overall user experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [How to use](#how-to-use)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Important Links](#important-links)
- [Footer](#footer)

## Features

- 🔐 **User Authentication:** Secure user registration, login, and logout functionality using email/password and Google Sign-In.
- 📦 **Product Catalog:** Display of product categories and subcategories.
- 🖥️ **Admin Dashboard:** A protected dashboard for administrators to manage product categories and details.
- 📧 **Contact Section:** A contact form with company information and direct contact options.
- ⭐ **Rating System:** User ratings and reviews for the company.
- ✉️ **Email Functionality:** Automated email sending using Firebase Cloud Functions and Nodemailer.
- 🗄️ **Real-Time Database:** Firebase for real-time data updates.
- ☁️ **Image Storage:** Firebase Storage for storing and retrieving product images.

## Tech Stack

- **JavaScript:** Primary programming language.
- **React:** Front-end library for building user interfaces.
- **Firebase:** Backend-as-a-service (BaaS) for authentication, database, storage, and cloud functions.
- **React Bootstrap:** UI framework for responsive design.
- **MDB React UI Kit:** UI library for enhanced components.
- **React Router DOM:** For handling client-side routing.
- **Node.js:** Runtime environment for Firebase Cloud Functions.
- **Nodemailer:** Module for sending emails from Node.js.
- **Other Dependencies:** Includes libraries like jQuery, Owl Carousel, and React Icons.

## Installation

1.  **Clone the repository:**
   ```bash
   git clone https://github.com/Dip6212/Wires-and-Cable-Fabricators.git
   cd Wires-and-Cable-Fabricators
   ```

2.  **Install dependencies for the React application:**
   ```bash
   npm install
   ```

3.  **Install Firebase functions dependencies:**
   ```bash
   cd functions
   npm install
   cd ..
   ```

4.  **Configure Firebase:**
    - Set up a project on the [Firebase console](https://console.firebase.google.com/).
    - Initialize the Firebase SDK in your React application.  Replace the placeholder values in `firebaseConfig` inside `src/context/firebase.js` with your project's actual configuration values.

5.  **Set up environment variables:**
    - Create a `.env` file in the root directory of the React app.
    - Add your Firebase configuration details and any other sensitive information to the `.env` file.  Example:
      ```
      REACT_APP_API_KEY=your_api_key
      REACT_APP_AUTH_DOMAIN=your_auth_domain
      REACT_APP_DATABASE_URL=your_database_url
      REACT_APP_PROJECT_ID=your_project_id
      REACT_APP_STORAGE_BUCKET=your_storage_bucket
      REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
      REACT_APP_APP_ID=your_app_id
      REACT_APP_ADMIN_ID=your_admin_id
      ```
    - Ensure `.env` is added to your `.gitignore` file.

6.  **Configure Email Sending (Firebase Cloud Functions):**
    -  Set up Gmail account and enable “less secure app access” or use “App Passwords”.
    - Configure environment variables for email credentials in Firebase Functions. These can be set using the Firebase CLI:
    ```bash
    firebase functions:config:set email.user="your-gmail-email@gmail.com" email.pass="your-gmail-password"
    ```

7.  **Deploy Firebase functions:**
   ```bash
   firebase deploy --only functions
   ```

## Usage

1.  **Start the React application:**
   ```bash
   npm start
   ```
   This command runs the app in development mode, and you can view it in your browser at `http://localhost:3000`.

2.  **Access the Admin Dashboard:**
    - Log in with the admin user credentials. The admin ID is defined by the `REACT_APP_ADMIN_ID` environment variable.
    - Navigate to `/dashboard` to manage product categories and details.

3.  **Adding a new Category**
    - Navigate to `/dashboard` page, fill the category name, products name , description and required fields to match your product details.

4.  **Viewing Product Details:**
    -  Navigate to the product page using the provided links (`/product/:id`).  Here `:id` is the unique id from firestore.

5.  **Submitting Ratings and Reviews:**
    - In the contact section, users can submit ratings and reviews for the company.

6.  **Contacting the Company:**
    -  Use the provided WhatsApp or email links to contact the company directly.

## How to use

This project can be used to showcase wires and cable products, provide company information, and collect user feedback. 

**Real-world use cases:**

*   **Product Showcase:** Displaying a detailed product catalog with images, descriptions, and specifications.
*   **Customer Engagement:** Allowing users to rate and review products and services.
*   **Direct Communication:** Facilitating direct contact with potential customers via WhatsApp and email.
*   **Administered Product Management:** Allowing admins to manage and edit product details.

## Project Structure

```
 wires-and-cable-fabricators/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Button.jsx
│   │   ├── Container.jsx
│   │   ├── ...
│   ├── context/
│   │   ├── firebase.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── ...
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── ...
├── functions/
│   ├── index.js
│   └── ...
├── .env
├── package.json
├── README.md
└── ...
```

**Key Directories and Files:**

*   `public/`: Contains static assets such as `index.html`.
*   `src/`: Contains the React application source code.
*   `src/components/`: Reusable React components.
*   `src/context/firebase.js`: Firebase context provider for managing Firebase services.
*   `src/pages/`: React components for different pages of the application.
*   `functions/`: Firebase Cloud Functions source code.
*   `.env`: Environment variables for configuration.
*   `package.json`: Node.js package file containing dependencies and scripts.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Push your changes to your fork.
5.  Submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE). 

## Important links

- Author profile: [Dip6212](https://github.com/Dip6212)

## Footer

This README was generated for [Wires-and-Cable-Fabricators](https://github.com/Dip6212/Wires-and-Cable-Fabricators) by Dip6212. Feel free to fork, like, star, and raise issues! ✨
