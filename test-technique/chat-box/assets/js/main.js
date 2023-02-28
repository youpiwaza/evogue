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
const conversationsFormTextInputHTML                = document.querySelectorAll('.form-input-message');
// console.log(conversationsFormTextInputHTML);

// Conversations, boutons des formulaires
const conversationsFormButtonSendHTML               = document.querySelectorAll('.form-send-button');
// console.log(conversationsFormButtonSendHTML);

// Conversations, formulaire, afin d'avoir une meilleure gestion
const conversationsFormHTML                         = document.querySelectorAll('.chat-footer');
// console.log(conversationsFormHTML);



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
        ,formulaireTexte            : conversationsFormTextInputHTML[i]
        ,formulaireBouton           : conversationsFormButtonSendHTML[i]
        ,formulaire                 : conversationsFormHTML[i]

        // Afin de nettoyer l'évènement
        ,tempsDepuisDernierMessageIntervalId  : null
    }
    // console.log(conversation);
    
    // On l'ajoute au tableau
    conversations.push(conversation);

    // On gère le clic sur le bouton
    //      ES5 bind afin de récupérer la conversation courante
    //          @see        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
    //      Sinon alternative avec les data-attributes, auquels on passe l'identifiant du chat
    //          @see        https://developer.mozilla.org/fr/docs/Learn/HTML/Howto/Use_data_attributes
    // conversation.formulaireBouton.addEventListener( 'click', onFormButtonSendClick.bind(conversation), false);

    // 👷 Optimisation du comportement du formulaire
    conversation.formulaire.addEventListener( 'submit', onFormSubmit.bind(conversation), false);

}
// console.log(conversations);

// On ajoute le focus sur le premier chat
conversations[0].formulaireTexte.focus();



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
// function onFormButtonSendClick( event ) {
function onFormSubmit( event ) {
    // On ne recharge pas la page (suppression du comportement par défaut du formulaire html)
    event.preventDefault();

    // * On récupère le chat concerné, grâce à l'utilisation de bind lors de l'ajout de l'écouteur
    // console.log(this);
    const chat = this;

    // On récupère le texte dans le champ concerné, si il y en a
    // console.log(chat.formulaireTexte.value);
    let texteAEnvoyer = chat.formulaireTexte.value;

    // Ne pas envoyer de messages vides
    if(texteAEnvoyer === '') {
        texteAEnvoyer = "Si t'as rien à dire on va boire une bière 🍻";
    }

    // On envoie à tous les chats
    for(let i = 0 ; i < conversationsHTML.length ; i++) {

        // En faisant attention au propriétaire
        //      Note: Dans les vrais projet éviter les comparaisons d'objets haha
        if(conversations[i] == chat) {
            // console.log('yay');
            ajouterMessage( conversations[i], texteAEnvoyer, true );
        }
        else {
            // console.log('nope');
            ajouterMessage( conversations[i], texteAEnvoyer, false );

            // On active le timer pour le temps depuis le dernier message reçu
            affichageTimerDernierMessageRecu(conversations[i]);
        }
    }

    // On vide le champ texte du chat concerné
    chat.formulaireTexte.value = '';
}

// * Réponses suggérées
// * Edition, suppression
