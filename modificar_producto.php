<?php
require_once __DIR__ . '/includes/db.php';
$pdo = vet_get_pdo();

// Obtener datos del formulario
$id_producto = $_POST['id_producto']; // ID del producto, asegurate de tener este campo en tu formulario
$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];
$precio = $_POST['precio'];
$cantidad_exist = $_POST['existencia']; // Asegúrate de que este campo existe en tu formulario

$sql = 'UPDATE productos SET nombre=?, descripcion=?, precio=?, cantidad_exist=? WHERE id=?';
$stmt = $pdo->prepare($sql);

if ($stmt->execute([$nombre, $descripcion, $precio, $cantidad_exist, $id_producto])) {
    echo "Producto modificado correctamente.";
} else {
    echo "Error al modificar el producto.";
}

// Redirigir a otra página o mostrar un mensaje de éxito
//echo "Producto Actualizado Correctamente";
//header("Location: modificar_bd.html"); // Cambia a la página que desees redirigir
exit;
?>
