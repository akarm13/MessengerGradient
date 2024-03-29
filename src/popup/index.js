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

function onInputChange(event) {
    // If they didn't enter a HEX value.
    if(!validate($(this))) {
        $('#changeBtn').attr('disabled', true);
        $(this).addClass('error');
    } else {
        $(this).removeClass('error');
        $('#changeBtn').removeAttr('disabled');

        console.log($(this).attr('id'));
        previewGradient($(this));
    }
}


function previewGradient(input) {
    let colors;
    switch(input.attr('id')) {
        case 'firstYColor':
            colors = JSON.parse(localStorage.getItem('senderColors'));
            colors[0] = input.val();
            // colors = getColors('firstYColor')
            colors = JSON.stringify(colors);
            localStorage.setItem('senderColors', colors);

            $('#yGradientPreview').css('background', generateGradient(localStorage.getItem('senderColors')));
            break;
        case 'secondYColor':
            colors = JSON.parse(localStorage.getItem('senderColors'));
            colors[1] = input.val();
            
            colors = JSON.stringify(colors);
            localStorage.setItem('senderColors', colors);

            $('#yGradientPreview').css('background', generateGradient(localStorage.getItem('senderColors')));
            break;
        case 'firstTColor':
            colors = JSON.parse(localStorage.getItem('receiverColors'));
            colors[0] = input.val();
            
            colors = JSON.stringify(colors);
            localStorage.setItem('receiverColors', colors);

            $('#tGradientPreview').css('background', generateGradient(localStorage.getItem('receiverColors')));
            break;
        case 'secondTColor':
            colors = JSON.parse(localStorage.getItem('receiverColors'));
            colors[1] = input.val();
            
            colors = JSON.stringify(colors);

            localStorage.setItem('receiverColors', colors);
            $('#tGradientPreview').css('background', generateGradient(localStorage.getItem('receiverColors')));
        break;
    }
}
function validate(input) {
    // RegEx pattern for Hex colors.
    const pattern = /^(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/
    let empty = false;

    $('input').each(function() {
        if($(this).val() === '') {
            empty = true;
        }
    })

    if(!empty && pattern.test(input.val())) {
        return true;
    } else {
        return false;
    }
}

$('#gradient-picker').on('submit', onFormSubmit);
$('input').on('keyup', onInputChange);