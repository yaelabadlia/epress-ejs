import * as mysql from 'mysql2/promise'


const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'express_mvc'
})

connection
    .connect()
    .then(() => console.log(`Connexion établie avec MySQL`))
    .catch(err => console.log(err));


export default connection