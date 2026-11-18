/* ==========================================================================
   CAMPUS CAFÉ – Cafeteria Menu and Order System
   Pure Vanilla JavaScript (script.js)
   
   Features:
   - Dynamic food cards rendering from an array of objects
   - Category filtering (All, Snacks, Meals, Drinks)
   - Real-time search by food name or description
   - Cart management: Add, Increase (+), Decrease (-), Remove (X), Clear All
   - Automatic bill calculation: Subtotal, 5% GST, Grand Total
   - LocalStorage synchronization to remember cart items on refresh
   - Order payment portal and instant token receipt generation
   ========================================================================== */

// =============================================================================
// 1. FOOD MENU DATABASE (Array of Objects)
// =============================================================================
const menuItems = [
  // --- SNACKS CATEGORY ---
  {
    id: 1,
    name: "Veg Sandwich",
    category: "snacks",
    price: 45,
    description: "Toasted bread layered with fresh cucumber, ripe tomato, boiled potato, and mint chutney.",
    image: "images/sandwich.svg"
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "snacks",
    price: 70,
    description: "Crispy vegetable patty topped with melted cheese, lettuce, and creamy cafeteria sauce.",
    image: "images/burger.svg"
  },
  {
    id: 3,
    name: "French Fries",
    category: "snacks",
    price: 50,
    description: "Golden crispy fried potatoes lightly salted and sprinkled with peri-peri herbs.",
    image: "images/fries.svg"
  },
  {
    id: 4,
    name: "Samosa",
    category: "snacks",
    price: 20,
    description: "Crispy golden triangle pastry stuffed with aromatic spiced potatoes and green peas.",
    image: "images/samosa.svg"
  },
  {
    id: 5,
    name: "Veg Roll",
    category: "snacks",
    price: 40,
    description: "Soft flatbread wrap filled with stir-fried cabbage, carrots, bell peppers, and chili sauce.",
    image: "images/roll.svg"
  },

  // --- MEALS CATEGORY ---
  {
    id: 6,
    name: "Masala Dosa",
    category: "meals",
    price: 60,
    description: "Crispy golden fermented crepe stuffed with spiced potato masala, served with sambar.",
    image: "images/dosa.svg"
  },
  {
    id: 7,
    name: "Veg Fried Rice",
    category: "meals",
    price: 90,
    description: "Wok-tossed basmati rice with crunchy carrots, green peas, sweet corn, and soy seasoning.",
    image: "images/rice.svg"
  },
  {
    id: 8,
    name: "Veg Noodles",
    category: "meals",
    price: 85,
    description: "Classic Chinese-style Hakka noodles tossed with spring onions, capsicum, and garlic.",
    image: "images/noodles.svg"
  },
  {
    id: 9,
    name: "Mini Meals",
    category: "meals",
    price: 100,
    description: "Student wholesome platter: 2 warm rotis, paneer curry, dal tadka, steamed rice, and salad.",
    image: "images/mini-meal.svg"
  },

  // --- DRINKS CATEGORY ---
  {
    id: 10,
    name: "Tea",
    category: "drinks",
    price: 15,
    description: "Freshly brewed hot milk tea infused with crushed ginger and aromatic green cardamom.",
    image: "images/tea.svg"
  },
  {
    id: 11,
    name: "Coffee",
    category: "drinks",
    price: 25,
    description: "Hot, frothy traditional filter coffee brewed with dark roasted coffee beans.",
    image: "images/coffee.svg"
  },
  {
    id: 12,
    name: "Cold Coffee",
    category: "drinks",
    price: 55,
    description: "Chilled blended coffee served with chocolate drizzle and creamy milk froth.",
    image: "images/cold-coffee.svg"
  },
  {
    id: 13,
    name: "Fresh Lime",
    category: "drinks",
    price: 30,
    description: "Cooling sweet and salty sparkling cooler made with freshly squeezed lemon juice and mint.",
    image: "images/lime.svg"
  }
];

