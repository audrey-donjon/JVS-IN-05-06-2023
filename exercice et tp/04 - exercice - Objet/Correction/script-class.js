class Personne {
  constructor(nom, age) {
      this.nom = nom;
      this.age = age;
  }

  sePresenter() {
      console.log(`Bonjour, je suis ${this.nom} et j'ai ${this.age} ans.`);
  }
}

// Créer une instance de la classe
let john = new Personne("John", 30);
john.sePresenter(); // Affiche : "Bonjour, je suis John et j'ai 30 ans."

// Créer une autre instance de la classe
let marie = new Personne("Marie", 25);
marie.sePresenter(); // Affiche : "Bonjour, je suis Marie et j'ai 25 ans."