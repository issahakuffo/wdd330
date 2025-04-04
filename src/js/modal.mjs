export function createModal(content) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.style.display = "flex"; // Show immediately
  modal.innerHTML = content;

  // Attach close listener if .close-button exists
  const closeButton = modal.querySelector(".close-button");
  if (closeButton) {
    closeButton.addEventListener("click", () => modal.remove());
  }

  const modalContainer = document.getElementById("modal-container");
  if (modalContainer) {
    modalContainer.appendChild(modal);
  } else {
    document.body.appendChild(modal);
  }

  return modal;
}

export function showModal(content) {
  return createModal(content);
}
