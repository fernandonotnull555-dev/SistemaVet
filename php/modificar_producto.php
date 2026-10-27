<?php
require_once dirname(__DIR__) . '/includes/db.php';
$pdo = vet_get_pdo();
$id_producto = $_POST['id_producto'];
$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];
$precio = $_POST['precio'];
$cantidad_exist = $_POST['existencia'];

$sql = 'UPDATE productos SET nombre=?, descripcion=?, precio=?, cantidad_exist=? WHERE id=?';
$stmt = $pdo->prepare($sql);

if ($stmt->execute([$nombre, $descripcion, $precio, $cantidad_exist, $id_producto])) {
    echo "Producto modificado correctamente.";
} else {
    echo "Error al modificar el producto.";
}
exit;
?>
