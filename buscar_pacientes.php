<?php
require_once __DIR__ . '/includes/db.php';
$pdo = vet_get_pdo();

// Preparar los campos enviados desde el formulario
$id_paciente = isset($_POST['id_paciente']) ? $_POST['id_paciente'] : null;
$id_prop = isset($_POST['id_prop']) ? $_POST['id_prop'] : null;
$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : null;
$especie = isset($_POST['especie']) ? $_POST['especie'] : null;
$sexo = isset($_POST['sexo']) ? $_POST['sexo'] : null;
$peso = isset($_POST['peso']) ? $_POST['peso'] : null;
$edad = isset($_POST['edad']) ? $_POST['edad'] : null;

// Construir la consulta SQL dinámicamente
$sql = "SELECT * FROM pacientes WHERE 1=1";
if (!empty($id_paciente)) {
    $sql .= " AND id_paciente = ?";
}
if (!empty($id_prop)) {
    $sql .= " AND id_prop = ?";
}
if (!empty($nombre)) {
    $sql .= " AND Nombre LIKE ?";
}
if (!empty($especie)) {
    $sql .= " AND Especie LIKE ?";
}
if (!empty($sexo)) {
    $sql .= " AND Sexo = ?";
}
if (!empty($peso)) {
    $sql .= " AND Peso LIKE ?";
}
if (!empty($edad)) {
    $sql .= " AND Edad LIKE ?";
}

$parametros = [];

if (!empty($id_paciente)) {
    $parametros[] = $id_paciente;
}
if (!empty($id_prop)) {
    $parametros[] = $id_prop;
}
if (!empty($nombre)) {
    $parametros[] = "%" . $nombre . "%";
}
if (!empty($especie)) {
    $parametros[] = "%" . $especie . "%";
}
if (!empty($sexo)) {
    $parametros[] = $sexo;
}
if (!empty($peso)) {
    $parametros[] = "%" . $peso . "%";
}
if (!empty($edad)) {
    $parametros[] = "%" . $edad . "%";
}

$stmt = $pdo->prepare($sql);
$stmt->execute($parametros);
$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buscar pacientes</title>
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
    echo "<tr><th>ID del paciente</th><th>ID del propietario</th><th>Nombre</th><th>Especie</th><th>Sexo</th><th>Peso</th><th>Edad</th></tr>";
    foreach ($resultado as $fila) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars((string) $fila['id_paciente']) . "</td>";
        echo "<td>" . htmlspecialchars((string) $fila['id_prop']) . "</td>";
        echo "<td>" . htmlspecialchars((string) $fila['Nombre']) . "</td>";
        echo "<td>" . htmlspecialchars((string) $fila['Especie']) . "</td>";
        echo "<td>" . htmlspecialchars((string) $fila['Sexo']) . "</td>";
        echo "<td>" . htmlspecialchars((string) $fila['Peso']) . "</td>";
        echo "<td>" . htmlspecialchars((string) $fila['Edad']) . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "<p>No se encontraron resultados.</p>";
}
?>

<!-- Botón para regresar -->
<button onclick="window.location.href='buscar_pacientes.html'">Regresar a la búsqueda</button>

</body>
</html>
