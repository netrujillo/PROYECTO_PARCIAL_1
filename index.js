import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Servidor API escuchando en http://localhost:${port}`);
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'compras_db',
});


db.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conexión a la base de datos establecida.');
});

// Obtener la lista de usuarios
app.get('/api/usuarios', (req, res) => {
  const query = 'SELECT * FROM usuarios';
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

// Crear un nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const { nombre, correo } = req.body;
  const query = 'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)';
  db.query(query, [nombre, correo], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(201).json({ id_usuario: results.insertId, nombre, correo });
    }
  });
});

// Eliminar un usuario
app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
  db.query(query, [id], (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(204).send();
    }
  });
});

// Obtener la lista de métodos de pago
app.get('/api/metodos-pago', (req, res) => {
  const query = 'SELECT * FROM metodos_pago';
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener los métodos de pago' });
    } else {
      res.json(results);
    }
  });
});

// Crear un nuevo método de pago
app.post('/api/metodos-pago', (req, res) => {
  const { tipo, entidad } = req.body;
  const query = 'INSERT INTO metodos_pago (tipo, entidad) VALUES (?, ?)';
  db.query(query, [tipo, entidad], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al crear el método de pago' });
    } else {
      res.status(201).json({ id_metodo: results.insertId, tipo, entidad });
    }
  });
});

// Eliminar un método de pago
app.delete('/api/metodos-pago/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM metodos_pago WHERE id_metodo = ?';
  db.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al eliminar el método de pago' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Método de pago no encontrado' });
    } else {
      res.status(200).json({ message: 'Método de pago eliminado correctamente' });
    }
  });
});

// Obtener todas las relaciones entre usuarios y métodos de pago
app.get('/api/pagos-usuarios', (req, res) => {
  const query = `
    SELECT 
      pu.id_usuario, 
      pu.id_metodo, 
      u.nombre AS usuario_nombre, 
      mp.tipo AS metodo_tipo 
    FROM pagos_usuarios pu
    INNER JOIN usuarios u ON pu.id_usuario = u.id_usuario
    INNER JOIN metodos_pago mp ON pu.id_metodo = mp.id_metodo
  `;
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener las relaciones' });
    } else {
      res.json(results);
    }
  });
});

// Crear una nueva relación entre un usuario y un método de pago
app.post('/api/pagos-usuarios', (req, res) => {
  const { id_usuario, id_metodo } = req.body;
  const query = 'INSERT INTO pagos_usuarios (id_usuario, id_metodo) VALUES (?, ?)';
  db.query(query, [id_usuario, id_metodo], (error) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(400).json({ error: 'La relación ya existe' });
      } else {
        res.status(500).json({ error: 'Error al crear la relación' });
      }
    } else {
      res.status(201).json({ message: 'Relación creada exitosamente' });
    }
  });
});

