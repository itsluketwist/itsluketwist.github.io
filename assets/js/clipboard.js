// email clipboard utility - copies the email address and shows a "Copied!" tooltip

const EMAIL = "lukas.twist@kcl.ac.uk";

// inject tooltip styles once when the script loads
(function () {
  const style = document.createElement("style");
  style.textContent = `
    .copy-email {
      color: var(--global-theme-color);
      cursor: pointer;
      text-decoration: none;
      font-weight: bold;
      font-style: italic;
    }
    .copy-email:hover {
      color: var(--global-hover-color);
    }
    .copy-tooltip {
      position: fixed;
      background: #333;
      color: #fff;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      pointer-events: none;
      opacity: 1;
      transition: opacity 0.4s ease;
      z-index: 9999;
    }
    .copy-tooltip.fade {
      opacity: 0;
    }
  `;
  document.head.appendChild(style);
})();

function copyEmail(element) {
  navigator.clipboard.writeText(EMAIL).then(function () {
    // create and position the tooltip near the clicked element
    const tooltip = document.createElement("div");
    tooltip.className = "copy-tooltip";
    tooltip.textContent = "Copied!";
    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left =
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
    tooltip.style.top = rect.top - tooltip.offsetHeight - 6 + "px";

    // fade out then remove
    setTimeout(function () {
      tooltip.classList.add("fade");
    }, 1000);
    setTimeout(function () {
      tooltip.remove();
    }, 1400);
  });
}

// attach click handlers to all elements with the "copy-email" class
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".copy-email").forEach(function (el) {
    el.addEventListener("click", function () {
      copyEmail(el);
    });
  });
});
