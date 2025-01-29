// Show/Hide the Scroll Button Based on Scroll Position
window.onscroll = function () {
  const scrollTopBtn = document.getElementById("scrollTop");
  if (document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.opacity = "1";
    scrollTopBtn.style.visibility = "visible";
  } else {
    scrollTopBtn.style.opacity = "0";
    scrollTopBtn.style.visibility = "hidden";
  }
};

// Smooth Scroll to Top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scroll effect
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Get all the "Add to Cart" buttons (for the product cards)
  const addToCartButtons = document.querySelectorAll(".shop-now");

  // Get the popup elements
  const popup = document.getElementById("productPopup");
  const closePopup = document.getElementById("closePopup");
  const popupImage = document.getElementById("popupImage");
  const popupName = document.getElementById("popupName");
  const popupPrice = document.getElementById("popupPrice");
  const increaseButton = document.getElementById("increaseQuantity");
  const decreaseButton = document.getElementById("decreaseQuantity");
  const quantityDisplay = document.getElementById("quantityDisplay");
  let quantity = 1;

  // When the "Add to Cart" button is clicked
  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      // Get data from the clicked product card
      const productCard = button.closest(".card");
      const productName = productCard.querySelector("h3").textContent;
      const productPrice = productCard.querySelector("h2").textContent;
      const productImage = productCard.querySelector("img").src;

      // Set popup content
      popupImage.src = productImage;
      popupName.textContent = productName;
      popupPrice.textContent = productPrice;

      // Show the popup
      popup.style.display = "block";
      document.querySelector(".popup-overlay").style.display = "block";
    });
  });

  // Close popup when clicking on the close button
  closePopup.addEventListener("click", function () {
    popup.style.display = "none";
    document.querySelector(".popup-overlay").style.display = "none";
  });
});

// billing js logic start from here
const productPopup = document.getElementById("productPopup");
const popupOverlay = document.getElementById("popupOverlay");
const billingPopup = document.getElementById("billingPopup");

let currentProduct = {};

const togglePopup = (popup, action) => {
  popup.style.display = action ? "block" : "none";
  popupOverlay.style.display = action ? "block" : "none";
};

const updateTotalPrice = () => {
  const quantity =
    parseInt(document.getElementById("quantityDisplay").textContent, 10) || 1;
  const price = parseFloat(currentProduct.price.replace(/[^0-9.]/g, ""));
  const totalPrice = (quantity * price).toFixed(2);
  document.getElementById(
    "billingTotalPrice"
  ).textContent = `Total Price: $${totalPrice}`;
};

document.querySelectorAll(".shop-now").forEach((button) => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    currentProduct = {
      name: card.querySelector("h3").textContent,
      price: card.querySelector("h2").textContent.split(" ")[0].trim(),
      image: card.querySelector("img").src,
    };

    document.getElementById("popupName").textContent = currentProduct.name;
    document.getElementById(
      "popupPrice"
    ).textContent = `${currentProduct.price}`;
    document.getElementById("popupImage").src = currentProduct.image;

    document.getElementById("quantityDisplay").textContent = 1;
    togglePopup(productPopup, true);
  });
});

document.getElementById("closePopup").addEventListener("click", () => {
  togglePopup(productPopup, false);
});

document.getElementById("addToCartButton").addEventListener("click", () => {
  const quantity = document.getElementById("quantityDisplay").textContent;

  document.getElementById("billingProductName").textContent =
    currentProduct.name;
  document.getElementById(
    "billingProductPrice"
  ).textContent = `${currentProduct.price}`;
  document.getElementById("billingQuantity").textContent = ` ${quantity}`;

  updateTotalPrice();

  togglePopup(productPopup, false);
  togglePopup(billingPopup, true);
});

// Close the billing popup
document.getElementById("closeBillingPopup").addEventListener("click", () => {
  togglePopup(billingPopup, false);
});

document.getElementById("confirmPurchase").addEventListener("click", () => {
  //   alert("Purchase confirmed! Thank you for your order.");
  togglePopup(billingPopup, false);
});

// Handle cancel purchase
document.getElementById("cancelPurchase").addEventListener("click", () => {
  togglePopup(billingPopup, false);
});

// Handle quantity adjustments
document.getElementById("increaseQuantity").addEventListener("click", () => {
  const quantityDisplay = document.getElementById("quantityDisplay");
  let quantity = parseInt(quantityDisplay.textContent, 10);
  quantityDisplay.textContent = ++quantity;
});

document.getElementById("decreaseQuantity").addEventListener("click", () => {
  const quantityDisplay = document.getElementById("quantityDisplay");
  let quantity = parseInt(quantityDisplay.textContent, 10);
  if (quantity > 1) {
    quantityDisplay.textContent = --quantity;
  }
});

// Update total price dynamically when quantity changes
document
  .getElementById("increaseQuantity")
  .addEventListener("click", updateTotalPrice);
document
  .getElementById("decreaseQuantity")
  .addEventListener("click", updateTotalPrice);

//   billing
const paymentMethod = document.getElementById("paymentMethod");
const cardDetails = document.getElementById("cardDetails");

paymentMethod.addEventListener("change", function () {
  if (this.value === "creditCard") {
    cardDetails.style.display = "block";
  } else {
    cardDetails.style.display = "none";
  }
});

const submitBtn = document.getElementById("submitBtn");
const successModal = new bootstrap.Modal(
  document.getElementById("successModal")
);
const billingModal = new bootstrap.Modal(
  document.getElementById("billingModal")
);

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  successModal.show();

  successModal.show();
  billingModal.hide();
});
