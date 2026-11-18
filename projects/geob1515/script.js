const dataModal = document.getElementById("dataModal");
let previousFocus = null;

function openDataModal() {
  previousFocus = document.activeElement;
  dataModal.hidden = false;
  dataModal.querySelector(".modal-close").focus();
}

function closeDataModal() {
  dataModal.hidden = true;

  if (previousFocus) {
    previousFocus.focus();
  }
}

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
