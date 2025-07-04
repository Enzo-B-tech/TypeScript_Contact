// Interface TypeScript qui décrit la structure d’un contact
interface Contact {
    name: string;
    email: string;
}

// Récupération des éléments HTML
const form = document.querySelector('#contact-form') as HTMLFormElement;
const nameInput = document.querySelector('#name') as HTMLInputElement;
const emailInput = document.querySelector('#email') as HTMLInputElement;
const contactList = document.querySelector('#contact-list') as HTMLUListElement;

// Tableau contenant tous les contacts
let contacts: Contact[] = [];

/**
 * Affiche tous les contacts dans la liste avec boutons modifier/supprimer
 */
function renderContacts(): void {
    contactList.innerHTML = ''; // Réinitialiser la liste HTML

    contacts.forEach((contact, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${contact.name} – ${contact.email}</span>
            <button onclick="editContact(${index})">Modifier</button>
            <button onclick="deleteContact(${index})">Supprimer</button>
        `;
        contactList.appendChild(li);
    });
}

/**
 * Ajoute un contact à la liste
 */
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if (!name || !email) return;

    contacts.push({ name, email }); // Ajouter le nouveau contact
    form.reset(); // Réinitialise le formulaire
    renderContacts(); // Rafraîchit l'affichage
});

/**
 * Supprime un contact
 */
(window as any).deleteContact = (index: number) => {
    contacts.splice(index, 1);
    renderContacts();
}

/**
 * Modifie un contact (réutilise les champs du formulaire)
 */
(window as any).editContact = (index: number) => {
    const contact = contacts[index];
    nameInput.value = contact.name;
    emailInput.value = contact.email;

    contacts.splice(index, 1); // Supprimer temporairement
    renderContacts(); // Réactualiser l’affichage
}