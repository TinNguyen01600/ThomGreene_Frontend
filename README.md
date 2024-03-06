# Thom Greene E-Commerce website

## General Description

> The application, using React TS and Redux Toolkit, creates a a fully functional e-commerce store named Thom Greene, a similar version inspired by [Thom Browne](https://www.thombrowne.com/) brand.

Deploy link: [Thom Greene](https://tin-nguyen-thomgreene.netlify.app/)

## Table of content

[Technologies](#technologies)

[Project Structure](#project-structure)

[Instruction](#instruction)

[Features](#features)

[User Interface](#ui)

## Technology

-   TypeScript
-   HTML / CSS / SCSS
-   React CRA
-   Routing (react-router-dom)
-   Redux & Redux-Toolkit
-   Material UI
-   Testing with Jest
<pre>
Package used
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.15.10",
    "@mui/material": "^5.15.10",
    "@reduxjs/toolkit": "^2.2.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.80",
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "axios": "^1.6.7",
    "framer-motion": "^11.0.5",
    "lodash": "^4.17.21",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.50.1",
    "react-redux": "^9.1.0",
    "react-router-dom": "^6.22.0",
    "react-scripts": "5.0.1",
    "sass": "^1.70.0",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4",
    "msw": "^2.2.1"
</pre>

## Project Structure

## Instruction

1. Open your terminal and clone the repository with the following command:

```
git clone git@github.com:TinNguyen01600/E-commerce.git
```

2. Install all the packages and dependencies:

```
npm install
```

3. Start the application in your local machine:

```
npm start
```

\*\* Or simply access the deployed version on Netlify (https://tin-nguyen-thomgreene.netlify.app/).

## Features

<ol>
<li>Use the API endpoint https://fakeapi.platzi.com/.</li>

<li>Create at lease 4 pages (can be more if you want): Page for all products, product page, profile page (only available if user logins), and cart page (cart page could be a page or a modal)</li>

<li>Create Redux store for following features:</li>

product reducer: get all products, find a single products, filter products by categories, sort products by price. Create, update and delete a product (enable update & delete features only for admin of the webapp)
user reducer: register and login
cart reducer: add product to cart, remove products, update products's quantity in cart

<li>When adding routers to your application, set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.</li>

<li>Resposive styling.</li>

<li>Implement unit testing for the reducers</li>

<li>Deploy the application and rewrite README file.</li>

</ol>

#### Additional

<ul>
    <li>Filter products by price range</li>
    <li>Pagination when fetching/displaying all the products</li>
    <li>Customized Material UI</li>
</ul>
