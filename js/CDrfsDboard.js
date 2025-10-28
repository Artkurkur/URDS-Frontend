document.addEventListener("DOMContentLoaded", () => {
  // ✅ Toggle logic for the three checklist buttons
  const toggles = document.querySelectorAll(
    ".Nrevision-checklist, .disapproved-checklist, .approved-checklist"
  );

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggles.forEach((b) => b.classList.remove("active"));
      btn.classList.toggle("active");
    });
  });

  // ✅ Modal logic
  const summaryBtn = document.querySelector(".summary-btn");
  const modal = document.getElementById("evaluationModal");

  if (summaryBtn && modal) {
    summaryBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent form submit
      modal.classList.add("active"); // show modal via CSS class
    });
  }

  // ✅ Close modal function (used by close button)
  window.closeModal = function () {
    modal.classList.remove("active");
  };

  // ✅ Close modal when clicking outside the box
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.classList.remove("active");
    }
  };
});