// =============================================================================
// 2. APPLICATION STATE
// =============================================================================
// The cart array stores objects of items added: { id, name, price, quantity }
let cart = [];

// Tracks the currently selected category tab
let selectedCategory = "all";
let pastOrders = [];

// Active Student Profile (Defaults to Shrikannan)
let currentStudent = {
  name: "Shrikannan",
  studentId: "SK-8999",
  cardBalance: 500.00
};

// Selected Payment Method ('upi' | 'card' | 'cash')
let selectedPaymentMethod = "upi";

// =============================================================================
// 3. DOM ELEMENT REFERENCES
// =============================================================================
const menuGrid = document.getElementById("menuGrid");
const categoryTabs = document.getElementById("categoryTabs");
const searchInput = document.getElementById("searchInput");
const currentCategoryTitle = document.getElementById("currentCategoryTitle");
const itemsCountText = document.getElementById("itemsCountText");
const noItemsMessage = document.getElementById("noItemsMessage");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");

// Cart Elements
const cartItemsList = document.getElementById("cartItemsList");
const cartCountBadge = document.getElementById("cartCountBadge");
const summarySubtotal = document.getElementById("summarySubtotal");
const summaryTax = document.getElementById("summaryTax");
const summaryGrandTotal = document.getElementById("summaryGrandTotal");
const placeOrderBtn = document.getElementById("placeOrderBtn");
const clearCartBtn = document.getElementById("clearCartBtn");

