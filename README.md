# ShopSmart - Plataforma de Compras

ShopSmart es una aplicación para gestionar usuarios, métodos de pago y sus relaciones.

---
## Iniciar servidor

### node index.js

## Crear la Base de Datos y Tablas

Accede a **phpMyAdmin** para ejecutar las siguientes consultas SQL:

```sql
-- Crear base de datos
CREATE DATABASE compras_db;

-- Seleccionar base de datos
USE compras_db;

-- Crear tabla para usuarios
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(100)
);

-- Crear tabla para métodos de pago
CREATE TABLE metodos_pago (
    id_metodo INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50),
    entidad VARCHAR(100)
);

-- Crear tabla intermedia para la relación muchos a muchos
CREATE TABLE pagos_usuarios (
    id_usuario INT,
    id_metodo INT,
    PRIMARY KEY (id_usuario, id_metodo),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_metodo) REFERENCES metodos_pago(id_metodo)
);
