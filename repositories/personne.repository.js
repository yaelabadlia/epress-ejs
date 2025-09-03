import connection from '../config/db.js'

const findAll = async () => {
    const SELECT = "SELECT * FROM personnes"
    try {
        const resultat = await connection.query(SELECT)
        return resultat[0]

    } catch (error) {
        console.log(error);
        return null
    }
}
const save = async (personne) => {
    const INSERT = "INSERT INTO personnes values (null, ?, ?, ?)"
    try {
        const resultat = await connection.query(INSERT, [personne.nom, personne.prenom, personne.age])
        personne.id = resultat[0].insertId
        return personne
    } catch (error) {
        console.log(error);
        return null
    }
}

export default { findAll, save }