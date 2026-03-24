# Sistema Veterinaria — modo local (SQLite)

Este proyecto funciona **sin MySQL ni hosting en la nube**: usa **PHP** y una base **SQLite** en la carpeta `data/` (archivo `veterinaria.sqlite`), que se crea sola al usar cualquier pagina que conecte a la base.

## Requisitos

- PHP **8.0+** con extension **pdo_sqlite** habilitada.

## Como probar en tu PC

En la raiz del proyecto:

```bash
php -S localhost:8080
```

Abre en el navegador: `http://localhost:8080/login.html` (o `index.php`).

### Usuarios de demostracion

Tras la primera ejecucion se crean automaticamente:

| Correo              | Contrasena | Rol           |
|---------------------|------------|---------------|
| admin@demo.local    | admin123   | Administrador |
| empleado@demo.local | admin123   | Empleado      |

## Demo en GitHub Pages (sin PHP)

Se agrego una demo estatica en `docs/` para que puedas mostrar el flujo en GitHub Pages.

### Datos de ejemplo en la demo

La demo incluye **170+ registros precargados** para demostración realista:

- **10 usuarios**: Administrador + 9 empleados diferentes
- **30 productos**: Alimentos premium, medicinas, vitaminas, accesorios y servicios veterinarios completos
- **50 pacientes**: Perros y gatos con datos realistas y variados
- **30 propietarios**: Clientes con información de contacto completa
- **50 citas**: Registros de atenciones médicas distribuidas en abril-mayo

Estos datos se guardan en **localStorage** del navegador (sin persistencia real). Perfectos para hacer búsquedas, reportes y probar toda la funcionalidad de la interfaz con volumen suficiente de datos.

### Reportes en Pantalla

Los reportes ahora **muestran TODOS los registros** con búsqueda y filtrado en tiempo real:

- **Reporte Usuarios**: Busca por nombre o correo
- **Reporte Productos**: Busca por nombre o descripción  
- **Reporte Pacientes**: Busca por nombre, filtra por especie (Canino/Felino)
- **Reporte Propietarios**: Busca por nombre, teléfono o correo
- **Reporte Citas**: Busca por motivo, filtra por rango de fechas

Acceso: **Menú Admin → Generar Reportes → Selecciona el reporte**

### Activacion

1. Ve al repo en GitHub: `Settings` -> `Pages`.
2. En `Build and deployment`, selecciona:
   - `Source`: **Deploy from a branch**
   - `Branch`: **main**
   - `Folder`: **/docs**
3. Guarda y espera 1-2 minutos.

La URL quedara asi:

`https://fernandonotnull555-dev.github.io/SistemaVet/`

> Nota: Esta demo Pages guarda datos en `localStorage` del navegador. No usa PHP/SQLite.

## GitHub y demo online completa

- GitHub Pages solo sirve archivos estaticos; no ejecuta PHP.
- Para la app completa (PHP + SQLite), usa tu PC con `php -S` o un hosting que soporte PHP.

## Respaldo

`backup.php` genera una copia del archivo SQLite en la carpeta `backups/`.

## Nota sobre `agrovet.sql`

Ese archivo corresponde a otro esquema (tablas/columnas distintas). El sistema usa el esquema definido en `includes/db.php`, alineado con los `.php` del proyecto.

---

© 2026 Fernando — All rights reserved.
