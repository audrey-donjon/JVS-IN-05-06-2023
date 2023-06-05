let personne = {
    nom : 'Alice',
    age : 25,

    sePresenter: function (){
      console.log(`Bonjour, je suis ${this.nom} et j'ai ${this.age} ans.`);
    },
}

personne.sePresenter();