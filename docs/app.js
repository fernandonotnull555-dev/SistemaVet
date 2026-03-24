(function () {
  'use strict';

  const STORAGE_KEY = 'vet_demo_data_v2';

  const IMG_HINT =
    '';

  let state = null;
  let currentUser = null;

  function $(id) {
    return document.getElementById(id);
  }

  function nextId(list, key) {
    if (!list.length) return 1;
    return Math.max.apply(null, list.map((x) => Number(x[key]) || 0)) + 1;
  }

  function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.warn('JSON inválido en localStorage, reiniciando demo.');
      }
    }
    return {
      users: [
        { id_usuario: 1, nombre_completo: 'Administrador demo', correo_electronico: 'admin@demo.local', pass: 'admin123', rol_usuario: 'Administrador' },
        { id_usuario: 2, nombre_completo: 'Empleado demo', correo_electronico: 'empleado@demo.local', pass: 'admin123', rol_usuario: 'Empleado' },
        { id_usuario: 3, nombre_completo: 'Carla Rodríguez', correo_electronico: 'carla@demo.local', pass: 'admin123', rol_usuario: 'Empleado' },
        { id_usuario: 4, nombre_completo: 'Luis García', correo_electronico: 'luis@demo.local', pass: 'admin123', rol_usuario: 'Empleado' },
        { id_usuario: 5, nombre_completo: 'María López', correo_electronico: 'maria@demo.local', pass: 'admin123', rol_usuario: 'Empleado' },
      ],
      productos: [
        { id: 1, nombre: 'Alimiau', descripcion: 'Alimento para gato', precio: 1.5, cantidad_exist: 60 },
        { id: 2, nombre: 'Don Gato', descripcion: 'Comida húmeda', precio: 1.25, cantidad_exist: 40 },
        { id: 3, nombre: 'Pedigree Perro', descripcion: 'Alimento seco para perro', precio: 2.0, cantidad_exist: 100 },
        { id: 4, nombre: 'Royal Canin', descripcion: 'Comida premium para gatos', precio: 5.5, cantidad_exist: 35 },
        { id: 5, nombre: 'Antiparasitario', descripcion: 'Tratamiento contra parásitos', precio: 8.99, cantidad_exist: 20 },
        { id: 6, nombre: 'Vitaminas', descripcion: 'Complejo vitamínico para mascotas', precio: 6.5, cantidad_exist: 25 },
        { id: 7, nombre: 'Champú antipulgas', descripcion: 'Champú para perros', precio: 3.75, cantidad_exist: 15 },
        { id: 8, nombre: 'Collar antipulgas', descripcion: 'Collar de protección', precio: 4.99, cantidad_exist: 30 },
        { id: 9, nombre: 'Arena sanitaria', descripcion: 'Arena para gatos', precio: 2.25, cantidad_exist: 50 },
        { id: 10, nombre: 'Cama para mascota', descripcion: 'Cama cómoda y acolchada', precio: 15.0, cantidad_exist: 12 },
        { id: 11, nombre: 'Juguete mordedor', descripcion: 'Juguete de goma', precio: 2.5, cantidad_exist: 45 },
        { id: 12, nombre: 'Correa extensible', descripcion: 'Correa para paseo', precio: 7.99, cantidad_exist: 18 },
        { id: 13, nombre: 'Transportadora', descripcion: 'Transportadora mediana', precio: 22.5, cantidad_exist: 8 },
        { id: 14, nombre: 'Comedero automático', descripcion: 'Dispensador de comida', precio: 18.99, cantidad_exist: 10 },
        { id: 15, nombre: 'Antibiótico', descripcion: 'Medicamento prescrito', precio: 11.5, cantidad_exist: 14 },
      ],
      pacientes: [
        { id_paciente: 1, id_prop: 1, Nombre: 'Tuto Murillo', Especie: 'Felino', Sexo: 'Masculino', Peso: '18 kg', Edad: '5 años', id_cita: null },
        { id_paciente: 2, id_prop: 2, Nombre: 'Max', Especie: 'Canino', Sexo: 'Masculino', Peso: '25 kg', Edad: '3 años', id_cita: null },
        { id_paciente: 3, id_prop: 3, Nombre: 'Luna', Especie: 'Felino', Sexo: 'Femenino', Peso: '4.5 kg', Edad: '2 años', id_cita: null },
        { id_paciente: 4, id_prop: 4, Nombre: 'Rocky', Especie: 'Canino', Sexo: 'Masculino', Peso: '30 kg', Edad: '4 años', id_cita: null },
        { id_paciente: 5, id_prop: 5, Nombre: 'Bella', Especie: 'Canino', Sexo: 'Femenino', Peso: '20 kg', Edad: '2 años', id_cita: null },
        { id_paciente: 6, id_prop: 6, Nombre: 'Miau', Especie: 'Felino', Sexo: 'Masculino', Peso: '5 kg', Edad: '1 año', id_cita: null },
        { id_paciente: 7, id_prop: 7, Nombre: 'Perla', Especie: 'Canino', Sexo: 'Femenino', Peso: '15 kg', Edad: '6 años', id_cita: null },
        { id_paciente: 8, id_prop: 8, Nombre: 'Simón', Especie: 'Felino', Sexo: 'Masculino', Peso: '4.2 kg', Edad: '3 años', id_cita: null },
        { id_paciente: 9, id_prop: 9, Nombre: 'Dino', Especie: 'Canino', Sexo: 'Masculino', Peso: '28 kg', Edad: '2 años', id_cita: null },
        { id_paciente: 10, id_prop: 10, Nombre: 'Nala', Especie: 'Felino', Sexo: 'Femenino', Peso: '3.8 kg', Edad: '4 meses', id_cita: null },
        { id_paciente: 11, id_prop: 11, Nombre: 'Toby', Especie: 'Canino', Sexo: 'Masculino', Peso: '35 kg', Edad: '7 años', id_cita: null },
        { id_paciente: 12, id_prop: 12, Nombre: 'Sasha', Especie: 'Canino', Sexo: 'Femenino', Peso: '22 kg', Edad: '5 años', id_cita: null },
        { id_paciente: 13, id_prop: 13, Nombre: 'Tigre', Especie: 'Felino', Sexo: 'Masculino', Peso: '6 kg', Edad: '2 años', id_cita: null },
        { id_paciente: 14, id_prop: 14, Nombre: 'Coco', Especie: 'Canino', Sexo: 'Masculino', Peso: '12 kg', Edad: '1 año', id_cita: null },
        { id_paciente: 15, id_prop: 15, Nombre: 'Mimi', Especie: 'Felino', Sexo: 'Femenino', Peso: '4 kg', Edad: '8 años', id_cita: null },
        { id_paciente: 16, id_prop: 1, Nombre: 'Rex', Especie: 'Canino', Sexo: 'Masculino', Peso: '32 kg', Edad: '4 años', id_cita: null },
        { id_paciente: 17, id_prop: 2, Nombre: 'Félix', Especie: 'Felino', Sexo: 'Masculino', Peso: '5.2 kg', Edad: '3 años', id_cita: null },
        { id_paciente: 18, id_prop: 3, Nombre: 'Lola', Especie: 'Canino', Sexo: 'Femenino', Peso: '18 kg', Edad: '2 años', id_cita: null },
        { id_paciente: 19, id_prop: 4, Nombre: 'Sofía', Especie: 'Felino', Sexo: 'Femenino', Peso: '3.5 kg', Edad: '6 meses', id_cita: null },
        { id_paciente: 20, id_prop: 5, Nombre: 'Bruno', Especie: 'Canino', Sexo: 'Masculino', Peso: '26 kg', Edad: '3 años', id_cita: null },
      ],
      propietarios: [
        { id_prop: 1, id_paciente: 0, Nombre_Completo: 'Fernando Murillo', telefono: '0000-0000', correo_electronico: 'demo@ejemplo.local' },
        { id_prop: 2, id_paciente: 0, Nombre_Completo: 'Juan Pérez', telefono: '8888-1111', correo_electronico: 'juan@ejemplo.local' },
        { id_prop: 3, id_paciente: 0, Nombre_Completo: 'María Sánchez', telefono: '8888-2222', correo_electronico: 'maria@ejemplo.local' },
        { id_prop: 4, id_paciente: 0, Nombre_Completo: 'Carlos Ramírez', telefono: '8888-3333', correo_electronico: 'carlos@ejemplo.local' },
        { id_prop: 5, id_paciente: 0, Nombre_Completo: 'Laura González', telefono: '8888-4444', correo_electronico: 'laura@ejemplo.local' },
        { id_prop: 6, id_paciente: 0, Nombre_Completo: 'Pedro Castillo', telefono: '8888-5555', correo_electronico: 'pedro@ejemplo.local' },
        { id_prop: 7, id_paciente: 0, Nombre_Completo: 'Ana Martínez', telefono: '8888-6666', correo_electronico: 'ana@ejemplo.local' },
        { id_prop: 8, id_paciente: 0, Nombre_Completo: 'Ricardo Flores', telefono: '8888-7777', correo_electronico: 'ricardo@ejemplo.local' },
        { id_prop: 9, id_paciente: 0, Nombre_Completo: 'Sofía Álvarez', telefono: '8888-8888', correo_electronico: 'sofia@ejemplo.local' },
        { id_prop: 10, id_paciente: 0, Nombre_Completo: 'Diego Torres', telefono: '8888-9999', correo_electronico: 'diego@ejemplo.local' },
        { id_prop: 11, id_paciente: 0, Nombre_Completo: 'Valentina Rojas', telefono: '9999-0001', correo_electronico: 'valentina@ejemplo.local' },
        { id_prop: 12, id_paciente: 0, Nombre_Completo: 'Javier Aguirre', telefono: '9999-0002', correo_electronico: 'javier@ejemplo.local' },
        { id_prop: 13, id_paciente: 0, Nombre_Completo: 'Gabriela Molina', telefono: '9999-0003', correo_electronico: 'gabriela@ejemplo.local' },
        { id_prop: 14, id_paciente: 0, Nombre_Completo: 'Miguel Hernández', telefono: '9999-0004', correo_electronico: 'miguel@ejemplo.local' },
        { id_prop: 15, id_paciente: 0, Nombre_Completo: 'Camila Vargas', telefono: '9999-0005', correo_electronico: 'camila@ejemplo.local' },
      ],
      citas: [
        { id_cita: 1, id_paciente: 1, fecha_cita: '2025-04-03 08:30', motivo: 'Vacunación' },
        { id_cita: 2, id_paciente: 2, fecha_cita: '2025-04-04 09:00', motivo: 'Revisión general' },
        { id_cita: 3, id_paciente: 3, fecha_cita: '2025-04-05 10:30', motivo: 'Castración' },
        { id_cita: 4, id_paciente: 4, fecha_cita: '2025-04-06 14:00', motivo: 'Limpieza de dientes' },
        { id_cita: 5, id_paciente: 5, fecha_cita: '2025-04-07 11:00', motivo: 'Vacunación anual' },
        { id_cita: 6, id_paciente: 6, fecha_cita: '2025-04-08 15:30', motivo: 'Revisión oftalmológica' },
        { id_cita: 7, id_paciente: 7, fecha_cita: '2025-04-09 09:30', motivo: 'Tratamiento antipulgas' },
        { id_cita: 8, id_paciente: 8, fecha_cita: '2025-04-10 13:00', motivo: 'Cirugía menor' },
        { id_cita: 9, id_paciente: 9, fecha_cita: '2025-04-11 10:00', motivo: 'Análisis de sangre' },
        { id_cita: 10, id_paciente: 10, fecha_cita: '2025-04-12 14:30', motivo: 'Primera vacuna' },
        { id_cita: 11, id_paciente: 11, fecha_cita: '2025-04-13 11:30', motivo: 'Control de edad' },
        { id_cita: 12, id_paciente: 12, fecha_cita: '2025-04-14 09:00', motivo: 'Radiografía' },
        { id_cita: 13, id_paciente: 13, fecha_cita: '2025-04-15 15:00', motivo: 'Extracción de muela' },
        { id_cita: 14, id_paciente: 14, fecha_cita: '2025-04-16 10:30', motivo: 'Consulta dermatológica' },
        { id_cita: 15, id_paciente: 15, fecha_cita: '2025-04-17 12:00', motivo: 'Seguimiento post-quirúrgico' },
      ],
    };
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function migrateFromV1() {
    const old = localStorage.getItem('vet_demo_data_v1');
    if (!old) return;
    try {
      const o = JSON.parse(old);
      if (o.productos && o.users) {
        state = {
          users: o.users.map((u, i) => ({
            id_usuario: i + 1,
            nombre_completo: u.correo.split('@')[0],
            correo_electronico: u.correo,
            pass: u.pass,
            rol_usuario: u.rol,
          })),
          productos: o.productos.map((p) => ({
            id: p.id,
            nombre: p.nombre,
            descripcion: p.descripcion,
            precio: p.precio,
            cantidad_exist: p.cantidad,
          })),
          pacientes: (o.pacientes || []).map((p, i) => ({
            id_paciente: p.id || i + 1,
            id_prop: 1,
            Nombre: p.nombre,
            Especie: p.especie,
            Sexo: p.sexo,
            Peso: '',
            Edad: '',
            id_cita: null,
          })),
          propietarios: [{ id_prop: 1, id_paciente: 0, Nombre_Completo: 'Demo', telefono: '0000', correo_electronico: 'demo@local' }],
          citas: (o.citas || []).map((c, i) => ({
            id_cita: c.id || i + 1,
            id_paciente: c.id_paciente,
            fecha_cita: c.fecha,
            motivo: c.motivo,
          })),
        };
        save();
      }
    } catch (e) { /* ignore */ }
    localStorage.removeItem('vet_demo_data_v1');
  }

  function tableHtml(headers, rows) {
    if (!rows.length) return '<p>Sin resultados.</p>';
    const h = '<tr>' + headers.map((x) => '<th>' + x + '</th>').join('') + '</tr>';
    const b = rows.map((r) => '<tr>' + r.map((c) => '<td>' + escapeHtml(String(c)) + '</td>').join('') + '</tr>').join('');
    return '<table class="data"><thead>' + h + '</thead><tbody>' + b + '</tbody></table>';
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function workspace(html) {
    $('workspace').innerHTML = '<div class="workspace-inner">' + html + '</div>';
  }

  function backBtnAdmin() {
    return '<div class="stack-btns"><button type="button" class="secondary" data-go="admin-inicio">Regresar al menú</button></div>';
  }

  function backBtnEmp() {
    return '<div class="stack-btns"><button type="button" class="secondary" data-go="emp-inicio">Regresar al menú</button></div>';
  }

  function bindWorkspaceClicks() {
    $('workspace').querySelectorAll('[data-go]').forEach((el) => {
      el.addEventListener('click', () => go(el.getAttribute('data-go')));
    });
  }

  function go(view) {
    const isAdmin = currentUser && currentUser.rol_usuario === 'Administrador';

    if (view === 'admin-inicio' && !isAdmin) return;
    if (view.startsWith('admin-') && !isAdmin) return;
    if (view.startsWith('emp-') && (!currentUser || currentUser.rol_usuario !== 'Empleado')) return;

    switch (view) {
      case 'admin-inicio':
        workspace('<h2>Bienvenido/a</h2><p class="hint"></p>');
        break;

      case 'emp-inicio':
        workspace('<h2>Bienvenido/a</h2><p class="hint"></p>');
        break;

      /* ——— Administrador: crear usuario ——— */
      case 'admin-crear-usuario':
        workspace(
          '<h2>Crear usuario</h2><p class="hint">Equivalente a <code>insertar_usuario.html</code></p>' +
            '<div class="form-grid">' +
            '<label>Nombre completo<input id="f_nu_nombre" /></label>' +
            '<label>Correo<input id="f_nu_correo" type="email" /></label>' +
            '<label>Contraseña<input id="f_nu_pass" type="password" /></label>' +
            '<label>Rol<select id="f_nu_rol"><option>Administrador</option><option>Empleado</option></select></label>' +
            '<button type="button" class="action" id="btn_nu_save">Guardar</button>' +
            '<div id="f_nu_msg"></div></div>' +
            backBtnAdmin()
        );
        $('btn_nu_save').onclick = () => {
          const nombre = $('f_nu_nombre').value.trim();
          const correo = $('f_nu_correo').value.trim();
          const pass = $('f_nu_pass').value;
          const rol = $('f_nu_rol').value;
          if (!nombre || !correo || !pass) {
            $('f_nu_msg').innerHTML = '<div class="msg">Completa todos los campos.</div>';
            return;
          }
          if (state.users.some((u) => u.correo_electronico === correo)) {
            $('f_nu_msg').innerHTML = '<div class="msg">Ese correo ya existe.</div>';
            return;
          }
          state.users.push({
            id_usuario: nextId(state.users, 'id_usuario'),
            nombre_completo: nombre,
            correo_electronico: correo,
            pass: pass,
            rol_usuario: rol,
          });
          save();
          $('f_nu_msg').innerHTML = '<div class="msg">Usuario registrado.</div>';
        };
        break;

      /* ——— Submenú insertar (orden menu_insertarbd.html) ——— */
      case 'admin-submenu-insertar':
        workspace(
          '<h2>Insertar en la Base de Datos, seleccione la tabla</h2>' +
            '<div class="stack-btns">' +
            '<button type="button" data-go="admin-insertar-cita">Citas</button>' +
            '<button type="button" data-go="admin-insertar-paciente">Pacientes</button>' +
            '<button type="button" data-go="admin-insertar-propietario">Propietarios</button>' +
            '<button type="button" data-go="admin-insertar-producto">Productos</button>' +
            '<button type="button" class="secondary" data-go="admin-inicio">Regresar al menú</button>' +
            '</div>'
        );
        break;

      case 'admin-insertar-cita':
        workspace(
          '<h2>Insertar cita</h2><p class="hint"><code>insertar_cita.html</code></p>' +
            '<div class="form-grid">' +
            '<label>ID paciente<input id="f_ic_p" type="number" /></label>' +
            '<label>Fecha cita<input id="f_ic_f" /></label>' +
            '<label>Motivo<input id="f_ic_m" /></label>' +
            '<button type="button" class="action" id="btn_ic">Insertar</button><div id="msg_ic"></div></div>' +
            backBtnAdmin()
        );
        $('btn_ic').onclick = () => {
          const id_paciente = Number($('f_ic_p').value);
          const fecha = $('f_ic_f').value.trim();
          const motivo = $('f_ic_m').value.trim();
          if (!id_paciente || !fecha || !motivo) return ($('msg_ic').innerHTML = '<div class="msg">Completa los campos.</div>');
          const id = nextId(state.citas, 'id_cita');
          state.citas.push({ id_cita: id, id_paciente, fecha_cita: fecha, motivo });
          save();
          $('msg_ic').innerHTML = '<div class="msg">Cita insertada. ID: ' + id + '</div>';
        };
        break;

      case 'admin-insertar-paciente':
        workspace(
          '<h2>Insertar paciente</h2><p class="hint"><code>insertar_paciente.html</code></p>' +
            '<div class="form-grid">' +
            '<label>ID propietario<input id="f_ip_prop" type="number" /></label>' +
            '<label>Nombre<input id="f_ip_n" /></label>' +
            '<label>Especie<input id="f_ip_e" /></label>' +
            '<label>Sexo<input id="f_ip_s" /></label>' +
            '<label>Peso<input id="f_ip_p" /></label>' +
            '<label>Edad<input id="f_ip_ed" /></label>' +
            '<button type="button" class="action" id="btn_ip">Insertar</button><div id="msg_ip"></div></div>' +
            backBtnAdmin()
        );
        $('btn_ip').onclick = () => {
          const id_prop = Number($('f_ip_prop').value);
          const Nombre = $('f_ip_n').value.trim();
          if (!id_prop || !Nombre) return ($('msg_ip').innerHTML = '<div class="msg">ID propietario y nombre son obligatorios.</div>');
          const dup = state.pacientes.some((p) => p.Nombre === Nombre && p.id_prop === id_prop);
          if (dup) return ($('msg_ip').innerHTML = '<div class="msg">Ya existe ese paciente para el propietario.</div>');
          const id = nextId(state.pacientes, 'id_paciente');
          state.pacientes.push({
            id_paciente: id,
            id_prop,
            Nombre,
            Especie: $('f_ip_e').value.trim(),
            Sexo: $('f_ip_s').value.trim(),
            Peso: $('f_ip_p').value.trim(),
            Edad: $('f_ip_ed').value.trim(),
            id_cita: null,
          });
          save();
          $('msg_ip').innerHTML = '<div class="msg">Paciente insertado. ID: ' + id + '</div>';
        };
        break;

      case 'admin-insertar-propietario':
        workspace(
          '<h2>Insertar propietario</h2><p class="hint"><code>insertar_propietario.html</code></p>' +
            '<div class="form-grid">' +
            '<label>ID paciente (referencia)<input id="f_ipp_pac" type="number" /></label>' +
            '<label>Nombre completo<input id="f_ipp_n" /></label>' +
            '<label>Teléfono<input id="f_ipp_t" /></label>' +
            '<label>Correo<input id="f_ipp_c" type="email" /></label>' +
            '<button type="button" class="action" id="btn_ipp">Insertar</button><div id="msg_ipp"></div></div>' +
            backBtnAdmin()
        );
        $('btn_ipp').onclick = () => {
          const id_paciente = Number($('f_ipp_pac').value || 0);
          const Nombre_Completo = $('f_ipp_n').value.trim();
          const telefono = $('f_ipp_t').value.trim();
          const correo = $('f_ipp_c').value.trim();
          if (!Nombre_Completo || !telefono || !correo) return ($('msg_ipp').innerHTML = '<div class="msg">Completa los campos.</div>');
          const id_prop = nextId(state.propietarios, 'id_prop');
          state.propietarios.push({ id_prop, id_paciente, Nombre_Completo, telefono, correo_electronico: correo });
          save();
          $('msg_ipp').innerHTML = '<div class="msg">Propietario insertado. ID: ' + id_prop + '</div>';
        };
        break;

      case 'admin-insertar-producto':
        workspace(
          '<h2>Insertar producto</h2><p class="hint"><code>insertar_producto.html</code></p>' +
            '<div class="form-grid">' +
            '<label>Nombre<input id="f_ipr_n" /></label>' +
            '<label>Descripción<input id="f_ipr_d" /></label>' +
            '<label>Precio<input id="f_ipr_pr" type="number" step="0.01" /></label>' +
            '<label>Existencia<input id="f_ipr_c" type="number" /></label>' +
            '<button type="button" class="action" id="btn_ipr">Insertar</button><div id="msg_ipr"></div></div>' +
            backBtnAdmin()
        );
        $('btn_ipr').onclick = () => {
          const nombre = $('f_ipr_n').value.trim();
          if (!nombre) return;
          const id = nextId(state.productos, 'id');
          state.productos.push({
            id,
            nombre,
            descripcion: $('f_ipr_d').value.trim(),
            precio: Number($('f_ipr_pr').value || 0),
            cantidad_exist: Number($('f_ipr_c').value || 0),
          });
          save();
          $('msg_ipr').innerHTML = '<div class="msg">Producto insertado. ID: ' + id + '</div>';
        };
        break;

      /* ——— Modificar (orden modificar_bd.html) ——— */
      case 'admin-submenu-modificar':
        workspace(
          '<h2>Modificar Tablas</h2>' +
            '<div class="stack-btns">' +
            '<button type="button" data-go="admin-mod-cita">Modificar Citas</button>' +
            '<button type="button" data-go="admin-mod-paciente">Modificar Pacientes</button>' +
            '<button type="button" data-go="admin-mod-propietario">Modificar Propietarios</button>' +
            '<button type="button" data-go="admin-mod-producto">Modificar Productos</button>' +
            '<button type="button" data-go="admin-mod-usuario">Modificar Usuarios</button>' +
            '<button type="button" class="secondary" data-go="admin-inicio">Regresar al menú</button>' +
            '</div>'
        );
        break;

      case 'admin-mod-cita':
        workspace(
          '<h2>Modificar cita</h2><p class="hint"><code>modificar_citas.html</code></p>' +
            '<div class="form-grid">' +
            '<label>ID cita<input id="m_c_id" type="number" /></label>' +
            '<label>ID paciente<input id="m_c_p" type="number" /></label>' +
            '<label>Fecha<input id="m_c_f" /></label>' +
            '<label>Motivo<input id="m_c_m" /></label>' +
            '<button type="button" class="action" id="btn_mc">Actualizar</button><div id="msg_mc"></div></div>' +
            backBtnAdmin()
        );
        $('btn_mc').onclick = () => {
          const id = Number($('m_c_id').value);
          const c = state.citas.find((x) => x.id_cita === id);
          if (!c) return ($('msg_mc').innerHTML = '<div class="msg">Cita no encontrada.</div>');
          c.id_paciente = Number($('m_c_p').value);
          c.fecha_cita = $('m_c_f').value.trim();
          c.motivo = $('m_c_m').value.trim();
          save();
          $('msg_mc').innerHTML = '<div class="msg">Actualizado.</div>';
        };
        break;

      case 'admin-mod-paciente':
        workspace(
          '<h2>Modificar paciente</h2><p class="hint"><code>modificar_paciente.php</code></p>' +
            '<div class="form-grid">' +
            '<label>ID paciente<input id="m_p_id" type="number" /></label>' +
            '<label>ID propietario<input id="m_p_prop" type="number" /></label>' +
            '<label>Nombre<input id="m_p_n" /></label>' +
            '<label>Especie<input id="m_p_e" /></label>' +
            '<label>Sexo<input id="m_p_s" /></label>' +
            '<label>Peso<input id="m_p_pe" /></label>' +
            '<label>Edad<input id="m_p_ed" /></label>' +
            '<button type="button" class="action" id="btn_mp">Cargar / Actualizar</button><div id="msg_mp"></div></div>' +
            backBtnAdmin()
        );
        $('btn_mp').onclick = () => {
          const id = Number($('m_p_id').value);
          const p = state.pacientes.find((x) => x.id_paciente === id);
          if (!p) return ($('msg_mp').innerHTML = '<div class="msg">Paciente no encontrado.</div>');
          if (!$('m_p_n').value) {
            $('m_p_prop').value = p.id_prop;
            $('m_p_n').value = p.Nombre;
            $('m_p_e').value = p.Especie;
            $('m_p_s').value = p.Sexo;
            $('m_p_pe').value = p.Peso;
            $('m_p_ed').value = p.Edad;
            $('msg_mp').innerHTML = '<div class="msg">Datos cargados. Edita y vuelve a pulsar para guardar.</div>';
            return;
          }
          p.id_prop = Number($('m_p_prop').value);
          p.Nombre = $('m_p_n').value.trim();
          p.Especie = $('m_p_e').value.trim();
          p.Sexo = $('m_p_s').value.trim();
          p.Peso = $('m_p_pe').value.trim();
          p.Edad = $('m_p_ed').value.trim();
          save();
          $('msg_mp').innerHTML = '<div class="msg">Guardado.</div>';
        };
        break;

      case 'admin-mod-propietario':
        workspace(
          '<h2>Modificar propietario</h2>' +
            '<div class="form-grid">' +
            '<label>ID propietario<input id="m_pr_id" type="number" /></label>' +
            '<label>ID paciente ref.<input id="m_pr_pac" type="number" /></label>' +
            '<label>Nombre completo<input id="m_pr_n" /></label>' +
            '<label>Teléfono<input id="m_pr_t" /></label>' +
            '<label>Correo<input id="m_pr_c" /></label>' +
            '<button type="button" class="action" id="btn_mpr">Cargar / Actualizar</button><div id="msg_mpr"></div></div>' +
            backBtnAdmin()
        );
        $('btn_mpr').onclick = () => {
          const id = Number($('m_pr_id').value);
          const p = state.propietarios.find((x) => x.id_prop === id);
          if (!p) return ($('msg_mpr').innerHTML = '<div class="msg">No encontrado.</div>');
          if (!$('m_pr_n').value) {
            $('m_pr_pac').value = p.id_paciente;
            $('m_pr_n').value = p.Nombre_Completo;
            $('m_pr_t').value = p.telefono;
            $('m_pr_c').value = p.correo_electronico;
            $('msg_mpr').innerHTML = '<div class="msg">Cargado. Edita y guarda.</div>';
            return;
          }
          p.id_paciente = Number($('m_pr_pac').value || 0);
          p.Nombre_Completo = $('m_pr_n').value.trim();
          p.telefono = $('m_pr_t').value.trim();
          p.correo_electronico = $('m_pr_c').value.trim();
          save();
          $('msg_mpr').innerHTML = '<div class="msg">Guardado.</div>';
        };
        break;

      case 'admin-mod-producto':
        workspace(
          '<h2>Modificar producto</h2>' +
            '<div class="form-grid">' +
            '<label>ID producto<input id="m_prod_id" type="number" /></label>' +
            '<label>Nombre<input id="m_prod_n" /></label>' +
            '<label>Descripción<input id="m_prod_d" /></label>' +
            '<label>Precio<input id="m_prod_p" type="number" step="0.01" /></label>' +
            '<label>Existencia<input id="m_prod_c" type="number" /></label>' +
            '<button type="button" class="action" id="btn_mprod">Cargar / Actualizar</button><div id="msg_mprod"></div></div>' +
            backBtnAdmin()
        );
        $('btn_mprod').onclick = () => {
          const id = Number($('m_prod_id').value);
          const p = state.productos.find((x) => x.id === id);
          if (!p) return ($('msg_mprod').innerHTML = '<div class="msg">No encontrado.</div>');
          if (!$('m_prod_n').value) {
            $('m_prod_n').value = p.nombre;
            $('m_prod_d').value = p.descripcion;
            $('m_prod_p').value = p.precio;
            $('m_prod_c').value = p.cantidad_exist;
            $('msg_mprod').innerHTML = '<div class="msg">Cargado.</div>';
            return;
          }
          p.nombre = $('m_prod_n').value.trim();
          p.descripcion = $('m_prod_d').value.trim();
          p.precio = Number($('m_prod_p').value || 0);
          p.cantidad_exist = Number($('m_prod_c').value || 0);
          save();
          $('msg_mprod').innerHTML = '<div class="msg">Guardado.</div>';
        };
        break;

      case 'admin-mod-usuario':
        workspace(
          '<h2>Modificar usuario</h2>' +
            '<div class="form-grid">' +
            '<label>ID usuario<input id="m_u_id" type="number" /></label>' +
            '<label>Nombre completo<input id="m_u_n" /></label>' +
            '<label>Correo<input id="m_u_c" type="email" /></label>' +
            '<label>Nueva contraseña<input id="m_u_p" type="password" /></label>' +
            '<label>Rol<select id="m_u_r"><option>Administrador</option><option>Empleado</option></select></label>' +
            '<button type="button" class="action" id="btn_mu">Cargar / Actualizar</button><div id="msg_mu"></div></div>' +
            backBtnAdmin()
        );
        $('btn_mu').onclick = () => {
          const id = Number($('m_u_id').value);
          const u = state.users.find((x) => x.id_usuario === id);
          if (!u) return ($('msg_mu').innerHTML = '<div class="msg">No encontrado.</div>');
          if (!$('m_u_n').value) {
            $('m_u_n').value = u.nombre_completo;
            $('m_u_c').value = u.correo_electronico;
            $('m_u_r').value = u.rol_usuario;
            $('msg_mu').innerHTML = '<div class="msg">Cargado.</div>';
            return;
          }
          u.nombre_completo = $('m_u_n').value.trim();
          u.correo_electronico = $('m_u_c').value.trim();
          const np = $('m_u_p').value;
          if (np) u.pass = np;
          u.rol_usuario = $('m_u_r').value;
          save();
          $('msg_mu').innerHTML = '<div class="msg">Guardado.</div>';
        };
        break;

      /* ——— Buscar (orden menu_buscar.html) ——— */
      case 'admin-submenu-buscar':
        workspace(
          '<h2>Menú de Búsqueda</h2>' +
            '<div class="stack-btns">' +
            '<button type="button" data-go="admin-buscar-usuarios">Buscar Usuarios</button>' +
            '<button type="button" data-go="admin-buscar-productos">Buscar Productos</button>' +
            '<button type="button" data-go="admin-buscar-cita">Buscar Cita</button>' +
            '<button type="button" data-go="admin-buscar-pacientes">Buscar Pacientes</button>' +
            '<button type="button" data-go="admin-buscar-propietario">Buscar Propietarios</button>' +
            '<button type="button" class="secondary" data-go="admin-inicio">Regresar al menú</button>' +
            '</div>'
        );
        break;

      case 'admin-buscar-usuarios':
        workspace(
          '<h2>Buscar usuarios</h2><div class="form-grid"><label>ID usuario<input id="b_u" type="number" /></label>' +
            '<button type="button" class="action" id="btn_bu">Buscar</button></div><div id="out_bu"></div>' +
            backBtnAdmin()
        );
        $('btn_bu').onclick = () => {
          const id = Number($('b_u').value);
          const rows = state.users.filter((u) => u.id_usuario === id).map((u) => [u.id_usuario, u.nombre_completo, u.correo_electronico, u.rol_usuario]);
          $('out_bu').innerHTML = tableHtml(['ID', 'Nombre', 'Correo', 'Rol'], rows);
        };
        break;

      case 'admin-buscar-productos':
        workspace(
          '<h2>Buscar productos</h2><div class="form-grid"><label>ID<input id="b_pr" type="number" /></label>' +
            '<button type="button" class="action" id="btn_bpr">Buscar</button></div><div id="out_bpr"></div>' +
            backBtnAdmin()
        );
        $('btn_bpr').onclick = () => {
          const id = Number($('b_pr').value);
          const rows = state.productos.filter((p) => p.id === id).map((p) => [p.id, p.nombre, p.descripcion, p.precio, p.cantidad_exist]);
          $('out_bpr').innerHTML = tableHtml(['ID', 'Nombre', 'Descripción', 'Precio', 'Cantidad'], rows);
        };
        break;

      case 'admin-buscar-cita':
        workspace(
          '<h2>Buscar cita</h2><div class="form-grid">' +
            '<label>ID cita<input id="b_c_id" type="number" /></label>' +
            '<label>ID paciente<input id="b_c_p" type="number" /></label>' +
            '<button type="button" class="action" id="btn_bc">Buscar</button></div><div id="out_bc"></div>' +
            backBtnAdmin()
        );
        $('btn_bc').onclick = () => {
          const idc = Number($('b_c_id').value || 0);
          const idp = Number($('b_c_p').value || 0);
          let list = state.citas;
          if (idc) list = list.filter((c) => c.id_cita === idc);
          else if (idp) list = list.filter((c) => c.id_paciente === idp);
          else {
            $('out_bc').innerHTML = '<div class="msg">Indica ID cita o ID paciente.</div>';
            return;
          }
          const rows = list.map((c) => [c.id_cita, c.id_paciente, c.fecha_cita, c.motivo]);
          $('out_bc').innerHTML = tableHtml(['ID cita', 'ID paciente', 'Fecha', 'Motivo'], rows);
        };
        break;

      case 'admin-buscar-pacientes':
        workspace(
          '<h2>Buscar pacientes</h2><div class="form-grid">' +
            '<label>ID paciente<input id="b_pa_id" type="number" /></label>' +
            '<label>ID propietario<input id="b_pa_prop" type="number" /></label>' +
            '<label>Nombre (contiene)<input id="b_pa_n" /></label>' +
            '<button type="button" class="action" id="btn_bpa">Buscar</button></div><div id="out_bpa"></div>' +
            backBtnAdmin()
        );
        $('btn_bpa').onclick = () => {
          const id = Number($('b_pa_id').value || 0);
          const idp = Number($('b_pa_prop').value || 0);
          const n = $('b_pa_n').value.trim().toLowerCase();
          let list = state.pacientes;
          if (id) list = list.filter((p) => p.id_paciente === id);
          if (idp) list = list.filter((p) => p.id_prop === idp);
          if (n) list = list.filter((p) => (p.Nombre || '').toLowerCase().includes(n));
          const rows = list.map((p) => [p.id_paciente, p.id_prop, p.Nombre, p.Especie, p.Sexo, p.Peso, p.Edad]);
          $('out_bpa').innerHTML = tableHtml(['ID pac.', 'ID prop.', 'Nombre', 'Especie', 'Sexo', 'Peso', 'Edad'], rows);
        };
        break;

      case 'admin-buscar-propietario':
        workspace(
          '<h2>Buscar propietarios</h2><div class="form-grid"><label>ID propietario<input id="b_prop" type="number" /></label>' +
            '<button type="button" class="action" id="btn_bprop">Buscar</button></div><div id="out_bprop"></div>' +
            backBtnAdmin()
        );
        $('btn_bprop').onclick = () => {
          const id = Number($('b_prop').value);
          const rows = state.propietarios.filter((p) => p.id_prop === id).map((p) => [p.id_prop, p.id_paciente, p.Nombre_Completo, p.telefono, p.correo_electronico]);
          $('out_bprop').innerHTML = tableHtml(['ID', 'ID pac. ref', 'Nombre', 'Tel', 'Correo'], rows);
        };
        break;

      /* ——— Eliminar ——— */
      case 'admin-submenu-eliminar':
        workspace(
          '<h2>Eliminar Registros</h2>' +
            '<div class="stack-btns">' +
            '<button type="button" data-go="admin-eliminar-cita">Eliminar Citas</button>' +
            '<button type="button" class="secondary" data-go="admin-inicio">Regresar al menú</button>' +
            '</div>'
        );
        break;

      case 'admin-eliminar-cita':
        workspace(
          '<h2>Eliminar cita</h2><div class="form-grid"><label>ID cita<input id="e_c" type="number" /></label>' +
            '<button type="button" class="action" id="btn_ec">Eliminar</button></div><div id="msg_ec"></div>' +
            backBtnAdmin()
        );
        $('btn_ec').onclick = () => {
          const id = Number($('e_c').value);
          const idx = state.citas.findIndex((c) => c.id_cita === id);
          if (idx < 0) return ($('msg_ec').innerHTML = '<div class="msg">No encontrada.</div>');
          state.pacientes.forEach((p) => {
            if (p.id_cita === id) p.id_cita = null;
          });
          state.citas.splice(idx, 1);
          save();
          $('msg_ec').innerHTML = '<div class="msg">Eliminada.</div>';
        };
        break;

      /* ——— Reportes (orden menu_reportes.html) ——— */
      case 'admin-submenu-reportes':
        workspace(
          '<h2>Generar Reportes</h2>' +
            '<div class="stack-btns">' +
            '<button type="button" id="rep_imp">Generar reporte impreso</button>' +
            '<button type="button" id="rep_pant">Generar Reporte en pantalla</button>' +
            '<button type="button" id="rep_back">Generar Copia de Respaldo</button>' +
            '<button type="button" class="secondary" data-go="admin-inicio">Regresar al menú</button>' +
            '</div><div id="rep_out"></div>'
        );
        $('rep_imp').onclick = () => alert('En el sistema PHP original esto abre PDF (Dompdf). En Pages usa la app completa en tu PC.');
        $('rep_pant').onclick = () => {
          let html = '<h3>Vista en pantalla (resumen)</h3>';
          html += '<h4>Usuarios</h4>' + tableHtml(['ID', 'Nombre', 'Correo', 'Rol'], state.users.map((u) => [u.id_usuario, u.nombre_completo, u.correo_electronico, u.rol_usuario]));
          html += '<h4>Productos</h4>' + tableHtml(['ID', 'Nombre', 'Desc', 'Precio', 'Cant.'], state.productos.map((p) => [p.id, p.nombre, p.descripcion, p.precio, p.cantidad_exist]));
          html += '<h4>Pacientes</h4>' + tableHtml(['ID', 'ID prop', 'Nombre', 'Especie'], state.pacientes.map((p) => [p.id_paciente, p.id_prop, p.Nombre, p.Especie]));
          $('rep_out').innerHTML = html;
        };
        $('rep_back').onclick = () => {
          const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'respaldo_demo_veterinaria.json';
          a.click();
          URL.revokeObjectURL(a.href);
        };
        break;

      /* ——— Empleado (pantallas equivalentes a empleado_*.html) ——— */
      case 'emp-buscar-cita':
        workspace(
          '<h2>Buscar cita</h2><div class="form-grid">' +
            '<label>ID cita<input id="eb_c_id" type="number" /></label>' +
            '<label>ID paciente<input id="eb_c_p" type="number" /></label>' +
            '<button type="button" class="action" id="btn_ebc">Buscar</button></div><div id="out_ebc"></div>' +
            backBtnEmp()
        );
        $('btn_ebc').onclick = () => {
          const idc = Number($('eb_c_id').value || 0);
          const idp = Number($('eb_c_p').value || 0);
          let list = state.citas;
          if (idc) list = list.filter((c) => c.id_cita === idc);
          else if (idp) list = list.filter((c) => c.id_paciente === idp);
          else return ($('out_ebc').innerHTML = '<div class="msg">Indica ID cita o paciente.</div>');
          $('out_ebc').innerHTML = tableHtml(['ID cita', 'ID paciente', 'Fecha', 'Motivo'], list.map((c) => [c.id_cita, c.id_paciente, c.fecha_cita, c.motivo]));
        };
        break;

      case 'emp-buscar-pacientes':
        workspace(
          '<h2>Buscar pacientes</h2><div class="form-grid">' +
            '<label>ID paciente<input id="eb_pa_id" type="number" /></label>' +
            '<label>ID cita<input id="eb_pa_c" type="number" /></label>' +
            '<label>ID propietario<input id="eb_pa_prop" type="number" /></label>' +
            '<button type="button" class="action" id="eb_pa_go">Buscar</button></div><div id="out_ebpa"></div>' +
            backBtnEmp()
        );
        $('eb_pa_go').onclick = () => {
          let list = state.pacientes;
          const id = Number($('eb_pa_id').value || 0);
          const ic = Number($('eb_pa_c').value || 0);
          const ip = Number($('eb_pa_prop').value || 0);
          if (id) list = list.filter((p) => p.id_paciente === id);
          if (ic) list = list.filter((p) => p.id_cita === ic);
          if (ip) list = list.filter((p) => p.id_prop === ip);
          $('out_ebpa').innerHTML = tableHtml(['ID', 'ID prop', 'ID cita', 'Nombre', 'Especie'], list.map((p) => [p.id_paciente, p.id_prop, p.id_cita || '', p.Nombre, p.Especie]));
        };
        break;

      case 'emp-buscar-propietarios':
        workspace(
          '<h2>Buscar propietarios</h2><div class="form-grid"><label>ID paciente<input id="eb_pr_p" type="number" /></label>' +
            '<button type="button" class="action" id="eb_pr_go">Buscar</button></div><div id="out_ebpr"></div>' +
            backBtnEmp()
        );
        $('eb_pr_go').onclick = () => {
          const idp = Number($('eb_pr_p').value || 0);
          if (!idp) return ($('out_ebpr').innerHTML = '<div class="msg">Indica ID paciente.</div>');
          const rows = state.propietarios.filter((p) => p.id_paciente === idp).map((p) => [p.id_prop, p.id_paciente, p.Nombre_Completo, p.telefono, p.correo_electronico]);
          $('out_ebpr').innerHTML = tableHtml(['ID prop', 'ID pac', 'Nombre', 'Tel', 'Correo'], rows);
        };
        break;

      case 'emp-buscar-productos':
        workspace(
          '<h2>Buscar productos</h2><div class="form-grid"><label>ID<input id="eb_prod" type="number" /></label>' +
            '<button type="button" class="action" id="eb_prod_go">Buscar</button></div><div id="out_ebprod"></div>' +
            backBtnEmp()
        );
        $('eb_prod_go').onclick = () => {
          const id = Number($('eb_prod').value);
          const rows = state.productos.filter((p) => p.id === id).map((p) => [p.id, p.nombre, p.descripcion, p.precio, p.cantidad_exist]);
          $('out_ebprod').innerHTML = tableHtml(['ID', 'Nombre', 'Desc', 'Precio', 'Cant'], rows);
        };
        break;

      case 'emp-insertar-cita':
        workspace(
          '<h2>Insertar citas</h2><p class="hint"><code>empleado_insertar_cita.html</code></p>' +
            '<div class="form-grid">' +
            '<label>ID paciente<input id="f_eic_p" type="number" /></label>' +
            '<label>Fecha cita<input id="f_eic_f" /></label>' +
            '<label>Motivo<input id="f_eic_m" /></label>' +
            '<button type="button" class="action" id="btn_eic">Insertar</button><div id="msg_eic"></div></div>' +
            backBtnEmp()
        );
        $('btn_eic').onclick = () => {
          const id_paciente = Number($('f_eic_p').value);
          const fecha = $('f_eic_f').value.trim();
          const motivo = $('f_eic_m').value.trim();
          if (!id_paciente || !fecha || !motivo) return ($('msg_eic').innerHTML = '<div class="msg">Completa los campos.</div>');
          const id = nextId(state.citas, 'id_cita');
          state.citas.push({ id_cita: id, id_paciente, fecha_cita: fecha, motivo });
          save();
          $('msg_eic').innerHTML = '<div class="msg">Cita insertada.</div>';
        };
        break;

      case 'emp-insertar-paciente':
        workspace(
          '<h2>Insertar paciente (con cita)</h2><p class="hint"><code>empleado_insertar_paciente.html</code></p>' +
            '<div class="form-grid">' +
            '<label>ID propietario<input id="eip_prop" type="number" /></label>' +
            '<label>Nombre<input id="eip_n" /></label>' +
            '<label>Especie<input id="eip_e" /></label>' +
            '<label>Sexo<input id="eip_s" /></label>' +
            '<label>Peso<input id="eip_p" /></label>' +
            '<label>Edad<input id="eip_ed" /></label>' +
            '<label>ID cita (debe existir)<input id="eip_c" type="number" /></label>' +
            '<button type="button" class="action" id="btn_eip">Insertar</button><div id="msg_eip"></div></div>' +
            backBtnEmp()
        );
        $('btn_eip').onclick = () => {
          const id_cita = Number($('eip_c').value);
          if (!state.citas.some((c) => c.id_cita === id_cita)) return ($('msg_eip').innerHTML = '<div class="msg">La cita no existe.</div>');
          const id_prop = Number($('eip_prop').value);
          const Nombre = $('eip_n').value.trim();
          if (!id_prop || !Nombre) return ($('msg_eip').innerHTML = '<div class="msg">Completa propietario y nombre.</div>');
          const dup = state.pacientes.some((p) => p.Nombre === Nombre && p.id_prop === id_prop);
          if (dup) return ($('msg_eip').innerHTML = '<div class="msg">Duplicado.</div>');
          const id = nextId(state.pacientes, 'id_paciente');
          state.pacientes.push({
            id_paciente: id,
            id_prop,
            Nombre,
            Especie: $('eip_e').value.trim(),
            Sexo: $('eip_s').value.trim(),
            Peso: $('eip_p').value.trim(),
            Edad: $('eip_ed').value.trim(),
            id_cita,
          });
          save();
          $('msg_eip').innerHTML = '<div class="msg">Insertado. ID paciente: ' + id + '</div>';
        };
        break;

      case 'emp-insertar-propietario':
        workspace(
          '<h2>Insertar propietario</h2><p class="hint"><code>empleado_insertar_propietarios.html</code></p>' +
            '<div class="form-grid">' +
            '<label>ID paciente ref.<input id="eipp_p" type="number" /></label>' +
            '<label>Nombre completo<input id="eipp_n" /></label>' +
            '<label>Teléfono<input id="eipp_t" /></label>' +
            '<label>Correo<input id="eipp_c" type="email" /></label>' +
            '<button type="button" class="action" id="btn_eipp">Insertar</button><div id="msg_eipp"></div></div>' +
            backBtnEmp()
        );
        $('btn_eipp').onclick = () => {
          const id_paciente = Number($('eipp_p').value || 0);
          const Nombre_Completo = $('eipp_n').value.trim();
          const telefono = $('eipp_t').value.trim();
          const correo = $('eipp_c').value.trim();
          if (!Nombre_Completo || !telefono || !correo) return ($('msg_eipp').innerHTML = '<div class="msg">Completa los campos.</div>');
          const id_prop = nextId(state.propietarios, 'id_prop');
          state.propietarios.push({ id_prop, id_paciente, Nombre_Completo, telefono, correo_electronico: correo });
          save();
          $('msg_eipp').innerHTML = '<div class="msg">Insertado. ID: ' + id_prop + '</div>';
        };
        break;

      case 'emp-eliminar-cita':
        workspace(
          '<h2>Eliminar citas</h2><div class="form-grid"><label>ID cita<input id="ee_c" type="number" /></label>' +
            '<button type="button" class="action" id="btn_eec">Eliminar</button></div><div id="msg_eec"></div>' +
            backBtnEmp()
        );
        $('btn_eec').onclick = () => {
          const id = Number($('ee_c').value);
          const idx = state.citas.findIndex((c) => c.id_cita === id);
          if (idx < 0) return ($('msg_eec').innerHTML = '<div class="msg">No encontrada.</div>');
          state.pacientes.forEach((p) => {
            if (p.id_cita === id) p.id_cita = null;
          });
          state.citas.splice(idx, 1);
          save();
          $('msg_eec').innerHTML = '<div class="msg">Eliminada.</div>';
        };
        break;

      default:
        workspace('<p>Vista no implementada: ' + escapeHtml(view) + '</p>');
    }

    bindWorkspaceClicks();
  }

  function onLogin(user) {
    currentUser = user;
    $('loginCard').classList.add('hidden');
    $('shell').classList.remove('hidden');
    $('rolBadge').textContent = 'Sesión: ' + user.correo_electronico + ' — ' + user.rol_usuario;

    if (user.rol_usuario === 'Administrador') {
      $('navAdmin').classList.remove('hidden');
      $('navEmpleado').classList.add('hidden');
      go('admin-inicio');
    } else {
      $('navAdmin').classList.add('hidden');
      $('navEmpleado').classList.remove('hidden');
      go('emp-inicio');
    }
  }

  function init() {
    migrateFromV1();
    state = loadState();
    save();

    $('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const correo = $('correo').value.trim();
      const pass = $('contrasena').value;
      const u = state.users.find((x) => x.correo_electronico === correo && x.pass === pass);
      if (!u) return alert('Credenciales incorrectas');
      onLogin(u);
    });

    document.querySelectorAll('#navAdmin [data-go], #navEmpleado [data-go]').forEach((btn) => {
      btn.addEventListener('click', () => go(btn.getAttribute('data-go')));
    });

    $('logoutAdmin').onclick = () => location.reload();
    $('logoutEmpleado').onclick = () => location.reload();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
