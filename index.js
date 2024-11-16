$(document).ready(function () {
  // Load the home page content by default
  $("#content").load("home.html");

  // Navigation link event handlers
  $("#homelink").click(function (e) {
    e.preventDefault();
    $("#content").load("home.html", function () {
      window.scrollTo(0, 0);
      addHireFormHandler(); // Attach the form handler after loading the home content
    });
  });

  $("#aboutlink").click(function (e) {
    e.preventDefault(); // Corrected typo
    $("#content").load("about.html", function () {
      window.scrollTo(0, 0);
    });
  });

  $("#skilllink").click(function (e) {
    e.preventDefault();
    $("#content").load("skill.html", function () {
      window.scrollTo(0, 0);
      // Set progress bars after the page is loaded
      setProgressBar("word-progress", 80);
      setProgressBar("excel-progress", 90);
      setProgressBar("powerpoint-progress", 75);
      setProgressBar("communication-progress", 85);
      setProgressBar("teamwork-progress", 90);
      setProgressBar("problem-solving-progress", 80);
      setProgressBar("khmer-progress", 100);
      setProgressBar("english-progress", 50);
      setProgressBar("database-progress", 50); // Database (CRUD)
      setProgressBar("flutter-progress", 70); // Flutter
      setProgressBar("csharp-progress", 60); // C#
      setProgressBar("git-progress", 80); // Git
      setProgressBar("html-css-js-progress", 90); // HTML/CSS/JS
      setProgressBar("figma-progress", 80); // Figma (UX/UI)
      setProgressBar("java-progress", 65); // Java
      setProgressBar("php-progress", 50); // PHP
      setProgressBar("react-native-progress", 70); // React-Native
      setProgressBar("react-js-progress", 70);
    });
    updateActiveLink("#skilllink");
  });

  $("#exlink").click(function (e) {
    e.preventDefault(); // Corrected typo
    $("#content").load("experience.html", function () {
      window.scrollTo(0, 0);
    });
  });

  $("#edlink").click(function (e) {
    e.preventDefault(); // Corrected typo
    $("#content").load("education.html", function () {
      window.scrollTo(0, 0);
    });
  });

  $("#worklink").click(function (e) {
    e.preventDefault(); // Corrected typo
    $("#content").load("work.html", function () {
      window.scrollTo(0, 0);
    });
  });

  $("#bloglink").click(function (e) {
    e.preventDefault(); // Corrected typo
    $("#content").load("blog.html", function () {
      window.scrollTo(0, 0);
    });
  });

  $("#contactlink").click(function (e) {
    e.preventDefault(); // Corrected typo
    $("#content").load("contact.html", function () {
      window.scrollTo(0, 0);
    });
  });
});

// Function to load the footer content
function loadFooter() {
  fetch("/footer.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Footer content could not be loaded");
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    })
    .catch((error) => {
      console.error("Error loading footer:", error);
    });
}
// Function to update progress dynamically
function setProgressBar(id, progress) {
  const progressBar = document.getElementById(id);
  if (progressBar) {
    // Initially set the width to 0% (this will be the starting point for animation)
    progressBar.style.width = "0%";

    // Allow the page to render with width set to 0%, then set the final progress
    setTimeout(() => {
      progressBar.style.width = progress + "%"; // Animate to the target progress value
      progressBar.innerText = progress + "%"; // Update the text to show progress
    }, 100); // Timeout to ensure smooth transition after 0% is rendered
  } else {
    console.error(`Element with id ${id} not found!`);
  }
}
// Menu & nav
// Toggle the 'show' class to display or hide the nav menu on mobile
document.getElementById("menu-icon").addEventListener("click", function () {
  document.querySelector(".nav-list").classList.toggle("show");
});

// Close the menu when a navigation link is clicked
const navLinks = document.querySelectorAll(".nav-list li");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelector(".nav-list").classList.remove("show");
  });
});
// Function to update active link (highlight the current page in the nav)
function updateActiveLink(activeLink) {
  $(".nav-list li").removeClass("active");
  $(activeLink).addClass("active");
}
// end menu-nav
// Call the loadFooter function when the page loads
window.onload = function () {
  loadFooter();
};
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-list li");

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Remove active class from all links
      navItems.forEach((link) => link.classList.remove("active"));

      // Add active class to the clicked link
      item.classList.add("active");
    });
  });
});
// Function to show the popup
// Function to show the popup
function showPopup() {
  document.getElementById("hire-popup").style.display = "flex"; // Show popup
  attachFormHandler(); // Ensure the form handler is attached when showing the popup
}

// Function to close the popup
function closePopup() {
  document.getElementById("hire-popup").style.display = "none"; // Hide popup
  resetForm(); // Reset the form content
}

// Close the popup when clicking anywhere outside the popup content
window.onclick = function (event) {
  const popup = document.getElementById("hire-popup");
  const popupContent = document.getElementById("popup-content");

  // Close if clicking outside the popup content
  if (event.target === popup && !popupContent.contains(event.target)) {
    closePopup();
  }
};

// Function to attach the form handler
function attachFormHandler() {
  const form = document.getElementById("hire-form");
  if (form) {
    // Remove existing submit event listener to prevent duplicate handlers
    form.removeEventListener("submit", handleFormSubmit);

    // Add a new submit event listener
    form.addEventListener("submit", handleFormSubmit);
  } else {
    console.error("Form not found!");
  }
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent page reload
  const form = event.target;
  const name = form.elements["name"].value;
  const email = form.elements["email"].value;
  const message = form.elements["message"].value;

  console.log(
    `Form submitted. Name: ${name}, Email: ${email}, Message: ${message}`
  );

  // Display a thank-you message in the popup
  const popupContent = document.getElementById("popup-content");
  popupContent.innerHTML = `
    <h2>Thank You!</h2>
    <p>Thank you, ${name}! Your message has been received. I will respond to ${email} shortly.</p>
    <button onclick="closePopup()">Close</button>
  `;
}

// Function to reset the form content
function resetForm() {
  const popupContent = document.getElementById("popup-content");
  popupContent.innerHTML = `
    <span class="close-btn" onclick="closePopup()">&times;</span>
    <h2>Hire Me</h2>
    <p>Please fill out the form below to hire me:</p>
    <form id="hire-form" onsubmit="return false;">
      <label for="name">Your Name:</label><br />
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter your name"
        required
      /><br /><br />

      <label for="email">Your Email:</label><br />
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        required
      /><br /><br />

      <label for="message">Your Message:</label><br />
      <textarea
        id="message"
        name="message"
        placeholder="Enter your message"
        required
      ></textarea
      ><br /><br />

      <button type="submit" id="submit-btn">Submit</button>
    </form>
  `;
}
