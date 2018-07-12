let senderMessagesEl;
let receiverMessagesEl;

let senderColor = localStorage.getItem('senderColor')
let receiverColor = localStorage.getItem('receiverColor');

if ( senderColor === null &&
     receiverColor === null) {
    localStorage.setItem('senderColor', '#232323')
    localStorage.setItem('receiverColor', '#545745');
}



// This

var customStyles = document.createElement('style');
customStyles.innerHTML = `
    div[message][body][data-tooltip-position="left"] {
        background: linear-gradient(135deg, ${receiverColor} 0%,${receiverColor} 92%);
    }

    div[message][body][data-tooltip-position="right"] {
        background: linear-gradient(135deg, ${senderColor} 0%, ${senderColor} 92%);
        color: #333;
    }
`;
document.documentElement.insertBefore(customStyles, null);


chrome.runtime.onMessage.addListener((message, sender, response) => {
    if (message.title === 'formSubmitted') {
        // Skip validation for now.
        localStorage.setItem('senderColor', message.data.senderGradient);
        localStorage.setItem('receiverColor', message.data.receiverGradient);
    }
});
