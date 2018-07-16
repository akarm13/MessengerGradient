import  '../../libs/jquery.min.js';

let form = document.getElementById('gradientForm');

let senderGradient;
let receiverGradient;

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

const onInputChanged = (event) => {
    if(event.target.id === 'senderMessage') {
        $('#senderPreview').css('background', `
            linear-gradient(135deg, ${event.target.value} 0%, #534343 92%)
        `);
    } else {
        $('#receiverPreview').css('background', `
            linear-gradient(135deg, ${event.target.value} 0%, #3ABCA3 92%)
        `);
    }
}

form.addEventListener('submit', onFormSubmit);
$('.input').on('keyup', onInputChanged);