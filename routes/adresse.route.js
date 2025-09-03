// ...existing code...
import express from 'express' // importe express pour pouvoir créer un routeur
// ici, on gère les routes relatives  aux adresses -- commentaire de fichier
const router = express.Router() // crée une instance de Router pour définir des routes spécifiques

router.get('/adresse', (req, res) => { // route GET '/adresse' -> handler pour récupérer/afficher les adresses
    // corps de la route GET (vide pour l'instant) -- ajouter la logique ici
}) // fin du handler GET '/adresse'

router.post('/adresse', (req, res) => { // route POST '/adresse' -> handler pour créer une nouvelle adresse
    // corps de la route POST (vide pour l'instant) -- ajouter la logique ici
}) // fin du handler POST '/adresse'

export default router // exporte le routeur pour l'utiliser dans l'application principale
// ...existing