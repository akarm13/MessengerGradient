import  '../../libs/jquery.min.js';
import { generateGradient } from '../helpers';

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

    localStorage.setItem('senderColor', senderGradient)
    localStorage.setItem('receiverColor', receiverGradienti);

    event.preventDefault();
}

const onInputChanged = (event) => {
    if(event.target.id === 'senderMessage') {
        $('#senderPreview').css('background', generateGradient(event.target.value));
    } else {
        $('#receiverPreview').css('background', generateGradient(event.target.value));
    }
}


$('#gradientForm').on('submit', onFormSubmit);
$('.input').on('keyup', onInputChanged);