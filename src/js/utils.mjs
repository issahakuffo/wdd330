// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  console.log(template);
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  try{
    const headerTemplate = await loadTemplate("../partials/header.html");
    const footerTemplate = await loadTemplate("../partials/footer.html");

    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
  } catch (error) {
    console.error("Error loading header and footer");
  }
}

export function alertMessage(message, scroll = true) {
  // Crear elemento para la alerta
  const alert = document.createElement("div");
  alert.classList.add("alert");
  
  // Crear botón de cierre (X)
  const closeButton = document.createElement("span");
  closeButton.innerText = "✖";
  closeButton.classList.add("alert-close");
  
  // Agregar contenido de la alerta
  alert.innerText = message;
  alert.appendChild(closeButton);
  
  // Agregar evento para cerrar la alerta
  closeButton.addEventListener("click", function(e) {
    e.stopPropagation(); // Evita que el evento se propague
    alert.remove();
  });
  
  // Agregar la alerta al inicio del elemento main
  const main = document.querySelector("main");
  if (main) {
    main.prepend(alert);
  } else {
    console.warn("Elemento <main> no encontrado.");
  }

  // Desplazar al usuario al inicio si scroll es true
  if (scroll) {
    window.scrollTo(0, 0);
  }
}