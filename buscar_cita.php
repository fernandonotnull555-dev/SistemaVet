<?php
require_once __DIR__ . '/includes/db.php';
$pdo = vet_get_pdo();

$resultado = [];

$id_cita = isset($_POST['id_cita']) ? $_POST['id_cita'] : '';
$id_paciente = isset($_POST['id_paciente']) ? $_POST['id_paciente'] : '';

if (!empty($id_cita)) {
    echo "Buscando por ID de cita: " . htmlspecialchars((string) $id_cita) . "<br>";
    $stmt = $pdo->prepare('SELECT * FROM citas WHERE id_cita = ?');
    $stmt->execute([$id_cita]);
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
} elseif (!empty($id_paciente)) {
    echo "Buscando por ID de paciente: " . htmlspecialchars((string) $id_paciente) . "<br>";
    $stmt = $pdo->prepare('SELECT * FROM citas WHERE id_paciente = ?');
    $stmt->execute([$id_paciente]);
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
} else {
    echo "No se ha proporcionado ni ID de cita ni ID de paciente.<br>";
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buscar Cita</title>
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
    echo "<tr><th>ID cita</th><th>ID paciente</th><th>Fecha cita</th><th>Motivo</th></tr>";
    foreach ($resultado as $fila) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars((string) $fila['id_cita']) . "</td>";
        echo "<td>" . htmlspecialchars((string) $fila['id_paciente']) . "</td>";
        echo "<td>" . htmlspecialchars((string) $fila['fecha_cita']) . "</td>";
        echo "<td>" . htmlspecialchars((string) $fila['motivo']) . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "<p>No se encontraron resultados para los criterios proporcionados.</p>";
}
?>

<!-- Enlace para regresar -->
<button onclick="window.location.href='buscar_cita.html'">Regresar a la búsqueda</button>

</body>
</html>
