<?php
require_once dirname(__DIR__) . '/includes/db.php';
$pdo = vet_get_pdo();

$id_paciente = isset($_POST['id_paciente']) ? $_POST['id_paciente'] : '';

$sql = 'SELECT * FROM propietarios WHERE id_paciente = ?';
$stmt = $pdo->prepare($sql);
$stmt->execute([$id_paciente]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buscar Propietario</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #e6f9e6;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #4CAF50;
            text-align: center;
            margin-bottom: 20px;
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
            display: block;
            width: 100%;
            margin-top: 20px;
        }
        button:hover {
            background-color: #388E3C;
        }
    </style>
</head>
<body>

<h1>Resultados de la Búsqueda de Propietario</h1>

<?php if (count($result) > 0): ?>
    <table>
        <tr>
            <th>ID del Propietario</th>
            <th>ID del Paciente</th>
            <th>Nombre Completo</th>
            <th>Teléfono</th>
            <th>Correo Electrónico</th>
        </tr>
        <?php foreach ($result as $row): ?>
            <tr>
                <td><?php echo htmlspecialchars((string) $row['id_prop']); ?></td>
                <td><?php echo htmlspecialchars((string) $row['id_paciente']); ?></td>
                <td><?php echo htmlspecialchars((string) $row['Nombre_Completo']); ?></td>
                <td><?php echo htmlspecialchars((string) $row['telefono']); ?></td>
                <td><?php echo htmlspecialchars((string) $row['correo_electronico']); ?></td>
            </tr>
        <?php endforeach; ?>
    </table>
<?php else: ?>
    <p>No se encontró ningún propietario con el ID de paciente: <?php echo htmlspecialchars($id_paciente); ?></p>
<?php endif; ?>


<button onclick="window.location.href='../html/empleado_buscar_propietarios.html'">Regresar a la búsqueda</button>

</body>
</html>
