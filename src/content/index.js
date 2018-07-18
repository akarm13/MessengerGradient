import { generateGradient, injectStyles } from '../helpers';

let senderMessagesEl;
let receiverMessagesEl;

let senderColor = localStorage.getItem('senderColor')
let receiverColor = localStorage.getItem('receiverColor');


// If the user emptied the local storage, or it was the first time.
if ( senderColor === null &&
     receiverColor === null) {
    localStorage.setItem('senderColor', 'red')
    localStorage.setItem('receiverColor', 'red');
}



// This

const styles = `div[message][body][data-tooltip-position="left"] {
    background: ${ generateGradient(receiverColor) };
    color: #FDFDFD;
}

div[message][body][data-tooltip-position="right"] {
    background: ${ generateGradient(senderColor) };
    color: #FDFDFD;
}`;

injectStyles(styles);

chrome.runtime.onMessage.addListener((message, sender, response) => {
    if (message.title === 'formSubmitted') {
        // Skip validation for now.
        if(message.data.senderGradient.length === 0 &&
        message.data.receiverGradient.length === 0) {
            alert("It's empty!")
        } else {
            injectStyles(`
                div[message][body][data-tooltip-position="left"] {
                        background: ${ generateGradient(message.data.receiverGradient) }
                    }
        
                div[message][body][data-tooltip-position="right"] {
                        background: ${ generateGradient(message.data.senderGradient) }
                    }
            `);
            localStorage.setItem('senderColor', message.data.senderGradient);
            localStorage.setItem('receiverColor', message.data.receiverGradient);
        }

    }
});
