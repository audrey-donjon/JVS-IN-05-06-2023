
// Récupération des boutons à cliquer dans la div .buttons
let buttons = document.querySelectorAll('.buttons button');


// Div qui servira à afficher les contenus récupérés avec AJAX
let view = document.querySelector('.view');


// Foreach pour parcourir tous les boutons dans "buttons"
buttons.forEach((button) => {

    // Sur chaque bouton, on met un écouteur d'évènement "click"
    button.addEventListener('click', function(){

        // Requête AJAX sur le fichier dont le nom est dans le dataset du bouton cliqué (dans le dossier "content/")
        fetch('content/' + this.dataset.page)
        .then((response) => {

            // Si la requête est OK (c'est-à-dire pas un code 404, 500 ou autre du genre)
            if(response.ok){

                // Permet de passer au deuxième "then" en envoyant le contenu textuel de la requête AJAX dans la variable "data" (ligne 31)
                return response.text();
            }

            // On indique qu'une erreur a eu lieu
            view.textContent = 'Le contenu n\'a pas pu être récupéré';

        })
        .then((data) => {

            // Affichage du contenu récupéré par la requête AJAX dans la div .view
            view.innerHTML = data;

        })
        .catch(() =>  {

            // Si on rentre ici dans le catch, ça veut dire que la requête AJAX n'a pas réussi à joindre le serveur cible
            view.textContent = 'Le contenu n\'a pas pu être récupéré';
        });

    });

});

