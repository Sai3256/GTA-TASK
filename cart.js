let cart = [
  { id: 1, name: "Football", price: 799, quantity: 1 },
  { id: 2, name: "Cricket Bat", price: 1499, quantity: 1 },
  { id: 3, name: "Basketball", price: 999, quantity: 2 }
];

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
      </div>
      <div class="cart-item-controls">
        <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">−</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
        <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
      </div>
    `;
    cartItems.appendChild(div);
  });

  updateSummary();
}

function changeQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) removeItem(id);
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function updateSummary() {
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });
  const tax = +(subtotal * 0.18).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  alert("Redirecting to payment gateway...");
  // Replace this with real payment gateway logic
}

renderCart();
