document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    document.getElementById("mensaje").textContent = "Por favor, completa todos los campos.";
    return;
  }

  // Obtener lista de usuarios
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verificar si el usuario ya existe
  const existe = usuarios.some(u => u.username === username);
  if (existe) {
    document.getElementById("mensaje").textContent = "⚠️ El nombre de usuario ya existe.";
    return;
  }

  // Agregar nuevo usuario
  usuarios.push({ username, password });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  document.getElementById("mensaje").textContent = "✅ Usuario creado con éxito.";
  document.getElementById("signupForm").reset();
});
