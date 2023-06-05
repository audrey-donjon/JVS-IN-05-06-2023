

function speed(){
    // Demande à l'utilisateur d'écrire la distance parcourue en mètre et met le résultat dans une variable :
    let dist = prompt('Veuillez rentrer la distance parcourue (en m)');

    // Demande à l'utilisateur d'écrire le temps de la distance parcourue en seconde et met le résultat dans une variable :
    let timeDist = prompt('Veuillez rentrer le temps mît pour la distance parcourue (en sec)');

    // Calcul de la vitesse et met le résultat dans une variable qui sera de type number / entier :
    return parseInt(dist / timeDist);

}


// Affiche le résultat en message d'alert sous le format résulat + m/s
alert(speed() + ' m/s');


// Affiche le résultat dans la console sous le format résulat + m/s
console.log(speed() + ' m/s');