<?php
require_once __DIR__ . '/includes/db.php';
$pdo = vet_get_pdo();

$id = isset($_POST['id']) ? $_POST['id'] : '';

$sql = 'SELECT * FROM productos WHERE id = ?';
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);
$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buscar Productos</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #e9ecef;
            margin: 0;
            padding: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse; /* Evitar doble borde */
            margin-top: 20px;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        th, td {
            padding: 12px;
            text-align: left;
            /*border: 1px solid white; /* Cambiar el borde a negro */
        }
        th {
            background-color: #4CAF50;
            color: white;
        }
        td.cantidad-exist {
            width: 100px; /* Fija el ancho de la columna cantidad_exist */
        }
        tr:hover {
            background-color: #f1f1f1;
        }
        button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            background-color: #4CAF50;
            color: white;
            font-size: 16px;
            transition: background-color 0.3s;
            margin-top: 20px;
        }
        button:hover {
            background-color: #388E3C;
        }
    </style>
</head>
<body>

<?php
if (count($resultado) > 0) {
    echo "<table>";
    echo "<tr><th>ID</th><th>nombre</th><th>descripcion</th><th>precio</th><th>cantidad_exist</th></tr>"; // Encabezado corregido
    foreach ($resultado as $fila) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars((string) $fila['id']) . "</td>";
        echo "<td>" . htmlspecialchars((string) $fila['nombre']) . "</td>";
        echo "<td>" . htmlspecialchars((string) $fila['descripcion']) . "</td>";
        echo "<td>" . htmlspecialchars((string) $fila['precio']) . "</td>";
        echo "<td class='cantidad-exist'>" . htmlspecialchars((string) $fila['cantidad_exist']) . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "<p>No se encontraron resultados.</p>";
}
?>

<!-- Enlace para regresar -->
<button onclick="window.location.href='empleado_buscar_productos.html'">Regresar a la búsqueda</button>

</body>
</html>
