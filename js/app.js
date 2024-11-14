function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("show");
}

// Function to handle scroll animation
function handleScroll() {
  const elements = document.querySelectorAll(".feature-box, .review-card");
  const windowHeight = window.innerHeight;

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("fade-in");
    }
  });
}

window.addEventListener("scroll", handleScroll);

handleScroll();

document.querySelectorAll(".nav-links a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 20,
        behavior: "smooth",
      });
    }
  });
});

// Initialize EmailJS with your user ID
emailjs.init("AG_I-mxvcoZ3KJc4Z");

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Status element to show success or error messages
    const status = document.getElementById("status");

    // Collect form data
    const name = document.getElementById("user_name").value;
    const email = document.getElementById("user_email").value;
    const message = document.getElementById("message").value;

    // Send form data using EmailJS
    emailjs
      .send("service_krhqzbe", "template_i1szaua", {
        user_name: name,
        user_email: email,
        message: message,
      })
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          status.innerText =
            "Thank you for reaching out! We will get back to you shortly.";
          status.style.color = "green";

          // Reset the form
          document.getElementById("contact-form").reset();
        },
        function (error) {
          console.log("FAILED...", error);
          status.innerText = "Oops! Something went wrong. Please try again.";
          status.style.color = "red";
        }
      );
  });
function registerUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const statusDiv = document.getElementById("status");

  if (!name || !email || !password) {
    statusDiv.innerHTML = "Please fill in all fields.";
    return;
  }

  let users = JSON.parse(localStorage.getItem("accounts")) || []; // Use "accounts" key

  // Check if user already exists
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    statusDiv.innerHTML = "An account with this email already exists.";
    return;
  }

  // Save the new user in localStorage under "accounts"
  users.push({ name, email, password });
  localStorage.setItem("accounts", JSON.stringify(users)); // Save with the key "accounts"

  // Send confirmation email using EmailJS
  const emailParams = {
    user_name: name,
    user_email: email,
    message: `Hi ${name}, thank you for signing up with MailAM!`,
  };

  emailjs
    .send("service_krhqzbe", "template_i1szaua", emailParams)
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      statusDiv.innerHTML =
        "Account created successfully! A confirmation email has been sent.";

      // Redirect to login after a successful registration
      setTimeout(() => {
        window.location.href = "login.html"; // Redirect to login page
      }, 2000); // 2-second delay for the user to see the success message
    })
    .catch((error) => {
      console.error("FAILED...", error);
      statusDiv.innerHTML =
        "Account created, but failed to send confirmation email.";
    });
}

// Login Script
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const accounts = JSON.parse(localStorage.getItem("accounts")) || []; // Use "accounts" key

    // Check if account exists and password is correct
    const account = accounts.find(
      (account) => account.email === email && account.password === password
    );

    if (account) {
      alert("Login successful!");
      window.location.href = "dashboard.html"; 
    } else {
      alert("Invalid email or password. Please try again.");
    }
  });
