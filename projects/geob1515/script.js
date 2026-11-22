// ========================================
// XRD DATA ACCESS MODAL
// ========================================

const dataModal = document.getElementById("dataModal");
let previousFocus = null;

function openDataModal() {
  if (!dataModal) return;

  previousFocus = document.activeElement;
  dataModal.hidden = false;
  dataModal.querySelector(".modal-close").focus();
}

function closeDataModal() {
  if (!dataModal) return;

  dataModal.hidden = true;

  if (previousFocus) {
    previousFocus.focus();
  }
}

// Only attach modal event listeners if the modal exists
if (dataModal) {

  // Close when clicking outside the floating window
  dataModal.addEventListener("click", function(event) {
    if (event.target === dataModal) {
      closeDataModal();
    }
  });

  // Close with Escape; keep keyboard focus inside the dialog
  document.addEventListener("keydown", function(event) {
    if (dataModal.hidden) return;

    if (event.key === "Escape") {
      closeDataModal();
      return;
    }

    if (event.key === "Tab") {
      const controls = Array.from(
        dataModal.querySelectorAll(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
      );

      if (!controls.length) return;

      const first = controls[0];
      const last = controls[controls.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}


// ========================================
// SHARED PROJECT NAVIGATION
// ========================================

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("project-nav-container");

  if (!container) return;

  try {
    const response = await fetch("project-nav.html");

    if (!response.ok) {
      throw new Error("Unable to load project navigation");
    }

    container.innerHTML = await response.text();

    // Identify the current page
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    // Highlight the active navigation link
    container.querySelectorAll(".project-nav a").forEach(link => {
      const linkPage = link.getAttribute("href");

      if (linkPage === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });

  } catch (error) {
    console.error("Project navigation error:", error);
  }
});