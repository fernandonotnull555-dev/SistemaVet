<?php
require_once dirname(__DIR__) . '/includes/db.php';
vet_get_pdo();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pantalla de Bienvenida - Veterinaria</title>
    <style>

        body {
            font-family: Arial, sans-serif;
            background-color: #e9ecef;
            color: #343a40;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        h1 {
            margin-bottom: 20px;
            color: #5cb85c;
        }

        a {
            text-decoration: none;
            color: white;
            background-color: #5cb85c;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background-color 0.3s;
        }

        a:hover {
            background-color: #4cae4c;
        }

        .container {
            text-align: center;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Bienvenido/as</h1>
    <p>Bienvenido/as a la base de datos de Veterinaria "La Mascota".</p>
    <a href="../html/login.html">Ir a Login</a>
</div>

</body>
</html>
