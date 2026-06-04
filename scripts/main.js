// ==============================
// 🌱 Sélection des éléments
// ==============================
const addBt =               document.querySelector('.add-button');
const descriptionInput =    document.querySelector('.description');
const amountInput =         document.querySelector('.amount');
const categoryInput =       document.querySelector('.category');
const depense =             document.querySelector('.depenses');
const tot =                 document.querySelector('.total span');
// ==============================
// 🧠 Variables globales
// ==============================
const depenses = [];
let total = 0;
// ==============================
// 🎊 Fonctionnalités
// ==============================

// Fonction pour reset les champs du formulaire
function resetForm() {
  descriptionInput.value = '';
  amountInput.value = '';
  categoryInput.value = '';
  descriptionInput.focus();
}


// Fonction pour ajouter une dépense
function addDepense(description, amount, category) {
  depenses.push([description, amount, category]);
  total += parseFloat(amount);
  tot.textContent = `${total}`;
}

// Fonction pour afficher les dépenses
function displayDepenses() {
  // Vider chaque conteneur .list et réinitialiser les sous-totaux de chaque catégorie
  document.querySelectorAll('.list').forEach(list => {
    list.innerHTML = '';
  });
  document.querySelectorAll('.depenses h2 span').forEach(span => {span.textContent = '0';});
  const sousTotaux = {};

  depenses.forEach((depense, index) => {
    // Déstructure la dépense  .. ça correspond à assigner à chaque partie d'un tableau une variable :)
    const [description, montant, categorie] = depense;
    const targetContainer = document.querySelector(`.${categorie} .list`);
    const sousTotalSpan = document.querySelector(`.${categorie} h2 span`);

    // Affichage de la dépense
    const div = document.createElement('div');
    div.className = 'depense-item';
    div.innerHTML = `
    ${description} | ${montant}€
    <button class="delete-button" data-index="${index}" title="Supprimer ${description}">❌</button>
    `;
    targetContainer.appendChild(div);

    // Calculer le sous-total
    const montantNum = parseFloat(montant);
    // On envoie la catégorie sous forme de clé dans mon tableau et on additionne le montant
    // Si la catégorie n'existe pas, on l'initialise à 0
    sousTotaux[categorie] = (sousTotaux[categorie] || 0) + montantNum;

    // Mettre à jour l'affichage du sous-total
    sousTotalSpan.textContent = sousTotaux[categorie];
  });
}

// Fonction pour supprimer une dépense
function deleteDepense(index) {
  const montant = parseFloat(depenses[index][1]); 
  depenses.splice(index, 1); 
  total -= montant; 
  tot.textContent = `${total}`;
  displayDepenses();
}

// ==============================
// 🧲 Événements
// ==============================
addBt.addEventListener('click', (e) => {
  e.preventDefault();
  const description = descriptionInput.value;
  const amount = amountInput.value;
  const category = categoryInput.value;

  if (description && !isNaN(amount) && category) {
    addDepense(description, amount, category);
    displayDepenses();
    resetForm();
  }
});

depense.addEventListener('click', (e) => {
  if (e.target.matches('.delete-button')) {   
    const index = e.target.dataset.index;
    deleteDepense(index);
  }
});