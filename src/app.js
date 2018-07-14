function shadeColor(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}



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
