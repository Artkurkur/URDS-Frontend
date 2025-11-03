document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".cards-container .card");
  const divider = document.querySelector(".divider-line");

  function moveIndicator(targetCard) {
    const cardRect = targetCard.getBoundingClientRect();
    const containerRect = targetCard.parentElement.getBoundingClientRect();

    const leftPos = cardRect.left - containerRect.left;
    const width = cardRect.width;

    divider.style.setProperty("--indicator-left", `${leftPos}px`);
    divider.style.setProperty("--indicator-width", `${width}px`);

    // Apply directly to pseudo-element using inline style
    divider.style.setProperty("--indicator-left", `${leftPos}px`);
    divider.style.setProperty("--indicator-width", `${width}px`);

    // Update the ::after pseudo-element position
    divider.style.setProperty("--indicator-left", `${leftPos}px`);
    divider.style.setProperty("--indicator-width", `${width}px`);
    divider.querySelector?.(":after"); // optional refresh
    divider.style.setProperty("--indicator-transform", `translateX(${leftPos}px)`);
    divider.style.setProperty("--indicator-width", `${width}px`);

    divider.style.setProperty("--indicator-left", `${leftPos}px`);
  }

  // Move the ::after using CSS variables
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .divider-line::after {
      transform: translateX(var(--indicator-left, 0));
      width: var(--indicator-width, 0);
    }
  `;
  document.head.appendChild(styleSheet);

  // Add event listeners
  cards.forEach(card => {
    card.addEventListener("click", () => moveIndicator(card));
  });

  // Initialize position to first card
  if (cards.length > 0) moveIndicator(cards[0]);
});

document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.querySelector(".main-container");
  const header = mainContainer?.querySelector("h3");

  // Function to toggle scroll behavior based on screen size
  function applyScrollBehavior() {
    if (window.matchMedia("(max-width: 768px)").matches) {
      // Enable scroll listener for mobile view
      mainContainer.addEventListener("scroll", handleScroll);
    } else {
      // Disable scroll listener and reset header visibility
      mainContainer.removeEventListener("scroll", handleScroll);
      if (header) header.style.display = "block";
    }
  }

  function handleScroll() {
    if (mainContainer.scrollTop > 10) {
      header.style.display = "none";
    } else {
      header.style.display = "block";
    }
  }

  // Initial check
  applyScrollBehavior();

  // Listen for window resizing (desktop ↔ mobile transitions)
  window.addEventListener("resize", applyScrollBehavior);
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".cards-container .card");
  const tableBody = document.getElementById("facultyTableBody");
  const submissions = [
    {
      researcher: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      call: "Computer Science",
      title: "Machine Learning Applications in Healthcare Diagnostics",
      status: "pending",
      date: "2024-02-15"
    },
    {
      researcher: "Dr. Robert Kim",
      email: "robart.kim@university.edu",
      call: "Mechanical Engineering",
      title: "Renewable Energy Storage Solutions",
      status: "rejected",
      date: "2024-02-15"
    },
    {
      researcher: "Dr. Emily Cruz",
      email: "emily.cruz@university.edu",
      call: "Civil Engineering",
      title: "Smart Infrastructure Monitoring using IoT Technologies",
      status: "approved",
      date: "2024-02-15"
    },
    {
      researcher: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      call: "Computer Science",
      title: "Machine Learning Applications in Healthcare Diagnostics",
      status: "pending",
      date: "2024-02-15"
    },
    {
      researcher: "Dr. Robert Kim",
      email: "robart.kim@university.edu",
      call: "Mechanical Engineering",
      title: "Renewable Energy Storage Solutions",
      status: "pending",
      date: "2024-02-15"
    },
    {
      researcher: "Dr. Emily Cruz",
      email: "emily.cruz@university.edu",
      call: "Civil Engineering",
      title: "Smart Infrastructure Monitoring using IoT Technologies",
      status: "approved",
      date: "2024-02-15"
    },
    {
      researcher: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      call: "Computer Science",
      title: "Machine Learning Applications in Healthcare Diagnostics",
      status: "pending",
      date: "2024-02-15"
    },
    {
      researcher: "Dr. Robert Kim",
      email: "robart.kim@university.edu",
      call: "Mechanical Engineering",
      title: "Renewable Energy Storage Solutions",
      status: "pending",
      date: "2024-02-15"
    }
  ];

  // ✅ Populate table dynamically
  submissions.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${item.researcher}</strong><br>
          <a href="mailto:${item.email}">${item.email}</a></td>
      <td>${item.call}</td>
      <td>${item.title}</td>
      <td><span class="status ${item.status}">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span></td>
      <td>${item.date}</td>
      <td><button class="viewBtn">👁️</button></td>
    `;
    tableBody.appendChild(row);
  });

  // ✅ Now that rows exist, attach filtering logic
  const tableRows = document.querySelectorAll(".faculty-table tbody tr");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const cardClass =
        card.classList.contains("pending")
          ? "pending"
          : card.classList.contains("approved")
          ? "approved"
          : card.classList.contains("rejected")
          ? "rejected"
          : "total";

      tableRows.forEach(row => {
        const statusCell = row.querySelector(".status");
        if (!statusCell) return;

        if (cardClass === "total") {
          row.style.display = "";
        } else {
          row.style.display = statusCell.classList.contains(cardClass)
            ? ""
            : "none";
        }
      });
    });
  });
});
