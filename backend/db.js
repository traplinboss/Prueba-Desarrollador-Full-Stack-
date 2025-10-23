const { Pool } = require('pg');

const pool = new Pool({
    host:"localhost",
    port:5432,
    database:"node_test",
    user:"postgres",
    password:"1234"
});


// Manejo mejorado de errores
pool.on('error', (err) => {
  console.error('❌ Error inesperado en la pool de PostgreSQL:', err);
});

// Función para probar conexión
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Conectado a PostgreSQL correctamente');
    client.release();
  } catch (err) {
    console.error('Error conectando a PostgreSQL:', err.message);
  }
};

testConnection();

module.exports = { pool };







