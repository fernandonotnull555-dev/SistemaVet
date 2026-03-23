<?php
/**
 * Respaldo de la base SQLite local (copia del archivo .sqlite).
 *
 * Código anterior con mysqldump + XAMPP (MySQL) conservado abajo comentado
 * por si migras de nuevo a MySQL.
 */
declare(strict_types=1);

require_once __DIR__ . '/includes/db.php';

$origen = vet_db_path();
$dirBackup = __DIR__ . DIRECTORY_SEPARATOR . 'backups';

if (!is_file($origen)) {
    echo 'Aún no existe la base de datos. Abre cualquier página del sistema una vez para crearla.';
    exit;
}

if (!is_dir($dirBackup)) {
    mkdir($dirBackup, 0775, true);
}

$destino = $dirBackup . DIRECTORY_SEPARATOR . 'veterinaria_backup_' . date('Y-m-d_H-i-s') . '.sqlite';

if (@copy($origen, $destino)) {
    echo 'Copia de respaldo SQLite creada en: ' . htmlspecialchars($destino);
} else {
    echo 'Error al copiar el archivo SQLite.';
}

/*
 * --- Respaldo MySQL con XAMPP (referencia; no usado con SQLite) ---
 *
 * $host = "localhost";
 * $usuario = "root";
 * $contraseña = "";
 * $base_de_datos = "veterinaria";
 * $mysqldump = "C:\\XAMPPP\\mysql\\bin\\mysqldump.exe";
 * $directorioRespaldo = 'C:\\respaldo_sistema_veterinaria';
 * ...
 */
