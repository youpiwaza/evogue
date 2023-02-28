console.log('/assets/js/main.js');

//! Roadmap
//* Récupérer l'ensemble des identifiants
//      Et les ranger
//* Ajouter un message
//      Aux deux chats
//      Attention propriétaire
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
//      Aux deux chats
//      Attention propriétaire
// * Réponses suggérées
// * Edition, suppression
