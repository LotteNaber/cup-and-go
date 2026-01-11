// Laat het opgeslagen ordernummer zien zodra de pagina geladen is
document.addEventListener("DOMContentLoaded", () => {
  const orderNumber = localStorage.getItem("orderNumber");
  const display = document.getElementById("orderNumberDisplay");

  // Toon ordernummer of fallback tekst
  if (orderNumber) {
    display.textContent = "Jouw ordernummer is: " + orderNumber;
  } else {
    display.textContent = "Geen ordernummer gevonden.";
  }
});
