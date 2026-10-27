<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    try {
        require_once dirname(__DIR__) . '/includes/db.php';
        $pdo = vet_get_pdo();
        $sql = "SELECT id_cita, id_paciente, fecha_cita, motivo FROM citas";
        $stmt = $pdo->prepare($sql);
        if (!$stmt) {
            throw new Exception("Error al preparar la consulta SQL.");
        }
        $stmt->execute();
        $html = '
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reporte de Citas</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f8f9fa;
                    padding: 20px;
                }
                h1 {
                    color: #007BFF;
                    text-align: center;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: center;
                }
                th {
                    background-color: #4CAF50;
                    color: white;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>Reporte de Todas las citas</h1>
            <table>
                <tr>
                    <th>ID cita</th>
                    <th>ID paciente</th>
                    <th>fecha de la cita</th>
                    <th>motivo</th>
                </tr>';
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $html .= '
                <tr>
                    <td>' . htmlspecialchars($row['id_cita']) . '</td>
                    <td>' . htmlspecialchars($row['id_paciente']) . '</td>
                    <td>' . htmlspecialchars($row['fecha_cita']) . '</td>
                    <td>' . htmlspecialchars($row['motivo']) . '</td>
                </tr>';
            }
        } else {
            $html .= '<tr><td colspan="4">No se encontraron citas en el sistema.</td></tr>';
        }

        $html .= '
            </table>
        </body>
        </html>';
        echo $html;

    } catch (PDOException $e) {
        die("Error al conectar a la base de datos: " . $e->getMessage());
    } catch (Exception $e) {
        die("Error: " . $e->getMessage());
    }
} else {
    echo "Por favor, utiliza el formulario para generar el reporte.";
}
?>
