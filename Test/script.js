// querySelector

let title = document.querySelector('#main-title');


// querySelectorAll

let elementsBold = document.querySelectorAll('p.bold');

let main = document.querySelector('main.main-page');

let mainTitle = main.querySelector('#main-title');

let children = main.children[1];

let previous = children.parentElement;


// manipuler du contenu

let contentTitle = title.textContent;
title.textContent = 'Autre chose';


// manipuler la balise et son contenu

let firstSection = document.querySelector('.first-section')

firstSection.innerHTML = '<a>blabla</a>'


// modifier l'id d'un élément

let secondSection = document.querySelector('.target');

let idSection = secondSection.id;

secondSection.id = 'new-id';


// modifier class d'un élément

// let classSection = secondSection.className;

// secondSection.className = 'new-class';

// remplacement de classe
secondSection.classList.replace('bold', 'new-class');

// retire une classe
secondSection.classList.remove('new-class');

// ajoute une classe
secondSection.classList.add('bold');

// ajoute la classe si elle n'est pas déjà présente sinon retire la classe si elle est déjà présente
secondSection.classList.toggle('bold');

let contains = secondSection.classList.contains('target');



// Manipuler les attributs d'un élément

let imageAnimal = document.querySelector('.img-animal');

let valueSrcImage = imageAnimal.getAttribute('src');

imageAnimal.setAttribute('src','images/chien.jpg');


// Manipuler les propriétés CSS d'un élément

let thirdSection = document.querySelector('#third-section');

thirdSection.style.color = 'red';

thirdSection.style.backgroundColor = 'black';

// supprimer un élément du DOM

imageAnimal.remove();


// créer un élément

let footer = document.createElement('footer');

// before / after / prepend et append

main.after(footer);

// duplication

let copy = thirdSection.cloneNode(true);


thirdSection.after(copy);


// selectionner tous les éléments de mon array pour appliquer à chacun quelque chose comme une propriété css ou une classe par exemple
let listElements = document.querySelectorAll('ul.list-style li');

listElements.forEach((listElement)=>{
    listElement.style.color = 'red';
    listElement.classList.add('bold');
});