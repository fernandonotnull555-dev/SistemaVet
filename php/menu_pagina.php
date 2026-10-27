<?php
session_start();
if (!isset($_SESSION['usuario_id'])) {
    header('Location: ../html/login.html');
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menú - Veterinaria</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
        }

        header {
            background-color: rgba(92, 175, 76, 0.8);
            padding: 15px 20px;
            text-align: center;
            color: white;
        }

        nav {
            display: flex;
            justify-content: center;
            background-color: rgba(51, 51, 51, 0.8);
            padding: 10px;
        }

        nav a {
            color: white;
            padding: 15px 20px;
            text-decoration: none;
            text-align: center;
            transition: background-color 0.3s;
        }

        nav a:hover {
            background-color: #021bfa;
        }

        h1 {
            color: #000000;
            text-align: center;
            margin: 20px 0;
        }

        .mascota-imagen {
            display: block;
            margin: 20px auto;
            max-width: 80%;
            height: auto;
        }
    </style>
</head>
<body>
    <header>
        <h1>Bienvenido/a a nuestra Veterinaria</h1>
    </header>

    <nav>
        <a href="../html/insertar_usuario.html">Crear Usuario</a>
        <a href="../html/menu_insertarbd.html">Insertar Registros</a>
        <a href="../html/modificar_bd.html">Modificar en la Base de Datos</a>
        <a href="../html/menu_buscar.html">Buscar Usuarios en la Base de Datos</a>
        <a href="../html/menu_eliminar.html">Eliminar Registros de la Base de Datos</a>
        <a href="../html/menu_reportes.html">Generar Reportes</a>
        <a href="logout.php">Cerrar Sesión</a>
    </nav>


    <img src="../assets/mascotas.jpg" alt="Imagen de mascotas" class="mascota-imagen">
</body>
</html>
