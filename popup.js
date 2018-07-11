let form = document.getElementById('gradientForm');

let messagesGradient;
let receiverGradient;
let data;

const onFormSubmit = (event) => {
    senderGradient = event.target.elements[0].value;
    receiverGradient = event.target.elements[1].value;


    chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {title: 'formSubmitted', data: {
            senderGradient,
            receiverGradient
        }});
      });
    });

    event.preventDefault();
}


form.addEventListener('submit', onFormSubmit);