// Modal Elements
const orderModal = document.getElementById("orderModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const receiptOrderId = document.getElementById("receiptOrderId");
const receiptTokenNumber = document.getElementById("receiptTokenNumber");
const receiptItemCount = document.getElementById("receiptItemCount");
const receiptTotalAmount = document.getElementById("receiptTotalAmount");

// Past Orders Modal Elements
const pastOrdersModal = document.getElementById("pastOrdersModal");
const openPastOrdersBtn = document.getElementById("openPastOrdersBtn");
const closePastOrdersBtn = document.getElementById("closePastOrdersBtn");
const pastOrdersList = document.getElementById("pastOrdersList");
const clearOrderHistoryBtn = document.getElementById("clearOrderHistoryBtn");

// Student Profile Elements
const openStudentBtn = document.getElementById("openStudentBtn");
const closeStudentBtn = document.getElementById("closeStudentBtn");
const studentModal = document.getElementById("studentModal");
const studentProfileForm = document.getElementById("studentProfileForm");
const studentNameInput = document.getElementById("studentNameInput");
const studentIdInput = document.getElementById("studentIdInput");
const studentCardBalanceInput = document.getElementById("studentCardBalanceInput");
const navStudentLabel = document.getElementById("navStudentLabel");
const smartCardStudentName = document.getElementById("smartCardStudentName");
const smartCardStudentId = document.getElementById("smartCardStudentId");
const smartCardDisplayBalance = document.getElementById("smartCardDisplayBalance");
const smartCardBalanceTag = document.getElementById("smartCardBalanceTag");

// Payment Portal Elements
const paymentModal = document.getElementById("paymentModal");
const paymentPayableAmount = document.getElementById("paymentPayableAmount");
const cancelPaymentBtn = document.getElementById("cancelPaymentBtn");
const confirmPaymentBtn = document.getElementById("confirmPaymentBtn");
const upiPaymentView = document.getElementById("upiPaymentView");
const cardPaymentView = document.getElementById("cardPaymentView");
const cashPaymentView = document.getElementById("cashPaymentView");
const receiptStudentInfo = document.getElementById("receiptStudentInfo");
const receiptPaymentMethod = document.getElementById("receiptPaymentMethod");

// =============================================================================
// 4. LOCALSTORAGE MANAGEMENT
// Saves and retrieves cart data from the browser's storage.
// =============================================================================

/**
 * Converts the cart array into a JSON string and saves it to LocalStorage.
 */

// -----------------------------------------------------------------------------
// STUDENT PROFILE MANAGEMENT (LocalStorage)
// -----------------------------------------------------------------------------
function saveStudentProfile() {
  localStorage.setItem("campusCafeStudent", JSON.stringify(currentStudent));
}

function loadStudentProfile() {
  const savedStudent = localStorage.getItem("campusCafeStudent");
  if (savedStudent) {
    try {
      currentStudent = JSON.parse(savedStudent);
    } catch (e) {
      console.error("Could not parse saved student profile:", e);
    }
  }
  updateStudentDisplay();
}

function updateStudentDisplay() {
  if (navStudentLabel) {
    navStudentLabel.textContent = `${currentStudent.name} (${currentStudent.studentId})`;
  }
  if (studentNameInput) studentNameInput.value = currentStudent.name;
  if (studentIdInput) studentIdInput.value = currentStudent.studentId;
  if (studentCardBalanceInput) studentCardBalanceInput.value = currentStudent.cardBalance;

  if (smartCardStudentName) smartCardStudentName.textContent = currentStudent.name;
  if (smartCardStudentId) smartCardStudentId.textContent = `Roll No: ${currentStudent.studentId}`;
  if (smartCardDisplayBalance) smartCardDisplayBalance.textContent = `₹${Number(currentStudent.cardBalance).toFixed(2)}`;
  if (smartCardBalanceTag) smartCardBalanceTag.textContent = `Balance: ₹${Number(currentStudent.cardBalance).toFixed(2)}`;
}

function saveCartToStorage() {
  localStorage.setItem("campusCafeCart", JSON.stringify(cart));
}

/**
 * Loads saved cart data from LocalStorage when the website opens.
 */
function saveOrderHistory() {
  localStorage.setItem("campusCafeOrderHistory", JSON.stringify(pastOrders));
}

function loadOrderHistory() {
  const savedHistory = localStorage.getItem("campusCafeOrderHistory");
  if (savedHistory) {
    try {
      pastOrders = JSON.parse(savedHistory);
    } catch (error) {
      console.error("Could not parse saved past orders:", error);
      pastOrders = [];
    }
  }
}

function renderPastOrders() {
  pastOrdersList.innerHTML = "";

  if (pastOrders.length === 0) {
    pastOrdersList.innerHTML = `
      <div class="empty-history">
        <div style="font-size: 2.8rem; margin-bottom: 8px;">🍽️</div>
        <h4>No past orders yet</h4>
        <p style="font-size: 0.85rem; color: var(--coffee-light);">Your completed food orders will be saved here.</p>
      </div>
    `;
    return;
  }

  pastOrders.forEach(function (order) {
    const card = document.createElement("div");
    card.className = "past-order-card";
    card.innerHTML = `
      <div class="past-order-top">
        <div>
          <span class="past-order-id">${order.orderId}</span>
          <div class="past-order-date">${order.date} at ${order.time}</div>
        </div>
        <span class="past-order-token">${order.token}</span>
      </div>
      <div class="past-order-items">
        <strong>Items:</strong> ${order.itemsSummary}
      </div>
      <div class="past-order-total">
        <span>Total Paid:</span>
        <strong>₹${order.grandTotal}</strong>
      </div>
    `;
    pastOrdersList.appendChild(card);
  });
}

function loadCartFromStorage() {
  const savedData = localStorage.getItem("campusCafeCart");
  if (savedData) {
    try {
      cart = JSON.parse(savedData);
    } catch (error) {
      console.error("Could not parse saved cart data:", error);
      cart = [];
    }
  }
}

// =============================================================================
// 5. MENU RENDERING & DISPLAY
// Dynamically creates and injects food cards into the DOM.
// =============================================================================

/**
 * Renders an array of food items onto the web page.
 * @param {Array} items - List of food objects to display
 */
function displayMenu(items) {
  // Clear the existing menu items in HTML
  menuGrid.innerHTML = "";

  // If no items match, display the helpful empty message
  if (items.length === 0) {
    noItemsMessage.removeAttribute("hidden");
    noItemsMessage.style.setProperty("display", "block", "important");
    noItemsMessage.classList.add("active");
    itemsCountText.textContent = "0 items found";
    return;
  }

  // Ensure empty message is completely hidden
  noItemsMessage.setAttribute("hidden", "");
  noItemsMessage.style.setProperty("display", "none", "important");
  noItemsMessage.classList.remove("active");
  itemsCountText.textContent = `Showing ${items.length} item${items.length > 1 ? "s" : ""}`;

  // Loop through each item using forEach()
  items.forEach(function (item) {
    // Create the outer card element
    const card = document.createElement("div");
    card.className = "food-card";

    // Set card HTML content
    card.innerHTML = `
      <div class="food-card-img-wrap">
        <img 
          src="${item.image}" 
          alt="${item.name}" 
          class="food-card-img" 
          loading="lazy"
        />
        <span class="food-category-tag">${item.category}</span>
      </div>
      <div class="food-card-body">
        <h4 class="food-card-title">${item.name}</h4>
        <p class="food-card-desc">${item.description}</p>
        <div class="food-card-footer">
          <span class="food-price">₹${item.price}</span>
          <button class="btn-add-cart" onclick="addToCart(${item.id})">
            + Add to Tray
          </button>
        </div>
      </div>
    `;

    // Append card into the grid
    menuGrid.appendChild(card);
  });
}

// =============================================================================
// 6. CATEGORY FILTERING & SEARCH
// Combines active category button and search text input.
// =============================================================================

/**
 * Filters the master menuItems array according to the active category and search text.
 */
function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = menuItems.filter(function (item) {
    // Category match check
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;

    // Search query match check (name or description)
    const matchesSearch = item.name.toLowerCase().includes(query) || 
                          item.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  displayMenu(filtered);
}

// Listen for clicks on Category Filter Tabs
categoryTabs.addEventListener("click", function (event) {
  const clickedBtn = event.target.closest(".category-btn");
  if (!clickedBtn) return;

  // Remove active styling from all tab buttons
  const allTabs = categoryTabs.querySelectorAll(".category-btn");
  allTabs.forEach(function (tab) {
    tab.classList.remove("active");
  });

  // Highlight the clicked tab
  clickedBtn.classList.add("active");

  // Update selected category state
  selectedCategory = clickedBtn.getAttribute("data-category");

  // Update heading title
  if (selectedCategory === "all") {
    currentCategoryTitle.textContent = "All Items";
  } else {
    currentCategoryTitle.textContent = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
  }

  applyFilters();
});

// Listen for keystrokes in the search input for real-time results
searchInput.addEventListener("input", function () {
  applyFilters();
});

// Reset filter button inside the "No items found" block
resetFiltersBtn.addEventListener("click", function () {
  searchInput.value = "";
  selectedCategory = "all";

  // Reset tab button highlight
  const allTabs = categoryTabs.querySelectorAll(".category-btn");
  allTabs.forEach(function (tab) {
    tab.classList.remove("active");
  });
  categoryTabs.querySelector('[data-category="all"]').classList.add("active");
  currentCategoryTitle.textContent = "All Items";

  applyFilters();
});

// =============================================================================
// 7. CART MANAGEMENT (Add, Increase, Decrease, Remove, Clear)
// =============================================================================

/**
 * Adds a food item to the cart array.
 * If already in cart, increases its quantity by 1.
 * @param {number} itemId - Unique food ID
 */
function addToCart(itemId) {
  // Find food item in menu data
  const food = menuItems.find(function (item) {
    return item.id === itemId;
  });

  if (!food) return;

  // Check if food already exists in the user's cart
  const existingCartItem = cart.find(function (cartItem) {
    return cartItem.id === itemId;
  });

  if (existingCartItem) {
    // Increase quantity
    existingCartItem.quantity += 1;
  } else {
    // Push new item object to cart with initial quantity 1
    cart.push({
      id: food.id,
      name: food.name,
      price: food.price,
      quantity: 1
    });
  }

  // Update storage and UI
  saveCartToStorage();
  updateCartDisplay();
}

/**
 * Increases the quantity of a specific item in the cart.
 * @param {number} itemId - Unique food ID
 */
function increaseQuantity(itemId) {
  const item = cart.find(function (cartItem) {
    return cartItem.id === itemId;
  });

  if (item) {
    item.quantity += 1;
    saveCartToStorage();
    updateCartDisplay();
  }
}

/**
 * Decreases the quantity of a specific item.
 * If quantity drops below 1, removes the item from the cart.
 * @param {number} itemId - Unique food ID
 */
function decreaseQuantity(itemId) {
  const itemIndex = cart.findIndex(function (cartItem) {
    return cartItem.id === itemId;
  });

  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      // Quantity became 0, remove the item
      cart.splice(itemIndex, 1);
    }

    saveCartToStorage();
    updateCartDisplay();
  }
}

