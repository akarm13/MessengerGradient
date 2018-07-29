import { generateGradient, injectStyles } from '../helpers';


// Set default colors for the storage.
if (localStorage.getItem('senderColors') === null ||
    localStorage.getItem('receiverColors') === null) {
    localStorage.setItem('senderColors', JSON.stringify(['11AABB', '000167']));
    localStorage.setItem('receiverColors', JSON.stringify(['005767', '9911AA']));
}

setGradient('sender', localStorage.getItem('senderColors'));
setGradient('receiver', localStorage.getItem('receiverColors'));

chrome.runtime.onMessage.addListener((message, sender, response) => {
    if (message.title === 'formSubmitted') {
        setGradient('sender', message.data.senderColors);
        setGradient('receiver', message.data.receiverColors);
        localStorage.setItem('senderColors', message.data.senderColors);
        localStorage.setItem('receiverColors', message.data.receiverColors);
    }
});

function setGradient(userType, colors) {
    let styles;
    if(userType === 'sender') {
        styles = `
            div[message][body][data-tooltip-position="right"] {
                background: ${ generateGradient(colors) };
                color: #DFDFDF;
            };
        `;
        injectStyles(styles);
    } else {
        styles = `
            div[message][body][data-tooltip-position="left"] {
                background: ${ generateGradient(colors) };
                color: #DFDFDF;
            };
        `;
        injectStyles(styles);
    }
}