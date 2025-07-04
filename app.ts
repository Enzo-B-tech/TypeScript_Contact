// Interface TypeScript qui décrit la structure d’un contact (eviter les erreurs)
interface Contact {
    name: string;
    email: string;
}

// Récuperation des éléments du DOM nécessaires pour interagir avec la page HTML.
const contactForm = document.getElementById('contact-form') as HTMLFormElement; // "as" -> ts sait de quel type d'élément il s'agit
const nameInput = document.getElementById('name') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const contactList = document.getElementById('contact-list') as HTMLUListElement;

// Tableau de contacts
let contacts: Contact[] = [];

// Fonction pour mettre à jour l'affichage des contacts
function renderContacts(): void {
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        const li = document.createElement('li');

        // Injection du nom, email et un bouton pour supprimer ce contact (li)
        li.innerHTML = `
      <span>${contact.name} - ${contact.email}</span>
      <button data-index="${index}">Supprimer</button>
    `;

        // Ajout dans la liste
        contactList.appendChild(li);
    });
}

// Ajout d'un contact
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (name && email) {
        contacts.push({ name, email });

        nameInput.value = '';
        emailInput.value = '';

        // maj affichage
        renderContacts();
    }
});

// Suppression d'un contact
contactList.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    if (target.tagName === 'BUTTON') {
        // Indice du contact à supprimer
        const index = parseInt(target.dataset.index || '');

        contacts.splice(index, 1);

        // maj affichage
        renderContacts();
    }
});