/**
 * Removes an entire item from the cart regardless of its quantity.
 * @param {number} itemId - Unique food ID
 */
function removeFromCart(itemId) {
  cart = cart.filter(function (cartItem) {
    return cartItem.id !== itemId;
  });

  saveCartToStorage();
  updateCartDisplay();
}

/**
 * Empties all items from the cart after asking for user confirmation.
 */
function clearCart() {
  if (cart.length === 0) return;

  const userConfirmed = confirm("Are you sure you want to empty your entire food tray?");
  if (userConfirmed) {
    cart = [];
    saveCartToStorage();
    updateCartDisplay();
  }
}

clearCartBtn.addEventListener("click", clearCart);

// =============================================================================
// 8. BILL CALCULATION & CART UI UPDATE
// Recalculates subtotal, 5% tax, total and updates the HTML.
// =============================================================================

/**
 * Updates the Cart Tray list and calculates the Order Summary.
 */
function updateCartDisplay() {
  // Clear the existing cart list HTML
  cartItemsList.innerHTML = "";

  // 1. If cart is empty, show empty tray state
  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="empty-tray">
        <div class="empty-tray-icon">🛒</div>
        <h4>Your food tray is empty</h4>
        <p>Browse our menu above and click "+ Add to Tray" to start ordering.</p>
      </div>
    `;

    // Reset bill amounts
    summarySubtotal.textContent = "₹0.00";
    summaryTax.textContent = "₹0.00";
    summaryGrandTotal.textContent = "₹0.00";
    cartCountBadge.textContent = "0";

    // Disable Place Order button when tray is empty
    placeOrderBtn.disabled = true;
    return;
  }

  // 2. If cart has items, calculate subtotal and total count
  let subtotal = 0;
  let totalItemsCount = 0;

  cart.forEach(function (item) {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    totalItemsCount += item.quantity;

    // Create item row
    const itemRow = document.createElement("div");
    itemRow.className = "cart-item-row";
    itemRow.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-calc">₹${item.price} × ${item.quantity} = ₹${itemTotal}</div>
      </div>
      <div class="cart-qty-controls">
        <button class="btn-qty" onclick="decreaseQuantity(${item.id})" title="Decrease quantity">−</button>
        <span class="qty-display">${item.quantity}</span>
        <button class="btn-qty" onclick="increaseQuantity(${item.id})" title="Increase quantity">+</button>
      </div>
      <button class="btn-remove-item" onclick="removeFromCart(${item.id})" title="Remove item">×</button>
    `;

    cartItemsList.appendChild(itemRow);
  });

  // 3. Bill Calculations
  // 5% standard canteen tax (GST)
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + tax;

  // 4. Update bill summary labels with 2 decimal places
  summarySubtotal.textContent = `₹${subtotal.toFixed(2)}`;
  summaryTax.textContent = `₹${tax.toFixed(2)}`;
  summaryGrandTotal.textContent = `₹${grandTotal.toFixed(2)}`;

  // Update header cart badge
  cartCountBadge.textContent = totalItemsCount;

  // Enable Place Order button
  placeOrderBtn.disabled = false;
}

