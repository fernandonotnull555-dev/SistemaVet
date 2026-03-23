<?php
require_once __DIR__ . '/includes/db.php';
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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Tipo de fuente para el cuerpo */
            background-color: #e9ecef; /* Color de fondo gris claro */
            margin: 0; /* Elimina el margen por defecto */
            padding: 20px; /* Espaciado interno del cuerpo */
        }
        table {
            width: 100%; /* Ancho completo de la tabla */
            border-collapse: collapse; /* Colapsa los bordes de la tabla */
            margin-top: 20px; /* Espacio superior para la tabla */
            background-color: #fff; /* Color de fondo blanco para la tabla */
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Sombra para dar profundidad */
        }
        th, td {
            padding: 12px; /* Espaciado interno para celdas */
            text-align: left; /* Alineación de texto a la izquierda */
            border-bottom: 1px solid #4CAF50; /* Borde inferior verde para las celdas */
        }
        th {
            background-color: #4CAF50; /* Color de fondo verde para los encabezados */
            color: white; /* Color del texto en los encabezados */
        }
        tr:hover {
            background-color: #f1f1f1; /* Color de fondo al pasar el mouse sobre la fila */
        }
        button {
            padding: 10px 20px; /* Espaciado interno del botón */
            border: none; /* Sin borde */
            border-radius: 4px; /* Bordes redondeados */
            cursor: pointer; /* Cambiar el cursor al pasar sobre el botón */
            background-color: #4CAF50; /* Color de fondo verde */
            color: white; /* Color del texto del botón */
            font-size: 16px; /* Tamaño de fuente */
            transition: background-color 0.3s; /* Transición suave para el cambio de color */
            margin-top: 20px; /* Espacio superior para el botón */
        }
        button:hover {
            background-color: #388E3C; /* Color de fondo al pasar el mouse sobre el botón */
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

<!-- Enlace para regresar -->
<button onclick="window.location.href='buscar_usuarios.html'">Regresar a la búsqueda</button> <!-- Botón para regresar a la página de búsqueda -->

</body>
</html>
