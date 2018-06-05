$(function() {
  var colorOptions = {
    'solid_black': {
      description: 'Solid Black',
    },
    'midnight_silver_metallic': {
      description: 'Midnight Silver Metallic',
    },
    'deep_blue_metallic': {
      description: 'Deep Blue Metallic',
    },
    'silver_metallic': {
      description: 'Silver Metallic',
    },
    'pearl_white': {
      description: 'Pearl White Multi-Coat'
    },
    'red': {
      description: 'Red Multi-Coat'
    },
  }

  var wheelsOptions = {
    'aero': {
      description: 'Aero',
    },
    'sport': {
      description: 'Sport',
    },
  }

  var wheels = 'aero';
  var color = 'solid_black';

  function loadPreview () {
    $('#car-preview').attr('src', 'img/' + color + '_' + wheels + '.png');;
  }

  $('.wheels-option').click(function () {
    $('.wheels-option').removeClass('selected');
    $(this).addClass('selected');
    wheels = $(this).attr('id');
    $('#wheels-selection').html(wheelsOptions[wheels].description);
    loadPreview();
  });

  $('.color-option').click(function () {
    $('.color-option').removeClass('selected');
    $(this).addClass('selected');
    color = $(this).attr('id');
    $('#color-selection').html(colorOptions[color].description);
    loadPreview();
  });
});
