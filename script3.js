// Opent/sluit de slider
const slider = document.getElementById('slider');
const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', () => {
  slider.classList.toggle('open');
});

// Wacht tot de pagina geladen is
document.addEventListener("DOMContentLoaded", function() {
  // Haal alle opties en elementen op
  const sizeSelect = document.getElementById("sizeSelect");
  const milkSelect = document.getElementById("milkSelect");
  const shotSelect = document.getElementById("shotSelect");
  const flavorSelect = document.getElementById("flavorSelect");
  const toast = document.getElementById("toast");
  const addToCartBtn = document.getElementById("addToCartBtn");
  const priceDisplay = document.getElementById("priceDisplay");
  const drinkName = document.getElementById("drinkName").textContent;

  // Berekent de totale prijs
  function updatePrice() {
    let basePrice = 0;
    let shotExtra = 0;
    let flavorExtra = 0;

    if (sizeSelect) {
      basePrice = parseFloat(sizeSelect.selectedOptions[0].dataset.price);
    }
    if (shotSelect) {
      shotExtra = parseFloat(shotSelect.selectedOptions[0].dataset.extra);
    }
    if (flavorSelect) {
      flavorExtra = parseFloat(flavorSelect.selectedOptions[0].dataset.extra);
    }

    const total = (basePrice + shotExtra + flavorExtra).toFixed(2);

    if (priceDisplay) {
      priceDisplay.textContent = "Prijs: €" + total;
    }
    return total;
  }

  // Start met juiste prijs
  updatePrice();

  // Update prijs wanneer opties veranderen
  if (sizeSelect) sizeSelect.addEventListener("change", updatePrice);
  if (shotSelect) shotSelect.addEventListener("change", updatePrice);
  if (flavorSelect) flavorSelect.addEventListener("change", updatePrice);

  // Laat een toast-bericht zien
  function showToast(message) {
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(() => {
      toast.className = toast.className.replace("show", "");
    }, 3000);
  }

  // Voeg drankje toe aan winkelwagen
  addToCartBtn.addEventListener("click", function() {
    // Check warm/koud keuze
    let temp = null;
    const tempRadio = document.querySelector('input[name="temp"]:checked');
    if (tempRadio) {
      temp = tempRadio.value;
    }

    // Bouw order object
    const order = {
      drink: drinkName,
      temp: temp,
      size: sizeSelect ? sizeSelect.value : null,
      milk: milkSelect ? milkSelect.value : null,
      shots: shotSelect ? shotSelect.value : null,
      flavor: flavorSelect ? flavorSelect.value : null,
      price: updatePrice()
    };

    // Haal winkelwagen op en voeg toe
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(order);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Laat bevestiging zien
    showToast(`Toegevoegd: ${order.size || ""} ${order.temp || ""} ${drinkName} (€${order.price})`);
  });
});
