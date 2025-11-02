// Get form elements
const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");

// Buttons
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

// Links inside forms
const toRegister = document.getElementById("toRegister");
const toLogin = document.getElementById("toLogin");

// Initialize — show login form first
window.onload = () => {
  loginForm.classList.add("active");
};

// Toggle to Register
registerBtn.onclick = () => showRegister();
toRegister.onclick = (e) => {
  e.preventDefault();
  showRegister();
};

// Toggle to Login
loginBtn.onclick = () => showLogin();
toLogin.onclick = (e) => {
  e.preventDefault();
  showLogin();
};

function showLogin() {
    hideAllSections(); // 🔹 Hide all sections first
    registerForm.classList.remove("active");
    loginForm.classList.add("active");

    loginBtn.classList.add("white-btn");
    registerBtn.classList.remove("white-btn");
}

function showRegister() {
    hideAllSections(); // 🔹 Hide all sections first
    loginForm.classList.remove("active");
    registerForm.classList.add("active");

    registerBtn.classList.add("white-btn");
    loginBtn.classList.remove("white-btn");
}

// =============================
// NAVIGATION & PAGE SWITCHING
// =============================

// Select all navigation links
const navLinks = document.querySelectorAll(".link");

// Create content containers for Home, Services, About, and Contact
// Make sure these exist in your HTML with IDs: home, services, about, contact
const homeContainer = document.getElementById("home");
const servicesContainer = document.getElementById("services");
const aboutContainer = document.getElementById("about");
const contactContainer = document.getElementById("contact");

// Put all in an array for easy hide/show
const contentSections = [
  loginForm,
  registerForm,
  homeContainer,
  servicesContainer,
  aboutContainer,
  contactContainer,
];

// Utility to hide everything
function hideAllSections() {
  contentSections.forEach((section) => {
    if (section) section.classList.remove("active");
  });
}

// Utility to show one section
function showSection(section) {
  hideAllSections();
  if (section) section.classList.add("active");
}

// Attach click events to nav links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    const target = link.textContent.trim().toLowerCase();

    switch (target) {
      case "home":
        showSection(homeContainer);
        break;
      case "services":
        showSection(servicesContainer);
        break;
      case "about":
        showSection(aboutContainer);
        break;
      case "contact":
        showSection(contactContainer);
        break;
      default:
        showSection(homeContainer);
    }
  });
});

// Default: show login form or home page initially
window.addEventListener("load", () => {
  showSection(loginForm);
});

// =============================
// TERMS & CONDITIONS — Robust implementation
// =============================

(function () {
  // Find the Terms trigger: prefer #showTerms if present, otherwise fallback to any `.two a` inside register form
  const termsTrigger = document.getElementById("showTerms")
    || (registerForm ? registerForm.querySelector(".two a") : null);

  // Find the terms container and back button
  const termsContainer = document.getElementById("terms");
  const backBtn = document.getElementById("backToSignup");

  // Helper to get all containers dynamically so we don't rely on contentSections being updated
  function getAllContainers() {
    // all elements that use .container (forms & pages)
    return Array.from(document.querySelectorAll(".container"));
  }

  // Hide all containers (more robust: uses dynamic list)
  function hideAllContainers() {
    getAllContainers().forEach((c) => c.classList.remove("active"));
  }

  // Show a container element (accepts element or id)
  function showContainerElem(elemOrId) {
    hideAllContainers();
    if (!elemOrId) return;
    let el = typeof elemOrId === "string" ? document.getElementById(elemOrId) : elemOrId;
    if (!el) return console.warn("showContainerElem: target not found", elemOrId);
    el.classList.add("active");
  }

  // Attach click handler on the terms trigger
  if (termsTrigger && termsContainer) {
    termsTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      showContainerElem(termsContainer);
    });
  } else {
    if (!termsTrigger) console.warn("Terms trigger not found. Add id='showTerms' to your Terms link or ensure it exists inside register form.");
    if (!termsContainer) console.warn("Terms container (#terms) not found. Add the Terms HTML.");
  }

  // Back button: show signup (registerForm) and restore sign-up button style
  if (backBtn) {
    backBtn.addEventListener("click", function (e) {
      e.preventDefault();
      hideAllContainers();
      if (registerForm) {
        registerForm.classList.add("active");
        // restore button highlight
        if (registerBtn) registerBtn.classList.add("white-btn");
        if (loginBtn) loginBtn.classList.remove("white-btn");
      } else {
        console.warn("registerForm not found when clicking Back to Sign Up.");
      }
    });
  } else {
    console.warn("Back to Sign Up button (#backToSignup) not found in Terms container.");
  }

  // Optional: ensure Terms container is considered when code uses contentSections elsewhere
  // (only push if not already present)
  try {
    if (Array.isArray(contentSections) && termsContainer && !contentSections.includes(termsContainer)) {
      contentSections.push(termsContainer);
    }
  } catch (err) {
    // contentSections may not exist in global scope — that's fine
  }
})();

// -----------------------
// Mobile drawer & nav support
// -----------------------
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileDrawer = document.getElementById("mobileDrawer");

// open/close drawer
if (hamburgerBtn && mobileDrawer) {
  hamburgerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mobileDrawer.classList.toggle("open");
    mobileDrawer.setAttribute("aria-hidden", !mobileDrawer.classList.contains("open"));
  });

  // close drawer when clicking outside (optional)
  document.addEventListener("click", (evt) => {
    const target = evt.target;
    if (mobileDrawer.classList.contains("open") && !mobileDrawer.contains(target) && !hamburgerBtn.contains(target)) {
      mobileDrawer.classList.remove("open");
      mobileDrawer.setAttribute("aria-hidden", "true");
    }
  });

  // re-use your showSection logic for mobile drawer links
  mobileDrawer.querySelectorAll(".link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.dataset.target;
      if (target) {
        // close drawer then show section
        mobileDrawer.classList.remove("open");
        showSection(document.getElementById(target));
      }
    });
  });

  // sign in/up in drawer
  const drawerSignIn = document.getElementById("drawerSignIn");
  const drawerSignUp = document.getElementById("drawerSignUp");
  if (drawerSignIn) drawerSignIn.addEventListener("click", e => { e.preventDefault(); mobileDrawer.classList.remove('open'); showLogin(); });
  if (drawerSignUp) drawerSignUp.addEventListener("click", e => { e.preventDefault(); mobileDrawer.classList.remove('open'); showRegister(); });
}

