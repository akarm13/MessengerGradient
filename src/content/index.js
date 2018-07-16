import shadeColor from '../helpers';

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
        background: linear-gradient(135deg, ${receiverColor} 0%, ${shadeColor(receiverColor, -0.2)} 92%);
    }

    div[message][body][data-tooltip-position="right"] {
        background: linear-gradient(135deg, ${senderColor} 0%, ${shadeColor(senderColor,  -0.2)} 92%);
        color: #333;
    }
`;
document.documentElement.insertBefore(customStyles, null);


chrome.runtime.onMessage.addListener((message, sender, response) => {
    if (message.title === 'formSubmitted') {
        // Skip validation for now.
        if(message.data.senderGradient.length === 0 &&
        message.data.receiverGradient.length === 0) {
            alert("it's empty!");
        } else {
            localStorage.setItem('senderColor', message.data.senderGradient);
            localStorage.setItem('receiverColor', message.data.receiverGradient);
        }

    }
});
