import * as yup from 'yup'
import { fr } from 'yup-locales'
import connection from '../config/db.js'
import personneRepository from '../repositories/personne.repository.js'

yup.setLocale(fr)



const personneSchema = yup.object().shape({
    nom: yup
        .string()
        .required()
        .matches(/^[A-Z]{1}.{2,19}$/, "Le nom doit commencer par une majuscule et comporter entre 3 et 20 lettres"),
    prenom: yup
        .string()
        .min(3, (args) => `Le prénom doit contenir au moins ${args.min} caractères, valeur saisie : ${args.value} `)
        .max(20),
    age: yup
        .number()
        .required()
        .positive()

})



const showPersonnes = async (req, res, next) => {
    const personnes = await personneRepository.findAll()
    if (personnes) {
        res.render('personne', {
            "personnes": personnes,
            "erreurs": null
        })
    } else {
        res.render('personne', {
            personnes: [],
            erreurs: ["Problème de récupération de données"]
        })

    }
}
const add= (req, res, next) => {

    personneSchema
        .validate(req.body, { abortEarly: false })
        .then(async () => {
            req.session.firstname = req.body.prenom
            const p = await personneRepository.save(req.body)
            if (p == null) {
                res.render('personne', {
                    erreurs: ["Problème d'insertion"],
                    personnes: personneRepository.findAll()
                })
            } else {
                console.log(p);
                
                res.redirect('/personne')

            }
        })
        .catch(err => {
            console.log(err);
            res.render('personne', {
                erreurs: err.errors,
                personnes: [] // à refaire après l'ajout de PersonneRepository
            })
        })



}
const deletePersonne = async (req, res, next) => {
    const id = req.params.id
    const DELETE = "DELETE FROM personnes WHERE id=?"
    try {
        await connection.query(DELETE, id);
        res.redirect('/personne')
    } catch (error) {
        res.render('personne', {
            erreurs: ['Problème de suppression de données'],
            personnes: [] // à refaire après l'ajout de PersonneRepository
        })
    }

}

export default { showPersonnes, addPersonne, deletePersonne }