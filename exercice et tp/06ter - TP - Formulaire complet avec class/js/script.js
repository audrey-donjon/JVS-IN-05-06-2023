
// Classe permettant de gérer les vérifications de notre formulaire d'inscription
class RegisterForm{

    // Constructeur pour initialiser la classe
    constructor(form){

        // Création d'un attribut pour y stocker le sélecteur du formulaire
        this.form = form;

        // Appel de la méthode init
        this.init();
    }

    // Méthode pour mettre le champ demandé (field) en rouge (classe Bootstrap "is-invalid") et insérer un message d'erreur (errorText) en dessous du champ.
    setFieldError(field, errorText){

        // Ajout de la classe Bootstrap "is-invalid" sur le champ ( https://getbootstrap.com/docs/5.3/forms/validation/ )
        field.classList.add('is-invalid');

        // Création d'une nouvelle div pour le message d'erreur
        let errorElement = document.createElement('div');

        // On donne la classe Bootstrap "invalid-feedback" à cette div
        errorElement.classList.add('invalid-feedback');

        // On donne le contenu textuel à l'erreur
        errorElement.textContent = errorText;

        // Insertion de l'erreur après le champ (after)
        field.after(errorElement);
    }

    // Méthode pour nettoyer le formulaire de toutes les erreurs
    clearForm(){

        // Sélection de tous les champs actuellement en rouge dans le formulaire (ceux ayant la classe Bootstrap "is-invalid")
        let fieldsToClear = this.form.querySelectorAll('.is-invalid');

        // On parcourt tous les champs trouvés pour leur retirer la classe "is-invalid"
        fieldsToClear.forEach((field) => {

            field.classList.remove('is-invalid');

        });

        // Sélection de tous les messages d'erreur (les éléments ayant la classe Bootstrap "invalid-feedback")
        let errorElements = this.form.querySelectorAll('.invalid-feedback');

        // On parcourt tous les messages d'erreurs trouvés pour les supprimer complètement
        errorElements.forEach((errorElement) => {
            errorElement.remove();
        });

    }

    // Méthode pour mettre un message de succès d'envoi du formulaire et supprimer visuellement le formulaire
    setFormSuccess(successText){

        // Création d'une nouvelle div
        let successElement = document.createElement('div');

        // On donne les classe de style Bootstrap à la div
        successElement.classList.add('alert', 'alert-success', 'fw-bold', 'text-center');

        // On donne le texte au message de succès
        successElement.textContent = successText;

        // Insertion du message de succès dans la page, juste en dessous du formulaire
        this.form.after( successElement );

        // Suppression du formulaire
        this.form.remove();
    }


    // Méthode servant à mettre en place l'écouteur d'évènement sur l'envoi du formulaire
    init(){

        // Création des variables qui pointent sur les champs du formulaire
        let firstnameField = this.form.querySelector('#firstname');
        let lastnameField = this.form.querySelector('#lastname');
        let emailField = this.form.querySelector('#email');
        let passwordField = this.form.querySelector('#password');
        let confirmPasswordField = this.form.querySelector('#password-confirm');
        let animalField = this.form.querySelector('#animal');

        // Array contenant la liste des valeurs autorisées pour la liste déroulante
        let validAnimals = ['chat', 'chien', 'lapin', 'herisson'];

        // Mise en place d'un écouteur d'évènement sur l'envoi du formulaire (event submit)
        this.form.addEventListener('submit', (e) => {

            // On empêche le formulaire d'actualiser la page
            e.preventDefault();

            // On nettoie le formulaire de ses précédentes erreurs s'il y en a
            this.clearForm();

            // Création d'une variable témoin qui nous servira à savoir plus tard si le formulaire contient des erreurs ou non
            let formValid = true;

            // Vérification du premier champ
            // On vérifie si la taille de la valeur correspond à l'interval que nous souhaitons sinon erreur
            if(firstnameField.value.length < 2 || firstnameField.value.length > 25){

                // Appel de la fonction permettant de mettre le champ "firstnameField" en rouge avec un message d'erreur dessus
                this.setFieldError(firstnameField, 'Le prénom doit contenir entre 2 et 25 caractères !');
                formValid = false;
            }

            // Vérification du deuxième champ
            if(lastnameField.value.length < 2 || lastnameField.value.length > 25){
                this.setFieldError(lastnameField, 'Le nom doit contenir entre 2 et 25 caractères !');
                formValid = false;
            }

            // Vérification du troisième champ
            if(emailField.value.length < 5 || emailField.value.length > 255){
                this.setFieldError(emailField, 'L\'email doit contenir entre 5 et 255 caractères !');
                formValid = false;
            }

            // Vérification du quatrième champ
            if(passwordField.value.length < 8 || passwordField.value.length > 1000){
                this.setFieldError(passwordField, 'Le mot de passe doit contenir entre 8 et 1000 caractères !');
                formValid = false;
            }

            // Vérification du cinquième champ
            // Pour ce champ, nous vérifions si la confirmation est bien identique au mot de passe, sinon erreur
            if(confirmPasswordField.value !== passwordField.value){
                this.setFieldError(confirmPasswordField, 'La confirmation du mot de passe ne correspond pas au mot de passe !');
                formValid = false;
            }

            // Vérification du sixième champ
            // Pour ce champ, nous vérifions si la valeur envoyée par la liste déroulante est bien présente dans la liste des valeurs autorisées (validAnimals)
            if(!validAnimals.includes( animalField.value )){
                this.setFieldError(animalField, 'Veuillez choisir un animal !');
                formValid = false;
            }


            // Une fois arrivé ici, si formValid contient toujours true, cela signifie que toutes les vérifications ont été passées sans problème, donc succès
            if(formValid){

                // Appel de la méthode pour afficher le message de succès et supprimer le formulaire
                this.setFormSuccess('Votre formulaire a bien été envoyé !');
            }


        });

    }

}


// Attente du chargement de la page
document.addEventListener('DOMContentLoaded', function(){


    // Sélection du formulaire que nous souhaitons vérifier
    let formSelector = document.querySelector('#register-form');

    // Création d'une nouvelle instance de notre classe "RegisterForm", en passant en argument le formulaire précédemment sélectionné
    let registerForm = new RegisterForm( formSelector );


});