// =============================================================================
// 9. ORDER PAYMENT CHECKOUT & RECEIPT MODAL
// Generates random order reference and token, displays modal, and resets cart.
// =============================================================================

/**
 * Opens the Payment Portal when student clicks "Place Canteen Order".
 */
function openPaymentPortal() {
  if (cart.length === 0) {
    alert("Your food tray is empty! Please add some delicious items from the menu first.");
    return;
  }

  // Calculate current grand total
  let subtotal = 0;
  cart.forEach(function (item) {
    subtotal += item.price * item.quantity;
  });
  const grandTotal = subtotal + (subtotal * 0.05);

  paymentPayableAmount.textContent = `₹${grandTotal.toFixed(2)}`;
  confirmPaymentBtn.innerHTML = `<span>Confirm & Pay ₹${grandTotal.toFixed(2)}</span>`;
  confirmPaymentBtn.disabled = false;

  updateStudentDisplay();
  paymentModal.classList.add("active");
}

/**
 * Confirms payment and finalizes the cafeteria order.
 */
function finalizeOrderAfterPayment() {
  let totalItemsCount = 0;
  let subtotal = 0;
  cart.forEach(function (item) {
    totalItemsCount += item.quantity;
    subtotal += item.price * item.quantity;
  });
  const grandTotal = subtotal + (subtotal * 0.05);

  // If paid via Campus Smart Card, check and deduct balance
  if (selectedPaymentMethod === "card") {
    if (currentStudent.cardBalance < grandTotal) {
      alert(`Insufficient Campus Card Balance! Your balance is ₹${currentStudent.cardBalance.toFixed(2)}, but order total is ₹${grandTotal.toFixed(2)}. Please choose UPI or Cash.`);
      return;
    }
    currentStudent.cardBalance -= grandTotal;
    saveStudentProfile();
    updateStudentDisplay();
  }

  // Visual processing feedback
  confirmPaymentBtn.innerHTML = "<span>⏳ Processing Payment...</span>";
  confirmPaymentBtn.disabled = true;

  setTimeout(function () {
    // Generate Order ID & Token
    const randomOrderNum = "CC-" + Math.floor(10000 + Math.random() * 90000);
    const randomTokenNum = "#T-" + Math.floor(100 + Math.random() * 900);

    // Format readable payment method name
    let methodLabel = "UPI / Google Pay";
    if (selectedPaymentMethod === "card") methodLabel = "Campus Smart Card";
    if (selectedPaymentMethod === "cash") methodLabel = "Cash on Pickup";

    // Populate receipt modal
    receiptOrderId.textContent = randomOrderNum;
    receiptTokenNumber.textContent = randomTokenNum;
    receiptItemCount.textContent = `${totalItemsCount} item${totalItemsCount > 1 ? "s" : ""}`;
    receiptTotalAmount.textContent = `₹${grandTotal.toFixed(2)}`;
    if (receiptStudentInfo) {
      receiptStudentInfo.textContent = `${currentStudent.name} (${currentStudent.studentId})`;
    }
    if (receiptPaymentMethod) {
      receiptPaymentMethod.textContent = methodLabel;
    }

    // Save into past orders history
    const now = new Date();
    const orderRecord = {
      orderId: randomOrderNum,
      token: randomTokenNum,
      studentName: currentStudent.name,
      studentId: currentStudent.studentId,
      paymentMethod: methodLabel,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      itemsSummary: cart.map(function (item) {
        return item.name + " (×" + item.quantity + ")";
      }).join(", "),
      totalItems: totalItemsCount,
      grandTotal: grandTotal.toFixed(2)
    };
    pastOrders.unshift(orderRecord);
    saveOrderHistory();

    // Close payment modal and clear cart
    paymentModal.classList.remove("active");
    cart = [];
    saveCartToStorage();
    updateCartDisplay();

    // Open confirmation receipt
    orderModal.classList.add("active");
  }, 800);
}

