# CAMPUS CAFÉ – Cafeteria Menu and Order System

A student-friendly college Continuous Assessment (CA) project developed using **pure HTML5, CSS3, and Vanilla JavaScript**.

---

## 1. Project Title
**CAMPUS CAFÉ – Cafeteria Menu and Order System**  
*College Continuous Assessment (CA) Mini Project*

---

## 2. Project Introduction
**Campus Café** is a lightweight, responsive, and student-focused web application designed to simulate a college cafeteria's menu browsing and order estimation process. It allows college students to easily view daily menu items, filter by categories, search for their favorite snacks and meals, add dishes to their digital food tray, adjust quantities, calculate their total bill automatically, and place a simulated food order.

The project runs completely on the client side inside any modern web browser without requiring any external server, framework, or database.

---

## 3. Project Objective
The primary objectives of this project are:
- To provide college students with a simple, transparent interface to view cafeteria food items, descriptions, and prices in Indian Rupees (₹).
- To eliminate manual calculation errors by providing automatic subtotal and total bill computation (including 5% cafeteria GST).
- To allow students to manage their order quantities seamlessly (+ / - / delete).
- To persist cart items across browser sessions using **HTML5 LocalStorage**.
- To simulate an order placement process by generating a unique **Order Reference Number** and **Pickup Token**.
- To build a clean, well-architected project using core frontend fundamentals that a beginner student can confidently explain during faculty evaluation and viva.

---

## 4. Problem Statement
In most colleges and universities, students experience long waiting times during short recess and lunch breaks. Canteen rush often results in:
1. Inability to check what items are currently available and their exact prices beforehand.
2. Confusion and delays at the billing counter while students manually calculate their total cost.
3. Overcrowding at the order desk.

**The Solution:**  
Campus Café addresses this problem by giving students an interactive digital menu where they can preview items, plan their budget, calculate their total bill in advance, and receive an instant simulated order token to streamline counter pickup.

---

## 5. Technologies Used
This project strictly avoids all third-party libraries and frameworks, relying 100% on native web standards:

- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<section>`, `<main>`, `<footer>`, `<aside>`, `<button>`) for clear document structure and accessibility.
- **CSS3**: Custom design utilizing CSS Variables (`:root`), Flexbox, CSS Grid, media queries for mobile responsiveness, and a warm cream, coffee brown, and soft orange palette.
- **Vanilla JavaScript (ES6)**: Pure client-side logic for dynamic DOM manipulation, array filtering, quantity controls, automatic math calculations, and browser `LocalStorage`.
- **Browser LocalStorage API**: For persisting cart data without a database.

---

## 6. Key Features
1. **Student-Friendly Aesthetic**: Warm cream background (`#FDFBF7`), coffee brown headings (`#3A2312`), white food cards (`#FFFFFF`), and soft orange accents (`#E65100`).
2. **Dynamic Menu Cards**: Food cards created dynamically from a JavaScript array of objects.
3. **Category Filtering**: Instant tab filtering for **All Items**, **Snacks**, **Meals**, and **Drinks**.
4. **Real-Time Food Search**: Live filtering that matches food names and descriptions as the student types.
5. **Interactive Food Tray (Cart)**:
   - Add items with a single click.
   - Increment (`+`) and decrement (`−`) item quantities.
   - Remove individual items with the (`×`) button.
   - "Clear Tray" button to reset the entire cart.
6. **Automatic Bill Calculation**:
   - Items Subtotal (`price × quantity`).
   - 5% Canteen Tax (GST).
   - Campus Student Fee (`FREE`).
   - Grand Total formatted with `.toFixed(2)`.
7. **LocalStorage Persistence**: Cart items stay intact even if the browser is refreshed or reopened.
8. **Simulated Order Placement**:
   - Generates a unique Order Reference (e.g., `CC-48219`).
   - Generates a Pickup Token (e.g., `#T-104`).
   - Clears the cart upon order confirmation and opens a friendly receipt modal.
9. **Fully Responsive Design**: Fluid layout that works seamlessly across desktop PCs, laptops, tablets, and mobile smartphones.
10. **Offline Ready & Zero Broken Images**: All graphics and illustrations are stored locally in `images/` as vector SVGs.

---

