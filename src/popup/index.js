import  '../../libs/jquery.min.js';
import { generateGradient } from '../helpers';

let senderGradient;
let receiverGradient;

$('#senderMessage').val(localStorage.getItem('senderColor'));
$('#receiverMessage').val(localStorage.getItem('receiverColor'));

$('#senderPreview').css('background', generateGradient(localStorage.getItem('senderColor')));
$('#receiverPreview').css('background', generateGradient(localStorage.getItem('receiverColor')));

const onFormSubmit = (event) => {
    senderGradient = event.target.elements[0].value;
    receiverGradient = event.target.elements[1].value;


    localStorage.setItem('senderColor', senderGradient);
    localStorage.setItem('receiverColor', receiverGradient);

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
        $('#senderPreview').css('background', generateGradient(event.target.value));
    } else {
        $('#receiverPreview').css('background', generateGradient(event.target.value));
    }
}


$('#gradientForm').on('submit', onFormSubmit);
$('.input').on('keyup', onInputChanged);