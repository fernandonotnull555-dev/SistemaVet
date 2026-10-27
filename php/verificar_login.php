<?php
session_start();

require_once dirname(__DIR__) . '/includes/db.php';
$pdo = vet_get_pdo();
$correo = trim($_POST['correo']);
$contraseña = trim($_POST['contrasena']);

$hash = vet_password_hash($contraseña);
$query = 'SELECT * FROM usuarios WHERE correo_electronico = ? AND contrasena = ?';
$stmt = $pdo->prepare($query);
$stmt->execute([$correo, $hash]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);
if ($usuario) {

    $_SESSION['correo'] = $correo;
    $_SESSION['rol'] = $usuario['rol_usuario'];
    if ($usuario['rol_usuario'] == 'Administrador') {
        header('Location: menu_pagina.php');
    } else {
        header('Location: menu2_pagina.php');
    }
    exit();
} else {
    echo "Correo o contraseña incorrectos.";
}

?>
