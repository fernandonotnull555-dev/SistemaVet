<?php
require_once __DIR__ . '/includes/db.php';
$pdo = vet_get_pdo();

// Obtener datos del formulario
$id_usuario = $_POST['id_usuario'];
$nombre_completo = $_POST['nombre_completo'];
$correo_electronico = $_POST['correo'];
$contrasena = $_POST['contrasena'];
$rol_usuario = $_POST['rol_usuario'];

$sql = 'UPDATE usuarios SET nombre_completo = ?, correo_electronico = ?, contrasena = ?, rol_usuario = ? WHERE id_usuario = ?';
$stmt = $pdo->prepare($sql);

if ($stmt->execute([$nombre_completo, $correo_electronico, vet_password_hash($contrasena), $rol_usuario, $id_usuario])) {
    echo "Usuario modificado correctamente.";
} else {
    echo "Error al modificar el usuario.";
}
?>
