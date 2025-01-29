document.getElementById("subscribe").addEventListener("click", function () {
    const emailInput = document.getElementById("emailInput");
    const messageDiv = document.getElementById("subscribeMessage");

    messageDiv.textContent = "";

    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailInput.value.trim() === "") {
        messageDiv.textContent = "Please enter your email.";
        messageDiv.style.color = "red";
    } else if (!emailRegex.test(emailInput.value)) {
        messageDiv.textContent = "Please enter a valid email address.";
        messageDiv.style.color = "red";
    } else {
        messageDiv.innerHTML = "You have successfully subscribed to the Harvel Electric Store!<br>You will now receive updates about our latest products, offers, and more!";


        messageDiv.style.color = "rgb(107, 31, 248)";

        // Clear the input field
        emailInput.value = "";

        // Clear the message after 4 seconds
        setTimeout(() => {
            messageDiv.textContent = "";
        }, 4000);
    }
});
