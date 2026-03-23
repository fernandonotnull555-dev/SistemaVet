<?php
require_once __DIR__ . '/includes/db.php';
$pdo = vet_get_pdo();

// Obtener datos del formulario con validaciones básicas
$id_prop = isset($_POST['id_prop']) ? (int)$_POST['id_prop'] : 0;
$id_paciente = isset($_POST['id_paciente']) ? (int)$_POST['id_paciente'] : 0;
$Nombre_Completo = isset($_POST['Nombre_Completo']) ? trim($_POST['Nombre_Completo']) : '';
$telefono = isset($_POST['telefono']) ? (int)$_POST['telefono'] : 0;
$correo_electronico = isset($_POST['correo_electronico']) ? trim($_POST['correo_electronico']) : '';

// Validación de campos vacíos o incorrectos
if ($id_prop > 0 && $id_paciente > 0 && !empty($Nombre_Completo) && $telefono > 0 && !empty($correo_electronico)) {

    $sql = 'UPDATE propietarios SET id_paciente=?, Nombre_Completo=?, telefono=?, correo_electronico=? WHERE id_prop=?';
    $stmt = $pdo->prepare($sql);

    if ($stmt->execute([$id_paciente, $Nombre_Completo, (string) $telefono, $correo_electronico, $id_prop])) {
        echo "Propietario modificado correctamente.";
    } else {
        echo "Error al modificar el propietario.";
    }
} else {
    echo "Error: Datos inválidos o faltantes.";
}

// Redirigir a otra página o mostrar un mensaje de éxito
//header("Location: modificar_bd.html"); // Cambia a la página que desees redirigir
exit;
?>
