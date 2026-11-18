# CAMPUS CAFÉ – Complete Technical Viva Defense & Project Explanation Guide
*College Continuous Assessment (CA) Mini Project*

---

## 📌 Executive Summary
- **Project Title:** CAMPUS CAFÉ – Cafeteria Menu & Order System
- **Domain:** Client-Side Web Development / Front-End Web Technologies
- **Tech Stack:** Pure HTML5, CSS3, and Vanilla JavaScript (ES6+)
- **Data Persistence:** Browser LocalStorage API (No backend, no database required)
- **Live Demo:** [https://shrikannan8999.github.io/campus-cafe/](https://shrikannan8999.github.io/campus-cafe/)
- **GitHub Repository:** [https://github.com/Shrikannan8999/campus-cafe](https://github.com/Shrikannan8999/campus-cafe)

---

## 1. High-Level Architecture (The 3-Tier Frontend Model)
1. **HTML5 (`index.html`):** Defines semantic structure, navigation bar, hero banner, category filters, live search input, menu grid container, cart summary panel, order confirmation modal, and past orders modal.
2. **CSS3 (`css/style.css`):** Pure custom stylesheet featuring CSS Variables (`:root`), warm cream/coffee brown/soft orange theme, CSS Grid cards layout, and responsive media queries.
3. **Vanilla JavaScript (`js/script.js`):** Manages application state (`cart`, `pastOrders`, `selectedCategory`), DOM manipulation, live search & filtering, quantity math (+/-), automatic bill calculation, and LocalStorage synchronization.

---

## 2. Complete Code Breakdown by Function

### Master Data: `menuItems`
Array of 13 food objects across Snacks, Meals, and Drinks:
- Snacks: Veg Sandwich (₹45), Cheese Burger (₹70), French Fries (₹50), Samosa (₹20), Veg Roll (₹40)
- Meals: Masala Dosa (₹60), Veg Fried Rice (₹90), Veg Noodles (₹85), Mini Meals (₹100)
- Drinks: Kulhad Tea (₹15), Hot Filter Coffee (₹25), Cold Coffee (₹55), Fresh Lime Soda (₹30)

### Key JavaScript Functions:
1. `displayMenu(items)`: Iterates through items array, creates card elements dynamically with template literals, and appends them to `#menuGrid`.
2. `applyFilters()`: Combines selected category tab and search input text using `Array.prototype.filter()`.
3. `addToCart(itemId)`: Uses `.find()` to check if item is in `cart`. If yes, increments quantity; if not, appends new object with `quantity: 1`.
4. `increaseQuantity(itemId)` & `decreaseQuantity(itemId)`: Increments or decrements count. Uses `.splice()` to remove item if count reaches 0.
5. `updateCartDisplay()`: Calculates `subtotal` (`price * quantity`), 5% GST (`subtotal * 0.05`), and `grandTotal`. Formats numbers with `.toFixed(2)`.
6. `placeOrder()`: Generates random Order ID (`CC-XXXXX`) and Token (`#T-XXX`), records order into `pastOrders`, saves to LocalStorage, and opens the receipt modal.
7. `saveCartToStorage()` & `loadCartFromStorage()`: Uses `JSON.stringify()` and `JSON.parse()` to persist cart across browser refreshes.
8. `renderPastOrders()`: Renders previous order receipts inside the past orders modal.

---

## 3. Core Viva Questions & Model Answers

### Q1: Why didn't you use a backend or external database?
> **Answer:** "This project was built to master core frontend web development (HTML5, CSS3, Vanilla JS). For client-side data persistence, we utilized the browser's built-in LocalStorage API, satisfying all project requirements without server overhead."

### Q2: How does LocalStorage work in this project?
> **Answer:** "LocalStorage stores key-value pairs as strings in the browser. Since our cart is a JavaScript array of objects, we use `JSON.stringify(cart)` to convert it into a string before saving, and `JSON.parse()` to convert it back into an array when the page loads."

### Q3: How is the bill calculated automatically?
> **Answer:** "In `updateCartDisplay()`, we loop through the cart array with `forEach()`, sum up `item.price * item.quantity` for the subtotal, calculate 5% tax as `subtotal * 0.05`, add them for the grand total, and format with `.toFixed(2)`."

### Q4: How does the live search work?
> **Answer:** "We attach an `input` event listener to `#searchInput`. On every keystroke, `applyFilters()` runs `menuItems.filter()` matching food names and descriptions in lowercase against the typed query."

### Q5: How does the Past Orders feature work?
> **Answer:** "Whenever an order is confirmed, an order record object containing the Order ID, Token, timestamp, items summary, and total amount is prepended to a `pastOrders` array and saved to LocalStorage. Clicking '📜 Orders' displays these saved receipts."
