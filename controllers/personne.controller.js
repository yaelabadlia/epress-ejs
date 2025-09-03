// ...existing code...
import * as yup from 'yup' // importe la bibliothèque yup pour valider les données
import { fr } from 'yup-locales' // importe les messages d'erreurs en français pour yup
import connection from '../config/db.js' // importe la connexion à la base de données (utilisée dans deletePersonne)
import personneRepository from '../repositories/personne.repository.js' // importe le repository pour accéder aux fonctions DB

yup.setLocale(fr) // configure yup pour utiliser les messages en français


const personneSchema = yup.object().shape({ // crée un schéma de validation pour une "personne"
    nom: yup // définition du champ "nom"
        .string() // le nom doit être une chaîne
        .required() // le nom est requis
        .matches(/^[A-Z]{1}.{2,19}$/, "Le nom doit commencer par une majuscule et comporter entre 3 et 20 lettres"), // regex + message d'erreur
    prenom: yup // définition du champ "prenom"
        .string() // le prénom doit être une chaîne
        .min(3, (args) => `Le prénom doit contenir au moins ${args.min} caractères, valeur saisie : ${args.value} `) // taille min + message dynamique
        .max(20), // taille max
    age: yup // définition du champ "age"
        .number() // l'âge doit être un nombre
        .required() // l'âge est requis
        .positive() // l'âge doit être positif

}) // fin du schéma de validation



const showPersonnes = async (req, res, next) => { // contrôleur pour afficher la page avec la liste des personnes
    const personnes = await personneRepository.findAll() // appelle le repository pour récupérer toutes les personnes
    if (personnes) { // si la récupération a réussi
        res.render('personne', { // rend la vue 'personne' avec les données
            "personnes": personnes, // passe les personnes à la vue
            "erreurs": null // aucune erreur à afficher
        })
    } else { // si la récupération a échoué
        res.render('personne', { // rend la vue avec un tableau vide et un message d'erreur
            personnes: [], // pas de personnes
            erreurs: ["Problème de récupération de données"] // message d'erreur affiché
        })

    }
} // fin de showPersonnes
const add= (req, res, next) => { // contrôleur pour ajouter une personne (utilise then/catch pour gérer la validation)

    personneSchema // utilise le schéma défini plus haut
        .validate(req.body, { abortEarly: false }) // valide req.body et ne s'arrête pas à la première erreur
        .then(async () => { // si la validation réussit
            req.session.firstname = req.body.prenom // stocke le prénom en session (exemple d'usage)
            const p = await personneRepository.save(req.body) // appelle le repository pour insérer la personne
            if (p == null) { // si l'insertion a échoué (repository renvoie null)
                res.render('personne', { // affiche la page avec une erreur
                    erreurs: ["Problème d'insertion"], // message d'erreur
                    personnes: personneRepository.findAll() // passe la promesse (attention : ici on passe la fonction, non await)
                })
            } else { // si l'insertion a réussi
                console.log(p); // log de la personne insérée
                
                res.redirect('/personne') // redirige vers la page liste
            }
        })
        .catch(err => { // si la validation échoue
            console.log(err); // log des erreurs de validation
            res.render('personne', { // rend la vue avec les erreurs de validation
                erreurs: err.errors, // tableau de messages d'erreur
                personnes: [] // liste vide (à améliorer en récupérant les personnes via le repository)
            })
        })



} // fin de add
const deletePersonne = async (req, res, next) => { // contrôleur pour supprimer une personne par id
    const id = req.params.id // récupère l'id depuis les paramètres de l'URL
    const DELETE = "DELETE FROM personnes WHERE id=?" // requête SQL pour supprimer par id
    try {
        await connection.query(DELETE, id); // exécute la requête de suppression
        res.redirect('/personne') // redirige vers la liste après suppression
    } catch (error) { // si erreur pendant la suppression
        res.render('personne', { // rend la vue avec un message d'erreur
            erreurs: ['Problème de suppression de données'], // message d'erreur
            personnes: [] // liste vide (à améliorer en récupérant les personnes via le repository)
        })
    }

} // fin de deletePersonne

export default { showPersonnes, addPersonne, deletePersonne } // exporte les contrôleurs pour les utiliser dans les routes
// Remarque : ici addPersonne est exporté mais la fonction définie s'appelle "add" => probable erreur à corriger si nécessaire
// ...existing