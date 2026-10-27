<?php
require_once dirname(__DIR__) . '/dompdf/autoload.inc.php';
use Dompdf\Dompdf;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    try {
        require_once dirname(__DIR__) . '/includes/db.php';
        $pdo = vet_get_pdo();
        $sql = "SELECT id_paciente, id_prop, Nombre, Especie, Sexo, Peso, Edad FROM pacientes";
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
            <title>Reporte de Pacientes</title>
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

            <h1>Reporte de Todos los Pacientes</h1>
            <table>
                <tr>
                    <th>Id Paciente</th>
                    <th>Id del propietario</th>
                    <th>Nombre</th>
                    <th>Especie</th>
                    <th>Sexo</th>
                    <th>Peso</th>
                    <th>Edad</th>
                </tr>';
        if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $html .= '
                <tr>
                    <td>' . htmlspecialchars($row['id_paciente']) . '</td>
                    <td>' . htmlspecialchars($row['id_prop']) . '</td>
                    <td>' . htmlspecialchars($row['Nombre']) . '</td>
                    <td>' . htmlspecialchars($row['Especie']) . '</td>
                    <td>' . htmlspecialchars($row['Sexo']) . '</td>
                    <td>' . htmlspecialchars($row['Peso']) . '</td>
                    <td>' . htmlspecialchars($row['Edad']) . '</td>
                </tr>';
            }
        } else {
            $html .= '<tr><td colspan="8">No se encontraron pacientes en el sistema.</td></tr>';
        }

        $html .= '
            </table>
        </body>
        </html>';
        $dompdf = new Dompdf();
        $dompdf->loadHtml($html);
        $dompdf->render();
        header("Content-type: application/pdf");
        header("Content-Disposition: inline; filename=reporte_pacientes.pdf");
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
