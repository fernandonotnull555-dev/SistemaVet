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
            '<button type="button" data-go="rep-general" style="background:#0d47a1;font-weight:bold;">📊 REPORTE GENERAL (Todos los datos)</button>' +
            '<button type="button" data-go="rep-usuarios">Reporte Usuarios</button>' +
            '<button type="button" data-go="rep-productos">Reporte Productos</button>' +
            '<button type="button" data-go="rep-pacientes">Reporte Pacientes</button>' +
            '<button type="button" data-go="rep-propietarios">Reporte Propietarios</button>' +
            '<button type="button" data-go="rep-citas">Reporte Citas</button>' +
            '<button type="button" id="rep_back">Descargar Respaldo JSON</button>' +
            '<button type="button" class="secondary" data-go="admin-inicio">Regresar al menú</button>' +
            '</div>'
        );
        $('rep_back').onclick = () => {
          const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'respaldo_demo_veterinaria.json';
          a.click();
          URL.revokeObjectURL(a.href);
        };
        break;

      case 'rep-general':
        const genCSV = (name, headers, rows) => {
          let csv = headers.join(',') + '\n';
          rows.forEach(r => csv += r.map(c => (String(c).includes(',') ? '"' + c + '"' : c)).join(',') + '\n');
          return csv;
        };
        const printReport = (title, html) => {
          const w = window.open('', '', 'width=900,height=600');
          w.document.write('<html><head><title>' + title + '</title><style>body{font-family:Arial;margin:20px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ccc;padding:8px;text-align:left}th{background:#1976d2;color:white}h2{color:#1976d2}</style></head><body>' + html + '</body></html>');
          w.document.close();
          w.print();
        };
        const downloadCSV = (filename, csv) => {
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = filename;
          a.click();
          URL.revokeObjectURL(a.href);
        };
        let genHtml = '<h2>📊 REPORTE GENERAL - ' + new Date().toLocaleDateString() + '</h2>';
        genHtml += '<h3>Usuarios (' + state.users.length + ' registros)</h3>' + tableHtml(['ID', 'Nombre', 'Correo', 'Rol'], state.users.map((u) => [u.id_usuario, u.nombre_completo, u.correo_electronico, u.rol_usuario]));
        genHtml += '<h3>Productos (' + state.productos.length + ' registros)</h3>' + tableHtml(['ID', 'Nombre', 'Precio', 'Cantidad'], state.productos.map((p) => [p.id, p.nombre, '$' + p.precio.toFixed(2), p.cantidad_exist]));
        genHtml += '<h3>Pacientes (' + state.pacientes.length + ' registros)</h3>' + tableHtml(['ID', 'Nombre', 'Especie', 'Propietario'], state.pacientes.map((p) => [p.id_paciente, p.Nombre, p.Especie, p.id_prop]));
        genHtml += '<h3>Propietarios (' + state.propietarios.length + ' registros)</h3>' + tableHtml(['ID', 'Nombre', 'Teléfono', 'Correo'], state.propietarios.map((pr) => [pr.id_prop, pr.Nombre_Completo, pr.telefono, pr.correo_electronico]));
        genHtml += '<h3>Citas (' + state.citas.length + ' registros)</h3>' + tableHtml(['ID', 'Paciente', 'Fecha', 'Motivo'], state.citas.map((c) => [c.id_cita, c.id_paciente, c.fecha_cita, c.motivo]));
        workspace(
          '<h2>📊 Reporte General Completo</h2>' +
            '<div class="stack-btns">' +
            '<button type="button" class="action" id="btn_gen_print">🖨️ Imprimir/Vista Previa</button>' +
            '<button type="button" class="action" id="btn_gen_csv">📥 Descargar Excel (CSV)</button>' +
            '<button type="button" class="secondary" data-go="admin-submenu-reportes">Volver a reportes</button>' +
            '</div>' +
            '<div id="rep_gen_out" style="margin-top:20px;"></div>'
        );
        $('rep_gen_out').innerHTML = genHtml;
        $('btn_gen_print').onclick = () => printReport('Reporte General', genHtml);
        $('btn_gen_csv').onclick = () => {
          let allCSV = '';
          allCSV += 'USUARIOS\n' + genCSV('Usuarios', ['ID', 'Nombre', 'Correo', 'Rol'], state.users.map((u) => [u.id_usuario, u.nombre_completo, u.correo_electronico, u.rol_usuario])) + '\n\n';
          allCSV += 'PRODUCTOS\n' + genCSV('Productos', ['ID', 'Nombre', 'Descripción', 'Precio', 'Cantidad'], state.productos.map((p) => [p.id, p.nombre, p.descripcion, p.precio, p.cantidad_exist])) + '\n\n';
          allCSV += 'PACIENTES\n' + genCSV('Pacientes', ['ID', 'Nombre', 'Especie', 'Propietario'], state.pacientes.map((p) => [p.id_paciente, p.Nombre, p.Especie, p.id_prop])) + '\n\n';
          allCSV += 'PROPIETARIOS\n' + genCSV('Propietarios', ['ID', 'Nombre', 'Teléfono', 'Correo'], state.propietarios.map((pr) => [pr.id_prop, pr.Nombre_Completo, pr.telefono, pr.correo_electronico])) + '\n\n';
          allCSV += 'CITAS\n' + genCSV('Citas', ['ID', 'ID Paciente', 'Fecha', 'Motivo'], state.citas.map((c) => [c.id_cita, c.id_paciente, c.fecha_cita, c.motivo]));
          downloadCSV('Reporte_General_' + new Date().toISOString().split('T')[0] + '.csv', allCSV);
        };
        break;

      case 'rep-usuarios':
        workspace(
          '<h2>Reporte: Usuarios (' + state.users.length + ' registros)</h2>' +
            '<div class="form-grid"><label>Buscar por nombre o correo<input id="rep_u_search" type="text" placeholder="Ej: admin, demo@" /></label></div>' +
            '<div class="stack-btns">' +
            '<button type="button" class="action" id="btn_u_print">🖨️ Imprimir</button>' +
            '<button type="button" class="action" id="btn_u_csv">📥 Descargar CSV</button>' +
            '</div>' +
            '<div id="rep_u_out"></div>' +
            backBtnAdmin()
        );
        const renderUsers = () => {
          const term = ($('rep_u_search').value || '').toLowerCase();
          let list = state.users;
          if (term) list = list.filter((u) => u.nombre_completo.toLowerCase().includes(term) || u.correo_electronico.toLowerCase().includes(term));
          $('rep_u_out').innerHTML = tableHtml(['ID', 'Nombre', 'Correo', 'Rol'], list.map((u) => [u.id_usuario, u.nombre_completo, u.correo_electronico, u.rol_usuario]));
        };
        renderUsers();
        $('rep_u_search').oninput = renderUsers;
        $('btn_u_print').onclick = () => {
          const term = ($('rep_u_search').value || '').toLowerCase();
          let list = state.users;
          if (term) list = list.filter((u) => u.nombre_completo.toLowerCase().includes(term) || u.correo_electronico.toLowerCase().includes(term));
          const html = '<h2>Reporte Usuarios</h2>' + tableHtml(['ID', 'Nombre', 'Correo', 'Rol'], list.map((u) => [u.id_usuario, u.nombre_completo, u.correo_electronico, u.rol_usuario]));
          const w = window.open('', '', 'width=900,height=600');
          w.document.write('<html><head><title>Reporte Usuarios</title><style>body{font-family:Arial;margin:20px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ccc;padding:8px;text-align:left}th{background:#1976d2;color:white}h2{color:#1976d2}</style></head><body>' + html + '</body></html>');
          w.document.close();
          w.print();
        };
        $('btn_u_csv').onclick = () => {
          const term = ($('rep_u_search').value || '').toLowerCase();
          let list = state.users;
          if (term) list = list.filter((u) => u.nombre_completo.toLowerCase().includes(term) || u.correo_electronico.toLowerCase().includes(term));
          let csv = 'ID,Nombre,Correo,Rol\n';
          list.forEach(u => csv += u.id_usuario + ',' + u.nombre_completo + ',' + u.correo_electronico + ',' + u.rol_usuario + '\n');
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'Usuarios_' + new Date().toISOString().split('T')[0] + '.csv';
          a.click();
          URL.revokeObjectURL(a.href);
        };
        break;

      case 'rep-productos':
        workspace(
          '<h2>Reporte: Productos (' + state.productos.length + ' registros)</h2>' +
            '<div class="form-grid"><label>Buscar por nombre o descripción<input id="rep_p_search" type="text" placeholder="Ej: alimento, vitamina" /></label></div>' +
            '<div class="stack-btns">' +
            '<button type="button" class="action" id="btn_p_print">🖨️ Imprimir</button>' +
            '<button type="button" class="action" id="btn_p_csv">📥 Descargar CSV</button>' +
            '</div>' +
            '<div id="rep_p_out"></div>' +
            backBtnAdmin()
        );
        const renderProds = () => {
          const term = ($('rep_p_search').value || '').toLowerCase();
          let list = state.productos;
          if (term) list = list.filter((p) => p.nombre.toLowerCase().includes(term) || p.descripcion.toLowerCase().includes(term));
          $('rep_p_out').innerHTML = tableHtml(['ID', 'Nombre', 'Descripción', 'Precio', 'Cantidad'], list.map((p) => [p.id, p.nombre, p.descripcion, '$' + p.precio.toFixed(2), p.cantidad_exist]));
        };
        renderProds();
        $('rep_p_search').oninput = renderProds;
        $('btn_p_print').onclick = () => {
          const term = ($('rep_p_search').value || '').toLowerCase();
          let list = state.productos;
          if (term) list = list.filter((p) => p.nombre.toLowerCase().includes(term) || p.descripcion.toLowerCase().includes(term));
          const html = '<h2>Reporte Productos</h2>' + tableHtml(['ID', 'Nombre', 'Descripción', 'Precio', 'Cantidad'], list.map((p) => [p.id, p.nombre, p.descripcion, '$' + p.precio.toFixed(2), p.cantidad_exist]));
          const w = window.open('', '', 'width=900,height=600');
          w.document.write('<html><head><title>Reporte Productos</title><style>body{font-family:Arial;margin:20px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ccc;padding:8px;text-align:left}th{background:#1976d2;color:white}h2{color:#1976d2}</style></head><body>' + html + '</body></html>');
          w.document.close();
          w.print();
        };
        $('btn_p_csv').onclick = () => {
          const term = ($('rep_p_search').value || '').toLowerCase();
          let list = state.productos;
          if (term) list = list.filter((p) => p.nombre.toLowerCase().includes(term) || p.descripcion.toLowerCase().includes(term));
          let csv = 'ID,Nombre,Descripción,Precio,Cantidad\n';
          list.forEach(p => csv += p.id + ',' + p.nombre + ',' + p.descripcion + ',' + p.precio + ',' + p.cantidad_exist + '\n');
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'Productos_' + new Date().toISOString().split('T')[0] + '.csv';
          a.click();
          URL.revokeObjectURL(a.href);
        };
        break;

      case 'rep-pacientes':
        workspace(
          '<h2>Reporte: Pacientes (' + state.pacientes.length + ' registros)</h2>' +
            '<div class="form-grid"><label>Buscar por nombre<input id="rep_pa_search" type="text" placeholder="Ej: Max, Luna" /></label>' +
            '<label>Filtrar por especie<select id="rep_pa_especie"><option value="">-- Todas --</option><option>Canino</option><option>Felino</option></select></label></div>' +
            '<div class="stack-btns">' +
            '<button type="button" class="action" id="btn_pa_print">🖨️ Imprimir</button>' +
            '<button type="button" class="action" id="btn_pa_csv">📥 Descargar CSV</button>' +
            '</div>' +
            '<div id="rep_pa_out"></div>' +
            backBtnAdmin()
        );
        const renderPacs = () => {
          const term = ($('rep_pa_search').value || '').toLowerCase();
          const especie = $('rep_pa_especie').value;
          let list = state.pacientes;
          if (term) list = list.filter((p) => p.Nombre.toLowerCase().includes(term));
          if (especie) list = list.filter((p) => p.Especie === especie);
          $('rep_pa_out').innerHTML = tableHtml(['ID', 'Prop', 'Nombre', 'Especie', 'Sexo', 'Peso', 'Edad'], list.map((p) => [p.id_paciente, p.id_prop, p.Nombre, p.Especie, p.Sexo, p.Peso, p.Edad]));
        };
        renderPacs();
        $('rep_pa_search').oninput = renderPacs;
        $('rep_pa_especie').onchange = renderPacs;
        $('btn_pa_print').onclick = () => {
          const term = ($('rep_pa_search').value || '').toLowerCase();
          const especie = $('rep_pa_especie').value;
          let list = state.pacientes;
          if (term) list = list.filter((p) => p.Nombre.toLowerCase().includes(term));
          if (especie) list = list.filter((p) => p.Especie === especie);
          const html = '<h2>Reporte Pacientes</h2>' + tableHtml(['ID', 'Prop', 'Nombre', 'Especie', 'Sexo', 'Peso', 'Edad'], list.map((p) => [p.id_paciente, p.id_prop, p.Nombre, p.Especie, p.Sexo, p.Peso, p.Edad]));
          const w = window.open('', '', 'width=900,height=600');
          w.document.write('<html><head><title>Reporte Pacientes</title><style>body{font-family:Arial;margin:20px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ccc;padding:8px;text-align:left}th{background:#1976d2;color:white}h2{color:#1976d2}</style></head><body>' + html + '</body></html>');
          w.document.close();
          w.print();
        };
        $('btn_pa_csv').onclick = () => {
          const term = ($('rep_pa_search').value || '').toLowerCase();
          const especie = $('rep_pa_especie').value;
          let list = state.pacientes;
          if (term) list = list.filter((p) => p.Nombre.toLowerCase().includes(term));
          if (especie) list = list.filter((p) => p.Especie === especie);
          let csv = 'ID,ID_Prop,Nombre,Especie,Sexo,Peso,Edad\n';
          list.forEach(p => csv += p.id_paciente + ',' + p.id_prop + ',' + p.Nombre + ',' + p.Especie + ',' + p.Sexo + ',' + p.Peso + ',' + p.Edad + '\n');
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'Pacientes_' + new Date().toISOString().split('T')[0] + '.csv';
          a.click();
          URL.revokeObjectURL(a.href);
        };
        break;

      case 'rep-propietarios':
        workspace(
          '<h2>Reporte: Propietarios (' + state.propietarios.length + ' registros)</h2>' +
            '<div class="form-grid"><label>Buscar por nombre o teléfono<input id="rep_pr_search" type="text" placeholder="Ej: Juan, 8888" /></label></div>' +
            '<div class="stack-btns">' +
            '<button type="button" class="action" id="btn_pr_print">🖨️ Imprimir</button>' +
            '<button type="button" class="action" id="btn_pr_csv">📥 Descargar CSV</button>' +
            '</div>' +
            '<div id="rep_pr_out"></div>' +
            backBtnAdmin()
        );
        const renderProps = () => {
          const term = ($('rep_pr_search').value || '').toLowerCase();
          let list = state.propietarios;
          if (term) list = list.filter((pr) => pr.Nombre_Completo.toLowerCase().includes(term) || pr.telefono.includes(term) || pr.correo_electronico.toLowerCase().includes(term));
          $('rep_pr_out').innerHTML = tableHtml(['ID Prop', 'Nombre', 'Teléfono', 'Correo'], list.map((pr) => [pr.id_prop, pr.Nombre_Completo, pr.telefono, pr.correo_electronico]));
        };
        renderProps();
        $('rep_pr_search').oninput = renderProps;
        $('btn_pr_print').onclick = () => {
          const term = ($('rep_pr_search').value || '').toLowerCase();
          let list = state.propietarios;
          if (term) list = list.filter((pr) => pr.Nombre_Completo.toLowerCase().includes(term) || pr.telefono.includes(term) || pr.correo_electronico.toLowerCase().includes(term));
          const html = '<h2>Reporte Propietarios</h2>' + tableHtml(['ID Prop', 'Nombre', 'Teléfono', 'Correo'], list.map((pr) => [pr.id_prop, pr.Nombre_Completo, pr.telefono, pr.correo_electronico]));
          const w = window.open('', '', 'width=900,height=600');
          w.document.write('<html><head><title>Reporte Propietarios</title><style>body{font-family:Arial;margin:20px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ccc;padding:8px;text-align:left}th{background:#1976d2;color:white}h2{color:#1976d2}</style></head><body>' + html + '</body></html>');
          w.document.close();
          w.print();
        };
        $('btn_pr_csv').onclick = () => {
          const term = ($('rep_pr_search').value || '').toLowerCase();
          let list = state.propietarios;
          if (term) list = list.filter((pr) => pr.Nombre_Completo.toLowerCase().includes(term) || pr.telefono.includes(term) || pr.correo_electronico.toLowerCase().includes(term));
          let csv = 'ID,Nombre,Teléfono,Correo\n';
          list.forEach(pr => csv += pr.id_prop + ',' + pr.Nombre_Completo + ',' + pr.telefono + ',' + pr.correo_electronico + '\n');
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'Propietarios_' + new Date().toISOString().split('T')[0] + '.csv';
          a.click();
          URL.revokeObjectURL(a.href);
        };
        break;

      case 'rep-citas':
        workspace(
          '<h2>Reporte: Citas (' + state.citas.length + ' registros)</h2>' +
            '<div class="form-grid"><label>Buscar por motivo<input id="rep_c_search" type="text" placeholder="Ej: Vacunación, Castración" /></label>' +
            '<label>Filtrar por fecha (desde)<input id="rep_c_fecha" type="date" /></label></div>' +
            '<div class="stack-btns">' +
            '<button type="button" class="action" id="btn_c_print">🖨️ Imprimir</button>' +
            '<button type="button" class="action" id="btn_c_csv">📥 Descargar CSV</button>' +
            '</div>' +
            '<div id="rep_c_out"></div>' +
            backBtnAdmin()
        );
        const renderCitas = () => {
          const term = ($('rep_c_search').value || '').toLowerCase();
          const fecha = ($('rep_c_fecha').value || '');
          let list = state.citas;
          if (term) list = list.filter((ct) => ct.motivo.toLowerCase().includes(term));
          if (fecha) list = list.filter((ct) => ct.fecha_cita.startsWith(fecha));
          $('rep_c_out').innerHTML = tableHtml(['ID', 'ID Paciente', 'Fecha', 'Motivo'], list.map((ct) => [ct.id_cita, ct.id_paciente, ct.fecha_cita, ct.motivo]));
        };
        renderCitas();
        $('rep_c_search').oninput = renderCitas;
        $('rep_c_fecha').onchange = renderCitas;
        $('btn_c_print').onclick = () => {
          const term = ($('rep_c_search').value || '').toLowerCase();
          const fecha = ($('rep_c_fecha').value || '');
          let list = state.citas;
          if (term) list = list.filter((ct) => ct.motivo.toLowerCase().includes(term));
          if (fecha) list = list.filter((ct) => ct.fecha_cita.startsWith(fecha));
          const html = '<h2>Reporte Citas</h2>' + tableHtml(['ID', 'ID Paciente', 'Fecha', 'Motivo'], list.map((ct) => [ct.id_cita, ct.id_paciente, ct.fecha_cita, ct.motivo]));
          const w = window.open('', '', 'width=900,height=600');
          w.document.write('<html><head><title>Reporte Citas</title><style>body{font-family:Arial;margin:20px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ccc;padding:8px;text-align:left}th{background:#1976d2;color:white}h2{color:#1976d2}</style></head><body>' + html + '</body></html>');
          w.document.close();
          w.print();
        };
        $('btn_c_csv').onclick = () => {
          const term = ($('rep_c_search').value || '').toLowerCase();
          const fecha = ($('rep_c_fecha').value || '');
          let list = state.citas;
          if (term) list = list.filter((ct) => ct.motivo.toLowerCase().includes(term));
          if (fecha) list = list.filter((ct) => ct.fecha_cita.startsWith(fecha));
          let csv = 'ID,ID_Paciente,Fecha,Motivo\n';
          list.forEach(ct => csv += ct.id_cita + ',' + ct.id_paciente + ',' + ct.fecha_cita + ',' + ct.motivo + '\n');
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'Citas_' + new Date().toISOString().split('T')[0] + '.csv';
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
