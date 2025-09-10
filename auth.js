const form = document.getElementById("auth-form");

form.addEventListener("submit", e => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Preencha todos os campos");
    return;
  }

  // Recupera usuários salvos
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let user = users.find(u => u.username === username);

  if (user) {
    // Login
    if (user.password !== password) {
      alert("Senha incorreta!");
      return;
    }
  } else {
    // Cadastro
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Salvar sessão
  localStorage.setItem("sessionUser", JSON.stringify({ username }));

  // Redirecionar para o marketplace
  window.location.href = "marketplace.html";
});
