const form = document.getElementById("product-form");
const productsList = document.getElementById("products-list");

// Carregar produtos do localStorage
let products = JSON.parse(localStorage.getItem("products") || "[]");
renderProducts();

// Captura o envio do formulário
form.addEventListener("submit", e => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const imageInput = document.getElementById("image");

  // Converte a imagem em base64
  if (imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      addProduct(title, price, description, reader.result);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    addProduct(title, price, description, null);
  }

  form.reset();
});

function addProduct(title, price, description, image) {
  const newProduct = { id: Date.now(), title, price, description, image };
  products.unshift(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

function renderProducts() {
  productsList.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      ${p.image ? `<img src="${p.image}" alt="${p.title}">` : `<div style="height:150px;background:#eee;display:flex;align-items:center;justify-content:center;color:#888;">Sem imagem</div>`}
      <h3>${p.title}</h3>
      <p><strong>$${p.price}</strong></p>
      <p>${p.description}</p>
    `;
    productsList.appendChild(div);
  });
}
