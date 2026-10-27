<?php
require_once dirname(__DIR__) . '/includes/db.php';
$pdo = vet_get_pdo();
$id_prop = isset($_POST['id_prop']) ? $_POST['id_prop'] : null;
$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : null;
$especie = isset($_POST['especie']) ? $_POST['especie'] : null;
$sexo = isset($_POST['sexo']) ? $_POST['sexo'] : null;
$peso = isset($_POST['peso']) ? $_POST['peso'] : null;
$edad = isset($_POST['edad']) ? $_POST['edad'] : null;
$id_paciente = isset($_POST['id_paciente']) ? $_POST['id_paciente'] : null;
echo "Sexo recibido: " . $sexo . "<br>";
if ($id_prop === null || $id_paciente === null) {
    echo "Error: Los campos 'id_prop' y 'id_paciente' son obligatorios.";
    exit;
}

$sql = 'UPDATE pacientes SET id_prop = ?, Nombre = ?, Especie = ?, Sexo = ?, Peso = ?, Edad = ? WHERE id_paciente = ?';
$stmt = $pdo->prepare($sql);

if ($stmt->execute([$id_prop, $nombre, $especie, $sexo, $peso, $edad, $id_paciente])) {
    echo "Paciente modificado correctamente.";
} else {
    echo "Error al modificar el paciente.";
}
?>
