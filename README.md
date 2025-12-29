# Semester Project 2 – Auction Website

##  Project Description

This project is a part of the final delivery for the third semester at Noroff Front-End Development. The goal is to build a fully functional **auction website** using all the skills we've learned throughout the studies.

The website allows users to create auctions, bid on others' listings, and manage their own profile. The application is built with a **modular file structure**, uses **SASS** for styling, and **Bootstrap 5** for responsive layout. Functionality such as **login**, **register**, **listing management**, **search**, and **user bidding history** are all included.

---

##  Goal

> To create a modern auction website where users can register, log in, list items for auction, and place bids on other users’ items.

---

##  Features

-  Carousel on the front page with user's listings
-  "Show more" button to load more listings
-  Login, logout, and register modals (Bootstrap)
-  Credit score visible in the navbar
-  The user can search for listings on the front page.
-  Users can bid directly from auction cards
-  Clicking a card navigates to a detailed view:
  - Edit listing (modal)
  - Delete listing
  - Place a bid
  - See bid history with user, amount, and time
-  Profile page:
  - Create new listing (modal)
  - Update avatar and bio
  - View all auctions the user has bid on
-  About page with information about the site
-  Contact page with a validated contact form
-  All create/edit/delete actions use modals
-  Uses `.env` for configuration
-  Unit testing with **Vitest**
-  E2E testing with **Playwright**

---

##  Tech Stack

- HTML5
- JavaScript (ES6 Modules)
- [Bootstrap 5.3](https://getbootstrap.com/)
- [SASS](https://sass-lang.com/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/#/)
- [Netlify](https://www.netlify.com/) for hosting

---

##  User Stories

- A user with a `stud.noroff.no` email may register
- A registered user may login and logout
- A registered user may update their avatar and bio
- A registered user may view their credit balance
- A registered user may create, edit, or delete a listing
- A registered user may add a bid to other users’ listings
- A registered user may view bids made on a listing
- An unregistered user may search through listings

---

##  Testing

### Unit Tests

- Run all unit tests:
```bash
npm run test:unit

## E2E Tests
npm run test:e2e

### Project setup

## Clone repo:
git clone https://github.com/Veronicabrun/semester-project-2.git
cd semester-project-2

## Install dependencies:
npm install

## Run development server:
npm run dev

## Compile SCSS manually:
npm run build

## Watch SCSS:
npm run watch

## Run app locally (Live Server):
npm run start

##  Test User Login

To test functionality that requires authentication, use the following demo user:

- **Email:** demo12345@stud.noroff.no  
- **Password:** demo12345

> This user is created for testing purposes only.





