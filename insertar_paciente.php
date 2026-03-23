<?php
// insertar_paciente.php
require_once __DIR__ . '/includes/db.php';
$pdo = vet_get_pdo();

$id_prop = $_POST['id_prop'];
$nombre = $_POST['nombre'];
$especie = $_POST['especie'];
$sexo = $_POST['sexo'];
$peso = $_POST['peso'];
$edad = $_POST['edad'];

$stmt_duplicate = $pdo->prepare('SELECT 1 FROM pacientes WHERE Nombre = ? AND id_prop = ?');
$stmt_duplicate->execute([$nombre, $id_prop]);

if ($stmt_duplicate->fetch()) {
    echo "Error: Ya existe un paciente con el mismo nombre y propietario.";
} else {
    $sql = 'INSERT INTO pacientes (id_prop, Nombre, Especie, Sexo, Peso, Edad) VALUES (?, ?, ?, ?, ?, ?)';
    $stmt = $pdo->prepare($sql);

    if ($stmt->execute([$id_prop, $nombre, $especie, $sexo, $peso, $edad])) {
        $id_nuevo_paciente = $pdo->lastInsertId();
        echo "<script>alert('Paciente insertado correctamente. El ID del paciente es: " . $id_nuevo_paciente . "');</script>";
        echo "<script>window.location.href = 'menu_insertarbd.html';</script>";
    } else {
        echo "Error al insertar paciente.";
    }
}
?>
