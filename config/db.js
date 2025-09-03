import * as mysql from 'mysql2'


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'express_mvc'
})

connection.connect((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log(`Connexion établie avec MySQL`);
        
    }
})

export default connection