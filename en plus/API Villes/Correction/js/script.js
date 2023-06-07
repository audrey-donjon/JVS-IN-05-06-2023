
/**
 * Fonction permettant de créer un overlay recouvrant toute la page, avec une image de chargement (loader.svg) dedans
 */
function setOverlay(){

    // Création d'une div
    let overlay = document.createElement('div');

    // Ajout de notre classe CSS "overlay" sur la div
    overlay.classList.add('overlay');

    // Création d'une nouvelle image
    let loadingImage = document.createElement('img');

    // Définition de la source et du "alt" de l'image de chargement
    loadingImage.src = 'images/loader.svg';
    loadingImage.alt = 'Chargement en cours...';

    // Ajout de l'image de chargement dans l'overlay
    overlay.append(loadingImage);

    // Ajout de l'overlay dans le body de la page
    document.body.append(overlay);

}


/**
 * Fonction permettant de supprimer l'overlay de la page
 */
function removeOverlay(){

    document.querySelector('.overlay').remove();
}


/**
 * Fonction permettant d'afficher un message en rouge dans la div de vue ".view"
 *
 * @param text - Texte du message en rouge à afficher
 */
function displayMessageInView(text){

    // Création d'une nouvelle div
    let errorMessage = document.createElement('div');

    // Ajout des classes CSS "center" et "red"
    errorMessage.classList.add('center', 'red');

    // Ajout du texte
    errorMessage.textContent = text;

    // Sélection de la div de vue
    let view = document.querySelector('.view');

    // On supprime tout ce qui est déjà présent dans la div de vue
    view.innerHTML = '';

    // Ajout du message d'erreur dans la div de vue
    view.append( errorMessage );

}

// -----------------------------
// À partir d'ici, c'est le code qui utilisera toutes les fonctions créées précédemment

// Si le formulaire est envoyé
document.querySelector('#search-form').addEventListener('submit', function(e){

    // Empêchement de la redirection du formulaire
    e.preventDefault();

    // Raccourci vers le formulaire
    let form = this;

    // Raccourci vers la vue d'affichage
    let view = document.querySelector('.view');

    // On supprime tout ce qui est déjà présent dans la div de vue (anciens messages, anciens tableaux)
    view.innerHTML = '';

    // Suppression de l'ancien nombre de résultats affiché, s'il existe
    let oldResultNumber = document.querySelector('.result');
    if(oldResultNumber){
        oldResultNumber.remove();
    }


    // Vérification que le champ n'est pas vide sinon erreur
    if( form.querySelector('[name=nom]').value.length == 0 ){

        // Affichage d'un message
        displayMessageInView('Champ vide, veuillez mettre au moins 1 caractère !');

    } else {

        // Affichage de l'overlay, juste avant l'envoi de la requête AJAX
        setOverlay();

        // Récupération des données du formulaire
        let userFormData = new FormData(form);

        // Encapsulage des données GET du formulaire dans l'URL cible de la requête AJAX (ne pas oublier le "?" qui est important pour bien avoir le format valide des données GET)
        let urlToRequestWithVars = form.getAttribute('action') + '?' + new URLSearchParams(userFormData);


        // Requête AJAX en méthode POST, sur l'url préparée précédemment, avec le nom de la ville en données GET
        // Par exemple pour "dijon", le résultat sera "https://geo.api.gouv.fr/communes/?nom=dijon"
        fetch(urlToRequestWithVars)

        // Permet de passer au deuxième "then" en envoyant le contenu JSON interprété de la requête AJAX dans la variable "data"
        .then((response) => response.json())

        .then((data) => {

            // Création d'une div qui servira à afficher le nombre de résultat
            let resultNumber = document.createElement('div');
            resultNumber.classList.add('result');

            // Selon le nombre de villes renvoyées par l'API, on formate avec une couleur et un texte différent
            if( data.length == 0 ){

                resultNumber.classList.add('red');
                resultNumber.textContent = 'Résultat : 0';

            } else if(data.length == 1){

                resultNumber.classList.add('green');
                resultNumber.textContent = 'Résultat : 1';

            } else {

                resultNumber.classList.add('green');
                resultNumber.textContent = 'Résultats : ' + data.length;

            }

            // On affiche le nombre de résultats juste après le formulaire (en dessous)
            form.after(resultNumber);

            // Si le nombre de villes vaux 0, on affiche un message d'erreur sinon on affiche le tableau HTML avec les villes dedans
            if(data.length == 0){

                displayMessageInView('Aucun résultat');

            } else {

                // Création d'une nouvelle <table> HTML
                let resultTable = document.createElement('table');

                // Création du thead et des colonnes d'en-tête de la <table>
                resultTable.innerHTML = `
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Codes Postaux</th>
                            <th>Département</th>
                            <th>Population</th>
                        </tr>
                    </thead>
                `;

                // Création du <tbody> et insertion dans la <table>
                let resultTableContent = document.createElement('tbody');
                resultTable.append(resultTableContent);

                // On ajoute la <table> dans la div de vue
                view.append(resultTable);


                // Pour chaque ville dans l'array, on crée une nouvelle structure <tr></tr> avec 4 <td></td> dedans
                data.forEach((city) => {

                    // Création d'une nouvelle ligne <tr>
                    let row = document.createElement('tr');

                    // Création de la cellule du nom de la ville
                    let cityNameCell = document.createElement('td');
                    cityNameCell.textContent = city.nom;
                    row.append(cityNameCell);

                    // Création de la cellule des codes postaux de la ville
                    // (.join(', ') permettra d'afficher tous les codes postaux en liste si jamais il y en a plusieurs, comme pour Paris par exemple)
                    let cityZipcodesCell = document.createElement('td');
                    cityZipcodesCell.textContent = city.codesPostaux.join(', ');
                    row.append(cityZipcodesCell);

                    // Création de la cellule du département de la ville
                    let cityDptCell = document.createElement('td');
                    cityDptCell.textContent = city.codeDepartement;
                    row.append(cityDptCell);

                    // Création de la cellule de la population de la ville
                    let cityPopCell = document.createElement('td');
                    cityPopCell.textContent = city.population;
                    row.append(cityPopCell);

                    // Ajout de la nouvelle ligne du tableau dans le tbody du tableau
                    resultTableContent.append(row);

                });

            }

        })

        .catch(() => {

            // Si on rentre ici, c'est que la requête AJAX a échouée, donc on affiche un message d'erreur en conséquence
            displayMessageInView('Problème lors de la récupération des données');

        })

        .finally(() => {

            // On rentrera ici dans tous les cas, que la requête AJAX ait réussi ou échoué
            // Suppression de l'overlay
            removeOverlay();
        });

    }

});