// ...existing code...
import connection from '../config/db.js' // importe la connexion à la base de données (définie dans config/db.js)

const findAll = async () => { // fonction asynchrone pour récupérer toutes les personnes
    const SELECT = "SELECT * FROM personnes" // requête SQL pour sélectionner toutes les lignes de la table 'personnes'
    try {
        const resultat = await connection.query(SELECT) // exécute la requête ; résultat est généralement [rows, fields]
        return resultat[0] // renvoie le tableau des lignes (rows)

    } catch (error) { // si erreur pendant la requête
        console.log(error); // affiche l'erreur dans la console
        return null // renvoie null en cas d'erreur
    }
}
const save = async (personne) => { // fonction pour insérer une nouvelle personne
    const INSERT = "INSERT INTO personnes values (null, ?, ?, ?)" // requête d'insertion (null pour id auto-incrémenté)
    try {
        const resultat = await connection.query(INSERT, [personne.nom, personne.prenom, personne.age]) // exécute l'insertion avec paramètres
        personne.id = resultat[0].insertId // récupère l'id inséré depuis le résultat et l'affecte à l'objet
        return personne // renvoie l'objet personne avec son id
    } catch (error) { // si erreur pendant l'insertion
        console.log(error); // affiche l'erreur
        return null // renvoie null en cas d'erreur
    }
}
const deleteById = async (id) => { // fonction pour supprimer une personne par id
    const DELETE = "DELETE FROM personnes WHERE id=?" // requête de suppression paramétrée
    try {
        await connection.query(DELETE, id); // exécute la suppression (ici id passé tel quel)
    } catch (error) { // si erreur pendant la suppression
        console.log(error); // affiche l'erreur
    }
}

const findById = async (id) => { // fonction pour trouver une personne par id
    const SELECT = "SELECT * FROM personnes WHERE id=?" // requête pour sélectionner la ligne correspondant à l'id
    try {
        const resultat = await connection.query(SELECT, id); // exécute la requête avec l'id
        return resultat[0][0] // renvoie la première ligne trouvée (premier élément du tableau rows)
    } catch (error) { // si erreur pendant la requête
        console.log(error); // affiche l'erreur
        return null // renvoie null en cas d'erreur
    }
}

const update = async (personne) => { // fonction pour mettre à jour une personne
    const UPDATE = "UPDATE personnes SET nom=?, prenom=?, age=? WHERE id=?" // requête de mise à jour paramétrée
    try {
        const resultat = await connection.query(UPDATE, [personne.nom, personne.prenom, personne.age, personne.id]); // exécute la mise à jour avec les valeurs
        if (resultat[0].affectedRows > 0) { // si au moins une ligne a été modifiée
            return personne // renvoie l'objet personne mis à jour
        }
    } catch (error) { // si erreur pendant la mise à jour
        console.log(error); // affiche l'erreur
       
    }
     return null    // renvoie null si aucune ligne modifiée ou en cas d'erreur
}


export default { findAll, save, deleteById, update, findById } // exporte les fonctions du repository pour les utiliser ailleurs
// ...existing