placeOrderBtn.addEventListener("click", openPaymentPortal);

// Close modal when button is clicked
closeModalBtn.addEventListener("click", function () {
  orderModal.classList.remove("active");
});

// Close modal when clicking on the dark backdrop overlay
orderModal.addEventListener("click", function (event) {
  if (event.target === orderModal) {
    orderModal.classList.remove("active");
  }
});

// =============================================================================

// Past Orders Event Listeners
openPastOrdersBtn.addEventListener("click", function () {
  renderPastOrders();
  pastOrdersModal.classList.add("active");
});

closePastOrdersBtn.addEventListener("click", function () {
  pastOrdersModal.classList.remove("active");
});

pastOrdersModal.addEventListener("click", function (event) {
  if (event.target === pastOrdersModal) {
    pastOrdersModal.classList.remove("active");
  }
});

clearOrderHistoryBtn.addEventListener("click", function () {
  if (pastOrders.length === 0) return;
  const userConfirmed = confirm("Are you sure you want to clear your entire order history?");
  if (userConfirmed) {
    pastOrders = [];
    saveOrderHistory();
    renderPastOrders();
  }
});


// Payment Method Tabs Switching
const paymentMethodCards = document.querySelectorAll(".payment-method-card");
paymentMethodCards.forEach(function (cardBtn) {
  cardBtn.addEventListener("click", function () {
    paymentMethodCards.forEach(btn => btn.classList.remove("active"));
    cardBtn.classList.add("active");

    selectedPaymentMethod = cardBtn.getAttribute("data-method");

    // Toggle views
    upiPaymentView.style.display = selectedPaymentMethod === "upi" ? "block" : "none";
    cardPaymentView.style.display = selectedPaymentMethod === "card" ? "block" : "none";
    cashPaymentView.style.display = selectedPaymentMethod === "cash" ? "block" : "none";
  });
});

