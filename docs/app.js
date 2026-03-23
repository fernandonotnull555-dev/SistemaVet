const KEY = "vet_demo_data_v1";

function seed() {
  const existing = localStorage.getItem(KEY);
  if (existing) return JSON.parse(existing);
  const data = {
    users: [
      { correo: "admin@demo.local", pass: "admin123", rol: "Administrador" },
      { correo: "empleado@demo.local", pass: "admin123", rol: "Empleado" }
    ],
    productos: [
      { id: 1, nombre: "Alimiau", descripcion: "Alimento para gato", precio: 1.5, cantidad: 60 },
      { id: 2, nombre: "Don Gato", descripcion: "Comida humeda", precio: 1.25, cantidad: 40 }
    ],
    pacientes: [
      { id: 1, nombre: "Tuto", especie: "Felino", sexo: "Masculino" }
    ],
    citas: [
      { id: 1, id_paciente: 1, fecha: "2025-04-03 08:30", motivo: "Vacunacion" }
    ]
  };
  localStorage.setItem(KEY, JSON.stringify(data));
  return data;
}

let state = seed();

function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
function $(id) { return document.getElementById(id); }

function renderProductos(rows = state.productos) {
  $("productosBody").innerHTML = rows.map(p => `<tr><td>${p.id}</td><td>${p.nombre}</td><td>${p.descripcion}</td><td>${p.precio}</td><td>${p.cantidad}</td></tr>`).join("");
}
function renderPacientes() {
  $("pacientesBody").innerHTML = state.pacientes.map(p => `<tr><td>${p.id}</td><td>${p.nombre}</td><td>${p.especie}</td><td>${p.sexo}</td></tr>`).join("");
}
function renderCitas() {
  $("citasBody").innerHTML = state.citas.map(c => `<tr><td>${c.id}</td><td>${c.id_paciente}</td><td>${c.fecha}</td><td>${c.motivo}</td></tr>`).join("");
}

$("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const correo = $("correo").value.trim();
  const contrasena = $("contrasena").value.trim();
  const user = state.users.find(u => u.correo === correo && u.pass === contrasena);
  if (!user) return alert("Credenciales incorrectas en demo");
  $("loginCard").classList.add("hidden");
  $("appCard").classList.remove("hidden");
  $("welcome").textContent = `Sesion: ${user.correo} (${user.rol})`;
  renderProductos(); renderPacientes(); renderCitas();
});

$("logoutBtn").addEventListener("click", () => location.reload());

$("addProducto").addEventListener("click", () => {
  const nombre = $("p_nombre").value.trim();
  if (!nombre) return;
  const item = {
    id: state.productos.length ? Math.max(...state.productos.map(x => x.id)) + 1 : 1,
    nombre,
    descripcion: $("p_desc").value.trim(),
    precio: Number($("p_precio").value || 0),
    cantidad: Number($("p_cant").value || 0)
  };
  state.productos.push(item); save(); renderProductos();
});

$("buscarProducto").addEventListener("click", () => {
  const id = Number($("buscarProductoId").value || 0);
  renderProductos(state.productos.filter(p => p.id === id));
});

$("listarProducto").addEventListener("click", () => renderProductos());

$("addPaciente").addEventListener("click", () => {
  const nombre = $("pa_nombre").value.trim();
  if (!nombre) return;
  state.pacientes.push({
    id: state.pacientes.length ? Math.max(...state.pacientes.map(x => x.id)) + 1 : 1,
    nombre,
    especie: $("pa_especie").value.trim(),
    sexo: $("pa_sexo").value.trim()
  });
  save(); renderPacientes();
});

$("addCita").addEventListener("click", () => {
  const idPaciente = Number($("c_paciente").value || 0);
  if (!idPaciente) return;
  state.citas.push({
    id: state.citas.length ? Math.max(...state.citas.map(x => x.id)) + 1 : 1,
    id_paciente: idPaciente,
    fecha: $("c_fecha").value.trim(),
    motivo: $("c_motivo").value.trim()
  });
  save(); renderCitas();
});

document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});
