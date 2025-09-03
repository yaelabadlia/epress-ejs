// ...existing code...
import express from 'express' // importe express pour créer un routeur
import PersonneController from '../controllers/personne.controller.js' // importe le contrôleur qui contient les actions pour les personnes
// ici, on gère les routes relatives aux personnes
const router = express.Router() // crée une instance de Router pour définir des routes spécifiques

// Mapping entre route et contrôleur

router.get('/', PersonneController.showPersonnes) // route GET '/' -> appelle showPersonnes pour afficher la liste
router.post('/', PersonneController.addPersonne) // route POST '/' -> appelle addPersonne pour ajouter une personne
router.get('/:id', PersonneController.deletePersonne) // route GET '/:id' -> appelle deletePersonne pour supprimer la personne par id

export default router // exporte le routeur pour l'utiliser dans le fichier principal de