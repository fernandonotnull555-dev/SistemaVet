<?php
require_once __DIR__ . '/includes/db.php';
$pdo = vet_get_pdo();

$id_paciente = $_POST['id_paciente'];
$fecha_cita = $_POST['fecha_cita'];
$motivo = $_POST['motivo'];

$sql = 'INSERT INTO citas (id_paciente, fecha_cita, motivo) VALUES (?, ?, ?)';
$stmt = $pdo->prepare($sql);

if ($stmt->execute([$id_paciente, $fecha_cita, $motivo])) {
    $id_nueva_cita = $pdo->lastInsertId();
    echo "<script>alert('Cita insertada correctamente. El ID de la cita es: " . $id_nueva_cita . "');</script>";
    echo "<script>window.location.href = 'menu_insertarbd.html';</script>";
} else {
    echo "Error al insertar la cita.";
}
?>
