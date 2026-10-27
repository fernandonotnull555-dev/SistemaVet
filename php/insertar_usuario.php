<?php
require_once dirname(__DIR__) . '/includes/db.php';
$pdo = vet_get_pdo();
if (isset($_POST['nombre_completo'], $_POST['correo'], $_POST['contrasena'], $_POST['rol_usuario'])) {
    $nombre_completo = $_POST['nombre_completo'];
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];
    $rol_usuario = $_POST['rol_usuario'];

    $query = 'INSERT INTO usuarios (nombre_completo, correo_electronico, contrasena, rol_usuario) VALUES (?, ?, ?, ?)';
    $stmt = $pdo->prepare($query);

    try {
        if ($stmt->execute([$nombre_completo, $correo, vet_password_hash($contrasena), $rol_usuario])) {
            echo "Usuario registrado exitosamente.";
        } else {
            echo "Error al registrar el usuario.";
        }
    } catch (PDOException $e) {
        echo "Error al registrar el usuario: " . htmlspecialchars($e->getMessage());
    }
} else {
    echo "Por favor, completa todos los campos.";
}
?>
