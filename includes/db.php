<?php
/**
 * Base de datos local SQLite (sin MySQL ni hosting en la nube).
 * El archivo se crea automáticamente en data/veterinaria.sqlite la primera vez.
 */

declare(strict_types=1);

/** Ruta absoluta al archivo SQLite */
function vet_db_path(): string
{
    return dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'veterinaria.sqlite';
}

/** Mismo algoritmo que antes en MySQL: SHA2(?, 256) */
function vet_password_hash(string $plain): string
{
    return hash('sha256', $plain);
}

/**
 * @return PDO Conexión singleton a SQLite
 */
function vet_get_pdo(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $path = vet_db_path();
    $dir = dirname($path);
    if (!is_dir($dir)) {
        if (!@mkdir($dir, 0775, true) && !is_dir($dir)) {
            throw new RuntimeException('No se pudo crear el directorio de datos: ' . $dir);
        }
    }

    $pdo = new PDO('sqlite:' . $path, null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $pdo->exec('PRAGMA foreign_keys = ON;');

    vet_bootstrap_schema($pdo);

    return $pdo;
}

function vet_bootstrap_schema(PDO $pdo): void
{
    static $schemaListo = false;
    if ($schemaListo) {
        return;
    }

    $pdo->exec(<<<'SQL'
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_completo TEXT NOT NULL,
    correo_electronico TEXT NOT NULL UNIQUE,
    contrasena TEXT NOT NULL,
    rol_usuario TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS propietarios (
    id_prop INTEGER PRIMARY KEY AUTOINCREMENT,
    id_paciente INTEGER,
    Nombre_Completo TEXT NOT NULL,
    telefono TEXT NOT NULL,
    correo_electronico TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pacientes (
    id_paciente INTEGER PRIMARY KEY AUTOINCREMENT,
    id_prop INTEGER,
    Nombre TEXT,
    Especie TEXT,
    Sexo TEXT,
    Peso TEXT,
    Edad TEXT,
    id_cita INTEGER
);

CREATE TABLE IF NOT EXISTS citas (
    id_cita INTEGER PRIMARY KEY AUTOINCREMENT,
    id_paciente INTEGER NOT NULL,
    fecha_cita TEXT NOT NULL,
    motivo TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio REAL,
    cantidad_exist INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS empleados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    salario1 REAL NOT NULL DEFAULT 0,
    salario2 REAL NOT NULL DEFAULT 0,
    comision REAL NOT NULL DEFAULT 0
);
SQL);

    // Datos de demostración (solo si no hay usuarios)
    $n = (int) $pdo->query('SELECT COUNT(*) FROM usuarios')->fetchColumn();
    if ($n === 0) {
        $hash = vet_password_hash('admin123');
        $st = $pdo->prepare(
            'INSERT INTO usuarios (nombre_completo, correo_electronico, contrasena, rol_usuario) VALUES (?,?,?,?)'
        );
        $st->execute(['Administrador demo', 'admin@demo.local', $hash, 'Administrador']);
        $st->execute(['Empleado demo', 'empleado@demo.local', $hash, 'Empleado']);

        $pdo->exec(<<<'SQL'
INSERT INTO productos (nombre, descripcion, precio, cantidad_exist) VALUES
('Alimiau', 'Alimento balanceado gato', 1.50, 60),
('Don Gato', 'Alimento húmedo', 1.25, 40);
SQL);

        $pdo->exec(<<<'SQL'
INSERT INTO propietarios (id_paciente, Nombre_Completo, telefono, correo_electronico) VALUES
(0, 'Fernando Murillo', '0000-0000', 'demo@ejemplo.local');
SQL);

        $pdo->exec(<<<'SQL'
INSERT INTO pacientes (id_prop, Nombre, Especie, Sexo, Peso, Edad, id_cita) VALUES
(1, 'Tuto Murillo', 'Felino', 'Masculino', '18 kg', '5 años', NULL);
SQL);

        $pdo->exec(<<<'SQL'
INSERT INTO citas (id_paciente, fecha_cita, motivo) VALUES
(1, '2025-04-03 08:30', 'Vacunación');
SQL);
    }

    $schemaListo = true;
}
