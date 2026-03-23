<?php
require_once __DIR__ . '/includes/db.php';
$pdo = vet_get_pdo();

$id_paciente = $_POST['id_paciente'];
$nombre_completo = $_POST['nombre_completo'];
$telefono = $_POST['telefono'];
$correo_electronico = $_POST['correo_electronico'];

$sql = 'INSERT INTO propietarios (id_paciente, Nombre_Completo, telefono, correo_electronico) VALUES (?, ?, ?, ?)';
$stmt = $pdo->prepare($sql);

if ($stmt->execute([$id_paciente, $nombre_completo, (string) $telefono, $correo_electronico])) {
    $id_nuevo_propietario = $pdo->lastInsertId();
    echo "<script>alert('Propietario insertado correctamente. El ID del propietario es: " . $id_nuevo_propietario . "');</script>";
    echo "<script>window.location.href = 'menu_insertarbd.html';</script>";
} else {
    echo "Error al insertar el propietario.";
}
?>
