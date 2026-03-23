<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/db.php';

class propietario
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = vet_get_pdo();
    }

    public function insertarPropietario($nombre, $apellido, $salario1, $salario2, $comision)
    {
        $sql = 'INSERT INTO empleados (nombre, apellido, salario1, salario2, comision) VALUES (?, ?, ?, ?, ?)';
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$nombre, $apellido, $salario1, $salario2, $comision]);
    }
}
