# Average at Best – MERN Stack Clothing Shop (Fall 2024)

**Average at Best** is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, and Node.js), designed as a **proof of concept** for a friend’s clothing brand. The site simulates a functional online store where users can browse products, add them to a cart, and check out using the Stripe Developer API.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Overview

"Average at Best" is a minimalistic yet functional e-commerce prototype that captures the spirit of a modern clothing brand. Built in Fall 2024, the site demonstrates core functionality expected in a production-grade store, including secure checkout via Stripe.

Deployed on **DigitalOcean**, the app is hosted with a live backend and responsive frontend.

---

## Tech Stack

**Frontend:**
- React

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB (with Mongoose)

**Payments:**
- Stripe Developer API (test mode)

**Deployment:**
- **DigitalOcean Droplet**
- MongoDB Atlas
- GitHub

---

## Features

- Browse and view detailed product listings
- Add/remove items from cart
- View dynamic cart with real-time price updates
- Checkout securely via Stripe (test mode)
- Responsive and mobile-friendly UI
- Basic error handling and validation

---

## Screenshots

> Add your screenshots to the `screenshots/` folder and update the links below.

**Homepage**  
![Homepage](./screenshots/homepage.png)

**Cart Page**  
![Cart](./screenshots/cart.png)

**Checkout Page (Stripe Integration)**  
![Checkout](./screenshots/checkout.png)

---

## Installation

```bash
# Clone the repository
git clone https://github.com/noahf909/GITMERN.git
cd average-at-best

# Install backend dependencies
npm install

# Move into the frontend directory
cd AAB

# Install frontend dependencies
npm install

# run the backend 
cd . 
node server.js 

# Run the frontend 
cd AAB
npm run dev