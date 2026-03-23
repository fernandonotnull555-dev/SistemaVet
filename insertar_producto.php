<?php
require_once __DIR__ . '/includes/db.php';
$pdo = vet_get_pdo();

$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];
$precio = $_POST['precio'];
$cantidad_exist = $_POST['existencia'];

$sql = 'INSERT INTO productos (nombre, descripcion, precio, cantidad_exist) VALUES (?, ?, ?, ?)';
$stmt = $pdo->prepare($sql);

if ($stmt->execute([$nombre, $descripcion, $precio, $cantidad_exist])) {
    $id_nuevo_producto = $pdo->lastInsertId();
    echo "<script>alert('Producto insertado correctamente. El ID del producto es: " . $id_nuevo_producto . "');</script>";
    echo "<script>window.location.href = 'menu_insertarbd.html';</script>";
} else {
    echo "Error al insertar el producto.";
}
?>
