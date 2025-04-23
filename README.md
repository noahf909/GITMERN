# Average at Best – MERN Stack Clothing Shop (Fall 2024)

**Average at Best** is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). Designed as a **proof of concept** for a friend’s clothing brand, this project simulates a functional online store. Users can browse items, add them to a cart, and check out securely via the Stripe Developer API.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Presentation](#Presentation)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [flutter extension](#flutter-extension)
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

## Presentation
[📄 View the full PDF](docs/Presentation.pdf)

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

# make an env in GITMERN and add the following
MONGO_URI="mongodb+srv://noahFuhrman:kmfj7St9gL9sFQJ7@cluster0.xga6g.mongodb.net/"
EMAIL=""
EMAIL_PASSWORD=""
JWT_SECRET=''
STRIPE_SECRET_KEY=''

# make the following env in AAB
VITE_STRIPE_PUBLISHABLE_KEY=""

## Folder Structure 
C:.
|   .env
|   .gitignore
|   folder_structure.txt
|   jest.config.js
|   package-lock.json
|   package.json
|   README.md
|   server.js
|   
+---.github
|   \---workflows
|           ci.yml
|           
+---AAB
|   |   .env
|   |   .gitignore
|   |   eslint.config.js
|   |   index.html
|   |   package-lock.json
|   |   package.json
|   |   README.md
|   |   tsconfig.app.json
|   |   tsconfig.app.tsbuildinfo
|   |   tsconfig.json
|   |   tsconfig.node.json
|   |   tsconfig.node.tsbuildinfo
|   |   vite.config.ts

# flutter extension
https://github.com/noahf909/FlutterAAB
