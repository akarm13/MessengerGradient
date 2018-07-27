import  '../../libs/jquery.min.js';
import { generateGradient } from '../helpers';

let firstYColor ,secondYColor, 
    firstTColor ,secondTColor,
    senderColors, receiverColors;


// Set default colors for the storage.
if (localStorage.getItem('senderColors') === null ||
    localStorage.getItem('receiverColors') === null) {
    localStorage.setItem('senderColors', JSON.stringify(['11AABB', '000167']));
    localStorage.setItem('receiverColors', JSON.stringify(['005767', '9911AA']));
} else {
    // The gradient background
    $('#yGradientPreview').css('background', generateGradient(localStorage.getItem('senderColors')));
    $('#tGradientPreview').css('background', generateGradient(localStorage.getItem('receiverColors')));


    // Populate the inputs with the color values from the session.
    $('#firstYColor').val(JSON.parse(localStorage.getItem('senderColors'))[0]);
    $('#secondYColor').val(JSON.parse(localStorage.getItem('senderColors'))[1]);
    $('#firstTColor').val(JSON.parse(localStorage.getItem('receiverColors'))[0]);
    $('#secondTColor').val(JSON.parse(localStorage.getItem('receiverColors'))[1]);
}

const onFormSubmit = (event) => {
     firstYColor  = event.target.elements[0].value;
     secondYColor = event.target.elements[1].value;
     firstTColor  = event.target.elements[2].value;
     secondTColor = event.target.elements[3].value;

     // TODO: Validate the inputs before putting them into the localStorage.

     senderColors = JSON.stringify([firstYColor, secondYColor]);
     receiverColors = JSON.stringify([firstTColor, secondTColor]);


     // Ex: "[131313, 414141]";
     localStorage.setItem('senderColors', senderColors);
     localStorage.setItem('receiverColors', receiverColors);

    // Send the inputs to all the tabs.
    chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {title: 'formSubmitted', data: {
            senderColors,
            receiverColors
        }});
      });
    });

    event.preventDefault();
};

const onInputChange = (event) => {
    
}

$('#gradient-picker').on('submit', onFormSubmit);
$('input').on('keyup', onInputChange);


