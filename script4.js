// Wacht tot de pagina geladen is
document.addEventListener("DOMContentLoaded", function() {
  const orderList = document.getElementById("orderList");
  const totalPriceEl = document.getElementById("totalPrice");
  const payBtn = document.getElementById("payBtn");

  // Haal winkelwagen op uit localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Zorg dat elke order een quantity heeft
  cart.forEach(order => {
    if (!order.quantity) {
      order.quantity = 1;
    }
  });

  // Tekent de winkelwagen op het scherm
  function renderCart() {
    orderList.innerHTML = "";
    let total = 0;

    cart.forEach((order, index) => {
      const item = document.createElement("div");
      item.className = "order-item";

      const left = document.createElement("div");
      left.className = "order-left";

      // Toon alle details van het drankje
      const details = document.createElement("div");
      details.className = "order-details";
      details.innerHTML = `
        <span><strong>${order.drink}</strong></span>
        ${order.temp ? `<span>${order.temp}</span>` : ""}
        ${order.size ? `<span>Maat: ${order.size}</span>` : ""}
        ${order.milk ? `<span>Melk: ${order.milk}</span>` : ""}
        ${order.shots ? `<span>Shots: ${order.shots}</span>` : ""}
        ${order.flavor ? `<span>Smaakje: ${order.flavor}</span>` : ""}
        <span>Prijs per stuk: €${order.price}</span>
      `;
      left.appendChild(details);

      // Knoppen voor hoeveelheid aanpassen
      const qtyControls = document.createElement("div");
      qtyControls.className = "qty-controls";
      qtyControls.innerHTML = `
        <button class="qty-btn">-</button>
        <span class="qty-display">${order.quantity}</span>
        <button class="qty-btn">+</button>
      `;

      const [minusBtn, qtyDisplay, plusBtn] = qtyControls.children;

      // Verminder aantal
      minusBtn.addEventListener("click", () => {
        if (order.quantity > 1) {
          order.quantity--;
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        }
      });

      // Verhoog aantal
      plusBtn.addEventListener("click", () => {
        order.quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });

      // Verwijder item uit winkelwagen
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.innerHTML = `<img src="trash.png" alt="Delete">`;
      deleteBtn.addEventListener("click", () => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });

      // Rechterkant: hoeveelheid + delete
      const right = document.createElement("div");
      right.style.display = "flex";
      right.style.alignItems = "center";
      right.style.gap = "15px";
      right.appendChild(qtyControls);
      right.appendChild(deleteBtn);

      item.appendChild(left);
      item.appendChild(right);
      orderList.appendChild(item);

      // Tel totaalprijs op
      total += parseFloat(order.price) * order.quantity;
    });

    totalPriceEl.textContent = "€" + total.toFixed(2);
  }

  // Render winkelwagen bij start
  renderCart();

  // Afrekenen
  payBtn.addEventListener("click", () => {
    // Als winkelwagen leeg is → trillen + melding
    if (cart.length === 0) {
      if ("vibrate" in navigator) {
        navigator.vibrate(200);
      }
      alert("Je mandje is leeg!");
      return;
    }

    // Maak willekeurig ordernummer
    const orderNumber = Math.floor(100 + Math.random() * 900);

    // Sla ordernummer op
    localStorage.setItem("orderNumber", orderNumber);

    // Maak winkelwagen leeg
    cart = [];
    localStorage.removeItem("cart");

    // Toon web-notificatie
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("Cup & Go", {
          body: "Bedankt voor je bestelling! Jouw ordernummer is: " + orderNumber,
          icon: "landingpage.logo.png"
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification("Cup & Go", {
              body: "Bedankt voor je bestelling! Jouw ordernummer is: " + orderNumber,
              icon: "landingpage.logo.png"
            });
          }
        });
      }
    }

    // Ga naar bedankpagina
    window.location.href = "thankyou.html";
  });
});
