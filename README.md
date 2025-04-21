# Average at Best – MERN Stack Clothing Shop (Fall 2024)

**Average at Best** is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). Designed as a **proof of concept** for a friend’s clothing brand, this project simulates a functional online store. Users can browse items, add them to a cart, and check out securely via the Stripe Developer API.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
---

## Overview

"Average at Best" is a minimal, stylish e-commerce prototype built in Fall 2024. It demonstrates a modern clothing store experience with essential e-commerce functionality and is deployed on a **DigitalOcean Droplet**. Stripe handles payments in test mode, making it easy to simulate checkout without real transactions.

---

## Tech Stack

**Frontend:**
- React
- Vite

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB (via Mongoose)

**Payments:**
- Stripe Developer API (test mode)

**Deployment:**
- DigitalOcean Droplet (Ubuntu)
- MongoDB Atlas
- GitHub for version control

---

## Features

- Product listing and detail view
- Shopping cart (add/remove items)
- Stripe checkout integration (test mode)
- Responsive, mobile-friendly design
- Modular and scalable codebase

---

## Screenshots

> Add your screenshots to the `screenshots/` folder in the root and update the links here.

**Homepage**  
![Homepage](./screenshots/homepage.png)

**Cart Page**  
![Cart](./screenshots/cart.png)

**Checkout Page**  
![Checkout](./screenshots/checkout.png)

---

## Installation

```bash
# Clone the repository
git clone https://github.com/noahf909/GITMERN.git
cd GITMERN

# Install backend dependencies
npm install

# Start the backend server
node server.js

# In a new terminal, navigate to the frontend
cd AAB

# Install frontend dependencies
npm install

# Start the frontend
npm run dev

# make the following env in GITMERN

# make the following env in AAB

## Folder Structure 

