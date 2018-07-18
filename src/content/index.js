import { generateGradient } from '../helpers';

let senderMessagesEl;
let receiverMessagesEl;

let senderColor = localStorage.getItem('senderColor')
let receiverColor = localStorage.getItem('receiverColor');

if ( senderColor === null &&
     receiverColor === null) {
    localStorage.setItem('senderColor', 'red')
    localStorage.setItem('receiverColor', 'red');
}



// This

var customStyles = document.createElement('style');
customStyles.innerHTML = `
    div[message][body][data-tooltip-position="left"] {
        background: ${ generateGradient(receiverColor) };
    }

    div[message][body][data-tooltip-position="right"] {
        background: ${ generateGradient(senderColor) };
        color: #333;
    }
`;
document.documentElement.insertBefore(customStyles, null);


chrome.runtime.onMessage.addListener((message, sender, response) => {
    if (message.title === 'formSubmitted') {
        // Skip validation for now.
        if(message.data.senderGradient.length === 0 &&
        message.data.receiverGradient.length === 0) {
            alert("It's empty!")
        } else {
            var customStyles = document.createElement('style');
            customStyles.innerHTML = `
                div[message][body][data-tooltip-position="left"] {
                        background: ${ generateGradient(message.data.receiverGradient) }
                    }
        
                div[message][body][data-tooltip-position="right"] {
                        background: ${ generateGradient(message.data.senderGradient) }
                    }
            `;
            document.documentElement.insertBefore(customStyles, null);
            localStorage.setItem('senderColor', message.data.senderGradient);
            localStorage.setItem('receiverColor', message.data.receiverGradient);
        }

    }
});
