import mysql2 from 'mysql2';

let CONNECTED = "not connected";


export const connectDB = async () => {
  try {
    const pool = mysql2.createPool({
      host: typeof process.env.DB_HOST === 'string' ? process.env.DB_HOST : "",
      user: typeof process.env.DB_USER === 'string' ? process.env.DB_USER : "", 
      password: typeof process.env.DB_PASSWORD === 'string' ? process.env.DB_PASSWORD: "", 
      database: typeof process.env.DB_NAME === 'string' ? process.env.DB_NAME : "",
      waitForConnections: true,
      connectionLimit: 10, // Adjust as needed
      queueLimit: 0
      });

    // Test the connection (optional)
    pool.getConnection((err, connection) => {
      if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.')
        }
          console.error('Error connecting to the database:', err);
          return;
        }
        console.log('Successfully connected to the database.');
        connection.release(); // Release the connection back to the pool
    });


  return pool;
    } catch (error) {
      console.log(error);
      process.exit(1);
      }
    };

 export const getDBStatus = () => {
  return CONNECTED;

  }
