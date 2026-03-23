<?php
// empleado_insertar_paciente.php — inserción con id_cita (empleado)
require_once __DIR__ . '/includes/db.php';
$pdo = vet_get_pdo();

$id_prop = $_POST['id_prop'];
$nombre = $_POST['nombre'];
$especie = $_POST['especie'];
$sexo = $_POST['sexo'];
$peso = $_POST['peso'];
$edad = $_POST['edad'];
$id_cita = $_POST['id_cita'];

$stmt_check = $pdo->prepare('SELECT 1 FROM citas WHERE id_cita = ?');
$stmt_check->execute([$id_cita]);

if (!$stmt_check->fetch()) {
    echo "Error: La cita seleccionada no existe.";
    exit;
}

$stmt_duplicate = $pdo->prepare('SELECT 1 FROM pacientes WHERE Nombre = ? AND id_prop = ?');
$stmt_duplicate->execute([$nombre, $id_prop]);

if ($stmt_duplicate->fetch()) {
    echo "Error: Ya existe un paciente con el mismo nombre y propietario.";
} else {
    $sql = 'INSERT INTO pacientes (id_prop, Nombre, Especie, Sexo, Peso, Edad, id_cita) VALUES (?, ?, ?, ?, ?, ?, ?)';
    $stmt = $pdo->prepare($sql);

    if ($stmt->execute([$id_prop, $nombre, $especie, $sexo, $peso, $edad, $id_cita])) {
        echo "Paciente insertado correctamente";
    } else {
        echo "Error al insertar paciente.";
    }
}
