// copies email addresses and publication references with tooltip feedback.

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

function showCopyTooltip(element, message) {
  // replace earlier feedback so repeated clicks do not stack tooltips.
  document.querySelectorAll(".copy-tooltip").forEach(function (tooltip) {
    tooltip.remove();
  });

  const tooltip = document.createElement("div");
  tooltip.className = "copy-tooltip";
  tooltip.setAttribute("role", "status");
  document.body.appendChild(tooltip);
  tooltip.textContent = message;

  const rect = element.getBoundingClientRect();
  tooltip.style.left =
    Math.max(8, Math.min(
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2,
      window.innerWidth - tooltip.offsetWidth - 8,
    )) + "px";
  tooltip.style.top = Math.max(8, rect.top - tooltip.offsetHeight - 6) + "px";

  // leave enough time to read failure messages, then fade out and remove.
  setTimeout(function () {
    tooltip.classList.add("fade");
  }, 3000);
  setTimeout(function () {
    tooltip.remove();
  }, 3400);
}

async function copyEmail(element) {
  try {
    await navigator.clipboard.writeText(EMAIL);
    showCopyTooltip(element, "Copied!");
  } catch {
    showCopyTooltip(element, "Couldn't copy email.");
  }
}

/** Formats the site's BibTeX metadata as a plain-text, author-date citation.
 * Returns a reference with authors, title, venue, and an available DOI or URL.
 */
function formatReference(bibtex, fallbackUrl) {
  // each field in the site's reference files occupies one line and uses braces.
  const fields = {};
  const fieldPattern = /^\s*(\w+)\s*=\s*\{(.*?)\},?\s*$/gm;
  for (const match of bibtex.matchAll(fieldPattern)) {
    fields[match[1].toLowerCase()] = match[2]
      .replace(/[{}]/g, "")
      .replace(/\\([&%_$#])/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
  }

  if (!fields.author || !fields.year || !fields.title) {
    throw new Error("The reference is missing authors, year, or title.");
  }

  // preserve surname particles and hyphens while shortening given names.
  const authors = fields.author.split(/\s+and\s+/).map(function (author) {
    const [surname, givenNames] = author.split(",").map(function (part) {
      return part.trim();
    });
    if (!givenNames) return surname;
    const initials = givenNames.split(/\s+/).map(function (name) {
      return name.split("-").map(function (part) {
        return part.charAt(0) + ".";
      }).join("-");
    }).join(" ");
    return surname + ", " + initials;
  });
  const authorList = authors.length === 1
    ? authors[0]
    : authors.slice(0, -1).join(", ") + ", & " + authors[authors.length - 1];

  // retain question marks and other existing punctuation at the end of titles.
  const title = /[.!?]$/.test(fields.title) ? fields.title : fields.title + ".";
  const parts = [authorList + " (" + fields.year + ").", title];
  if (fields.booktitle) {
    let venue = "In " + fields.booktitle;
    if (fields.pages) venue += " (pp. " + fields.pages.replace(/--/g, "–") + ")";
    parts.push(venue + ".");
    if (fields.publisher) parts.push(fields.publisher + ".");
  } else if (fields.journal) {
    parts.push(fields.journal + ".");
  }

  // prefer a stable doi; the publication link also covers forthcoming papers.
  const url = fields.doi
    ? "https://doi.org/" + fields.doi
    : fields.url || fallbackUrl;
  if (url) parts.push(url);
  return parts.join(" ");
}

async function prepareReferenceButton(button) {
  let reference;
  try {
    // preload the file so writing to the clipboard happens directly on click.
    const response = await fetch(button.dataset.bibtex);
    if (!response.ok) return;
    reference = formatReference(
      await response.text(),
      button.dataset.referenceUrl,
    );
  } catch {
    // keep the existing reference link available if the file cannot be loaded.
    return;
  }

  button.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(reference);
      showCopyTooltip(button, "Copied!");
    } catch {
      showCopyTooltip(button, "Couldn't copy. Use the BibTeX link.");
    }
  });
  button.hidden = false;
}

// attach email handlers and prepare references in every publication section.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".copy-email").forEach(function (el) {
    el.addEventListener("click", function () {
      copyEmail(el);
    });
  });

  // only show copy buttons when the browser provides clipboard access.
  if (navigator.clipboard && navigator.clipboard.writeText) {
    document.querySelectorAll(".copy-reference").forEach(function (button) {
      prepareReferenceButton(button);
    });
  }
});
