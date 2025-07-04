interface Contact {
    name: string;
    email: string;
}

const form = document.getElementById('contact-form') as HTMLFormElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const contactList = document.getElementById('contact-list') as HTMLUListElement;

// Tableau des contacts
let contacts: Contact[] = [];

// Soumission du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email) return;

    // Création d'un nouveau contact
    const newContact: Contact = { name, email };
    contacts.push(newContact);

    // Maj de l'affichage
    renderContacts();

    // Réinitialise le formulaire
    form.reset();
});

// Affichage des contacts dans la page
function renderContacts(): void {
    contactList.innerHTML = '';

    contacts.forEach((contact, index) => {
        const li = document.createElement('li');

        li.innerHTML = `
            <strong>${contact.name}</strong> (${contact.email})
            <button class="edit-btn">Modifier</button>
            <button class="delete-btn">Supprimer</button>
        `;

        // Bouton Supprimer
        li.querySelector('.delete-btn')?.addEventListener('click', () => {
            contacts.splice(index, 1); // supprime 1 élément à l'index
            renderContacts(); // réaffiche la liste
        });

        // Bouton Modifier
        li.querySelector('.edit-btn')?.addEventListener('click', () => {
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