cancelPaymentBtn.addEventListener("click", function () {
  paymentModal.classList.remove("active");
});

confirmPaymentBtn.addEventListener("click", finalizeOrderAfterPayment);

paymentModal.addEventListener("click", function (event) {
  if (event.target === paymentModal) {
    paymentModal.classList.remove("active");
  }
});

// Student Modal Event Listeners
openStudentBtn.addEventListener("click", function () {
  updateStudentDisplay();
  studentModal.classList.add("active");
});

closeStudentBtn.addEventListener("click", function () {
  studentModal.classList.remove("active");
});

studentModal.addEventListener("click", function (event) {
  if (event.target === studentModal) {
    studentModal.classList.remove("active");
  }
});

studentProfileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  currentStudent.name = studentNameInput.value.trim() || "Shrikannan";
  currentStudent.studentId = studentIdInput.value.trim() || "SK-8999";
  currentStudent.cardBalance = parseFloat(studentCardBalanceInput.value) || 500.00;

  saveStudentProfile();
  updateStudentDisplay();
  studentModal.classList.remove("active");
});

// 10. INITIALIZATION (On Page Load)
// =============================================================================
document.addEventListener("DOMContentLoaded", function () {
  // 1. Retrieve any saved cart items from LocalStorage
  loadStudentProfile();
  loadCartFromStorage();
  loadOrderHistory();

  // 2. Render all menu items on initial load
  displayMenu(menuItems);

  // 3. Render the cart tray and recalculate the bill
  updateCartDisplay();
});