## 7. Folder Structure
```text
Campus-Cafe/
│
├── index.html          # Main HTML structure with semantic sections
│
├── css/
│   └── style.css       # Pure CSS styles, color variables & media queries
│
├── js/
│   └── script.js       # Pure Vanilla JS (Menu data, cart logic & LocalStorage)
│
├── images/             # Standalone local SVG & JPG illustrations
│   ├── burger.svg
│   ├── coffee.svg
│   ├── cold-coffee.svg
│   ├── dosa.svg
│   ├── drinks.svg
│   ├── fries.svg
│   ├── hero-cafe.svg
│   ├── lime.svg
│   ├── mini-meal.svg
│   ├── noodles.svg
│   ├── rice.svg
│   ├── roll.svg
│   ├── samosa.svg
│   ├── sandwich.svg
│   └── tea.svg
│
├── README.md           # Project documentation and Netlify hosting guide
└── VIVA_GUIDE.md       # Comprehensive Faculty Evaluation & Viva Q&A Guide
```

---

## 8. How to Run the Website Locally
No complex installation or build tools are required:

1. Locate the **`Campus-Cafe`** folder on your computer.
2. Double-click **`index.html`** or right-click and choose **"Open with Google Chrome"** (or Edge, Firefox, Brave, Safari).
3. The website will load and work immediately!

---

## 9. How to Deploy to Netlify (Free Live Link for Your Teacher)
To give your teacher a live URL (e.g., `https://campus-cafe-student.netlify.app`), follow these simple steps using **Netlify Drop** (no terminal commands or accounts needed):

1. Open your web browser and visit: **[https://app.netlify.com/drop](https://app.netlify.com/drop)**
2. Drag and drop the entire **`Campus-Cafe`** folder directly into the designated drop area on the webpage.
3. Netlify will deploy the site in 5 to 10 seconds and generate a live URL.
4. *(Optional)* Click **"Site configuration" > "Change site name"** to set a custom link like `https://my-campus-cafe.netlify.app`.
5. Copy the live link and email or submit it to your teacher!

> **Why this works seamlessly on Netlify:**
> - `index.html` is located directly in the root directory.
> - All links to `css/style.css`, `js/script.js`, and `images/...` use clean relative paths.
> - There are zero backend dependencies.

---

## 10. How JavaScript Works in This Project
1. **Data Source**: An array of 13 food objects (`menuItems`), each containing `id`, `name`, `category`, `price`, `description`, and `image`.
2. **Rendering (`displayMenu`)**: Iterates through the array using `forEach()`, generates HTML markup for each card, and appends it to `#menuGrid`.
3. **Filtering (`applyFilters`)**: Uses `Array.prototype.filter()` to test each item against the active category button and the text in the search input.
4. **Cart Array (`cart`)**: Keeps track of items added by the user. If an item already exists in the cart (tested via `cart.find()`), its `quantity` is incremented. Otherwise, a new object `{ id, name, price, quantity: 1 }` is pushed.
5. **Bill Calculation (`updateCartDisplay`)**: Multiplies `price × quantity` for each item to compute `subtotal`, calculates 5% GST, adds them together for `grandTotal`, and updates the DOM using `.textContent`.
6. **Persistence**:
   - `saveCartToStorage()` writes `JSON.stringify(cart)` to `localStorage.setItem('campusCafeCart', ...)`.
   - `loadCartFromStorage()` reads `localStorage.getItem('campusCafeCart')` and reconstructs the array using `JSON.parse()`.
7. **Order Placement (`placeOrder`)**: Verifies that the cart is not empty, computes reference tokens using `Math.random()`, shows the modal, and resets `cart = []`.

---

## 11. Limitations
- **Simulated Ordering**: Because this is a frontend-only continuous assessment project, order placement is simulated. Orders are not sent to an actual physical kitchen server.
- **Client-Side Storage**: LocalStorage is unique to the student's browser device; data is not synchronized across different devices.
- **Single Currency**: Prices are formatted in Indian Rupees (₹) as per college requirements.

---

## 12. Future Improvements
- Integrating a lightweight backend (such as Node.js/Express with MongoDB or SQLite) to store real kitchen orders.
- Adding a real-time order status tracking screen for students ("Preparing", "Ready for Pickup").
- Adding a simulated student cafeteria card balance / digital wallet.
- Offering table or counter selection options.
