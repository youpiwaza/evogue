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
const conversationsDebutHTML                = document.querySelectorAll('.chat-conversation-start');
console.log(conversationsDebutHTML);

// Conversations, ou seront ajoutées les bulles
const conversationsChatsHTML                = document.querySelectorAll('.chat-conversation');
console.log(conversationsChatsHTML);

// Conversations, dernier message reçu à
const conversationsTempsDernierMessageHTML  = document.querySelectorAll('.date-dernier-message span');
console.log(conversationsTempsDernierMessageHTML);

// Conversations, réponses suggérées
const conversationsReponsesSuggereesHTML    = document.querySelectorAll('.suggested-responses');
console.log(conversationsReponsesSuggereesHTML);

// Conversations, textes des formulaires
const conversationFormTextInputHTML         = document.querySelectorAll('.form-input-message');
console.log(conversationFormTextInputHTML);

// Conversations, boutons des formulaires
const conversationFormButtonSendHTML        = document.querySelectorAll('.form-send-button');
console.log(conversationFormButtonSendHTML);



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
        ,tempsDepuisDernierMessage  : conversationsTempsDernierMessageHTML[i]
        ,tempsDepuisDernierMessage  : conversationsChatsHTML[i]
        ,reponsesSuggerees          : conversationsReponsesSuggereesHTML[i]
        ,formulaireTexte            : conversationFormTextInputHTML[i]
        ,formulaireBouton           : conversationFormButtonSendHTML[i]
    }
    console.log(conversation);
    
    // On l'ajoute au tableau
    conversations.push(conversation);
}
console.log(conversations);



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
}
ajouterMessage( conversations[1], 'lel', true );
ajouterMessage( conversations[1], 'lel', false );
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


// * Gestion du formulaire
//      Envoi lors du clic sur le bouton
//          Réutiliser les données fournies
//          Envoi aux deux chats
//      Vider le champ texte

// * Réponses suggérées
// * Edition, suppression
