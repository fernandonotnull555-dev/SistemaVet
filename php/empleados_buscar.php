<?php
require_once dirname(__DIR__) . '/includes/db.php';
$pdo = vet_get_pdo();

$id_usuario = isset($_POST['id_usuario']) ? $_POST['id_usuario'] : '';

$sql = 'SELECT * FROM usuarios WHERE id_usuario = ?';
$stmt = $pdo->prepare($sql);
$stmt->execute([$id_usuario]);
$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buscar Usuario</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #e9ecef;
            margin: 0;
            padding: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #4CAF50;
        }
        th {
            background-color: #4CAF50;
            color: white;
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
    echo "<tr><th>ID Usuario</th><th>Nombre Completo</th><th>Correo Electrónico</th><th>Rol de Usuario</th></tr>";
    foreach ($resultado as $fila) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars((string) $fila['id_usuario']) . "</td>";
        echo "<td>" . htmlspecialchars((string) $fila['nombre_completo']) . "</td>";
        echo "<td>" . htmlspecialchars((string) $fila['correo_electronico']) . "</td>";
        echo "<td>" . htmlspecialchars((string) $fila['rol_usuario']) . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "<p>No se encontraron resultados.</p>";
}
?>


<button onclick="window.location.href='../html/empleado_buscar_usuarios.html'">Regresar a la búsqueda</button>

</body>
</html>
