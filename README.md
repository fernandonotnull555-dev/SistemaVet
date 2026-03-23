# Sistema Veterinaria — modo local (SQLite)

Este proyecto funciona **sin MySQL ni hosting en la nube**: usa **PHP** y una base **SQLite** en la carpeta `data/` (archivo `veterinaria.sqlite`), que se crea sola al usar cualquier página que conecte a la base.

## Requisitos

- PHP **8.0+** con extensión **pdo_sqlite** habilitada.

## Cómo probar en tu PC

En la raíz del proyecto:

```bash
php -S localhost:8080
```

Abre en el navegador: `http://localhost:8080/login.html` (o `index.php`).

### Usuarios de demostración

Tras la primera ejecución se crean automáticamente:

| Correo              | Contraseña | Rol           |
|---------------------|------------|---------------|
| admin@demo.local    | admin123   | Administrador |
| empleado@demo.local | admin123   | Empleado      |

## GitHub y demo online

- **GitHub Pages solo sirve archivos estáticos**; **no ejecuta PHP**, así que esta app **no puede “correr” tal cual en Pages**.
- Para una demo pública necesitas un servicio con PHP (por ejemplo **Render**, **Railway**, **000webhost**, **InfinityFree**) o probar con **GitHub Codespaces** / tu máquina con `php -S`.

Cuando quieras subir el repo a GitHub, este `README` y `.gitignore` ya dejan lista la base local ignorada para no subir datos personales.

## Respaldo

`backup.php` ahora genera una copia del archivo SQLite en la carpeta `backups/` (junto al proyecto). El respaldo anterior con **mysqldump** quedó comentado dentro del mismo archivo por si lo necesitas como referencia.

## Nota sobre `agrovet.sql`

Ese archivo corresponde a otro esquema (tablas/columnas distintas). El sistema usa el esquema definido en `includes/db.php`, alineado con los `.php` del proyecto.
