<?php
require_once __DIR__ . '/includes/db.php';
$pdo = vet_get_pdo();

// Obtener datos del formulario
$id_cita = $_POST['id_cita'];
$id_paciente = $_POST['id_paciente'];
$fecha_cita = $_POST['fecha_cita'];
$motivo = $_POST['motivo'];

$sql = 'UPDATE citas SET id_paciente = ?, fecha_cita = ?, motivo = ? WHERE id_cita = ?';
$stmt = $pdo->prepare($sql);

if ($stmt->execute([$id_paciente, $fecha_cita, $motivo, $id_cita])) {
    if ($stmt->rowCount() > 0) {
        echo "Cita modificada correctamente.";
    } else {
        echo "No se encontró ninguna cita con ese ID.";
    }
} else {
    echo "Error al modificar la cita.";
}
?>
