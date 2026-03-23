<?php
session_start(); // Iniciar la sesión

require_once __DIR__ . '/includes/db.php';
$pdo = vet_get_pdo();

// Recibir y sanitizar los datos del formulario
$correo = trim($_POST['correo']); // Sanitizar el correo
$contraseña = trim($_POST['contrasena']); // Sanitizar la contraseña

$hash = vet_password_hash($contraseña);
$query = 'SELECT * FROM usuarios WHERE correo_electronico = ? AND contrasena = ?';
$stmt = $pdo->prepare($query);
$stmt->execute([$correo, $hash]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

// Verificar si hay algún resultado (usuario encontrado)
if ($usuario) {
    // Inicio de sesión exitoso

    $_SESSION['correo'] = $correo; // Guardar el correo en la sesión
    $_SESSION['rol'] = $usuario['rol_usuario']; // Guardar el rol del usuario en la sesión

    // Redirigir según el rol del usuario
    if ($usuario['rol_usuario'] == 'Administrador') {
        header('Location: menu.html'); // Redirigir al menú de administrador
    } else {
        header('Location: menu2.html'); // Redirigir al menú de empleado
    }
    exit(); // Detener la ejecución del script después de la redirección
} else {
    // Si el inicio de sesión falla
    echo "Correo o contraseña incorrectos."; // Mensaje de error
}

?>
