"use strict";
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const contactList = document.getElementById('contact-list');
// Tableau des contacts
let contacts = [];
// Soumission du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if (!name || !email)
        return;
    // Création d'un nouveau contact
    const newContact = { name, email };
    contacts.push(newContact);
    // Maj de l'affichage
    renderContacts();
    // Réinitialise le formulaire
    form.reset();
});
// Affichage des contacts dans la page
function renderContacts() {
    contactList.innerHTML = '';
    contacts.forEach((contact, index) => {
        var _a, _b;
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${contact.name}</strong> (${contact.email})
            <button class="edit-btn">Modifier</button>
            <button class="delete-btn">Supprimer</button>
        `;
        // Bouton Supprimer
        (_a = li.querySelector('.delete-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            contacts.splice(index, 1); // supprime 1 élément à l'index
            renderContacts(); // réaffiche la liste
        });
        // Bouton Modifier
        (_b = li.querySelector('.edit-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            const newName = prompt("Nouveau nom :", contact.name);
            const newEmail = prompt("Nouvel email :", contact.email);
            if (newName && newEmail) {
                contacts[index] = { name: newName, email: newEmail };
                renderContacts();
            }
        });
        contactList.appendChild(li);
    });
}
