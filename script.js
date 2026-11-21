
// =====================================
// PRODUCT DATA
// =====================================

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 2000
    },
    {
        id: 2,
        name: "Wireless Mouse",
        price: 800
    }
];

// =====================================
// APPLICATION STATE
// =====================================

let cart = [];

let orderSubmitted = false;

// =====================================
// DOM ELEMENTS
// =====================================

const cartItemsElement =
    document.getElementById("cart-items");

const orderTotalElement =
    document.querySelector('[data-testid="order-total"]');

const customerNameInput =
    document.getElementById("customer-name");

const checkoutForm =
    document.getElementById("checkout-form");

const placeOrderButton =
    document.getElementById("place-order");

const validationMessage =
    document.getElementById("validation-message");

const confirmation =
    document.getElementById("confirmation");

const orderReferenceElement =
    document.querySelector('[data-testid="order-reference"]');

// =====================================
// ADD PRODUCT TO CART
// =====================================

function addToCart(productId) {

    if (orderSubmitted) return;

    const product = products.find(
        item => item.id === productId
    );

    if (!product) return;

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    renderCart();
}

// =====================================
// REMOVE PRODUCT FROM CART
// =====================================

function removeFromCart(productId) {

    if (orderSubmitted) return;

    cart = cart.filter(
        item => item.id !== productId
    );

    renderCart();
}

// =====================================
// UPDATE PRODUCT QUANTITY
// =====================================

function updateQuantity(productId, change) {

    if (orderSubmitted) return;

    const item = cart.find(
        product => product.id === productId
    );

    if (!item) return;

    const newQuantity = item.quantity + change;

    if (newQuantity <= 0) {

        removeFromCart(productId);

        return;
    }

    item.quantity = newQuantity;

    renderCart();
}

// =====================================
// CALCULATE LINE TOTAL
// =====================================

function calculateLineTotal(item) {

    return item.price * item.quantity;
}

// =====================================
// CALCULATE ORDER TOTAL
// =====================================

function calculateTotal() {

    return cart.reduce(
        (total, item) =>
            total + calculateLineTotal(item),
        0
    );
}

// =====================================
// CURRENCY FORMATTER
// =====================================

function formatPrice(amount) {

    return "₹" + amount.toLocaleString("en-IN");
}

// =====================================
// RENDER CART
// =====================================

function renderCart() {

    cartItemsElement.innerHTML = "";

    if (cart.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.id = "empty-cart";

        emptyMessage.textContent = "Your cart is empty.";

        cartItemsElement.appendChild(emptyMessage);

    }

    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.setAttribute("data-testid", "cart-item");

        // Product information

        const info = document.createElement("div");

        info.className = "cart-item-info";

        const name = document.createElement("strong");

        name.textContent = item.name;

        const price = document.createElement("p");

        price.textContent = formatPrice(item.price) + " each";

        const lineTotal = document.createElement("p");

        lineTotal.setAttribute("data-testid", "line-total");

        lineTotal.textContent =
            formatPrice(calculateLineTotal(item));

        info.append(name, price, lineTotal);

        // Quantity controls

        const quantityControls = document.createElement("div");

        quantityControls.className = "quantity-controls";

        const decreaseButton = document.createElement("button");

        decreaseButton.type = "button";

        decreaseButton.textContent = "-";

        decreaseButton.setAttribute(
            "aria-label",
            "Decrease quantity"
        );

        decreaseButton.addEventListener("click", () => {
            updateQuantity(item.id, -1);
        });

        const quantity = document.createElement("span");

        quantity.textContent = item.quantity;

        quantity.setAttribute("data-testid", "quantity");

        const increaseButton = document.createElement("button");

        increaseButton.type = "button";

        increaseButton.textContent = "+";

        increaseButton.setAttribute(
            "aria-label",
            "Increase quantity"
        );

        increaseButton.addEventListener("click", () => {
            updateQuantity(item.id, 1);
        });

        quantityControls.append(
            decreaseButton,
            quantity,
            increaseButton
        );

        // Remove button

        const removeButton = document.createElement("button");

        removeButton.type = "button";

        removeButton.textContent = "Remove";

        removeButton.className = "remove-button";

        removeButton.addEventListener("click", () => {
            removeFromCart(item.id);
        });

        cartItem.append(
            info,
            quantityControls,
            removeButton
        );

        cartItemsElement.appendChild(cartItem);

    });

    // Update order total

    orderTotalElement.textContent =
        formatPrice(calculateTotal());

}

// =====================================
// DISPLAY VALIDATION ERROR
// =====================================

function showError(message) {

    validationMessage.textContent = message;

    validationMessage.hidden = false;

}

// =====================================
// CLEAR VALIDATION ERROR
// =====================================

function clearError() {

    validationMessage.textContent = "";

    validationMessage.hidden = true;

}

// =====================================
// PLACE ORDER
// =====================================

function placeOrder() {

    // Prevent duplicate order submission

    if (orderSubmitted) return;

    clearError();

    // Validate empty cart

    if (cart.length === 0) {

        showError("Your cart is empty.");

        return;
    }

    // Validate customer name

    const customerName =
        customerNameInput.value.trim();

    if (!customerName) {

        showError("Please enter your name.");

        customerNameInput.focus();

        return;
    }

    // Lock submission synchronously

    orderSubmitted = true;

    placeOrderButton.disabled = true;

    placeOrderButton.textContent = "Order Placed";

    // Generate one unique order reference

    const reference =
        "ORD-" +
        Date.now().toString() +
        "-" +
        Math.floor(Math.random() * 1000);

    // Display confirmation

    orderReferenceElement.textContent = reference;

    confirmation.hidden = false;

}

// =====================================
// EVENT LISTENERS
// =====================================

document
    .getElementById("add-headphones")
    .addEventListener("click", () => {
        addToCart(1);
    });

document
    .getElementById("add-mouse")
    .addEventListener("click", () => {
        addToCart(2);
    });

checkoutForm.addEventListener("submit", event => {

    event.preventDefault();

    placeOrder();

});

// =====================================
// INITIALIZE APPLICATION
// =====================================

renderCart();
