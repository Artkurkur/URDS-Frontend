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

document.addEventListener("DOMContentLoaded", function() {
  const mainContainer = document.querySelector(".main-container");
  const header = mainContainer.querySelector("h3");

  if (mainContainer && header) {
    mainContainer.addEventListener("scroll", () => {
      if (mainContainer.scrollTop > 10) {
        header.style.display = "none";
      } else {
        header.style.display = "block";
      }
    });
  }
});