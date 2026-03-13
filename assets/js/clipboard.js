// shared clipboard utility - copies text and shows a "Copied!" tooltip near the clicked element

// inject tooltip styles once when the script loads
(function () {
  const style = document.createElement("style");
  style.textContent = `
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

function copyToClipboard(text, element) {
  navigator.clipboard.writeText(text).then(function () {
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
