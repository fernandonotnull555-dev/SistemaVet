<?php
require_once __DIR__ . '/includes/db.php';
$pdo = vet_get_pdo();

$id_cita = isset($_POST['id_cita']) ? $_POST['id_cita'] : '';

if (!empty($id_cita)) {
    $stmt_pacientes = $pdo->prepare('UPDATE pacientes SET id_cita = NULL WHERE id_cita = ?');
    $stmt_pacientes->execute([$id_cita]);

    $stmt = $pdo->prepare('DELETE FROM citas WHERE id_cita = ?');
    $stmt->execute([$id_cita]);

    if ($stmt->rowCount() > 0) {
        header("Location: menu_eliminar.html");
        exit;
    }
    echo "<p>No se encontró ninguna cita con ese ID.</p>";
} else {
    echo "<p>Por favor, ingrese un ID de cita válido.</p>";
}
?>

