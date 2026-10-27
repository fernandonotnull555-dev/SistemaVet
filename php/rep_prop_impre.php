<?php
require_once dirname(__DIR__) . '/dompdf/autoload.inc.php';
use Dompdf\Dompdf;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    try {
        require_once dirname(__DIR__) . '/includes/db.php';
        $pdo = vet_get_pdo();
        $sql = "SELECT p.id_prop,  pa.id_paciente, p.Nombre_Completo, p.telefono, p.correo_electronico
                FROM propietarios p
                LEFT JOIN pacientes pa ON p.id_prop = pa.id_prop";
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
            <title>Reporte de Propietarios</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f8f9fa;
                    padding: 20px;
                    color: #000;
                }
                h1 {
                    color: #000;
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
                    color: #000;
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
            <h1>Reporte de Propietarios</h1>
            <table>
                <tr>

                    <th>ID Propietario</th>
                    <th>ID Paciente</th>
                    <th>Nombre Completo</th>
                    <th>Teléfono</th>
                    <th>Correo Electrónico</th>

                </tr>';
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $html .= '
                <tr>
                    <td>' . htmlspecialchars($row['id_prop']) . '</td>
                    <td>' . htmlspecialchars($row['id_paciente']) . '</td>
                    <td>' . htmlspecialchars($row['Nombre_Completo']) . '</td>
                    <td>' . htmlspecialchars($row['telefono']) . '</td>
                    <td>' . htmlspecialchars($row['correo_electronico']) . '</td>

                </tr>';
            }
        } else {
            $html .= '<tr><td colspan="5">No se encontraron propietarios en el sistema.</td></tr>';
        }

        $html .= '
            </table>
        </body>
        </html>';
        $dompdf = new Dompdf();
        $dompdf->loadHtml($html);
        $dompdf->render();
        header("Content-type: application/pdf");
        header("Content-Disposition: inline; filename=reporte_propietarios.pdf");
        echo $dompdf->output();

    } catch (PDOException $e) {
        die("Error al conectar a la base de datos: " . $e->getMessage());
    } catch (Exception $e) {
        die("Error: " . $e->getMessage());
    }
} else {
    echo "Por favor, utiliza el formulario para generar el reporte.";
}
?>
