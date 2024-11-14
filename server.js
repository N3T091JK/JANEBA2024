const express = require('express');
const sql = require('mssql');
const app = express();
const port = 5500;

// Configuración de la conexión a la base de datos
const config = {
  user: 'tiendaweb_SQLLogin_1',
  password: 'f4tzefzmnf',
  server: 'DBCARRITO.mssql.somee.com',
  database: 'DBCARRITO',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

// Ruta para verificar la conexión a la base de datos
app.get('/verificar-conexion', async (req, res) => {
  try {
    let pool = await sql.connect(config);
    res.send({ mensaje: 'Conectado' });
    pool.close();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error); // Muestra el error en la consola
    res.send({ mensaje: 'Error al conectar a la base de datos' });
  }
});

// Servir la página HTML
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verificación de Conexión</title>
      <style>
        body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f4f9; margin: 0; }
        #mensaje { font-size: 1.5em; color: #333; }
      </style>
    </head>
    <body>
      <div id="mensaje">Verificando conexión...</div>

      <script>
        // Realiza la solicitud para verificar la conexión
        fetch('/verificar-conexion')
          .then(response => response.json())
          .then(data => {
            document.getElementById('mensaje').textContent = data.mensaje;
          })
          .catch(error => {
            document.getElementById('mensaje').textContent = 'Error en la comunicación con el servidor';
          });
      </script>
    </body>
    </html>
  `);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
