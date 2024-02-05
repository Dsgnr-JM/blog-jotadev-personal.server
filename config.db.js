//dotenv nos permite leer las variables de entorno de nuestro .env
import dotenv from 'dotenv'
import mysql from 'mysql'

dotenv.config();

let connection;

try {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
} catch (error) {
    console.log("Error al conectar con la base de datos");
}
export default connection