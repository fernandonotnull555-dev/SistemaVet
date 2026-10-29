(function () {
  'use strict';

  const STORAGE_KEY = 'vet_demo_data_v3';

  const IMG_HINT = '';

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
        { id_usuario: 6, nombre_completo: 'Juan Martínez', correo_electronico: 'juan@demo.local', pass: 'admin123', rol_usuario: 'Empleado' },
        { id_usuario: 7, nombre_completo: 'Daniela Campos', correo_electronico: 'daniela@demo.local', pass: 'admin123', rol_usuario: 'Empleado' },
        { id_usuario: 8, nombre_completo: 'Roberto Silva', correo_electronico: 'roberto@demo.local', pass: 'admin123', rol_usuario: 'Empleado' },
        { id_usuario: 9, nombre_completo: 'Isabel Díaz', correo_electronico: 'isabel@demo.local', pass: 'admin123', rol_usuario: 'Empleado' },
        { id_usuario: 10, nombre_completo: 'Andrés Vega', correo_electronico: 'andres@demo.local', pass: 'admin123', rol_usuario: 'Empleado' },
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
        { id: 16, nombre: 'Gotas oftálmicas', descripcion: 'Tratamiento ocular', precio: 9.99, cantidad_exist: 22 },
        { id: 17, nombre: 'Antiinflamatorio', descripcion: 'Pastillas antiinflamatorias', precio: 7.5, cantidad_exist: 28 },
        { id: 18, nombre: 'Shampoo natural', descripcion: 'Shampoo sin químicos', precio: 4.5, cantidad_exist: 35 },
        { id: 19, nombre: 'Pasta dental', descripcion: 'Pasta para higiene dental', precio: 5.25, cantidad_exist: 20 },
        { id: 20, nombre: 'Probióticos', descripcion: 'Bacterias beneficiosas', precio: 12.0, cantidad_exist: 16 },
        { id: 21, nombre: 'Aceite de pescado', descripcion: 'Suplemento omega-3', precio: 8.75, cantidad_exist: 24 },
        { id: 22, nombre: 'Pechuga de pollo', descripcion: 'Golosina natural', precio: 6.99, cantidad_exist: 40 },
        { id: 23, nombre: 'Hierbas calmantes', descripcion: 'Te relajante para mascotas', precio: 5.5, cantidad_exist: 18 },
        { id: 24, nombre: 'Desinfectante', descripcion: 'Limpiador de heridas', precio: 6.0, cantidad_exist: 30 },
        { id: 25, nombre: 'Vendajes', descripcion: 'Sistema de vendaje', precio: 3.5, cantidad_exist: 50 },
        { id: 26, nombre: 'Tapete absorbente', descripcion: 'Toallitas desechables', precio: 4.25, cantidad_exist: 60 },
        { id: 27, nombre: 'Cepillo masajeador', descripcion: 'Cepillo de masaje', precio: 8.5, cantidad_exist: 22 },
        { id: 28, nombre: 'Cortaúñas', descripcion: 'Herramienta para corte', precio: 12.5, cantidad_exist: 11 },
        { id: 29, nombre: 'Bolsas higiénicas', descripcion: 'Bolsas para residuos', precio: 2.0, cantidad_exist: 75 },
        { id: 30, nombre: 'Tratamiento pulgas', descripcion: 'Spot-on antipulgas', precio: 16.99, cantidad_exist: 13 },
      ],
      pacientes: [
        { id_paciente: 1, id_prop: 1, Nombre: 'Tuto Murillo', Especie: 'Felino', Sexo: 'Masculino', Peso: '4.5 kg', Edad: '5 años', id_cita: null },
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
        { id_paciente: 16, id_prop: 16, Nombre: 'Rex', Especie: 'Canino', Sexo: 'Masculino', Peso: '32 kg', Edad: '4 años', id_cita: null },
        { id_paciente: 17, id_prop: 17, Nombre: 'Félix', Especie: 'Felino', Sexo: 'Masculino', Peso: '5.2 kg', Edad: '3 años', id_cita: null },
        { id_paciente: 18, id_prop: 18, Nombre: 'Lola', Especie: 'Canino', Sexo: 'Femenino', Peso: '18 kg', Edad: '2 años', id_cita: null },
        { id_paciente: 19, id_prop: 19, Nombre: 'Sofía', Especie: 'Felino', Sexo: 'Femenino', Peso: '3.5 kg', Edad: '6 meses', id_cita: null },
        { id_paciente: 20, id_prop: 20, Nombre: 'Bruno', Especie: 'Canino', Sexo: 'Masculino', Peso: '26 kg', Edad: '3 años', id_cita: null },
        { id_paciente: 21, id_prop: 21, Nombre: 'Whiskers', Especie: 'Felino', Sexo: 'Masculino', Peso: '4.8 kg', Edad: '2 años', id_cita: null },
        { id_paciente: 22, id_prop: 22, Nombre: 'Daisy', Especie: 'Canino', Sexo: 'Femenino', Peso: '14 kg', Edad: '1 año', id_cita: null },
        { id_paciente: 23, id_prop: 23, Nombre: 'Oliver', Especie: 'Felino', Sexo: 'Masculino', Peso: '5.5 kg', Edad: '4 años', id_cita: null },
        { id_paciente: 24, id_prop: 24, Nombre: 'Kaiser', Especie: 'Canino', Sexo: 'Masculino', Peso: '38 kg', Edad: '5 años', id_cita: null },
        { id_paciente: 25, id_prop: 25, Nombre: 'Mittens', Especie: 'Felino', Sexo: 'Femenino', Peso: '3.9 kg', Edad: '7 años', id_cita: null },
        { id_paciente: 26, id_prop: 26, Nombre: 'Scout', Especie: 'Canino', Sexo: 'Masculino', Peso: '16 kg', Edad: '2 años', id_cita: null },
        { id_paciente: 27, id_prop: 27, Nombre: 'Luna Negra', Especie: 'Felino', Sexo: 'Femenino', Peso: '4.2 kg', Edad: '1 año', id_cita: null },
        { id_paciente: 28, id_prop: 28, Nombre: 'Buddy', Especie: 'Canino', Sexo: 'Masculino', Peso: '20 kg', Edad: '2 años', id_cita: null },
        { id_paciente: 29, id_prop: 29, Nombre: 'Gato Blanco', Especie: 'Felino', Sexo: 'Masculino', Peso: '5.0 kg', Edad: '3 años', id_cita: null },
        { id_paciente: 30, id_prop: 30, Nombre: 'Charlie', Especie: 'Canino', Sexo: 'Masculino', Peso: '23 kg', Edad: '4 años', id_cita: null },
        { id_paciente: 31, id_prop: 1, Nombre: 'Princesa', Especie: 'Felino', Sexo: 'Femenino', Peso: '4.1 kg', Edad: '2 años', id_cita: null },
        { id_paciente: 32, id_prop: 2, Nombre: 'Jackson', Especie: 'Canino', Sexo: 'Masculino', Peso: '27 kg', Edad: '3 años', id_cita: null },
        { id_paciente: 33, id_prop: 3, Nombre: 'Smokey', Especie: 'Felino', Sexo: 'Masculino', Peso: '4.7 kg', Edad: '5 años', id_cita: null },
        { id_paciente: 34, id_prop: 4, Nombre: 'Rusty', Especie: 'Canino', Sexo: 'Masculino', Peso: '29 kg', Edad: '3 años', id_cita: null },
        { id_paciente: 35, id_prop: 5, Nombre: 'Shadow', Especie: 'Canino', Sexo: 'Masculino', Peso: '24 kg', Edad: '2 años', id_cita: null },
        { id_paciente: 36, id_prop: 6, Nombre: 'Ginger', Especie: 'Felino', Sexo: 'Femenino', Peso: '4.3 kg', Edad: '1 año', id_cita: null },
        { id_paciente: 37, id_prop: 7, Nombre: 'Duke', Especie: 'Canino', Sexo: 'Masculino', Peso: '33 kg', Edad: '6 años', id_cita: null },
        { id_paciente: 38, id_prop: 8, Nombre: 'Patches', Especie: 'Felino', Sexo: 'Hembra', Peso: '4.0 kg', Edad: '3 años', id_cita: null },
        { id_paciente: 39, id_prop: 9, Nombre: 'Finn', Especie: 'Canino', Sexo: 'Masculino', Peso: '21 kg', Edad: '2 años', id_cita: null },
        { id_paciente: 40, id_prop: 10, Nombre: 'Lily', Especie: 'Felino', Sexo: 'Femenino', Peso: '3.7 kg', Edad: '8 meses', id_cita: null },
        { id_paciente: 41, id_prop: 11, Nombre: 'Copilot', Especie: 'Canino', Sexo: 'Masculino', Peso: '34 kg', Edad: '7 años', id_cita: null },
        { id_paciente: 42, id_prop: 12, Nombre: 'Maggie', Especie: 'Canino', Sexo: 'Femenino', Peso: '21 kg', Edad: '4 años', id_cita: null },
        { id_paciente: 43, id_prop: 13, Nombre: 'Cash', Especie: 'Felino', Sexo: 'Masculino', Peso: '6.2 kg', Edad: '2 años', id_cita: null },
        { id_paciente: 44, id_prop: 14, Nombre: 'Lucy', Especie: 'Canino', Sexo: 'Femenino', Peso: '13 kg', Edad: '1 año', id_cita: null },
        { id_paciente: 45, id_prop: 15, Nombre: 'Angel', Especie: 'Felino', Sexo: 'Hembra', Peso: '4.2 kg', Edad: '9 años', id_cita: null },
        { id_paciente: 46, id_prop: 20, Nombre: 'Pepper', Especie: 'Canino', Sexo: 'Femenino', Peso: '19 kg', Edad: '3 años', id_cita: null },
        { id_paciente: 47, id_prop: 21, Nombre: 'Ziggy', Especie: 'Felino', Sexo: 'Masculino', Peso: '5.1 kg', Edad: '2 años', id_cita: null },
        { id_paciente: 48, id_prop: 22, Nombre: 'Milo', Especie: 'Canino', Sexo: 'Masculino', Peso: '17 kg', Edad: '1 año', id_cita: null },
        { id_paciente: 49, id_prop: 23, Nombre: 'Socks', Especie: 'Felino', Sexo: 'Hembra', Peso: '3.6 kg', Edad: '5 años', id_cita: null },
        { id_paciente: 50, id_prop: 24, Nombre: 'Rocco', Especie: 'Canino', Sexo: 'Masculino', Peso: '36 kg', Edad: '5 años', id_cita: null },
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
        { id_prop: 16, id_paciente: 0, Nombre_Completo: 'Ester López', telefono: '9999-0006', correo_electronico: 'ester@ejemplo.local' },
        { id_prop: 17, id_paciente: 0, Nombre_Completo: 'Marcos Silva', telefono: '9999-0007', correo_electronico: 'marcos@ejemplo.local' },
        { id_prop: 18, id_paciente: 0, Nombre_Completo: 'Valencia Nuñez', telefono: '9999-0008', correo_electronico: 'valencia@ejemplo.local' },
        { id_prop: 19, id_paciente: 0, Nombre_Completo: 'Jorge Ampuero', telefono: '9999-0009', correo_electronico: 'jorge@ejemplo.local' },
        { id_prop: 20, id_paciente: 0, Nombre_Completo: 'Fernanda Robles', telefono: '9999-0010', correo_electronico: 'fernanda@ejemplo.local' },
        { id_prop: 21, id_paciente: 0, Nombre_Completo: 'Cecilia Aguayo', telefono: '9999-0011', correo_electronico: 'cecilia@ejemplo.local' },
        { id_prop: 22, id_paciente: 0, Nombre_Completo: 'Roberto Vásquez', telefono: '9999-0012', correo_electronico: 'roberto@ejemplo.local' },
        { id_prop: 23, id_paciente: 0, Nombre_Completo: 'Verónica Flores', telefono: '9999-0013', correo_electronico: 'veronica@ejemplo.local' },
        { id_prop: 24, id_paciente: 0, Nombre_Completo: 'Homero Aravena', telefono: '9999-0014', correo_electronico: 'homero@ejemplo.local' },
        { id_prop: 25, id_paciente: 0, Nombre_Completo: 'Iris Gutiérrez', telefono: '9999-0015', correo_electronico: 'iris@ejemplo.local' },
        { id_prop: 26, id_paciente: 0, Nombre_Completo: 'Nelson Torres', telefono: '9999-0016', correo_electronico: 'nelson@ejemplo.local' },
        { id_prop: 27, id_paciente: 0, Nombre_Completo: 'Marta Ramírez', telefono: '9999-0017', correo_electronico: 'marta@ejemplo.local' },
        { id_prop: 28, id_paciente: 0, Nombre_Completo: 'Bernard Cohen', telefono: '9999-0018', correo_electronico: 'bernard@ejemplo.local' },
        { id_prop: 29, id_paciente: 0, Nombre_Completo: 'Paulina Reyes', telefono: '9999-0019', correo_electronico: 'paulina@ejemplo.local' },
        { id_prop: 30, id_paciente: 0, Nombre_Completo: 'Enrique Peña', telefono: '9999-0020', correo_electronico: 'enrique@ejemplo.local' },
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
        { id_cita: 16, id_paciente: 16, fecha_cita: '2025-04-18 08:00', motivo: 'Vacunación' },
        { id_cita: 17, id_paciente: 17, fecha_cita: '2025-04-19 10:00', motivo: 'Esterilización' },
        { id_cita: 18, id_paciente: 18, fecha_cita: '2025-04-20 11:30', motivo: 'Revisión general' },
        { id_cita: 19, id_paciente: 19, fecha_cita: '2025-04-21 14:00', motivo: 'Vacunación antirrábica' },
        { id_cita: 20, id_paciente: 20, fecha_cita: '2025-04-22 09:30', motivo: 'Corte de uñas' },
        { id_cita: 21, id_paciente: 21, fecha_cita: '2025-04-23 10:00', motivo: 'Baño y desparasitación' },
        { id_cita: 22, id_paciente: 22, fecha_cita: '2025-04-24 13:30', motivo: 'Consulta nutricionista' },
        { id_cita: 23, id_paciente: 23, fecha_cita: '2025-04-25 11:00', motivo: 'Control post-operatorio' },
        { id_cita: 24, id_paciente: 24, fecha_cita: '2025-04-26 15:00', motivo: 'Examen oftalmológico' },
        { id_cita: 25, id_paciente: 25, fecha_cita: '2025-04-27 09:00', motivo: 'Limpieza dental' },
        { id_cita: 26, id_paciente: 26, fecha_cita: '2025-04-28 10:30', motivo: 'Vacunación de refuerzo' },
        { id_cita: 27, id_paciente: 27, fecha_cita: '2025-04-29 14:00', motivo: 'Análisis de sangre periódico' },
        { id_cita: 28, id_paciente: 28, fecha_cita: '2025-04-30 11:00', motivo: 'Revisión dermatológica' },
        { id_cita: 29, id_paciente: 29, fecha_cita: '2025-05-01 09:30', motivo: 'Vacunación' },
        { id_cita: 30, id_paciente: 30, fecha_cita: '2025-05-02 13:00', motivo: 'Castración programada' },
        { id_cita: 31, id_paciente: 31, fecha_cita: '2025-05-03 10:00', motivo: 'Consulta veterinaria' },
        { id_cita: 32, id_paciente: 32, fecha_cita: '2025-05-04 11:30', motivo: 'Control de peso' },
        { id_cita: 33, id_paciente: 33, fecha_cita: '2025-05-05 14:30', motivo: 'Revisión general' },
        { id_cita: 34, id_paciente: 34, fecha_cita: '2025-05-06 09:00', motivo: 'Esterilización' },
        { id_cita: 35, id_paciente: 35, fecha_cita: '2025-05-07 15:00', motivo: 'Vacunación antirrábica' },
        { id_cita: 36, id_paciente: 36, fecha_cita: '2025-05-08 10:30', motivo: 'Control de pulgas' },
        { id_cita: 37, id_paciente: 37, fecha_cita: '2025-05-09 13:00', motivo: 'Radiografía de cadera' },
        { id_cita: 38, id_paciente: 38, fecha_cita: '2025-05-10 11:00', motivo: 'Corte de uñas' },
        { id_cita: 39, id_paciente: 39, fecha_cita: '2025-05-11 14:00', motivo: 'Consulta nutricional' },
        { id_cita: 40, id_paciente: 40, fecha_cita: '2025-05-12 09:30', motivo: 'Primera visita' },
        { id_cita: 41, id_paciente: 41, fecha_cita: '2025-05-13 10:00', motivo: 'Control anciano' },
        { id_cita: 42, id_paciente: 42, fecha_cita: '2025-05-14 13:30', motivo: 'Vacunación' },
        { id_cita: 43, id_paciente: 43, fecha_cita: '2025-05-15 11:00', motivo: 'Desparasitación' },
        { id_cita: 44, id_paciente: 44, fecha_cita: '2025-05-16 14:00', motivo: 'Revisión dental' },
        { id_cita: 45, id_paciente: 45, fecha_cita: '2025-05-17 09:00', motivo: 'Control de salud anciano' },
        { id_cita: 46, id_paciente: 46, fecha_cita: '2025-05-18 10:30', motivo: 'Vacunación' },
        { id_cita: 47, id_paciente: 47, fecha_cita: '2025-05-19 13:00', motivo: 'Consulta general' },
        { id_cita: 48, id_paciente: 48, fecha_cita: '2025-05-20 11:30', motivo: 'Castración' },
        { id_cita: 49, id_paciente: 49, fecha_cita: '2025-05-21 14:30', motivo: 'Revisión oftálmica' },
        { id_cita: 50, id_paciente: 50, fecha_cita: '2025-05-22 09:00', motivo: 'Análisis de sangre' },
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
    } catch (e) {}
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
        workspace('<h2>Bienvenido/a</h2>');
        break;

      case 'emp-inicio':
        workspace('<h2>Bienvenido/a</h2>');
        break;

      case 'admin-crear-usuario':
        workspace(
          '<h2>Crear usuario</h2>' +
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
          '<h2>Insertar cita</h2>' +
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
          '<h2>Insertar paciente</h2>' +
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
          '<h2>Insertar propietario</h2>' +
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
          '<h2>Insertar producto</h2>' +
            '<div class="form-grid">' +
            '<label>Nombre<input id="f_idp_n" /></label>' +
            '<label>Descripción<input id="f_idp_d" /></label>' +
            '<label>Precio<input id="f_idp_pr" type="number" step="0.01" /></label>' +
            '<label>Cantidad en existencia<input id="f_idp_c" type="number" /></label>' +
            '<button type="button" class="action" id="btn_idp">Insertar</button><div id="msg_idp"></div></div>' +
            backBtnAdmin()
        );
        $('btn_idp').onclick = () => {
          const nombre = $('f_idp_n').value.trim();
          const descripcion = $('f_idp_d').value.trim();
          const precio = Number($('f_idp_pr').value);
          const cantidad = Number($('f_idp_c').value);
          if (!nombre || isNaN(precio) || isNaN(cantidad)) return ($('msg_idp').innerHTML = '<div class="msg">Completa los campos correctamente.</div>');
          const id = nextId(state.productos, 'id');
          state.productos.push({ id, nombre, descripcion, precio, cantidad_exist: cantidad });
          save();
          $('msg_idp').innerHTML = '<div class="msg">Producto insertado. ID: ' + id + '</div>';
        };
        break;

      case 'admin-submenu-modificar':
        workspace(
          '<h2>Modificar en la Base de Datos, seleccione la tabla</h2>' +
            '<div class="stack-btns">' +
            '<button type="button" data-go="admin-mod-usuario">Usuarios</button>' +
            '<button type="button" data-go="admin-mod-cita">Citas</button>' +
            '<button type="button" data-go="admin-mod-paciente">Pacientes</button>' +
            '<button type="button" data-go="admin-mod-propietario">Propietarios</button>' +
            '<button type="button" data-go="admin-mod-producto">Productos</button>' +
            '<button type="button" class="secondary" data-go="admin-inicio">Regresar al menú</button>' +
            '</div>'
        );
        break;

      case 'admin-mod-usuario':
        workspace(
          '<h2>Modificar usuario</h2>' +
            '<div class="form-grid">' +
            '<label>ID usuario a modificar<input id="f_mu_id" type="number" /></label>' +
            '<button type="button" class="action" id="btn_mu_load">Cargar</button>' +
            '<div id="f_mu_form"></div><div id="msg_mu"></div></div>' +
            backBtnAdmin()
        );
        $('btn_mu_load').onclick = () => {
          const id = Number($('f_mu_id').value);
          const u = state.users.find((x) => x.id_usuario === id);
          if (!u) return ($('msg_mu').innerHTML = '<div class="msg">Usuario no encontrado.</div>');
          $('f_mu_form').innerHTML =
            '<label>Nombre completo<input id="f_mu_n" value="' + escapeHtml(u.nombre_completo) + '" /></label>' +
            '<label>Correo<input id="f_mu_co" type="email" value="' + escapeHtml(u.correo_electronico) + '" /></label>' +
            '<label>Contraseña<input id="f_mu_pa" type="password" value="' + escapeHtml(u.pass) + '" /></label>' +
            '<label>Rol<select id="f_mu_ro"><option ' + (u.rol_usuario === 'Administrador' ? 'selected' : '') + '>Administrador</option><option ' + (u.rol_usuario === 'Empleado' ? 'selected' : '') + '>Empleado</option></select></label>' +
            '<button type="button" class="action" id="btn_mu_save">Guardar cambios</button>';
          $('btn_mu_save').onclick = () => {
            u.nombre_completo = $('f_mu_n').value.trim();
            u.correo_electronico = $('f_mu_co').value.trim();
            u.pass = $('f_mu_pa').value;
            u.rol_usuario = $('f_mu_ro').value;
            save();
            $('msg_mu').innerHTML = '<div class="msg">Usuario modificado correctamente.</div>';
          };
        };
        break;

      case 'admin-mod-cita':
        workspace(
          '<h2>Modificar cita</h2>' +
            '<div class="form-grid">' +
            '<label>ID cita<input id="f_mc_id" type="number" /></label>' +
            '<button type="button" class="action" id="btn_mc_l">Cargar</button>' +
            '<div id="f_mc_f"></div><div id="msg_mc"></div></div>' +
            backBtnAdmin()
        );
        $('btn_mc_l').onclick = () => {
          const id = Number($('f_mc_id').value);
          const c = state.citas.find((x) => x.id_cita === id);
          if (!c) return ($('msg_mc').innerHTML = '<div class="msg">Cita no encontrada.</div>');
          $('f_mc_f').innerHTML =
            '<label>ID paciente<input id="f_mc_p" type="number" value="' + c.id_paciente + '" /></label>' +
            '<label>Fecha cita<input id="f_mc_fe" value="' + escapeHtml(c.fecha_cita) + '" /></label>' +
            '<label>Motivo<input id="f_mc_mo" value="' + escapeHtml(c.motivo) + '" /></label>' +
            '<button type="button" class="action" id="btn_mc_s">Guardar</button>';
          $('btn_mc_s').onclick = () => {
            c.id_paciente = Number($('f_mc_p').value);
            c.fecha_cita = $('f_mc_fe').value.trim();
            c.motivo = $('f_mc_mo').value.trim();
            save();
            $('msg_mc').innerHTML = '<div class="msg">Cita actualizada.</div>';
          };
        };
        break;

      case 'admin-mod-paciente':
        workspace(
          '<h2>Modificar paciente</h2>' +
            '<div class="form-grid">' +
            '<label>ID paciente<input id="f_mp_id" type="number" /></label>' +
            '<button type="button" class="action" id="btn_mp_l">Cargar</button>' +
            '<div id="f_mp_f"></div><div id="msg_mp"></div></div>' +
            backBtnAdmin()
        );
        $('btn_mp_l').onclick = () => {
          const id = Number($('f_mp_id').value);
          const p = state.pacientes.find((x) => x.id_paciente === id);
          if (!p) return ($('msg_mp').innerHTML = '<div class="msg">Paciente no encontrado.</div>');
          $('f_mp_f').innerHTML =
            '<label>ID propietario<input id="f_mp_pr" type="number" value="' + p.id_prop + '" /></label>' +
            '<label>Nombre<input id="f_mp_no" value="' + escapeHtml(p.Nombre) + '" /></label>' +
            '<label>Especie<input id="f_mp_es" value="' + escapeHtml(p.Especie) + '" /></label>' +
            '<label>Sexo<input id="f_mp_se" value="' + escapeHtml(p.Sexo) + '" /></label>' +
            '<label>Peso<input id="f_mp_pe" value="' + escapeHtml(p.Peso) + '" /></label>' +
            '<label>Edad<input id="f_mp_ed" value="' + escapeHtml(p.Edad) + '" /></label>' +
            '<button type="button" class="action" id="btn_mp_s">Guardar</button>';
          $('btn_mp_s').onclick = () => {
            p.id_prop = Number($('f_mp_pr').value);
            p.Nombre = $('f_mp_no').value.trim();
            p.Especie = $('f_mp_es').value.trim();
            p.Sexo = $('f_mp_se').value.trim();
            p.Peso = $('f_mp_pe').value.trim();
            p.Edad = $('f_mp_ed').value.trim();
            save();
            $('msg_mp').innerHTML = '<div class="msg">Paciente actualizado.</div>';
          };
        };
        break;

      case 'admin-mod-propietario':
        workspace(
          '<h2>Modificar propietario</h2>' +
            '<div class="form-grid">' +
            '<label>ID propietario<input id="f_mpr_id" type="number" /></label>' +
            '<button type="button" class="action" id="btn_mpr_l">Cargar</button>' +
            '<div id="f_mpr_f"></div><div id="msg_mpr"></div></div>' +
            backBtnAdmin()
        );
        $('btn_mpr_l').onclick = () => {
          const id = Number($('f_mpr_id').value);
          const pr = state.propietarios.find((x) => x.id_prop === id);
          if (!pr) return ($('msg_mpr').innerHTML = '<div class="msg">Propietario no encontrado.</div>');
          $('f_mpr_f').innerHTML =
            '<label>ID paciente ref<input id="f_mpr_ip" type="number" value="' + pr.id_paciente + '" /></label>' +
            '<label>Nombre completo<input id="f_mpr_n" value="' + escapeHtml(pr.Nombre_Completo) + '" /></label>' +
            '<label>Teléfono<input id="f_mpr_t" value="' + escapeHtml(pr.telefono) + '" /></label>' +
            '<label>Correo<input id="f_mpr_c" type="email" value="' + escapeHtml(pr.correo_electronico) + '" /></label>' +
            '<button type="button" class="action" id="btn_mpr_s">Guardar</button>';
          $('btn_mpr_s').onclick = () => {
            pr.id_paciente = Number($('f_mpr_ip').value);
            pr.Nombre_Completo = $('f_mpr_n').value.trim();
            pr.telefono = $('f_mpr_t').value.trim();
            pr.correo_electronico = $('f_mpr_c').value.trim();
            save();
            $('msg_mpr').innerHTML = '<div class="msg">Propietario actualizado.</div>';
          };
        };
        break;

      case 'admin-mod-producto':
        workspace(
          '<h2>Modificar producto</h2>' +
            '<div class="form-grid">' +
            '<label>ID producto<input id="f_mprod_id" type="number" /></label>' +
            '<button type="button" class="action" id="btn_mprod_l">Cargar</button>' +
            '<div id="f_mprod_f"></div><div id="msg_mprod"></div></div>' +
            backBtnAdmin()
        );
        $('btn_mprod_l').onclick = () => {
          const id = Number($('f_mprod_id').value);
          const pr = state.productos.find((x) => x.id === id);
          if (!pr) return ($('msg_mprod').innerHTML = '<div class="msg">Producto no encontrado.</div>');
          $('f_mprod_f').innerHTML =
            '<label>Nombre<input id="f_mprod_n" value="' + escapeHtml(pr.nombre) + '" /></label>' +
            '<label>Descripción<input id="f_mprod_d" value="' + escapeHtml(pr.descripcion) + '" /></label>' +
            '<label>Precio<input id="f_mprod_pr" type="number" step="0.01" value="' + pr.precio + '" /></label>' +
            '<label>Cantidad<input id="f_mprod_c" type="number" value="' + pr.cantidad_exist + '" /></label>' +
            '<button type="button" class="action" id="btn_mprod_s">Guardar</button>';
          $('btn_mprod_s').onclick = () => {
            pr.nombre = $('f_mprod_n').value.trim();
            pr.descripcion = $('f_mprod_d').value.trim();
            pr.precio = Number($('f_mprod_pr').value);
            pr.cantidad_exist = Number($('f_mprod_c').value);
            save();
            $('msg_mprod').innerHTML = '<div class="msg">Producto actualizado.</div>';
          };
        };
        break;

      case 'admin-submenu-buscar':
        workspace(
          '<h2>Buscar en la Base de Datos, seleccione la tabla</h2>' +
            '<div class="stack-btns">' +
            '<button type="button" data-go="admin-bus-usuarios">Usuarios</button>' +
            '<button type="button" data-go="admin-bus-citas">Citas</button>' +
            '<button type="button" data-go="admin-bus-pacientes">Pacientes</button>' +
            '<button type="button" data-go="admin-bus-propietarios">Propietarios</button>' +
            '<button type="button" data-go="admin-bus-productos">Productos</button>' +
            '<button type="button" class="secondary" data-go="admin-inicio">Regresar al menú</button>' +
            '</div>'
        );
        break;

      case 'admin-bus-usuarios':
        workspace(
          '<h2>Buscar usuarios</h2>' +
            '<div class="form-grid">' +
            '<label>Filtrar por nombre o correo<input id="f_bu_q" /></label>' +
            '<button type="button" class="action" id="btn_bu">Buscar</button></div>' +
            '<div id="res_bu"></div>' +
            backBtnAdmin()
        );
        $('btn_bu').onclick = () => {
          const q = $('f_bu_q').value.toLowerCase().trim();
          const filtered = state.users.filter((u) => u.nombre_completo.toLowerCase().includes(q) || u.correo_electronico.toLowerCase().includes(q));
          const rows = filtered.map((u) => [u.id_usuario, u.nombre_completo, u.correo_electronico, u.rol_usuario]);
          $('res_bu').innerHTML = tableHtml(['ID', 'Nombre', 'Correo', 'Rol'], rows);
        };
        break;

      case 'admin-bus-citas':
        workspace(
          '<h2>Buscar citas</h2>' +
            '<div class="form-grid">' +
            '<label>Motivo o fecha<input id="f_bc_q" /></label>' +
            '<button type="button" class="action" id="btn_bc">Buscar</button></div>' +
            '<div id="res_bc"></div>' +
            backBtnAdmin()
        );
        $('btn_bc').onclick = () => {
          const q = $('f_bc_q').value.toLowerCase().trim();
          const filtered = state.citas.filter((c) => c.motivo.toLowerCase().includes(q) || c.fecha_cita.toLowerCase().includes(q));
          const rows = filtered.map((c) => [c.id_cita, c.id_paciente, c.fecha_cita, c.motivo]);
          $('res_bc').innerHTML = tableHtml(['ID Cita', 'ID Paciente', 'Fecha', 'Motivo'], rows);
        };
        break;

      case 'admin-bus-pacientes':
        workspace(
          '<h2>Buscar pacientes</h2>' +
            '<div class="form-grid">' +
            '<label>Nombre o especie<input id="f_bp_q" /></label>' +
            '<button type="button" class="action" id="btn_bp">Buscar</button></div>' +
            '<div id="res_bp"></div>' +
            backBtnAdmin()
        );
        $('btn_bp').onclick = () => {
          const q = $('f_bp_q').value.toLowerCase().trim();
          const filtered = state.pacientes.filter((p) => p.Nombre.toLowerCase().includes(q) || p.Especie.toLowerCase().includes(q));
          const rows = filtered.map((p) => [p.id_paciente, p.id_prop, p.Nombre, p.Especie, p.Sexo, p.Peso, p.Edad]);
          $('res_bp').innerHTML = tableHtml(['ID Paciente', 'ID Propietario', 'Nombre', 'Especie', 'Sexo', 'Peso', 'Edad'], rows);
        };
        break;

      case 'admin-bus-propietarios':
        workspace(
          '<h2>Buscar propietarios</h2>' +
            '<div class="form-grid">' +
            '<label>Nombre o teléfono<input id="f_bpr_q" /></label>' +
            '<button type="button" class="action" id="btn_bpr">Buscar</button></div>' +
            '<div id="res_bpr"></div>' +
            backBtnAdmin()
        );
        $('btn_bpr').onclick = () => {
          const q = $('f_bpr_q').value.toLowerCase().trim();
          const filtered = state.propietarios.filter((pr) => pr.Nombre_Completo.toLowerCase().includes(q) || pr.telefono.toLowerCase().includes(q));
          const rows = filtered.map((pr) => [pr.id_prop, pr.id_paciente, pr.Nombre_Completo, pr.telefono, pr.correo_electronico]);
          $('res_bpr').innerHTML = tableHtml(['ID Prop', 'ID Paciente Ref', 'Nombre', 'Teléfono', 'Correo'], rows);
        };
        break;

      case 'admin-bus-productos':
        workspace(
          '<h2>Buscar productos</h2>' +
            '<div class="form-grid">' +
            '<label>Nombre o descripción<input id="f_bprod_q" /></label>' +
            '<button type="button" class="action" id="btn_bprod">Buscar</button></div>' +
            '<div id="res_bprod"></div>' +
            backBtnAdmin()
        );
        $('btn_bprod').onclick = () => {
          const q = $('f_bprod_q').value.toLowerCase().trim();
          const filtered = state.productos.filter((p) => p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q));
          const rows = filtered.map((p) => [p.id, p.nombre, p.descripcion, '$' + p.precio.toFixed(2), p.cantidad_exist]);
          $('res_bprod').innerHTML = tableHtml(['ID', 'Nombre', 'Descripción', 'Precio', 'Existencia'], rows);
        };
        break;

      case 'admin-submenu-eliminar':
        workspace(
          '<h2>Eliminar registros de la Base de Datos, seleccione la tabla</h2>' +
            '<div class="stack-btns">' +
            '<button type="button" data-go="admin-del-usuario">Usuarios</button>' +
            '<button type="button" data-go="admin-del-cita">Citas</button>' +
            '<button type="button" data-go="admin-del-paciente">Pacientes</button>' +
            '<button type="button" data-go="admin-del-propietario">Propietarios</button>' +
            '<button type="button" data-go="admin-del-producto">Productos</button>' +
            '<button type="button" class="secondary" data-go="admin-inicio">Regresar al menú</button>' +
            '</div>'
        );
        break;

      case 'admin-del-usuario':
        workspace(
          '<h2>Eliminar usuario</h2>' +
            '<div class="form-grid">' +
            '<label>ID usuario a eliminar<input id="f_du_id" type="number" /></label>' +
            '<button type="button" class="action" id="btn_du">Eliminar</button><div id="msg_du"></div></div>' +
            backBtnAdmin()
        );
        $('btn_du').onclick = () => {
          const id = Number($('f_du_id').value);
          const idx = state.users.findIndex((u) => u.id_usuario === id);
          if (idx === -1) return ($('msg_du').innerHTML = '<div class="msg">Usuario no encontrado.</div>');
          if (state.users[idx].correo_electronico === 'admin@demo.local') return ($('msg_du').innerHTML = '<div class="msg">No se puede eliminar al admin principal.</div>');
          state.users.splice(idx, 1);
          save();
          $('msg_du').innerHTML = '<div class="msg">Usuario eliminado.</div>';
        };
        break;

      case 'admin-del-cita':
        workspace(
          '<h2>Eliminar cita</h2>' +
            '<div class="form-grid">' +
            '<label>ID cita a eliminar<input id="f_dc_id" type="number" /></label>' +
            '<button type="button" class="action" id="btn_dc">Eliminar</button><div id="msg_dc"></div></div>' +
            backBtnAdmin()
        );
        $('btn_dc').onclick = () => {
          const id = Number($('f_dc_id').value);
          const idx = state.citas.findIndex((c) => c.id_cita === id);
          if (idx === -1) return ($('msg_dc').innerHTML = '<div class="msg">Cita no encontrada.</div>');
          state.citas.splice(idx, 1);
          save();
          $('msg_dc').innerHTML = '<div class="msg">Cita eliminada.</div>';
        };
        break;

      case 'admin-del-paciente':
        workspace(
          '<h2>Eliminar paciente</h2>' +
            '<div class="form-grid">' +
            '<label>ID paciente a eliminar<input id="f_dp_id" type="number" /></label>' +
            '<button type="button" class="action" id="btn_dp">Eliminar</button><div id="msg_dp"></div></div>' +
            backBtnAdmin()
        );
        $('btn_dp').onclick = () => {
          const id = Number($('f_dp_id').value);
          const idx = state.pacientes.findIndex((p) => p.id_paciente === id);
          if (idx === -1) return ($('msg_dp').innerHTML = '<div class="msg">Paciente no encontrado.</div>');
          state.pacientes.splice(idx, 1);
          save();
          $('msg_dp').innerHTML = '<div class="msg">Paciente eliminado.</div>';
        };
        break;

      case 'admin-del-propietario':
        workspace(
          '<h2>Eliminar propietario</h2>' +
            '<div class="form-grid">' +
            '<label>ID propietario a eliminar<input id="f_dpr_id" type="number" /></label>' +
            '<button type="button" class="action" id="btn_dpr">Eliminar</button><div id="msg_dpr"></div></div>' +
            backBtnAdmin()
        );
        $('btn_dpr').onclick = () => {
          const id = Number($('f_dpr_id').value);
          const idx = state.propietarios.findIndex((pr) => pr.id_prop === id);
          if (idx === -1) return ($('msg_dpr').innerHTML = '<div class="msg">Propietario no encontrado.</div>');
          state.propietarios.splice(idx, 1);
          save();
          $('msg_dpr').innerHTML = '<div class="msg">Propietario eliminado.</div>';
        };
        break;

      case 'admin-del-producto':
        workspace(
          '<h2>Eliminar producto</h2>' +
            '<div class="form-grid">' +
            '<label>ID producto a eliminar<input id="f_dprod_id" type="number" /></label>' +
            '<button type="button" class="action" id="btn_dprod">Eliminar</button><div id="msg_dprod"></div></div>' +
            backBtnAdmin()
        );
        $('btn_dprod').onclick = () => {
          const id = Number($('f_dprod_id').value);
          const idx = state.productos.findIndex((pr) => pr.id === id);
          if (idx === -1) return ($('msg_dprod').innerHTML = '<div class="msg">Producto no encontrado.</div>');
          state.productos.splice(idx, 1);
          save();
          $('msg_dprod').innerHTML = '<div class="msg">Producto eliminado.</div>';
        };
        break;

      case 'admin-submenu-reportes':
        workspace(
          '<h2>Generar Reportes</h2>' +
            '<div class="stack-btns">' +
            '<button type="button" data-go="rep-usuarios">Reporte de Usuarios</button>' +
            '<button type="button" data-go="rep-citas">Reporte de Citas</button>' +
            '<button type="button" data-go="rep-pacientes">Reporte de Pacientes</button>' +
            '<button type="button" data-go="rep-productos">Reporte de Inventario / Productos</button>' +
            '<button type="button" class="secondary" data-go="admin-inicio">Regresar al menú</button>' +
            '</div>'
        );
        break;

      case 'rep-usuarios': {
        const rows = state.users.map((u) => [u.id_usuario, u.nombre_completo, u.correo_electronico, u.rol_usuario]);
        workspace('<h2>Reporte de Usuarios</h2>' + tableHtml(['ID', 'Nombre', 'Correo', 'Rol'], rows) + backBtnAdmin());
        break;
      }
      case 'rep-citas': {
        const rows = state.citas.map((c) => [c.id_cita, c.id_paciente, c.fecha_cita, c.motivo]);
        workspace('<h2>Reporte de Citas</h2>' + tableHtml(['ID Cita', 'ID Paciente', 'Fecha', 'Motivo'], rows) + backBtnAdmin());
        break;
      }
      case 'rep-pacientes': {
        const rows = state.pacientes.map((p) => [p.id_paciente, p.id_prop, p.Nombre, p.Especie, p.Sexo, p.Peso, p.Edad]);
        workspace('<h2>Reporte de Pacientes</h2>' + tableHtml(['ID', 'Prop ID', 'Nombre', 'Especie', 'Sexo', 'Peso', 'Edad'], rows) + backBtnAdmin());
        break;
      }
      case 'rep-productos': {
        const rows = state.productos.map((pr) => [pr.id, pr.nombre, pr.descripcion, '$' + pr.precio.toFixed(2), pr.cantidad_exist]);
        workspace('<h2>Reporte de Productos</h2>' + tableHtml(['ID', 'Nombre', 'Descripción', 'Precio', 'Existencia'], rows) + backBtnAdmin());
        break;
      }

      case 'emp-buscar-cita':
        workspace(
          '<h2>Buscar cita</h2>' +
            '<div class="form-grid">' +
            '<label>Motivo o fecha<input id="f_ebc_q" /></label>' +
            '<button type="button" class="action" id="btn_ebc">Buscar</button></div>' +
            '<div id="res_ebc"></div>' +
            backBtnEmp()
        );
        $('btn_ebc').onclick = () => {
          const q = $('f_ebc_q').value.toLowerCase().trim();
          const filtered = state.citas.filter((c) => c.motivo.toLowerCase().includes(q) || c.fecha_cita.toLowerCase().includes(q));
          const rows = filtered.map((c) => [c.id_cita, c.id_paciente, c.fecha_cita, c.motivo]);
          $('res_ebc').innerHTML = tableHtml(['ID Cita', 'ID Paciente', 'Fecha', 'Motivo'], rows);
        };
        break;

      case 'emp-buscar-pacientes':
        workspace(
          '<h2>Buscar Paciente</h2>' +
            '<div class="form-grid">' +
            '<label>Nombre o especie<input id="f_ebp_q" /></label>' +
            '<button type="button" class="action" id="btn_ebp">Buscar</button></div>' +
            '<div id="res_ebp"></div>' +
            backBtnEmp()
        );
        $('btn_ebp').onclick = () => {
          const q = $('f_ebp_q').value.toLowerCase().trim();
          const filtered = state.pacientes.filter((p) => p.Nombre.toLowerCase().includes(q) || p.Especie.toLowerCase().includes(q));
          const rows = filtered.map((p) => [p.id_paciente, p.id_prop, p.Nombre, p.Especie, p.Sexo, p.Peso, p.Edad]);
          $('res_ebp').innerHTML = tableHtml(['ID', 'Prop ID', 'Nombre', 'Especie', 'Sexo', 'Peso', 'Edad'], rows);
        };
        break;

      case 'emp-buscar-propietarios':
        workspace(
          '<h2>Buscar Propietarios</h2>' +
            '<div class="form-grid">' +
            '<label>Nombre o teléfono<input id="f_ebpr_q" /></label>' +
            '<button type="button" class="action" id="btn_ebpr">Buscar</button></div>' +
            '<div id="res_ebpr"></div>' +
            backBtnEmp()
        );
        $('btn_ebpr').onclick = () => {
          const q = $('f_ebpr_q').value.toLowerCase().trim();
          const filtered = state.propietarios.filter((pr) => pr.Nombre_Completo.toLowerCase().includes(q) || pr.telefono.toLowerCase().includes(q));
          const rows = filtered.map((pr) => [pr.id_prop, pr.Nombre_Completo, pr.telefono, pr.correo_electronico]);
          $('res_ebpr').innerHTML = tableHtml(['ID Prop', 'Nombre', 'Teléfono', 'Correo'], rows);
        };
        break;

      case 'emp-buscar-productos':
        workspace(
          '<h2>Buscar Productos</h2>' +
            '<div class="form-grid">' +
            '<label>Nombre o descripción<input id="f_ebprod_q" /></label>' +
            '<button type="button" class="action" id="btn_ebprod">Buscar</button></div>' +
            '<div id="res_ebprod"></div>' +
            backBtnEmp()
        );
        $('btn_ebprod').onclick = () => {
          const q = $('f_ebprod_q').value.toLowerCase().trim();
          const filtered = state.productos.filter((p) => p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q));
          const rows = filtered.map((p) => [p.id, p.nombre, p.descripcion, '$' + p.precio.toFixed(2), p.cantidad_exist]);
          $('res_ebprod').innerHTML = tableHtml(['ID', 'Nombre', 'Descripción', 'Precio', 'Existencia'], rows);
        };
        break;

      case 'emp-insertar-cita':
        workspace(
          '<h2>Insertar citas</h2>' +
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
          $('msg_eic').innerHTML = '<div class="msg">Cita insertada ID: ' + id + '</div>';
        };
        break;

      case 'emp-insertar-paciente':
        workspace(
          '<h2>Insertar Pacientes</h2>' +
            '<div class="form-grid">' +
            '<label>ID propietario<input id="f_eip_prop" type="number" /></label>' +
            '<label>Nombre<input id="f_eip_n" /></label>' +
            '<label>Especie<input id="f_eip_e" /></label>' +
            '<label>Sexo<input id="f_eip_s" /></label>' +
            '<label>Peso<input id="f_eip_p" /></label>' +
            '<label>Edad<input id="f_eip_ed" /></label>' +
            '<button type="button" class="action" id="btn_eip">Insertar</button><div id="msg_eip"></div></div>' +
            backBtnEmp()
        );
        $('btn_eip').onclick = () => {
          const id_prop = Number($('f_eip_prop').value);
          const Nombre = $('f_eip_n').value.trim();
          if (!id_prop || !Nombre) return ($('msg_eip').innerHTML = '<div class="msg">ID propietario y nombre son obligatorios.</div>');
          const id = nextId(state.pacientes, 'id_paciente');
          state.pacientes.push({
            id_paciente: id,
            id_prop,
            Nombre,
            Especie: $('f_eip_e').value.trim(),
            Sexo: $('f_eip_s').value.trim(),
            Peso: $('f_eip_p').value.trim(),
            Edad: $('f_eip_ed').value.trim(),
            id_cita: null,
          });
          save();
          $('msg_eip').innerHTML = '<div class="msg">Paciente insertado ID: ' + id + '</div>';
        };
        break;

      case 'emp-insertar-propietario':
        workspace(
          '<h2>Insertar propietario</h2>' +
            '<div class="form-grid">' +
            '<label>ID paciente ref.<input id="f_eipp_pac" type="number" /></label>' +
            '<label>Nombre completo<input id="f_eipp_n" /></label>' +
            '<label>Teléfono<input id="f_eipp_t" /></label>' +
            '<label>Correo<input id="f_eipp_c" type="email" /></label>' +
            '<button type="button" class="action" id="btn_eipp">Insertar</button><div id="msg_eipp"></div></div>' +
            backBtnEmp()
        );
        $('btn_eipp').onclick = () => {
          const id_paciente = Number($('f_eipp_pac').value || 0);
          const Nombre_Completo = $('f_eipp_n').value.trim();
          const telefono = $('f_eipp_t').value.trim();
          const correo = $('f_eipp_c').value.trim();
          if (!Nombre_Completo || !telefono || !correo) return ($('msg_eipp').innerHTML = '<div class="msg">Completa los campos.</div>');
          const id_prop = nextId(state.propietarios, 'id_prop');
          state.propietarios.push({ id_prop, id_paciente, Nombre_Completo, telefono, correo_electronico: correo });
          save();
          $('msg_eipp').innerHTML = '<div class="msg">Propietario insertado ID: ' + id_prop + '</div>';
        };
        break;

      case 'emp-eliminar-cita':
        workspace(
          '<h2>Eliminar citas</h2>' +
            '<div class="form-grid">' +
            '<label>ID cita a eliminar<input id="f_edc_id" type="number" /></label>' +
            '<button type="button" class="action" id="btn_edc">Eliminar</button><div id="msg_edc"></div></div>' +
            backBtnEmp()
        );
        $('btn_edc').onclick = () => {
          const id = Number($('f_edc_id').value);
          const idx = state.citas.findIndex((c) => c.id_cita === id);
          if (idx === -1) return ($('msg_edc').innerHTML = '<div class="msg">Cita no encontrada.</div>');
          state.citas.splice(idx, 1);
          save();
          $('msg_edc').innerHTML = '<div class="msg">Cita eliminada.</div>';
        };
        break;
    }

    bindWorkspaceClicks();
  }

  function initApp() {
    state = loadState();
    migrateFromV1();

    $('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const correo = $('correo').value.trim();
      const pass = $('contrasena').value;
      const found = state.users.find((u) => u.correo_electronico === correo && u.pass === pass);
      if (!found) {
        alert('Credenciales incorrectas');
        return;
      }
      currentUser = found;
      $('loginCard').classList.add('hidden');
      $('shell').classList.remove('hidden');

      if (currentUser.rol_usuario === 'Administrador') {
        $('rolBadge').textContent = 'Administrador';
        $('navAdmin').classList.remove('hidden');
        $('navEmpleado').classList.add('hidden');
        go('admin-inicio');
      } else {
        $('rolBadge').textContent = 'Empleado';
        $('navEmpleado').classList.remove('hidden');
        $('navAdmin').classList.add('hidden');
        go('emp-inicio');
      }
    });

    const doLogout = () => {
      currentUser = null;
      $('shell').classList.add('hidden');
      $('loginCard').classList.remove('hidden');
      $('correo').value = '';
      $('contrasena').value = '';
    };

    $('logoutAdmin').addEventListener('click', doLogout);
    $('logoutEmpleado').addEventListener('click', doLogout);

    document.querySelectorAll('[data-go]').forEach((el) => {
      el.addEventListener('click', () => go(el.getAttribute('data-go')));
    });
  }

  document.addEventListener('DOMContentLoaded', initApp);
})();
