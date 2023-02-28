console.log('/assets/js/main.js');

//! Roadmap
//* Récupérer l'ensemble des identifiants
//      Et les ranger
//* Ajouter un message
//      Aux deux chats
//      Attention propriétaire
// * Gestion du formulaire
// * Réponses suggérées
// * Edition, suppression



/// ---



//*     Récupérer l'ensemble des identifiants
// TexteS débuts de la conversation
const conversationsDebutHTML                        = document.querySelectorAll('.chat-conversation-start');
// console.log(conversationsDebutHTML);

// Conversations, ou seront ajoutées les bulles
const conversationsChatsHTML                        = document.querySelectorAll('.chat-conversation');
// console.log(conversationsChatsHTML);

// Conversations, dernier message reçu à
const conversationsTempsDepuisDernierMessageHTML    = document.querySelectorAll('.temps-depuis-dernier-message');
// console.log(conversationsTempsDepuisDernierMessageHTML);

// Conversations, réponses suggérées
const conversationsReponsesSuggereesHTML            = document.querySelectorAll('.suggested-responses');
// console.log(conversationsReponsesSuggereesHTML);

// Conversations, textes des formulaires
const conversationFormTextInputHTML                 = document.querySelectorAll('.form-input-message');
// console.log(conversationFormTextInputHTML);

// Conversations, boutons des formulaires
const conversationFormButtonSendHTML                = document.querySelectorAll('.form-send-button');
// console.log(conversationFormButtonSendHTML);



// *    On range un peu mieux, dans des objets, puis dans un tableau
let conversations = Array();

//  On fait une jolie boucle en cas d'ajout futur d'autres chats

//  On récupère le nombre de chats
const conversationsHTML = document.querySelectorAll('.one-chat');

//  Pour chaque chat 🐈
for(let i = 0 ; i < conversationsHTML.length ; i++) {
    // On crée un objet conversation par chat afin de mieux s'y retrouver
    const conversation = {
        texteDuDebut                : conversationsDebutHTML[i]
        ,messages                   : conversationsChatsHTML[i]
        ,tempsDepuisDernierMessage  : conversationsTempsDepuisDernierMessageHTML[i]
        ,reponsesSuggerees          : conversationsReponsesSuggereesHTML[i]
        ,formulaireTexte            : conversationFormTextInputHTML[i]
        ,formulaireBouton           : conversationFormButtonSendHTML[i]

        // Afin de nettoyer l'évènement
        ,tempsDepuisDernierMessageIntervalId  : null
    }
    // console.log(conversation);
    
    // On l'ajoute au tableau
    conversations.push(conversation);
}
// console.log(conversations);



//* Ajouter un message
//      A quel chat auquel rajouter le message
//      Contenu du message
//          Est-il propriétaire ?
//      Masquer "Début de la conversation"
//      Mettre à jour le temps depuis le dernier message reçu
function ajouterMessage( chat, contenu, isProprietaire ) {

    // On masque le début de la conversation
    chat.texteDuDebut.classList.add('hidden');

    // On rajoute le message à la suite des autres
    // chat.messages.innerHTML = genererContenuDuMessage( contenu, isProprietaire);
    chat.messages.innerHTML += genererContenuDuMessage( contenu, isProprietaire );

    // On active le timer pour le temps depuis le dernier message reçu
    affichageTimerDernierMessageRecu(chat);
}
// 📌 Tests
ajouterMessage( conversations[1], 'lel', true );
ajouterMessage( conversations[1], 'lol', false );
ajouterMessage( conversations[1], 'Un autre test :3', true );



// Générer le message encapsulé dans le html qui va bieng
//      Vu que l'on a déjà généré le html, et ajusté le css, on copie colle simplement
//      Puis on remplace le contenu dynamique par les variables
function genererContenuDuMessage( contenu, isProprietaire ) {
    
    // return isProprietaire ? yep : nope;

    if(isProprietaire) {
        return `
            <div class="chat-bubble chat-bubble-right position-relative">

                <div class="chat-bubble-actions position-absolute top-0 end-0 me-1 mt-1">
                    <button class="btn-display btn btn-light">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-display btn btn-light">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
                
                <span class="chat-bubble-content">${ contenu }</span>
            </div>
        `;
    }
    else {
        return `
            <div class="chat-bubble disabled">
                <span class="chat-bubble-content">${ contenu }</span>
            </div>
        `;
    }
}



// Dernier message reçu > Gestion du timer
function affichageTimerDernierMessageRecu ( chat ) {
    // On affiche le temps depuis le dernier message reçu
    chat.tempsDepuisDernierMessage.classList.remove('hidden');

    // Si un timer existe déjà, on le supprime afin de le remplacer
    if(chat.intervalId !== null) {
        clearInterval(chat.tempsDepuisDernierMessageIntervalId);
    }

    // On réinitialise le chiffre
    const nombresHTML       = chat.tempsDepuisDernierMessage.querySelector('span');
    nombresHTML.innerHTML   = 1;

    // On crée un timer via setInterval, qui va mettre à jour toutes les secondes
    //      On stocke la valeur de retour afin de nettoyer après
    //      On passe le chat concerné en paramètre optionnel
    const intervalId = setInterval(mettreAJourTimerDernierMessageRecu, 1000, chat);
    chat.tempsDepuisDernierMessageIntervalId = intervalId;
}

// Dernier message reçu > Gestion de l'affichage
function mettreAJourTimerDernierMessageRecu( chat ) {
    const nombresHTML       = chat.tempsDepuisDernierMessage.querySelector('span');
    // On n'oublie pas de convertir la chaîne de caractères, sinon on se retrouve avec 1111111 ;)
    nombresHTML.innerHTML   = parseInt(nombresHTML.innerHTML) + 1;
}



// * Gestion du formulaire
//      Envoi lors du clic sur le bouton
//          Réutiliser les données fournies
//          Envoi aux deux chats
//      Vider le champ texte

// * Réponses suggérées
// * Edition, suppression
