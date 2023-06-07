
/**
 * Fonction permettant de créer un overlay recouvrant toute la page, avec une image de chargement (loader.svg) dedans
 */



/**
 * Fonction permettant de supprimer l'overlay de la page
 */


/**
 * Fonction permettant d'afficher un message en rouge dans la div de vue ".view"
 *
 * @param text - Texte du message en rouge à afficher
 */


// -----------------------------
// À partir d'ici, c'est le code qui utilisera toutes les fonctions créées précédemment

// Si le formulaire est envoyé

    // Empêchement de la redirection du formulaire

    // On supprime tout ce qui est déjà présent dans la div de vue (anciens messages, anciens tableaux)


    // Suppression de l'ancien nombre de résultats affiché, s'il existe


    // Vérification que le champ n'est pas vide sinon erreur
        // Affichage d'un message


        // Affichage de l'overlay, juste avant l'envoi de la requête AJAX


        // Récupération des données du formulaire


        // Encapsulage des données GET du formulaire dans l'URL cible de la requête AJAX (ne pas oublier le "?" qui est important pour bien avoir le format valide des données GET)



        // Requête AJAX en méthode POST, sur l'url préparée précédemment, avec le nom de la ville en données GET
        // Par exemple pour "dijon", le résultat sera "https://geo.api.gouv.fr/communes/?nom=dijon"

        // Premier "then"

        // Deuxième "then" en envoyant le contenu JSON interprété de la requête AJAX dans la variable "data"

            // Création d'une div qui servira à afficher le nombre de résultat


            // Selon le nombre de villes renvoyées par l'API, on formate avec une couleur et un texte différent


            // On affiche le nombre de résultats juste après le formulaire (en dessous)


            // Si le nombre de villes vaux 0, on affiche un message d'erreur sinon on affiche le tableau HTML avec les villes dedans


                // Création d'une nouvelle <table> HTML

                // Création du thead et des colonnes d'en-tête de la <table>


                // Création du <tbody> et insertion dans la <table>


                // On ajoute la <table> dans la div de vue



                // Pour chaque ville dans l'array, on crée une nouvelle structure <tr></tr> avec 4 <td></td> dedans
                    // Création de chaque cellule avec la récupération de la ou les données attendues


            // Dans le catch, ça veut dire que la requête AJAX n'a pas réussi à joindre le serveur web de la page cible

            // Dans .finally
            // Suppression de l'overlay

