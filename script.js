let cart = [];
function addToCart(button) {
  const card = button.parentElement;
  const id = card.dataset.id;
  const name = card.dataset.name;
  const price = parseFloat(card.dataset.price);

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }

  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const totalElem = document.getElementById("total");

  cartList.innerHTML = '';
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} x ${item.qty}
      <span onclick="changeQty('${item.id}', -1)">➖</span>
      <span onclick="changeQty('${item.id}', 1)">➕</span>
      <span onclick="removeItem('${item.id}')">❌</span>
    `;
    cartList.appendChild(li);
  });

  cartCount.textContent = count;
  totalElem.textContent = `Total: ₹${total}`;
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  updateCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

function toggleCart() {
  const cartBox = document.getElementById("cart");
  cartBox.style.display = cartBox.style.display === "block" ? "none" : "block";
}

function checkout() {
  if (cart.length === 0) return alert("Cart is empty!");
  cart = [];
  updateCart();
  toggleCart();
  document.getElementById("checkout-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("checkout-modal").style.display = "none";
}

function toggleMode() {
  document.body.classList.toggle('dark');
}
function sendMessage() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && email && message) {
    alert(`✅ Thanks ${name}, your message has been sent!`);
    document.getElementById('contact-form').reset();
  } else {
    alert("❗ Please fill all fields.");
  }
  return false;
}

function postComment() {
  const name = document.getElementById('comment-name').value.trim();
  const comment = document.getElementById('comment-text').value.trim();
  const list = document.getElementById('comment-list');

  if (name && comment) {
    const div = document.createElement('div');
    div.className = 'comment';
    div.innerHTML = `
      <img src="https://api.dicebear.com/8.x/thumbs/svg?seed=${name}" alt="avatar"/>
      <div class="comment-content">
        <strong>${name}</strong>
        <p>${comment}</p>
      </div>
    `;
    list.prepend(div);
    document.getElementById('comment-form').reset();
  } else {
    alert("❗ Please enter your name and comment.");
  }
