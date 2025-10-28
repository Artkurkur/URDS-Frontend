document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(
    ".Nrevision-checklist, .disapproved-checklist, .approved-checklist"
  );

  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      toggles.forEach(b => b.classList.remove("active"));
      btn.classList.toggle("active");
    });
  });
});
