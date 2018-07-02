var destinationAndDocFeePrice = 1000;
var longRangeBatteryPrice = 9000;
var allWheelDrivePrice = 5000;
var enhancedAutopilotPrice = 5000;
var premiumUpgradesPackagePrice = 5000;
var battery = 'long-range';
var wheels = '18inch-aero';
var color = 'solid-black';
var viewAngle = 'front-angled'; // 'side-profile';
var totalPrice = subtotalPrice = 0;

var batteryOptions = [
  {
    key: 'standard',
    isDisabled: false,
    description: 'Standard Battery',
    price: 35000,
    features: [
      '220 mile range',
      '0 to 60 mph in 5.6 seconds',
      '130 mph top speed',
      '130 miles of range in 30 minutes using global Supercharger network',
    ],
  },
  {
    key: 'long-range',
    isDisabled: false,
    description: 'Long-Range Battery',
    price: 44000,
    features: [
      '310 mile range',
      '0 to 60 mph in 5.1 seconds',
      '140 mph top speed',
      '170 miles of range in 30 minutes using global Supercharger network',
    ],
  },
  {
    key: 'performance',
    isDisabled: false,
    description: 'Performance',
    price: 64000,
    features: [
      '310 mile range',
      '0 to 60 mph in 3.5 seconds',
      '155 mph top speed',
      '170 miles of range in 30 minutes using global Supercharger network',
    ],
  },
];

var colorOptions = {
  'solid-black': {
    description: 'Solid Black',
    price: 0,
  },
  'midnight-silver-metallic': {
    description: 'Midnight Silver Metallic',
    price: 1000,
  },
  'obsidian-black-metallic': {
    description: 'Obsidian Black Metallic',
    price: 1000,
  },
  'deep-blue-metallic': {
    description: 'Deep Blue Metallic',
    price: 1000,
  },
  'metallic-silver': {
    description: 'Metallic Silver',
    price: 1000,
  },
  'pearl-white': {
    description: 'Pearl White Multi-Coat',
    price: 1500,
  },
  'red': {
    description: 'Red Multi-Coat',
    price: 1500,
  },
};

var wheelsOptions = {
  '18inch-aero': {
    description: '18" Aero',
    price: 0,
  },
  '19inch-sport': {
    description: '19" Sport',
    price: 1500,
  },
  '20inch-sport': {
    description: '20" Sport',
    price: 0,
  },
};

var options = [
  {
    key: 'performance-upgrades-package',
    description: 'Performance Upgrades Package',
    price: 5000,
    packages: ['performance'],
  },
  {
    key: 'premium-white-interior',
    description: 'Premium White Interior',
    price: 1500,
    packages: ['performance'],
  },
  {
    key: 'all-wheel-drive',
    description: 'All-Wheel Drive',
    price: 5000,
    packages: ['standard', 'long-range'],
  },
  {
    key: 'premium-upgrades-package',
    description: 'Premium Upgrades Package',
    price: 5000,
    packages: ['standard', 'long-range'],
  },
  {
    key: 'enhanced-autopilot',
    description: 'Enhanced Autopilot',
    price: 5000,
    packages: ['standard', 'long-range', 'performance'],
  },
  {
    key: 'full-self-driving',
    description: 'Full Self-Driving Capability',
    price: 3000,
    packages: ['standard', 'long-range', 'performance'],
  },
];

var batteryOptionMap = {};
for (var i = 0; i < batteryOptions.length; i++) {
  var option = batteryOptions[i];
  batteryOptionMap[option.key] = option;
}

function computeMonthlyPayment() {
  var salesTaxRate = (parseFloat($('#sales-tax-rate').val()) / 100) / 12;
  var interestRate = (parseFloat($('#interest-rate').val()) / 100) / 12;
  var downPayment = parseFloat($('#down-payment').val());
  var loanTerm = parseInt($('#loan-term').val());
  var monthlyPayment = (totalPrice - downPayment) * interestRate / (1 - (Math.pow(1 / (1 + interestRate), loanTerm)));
  $('#monthly-payment').val(numeral(monthlyPayment).format('0,0'));
}

function loadPreview() {
  if (battery === 'performance') {
    $('#19inch-sport').hide();
    $('#20inch-sport').show();
    $('#all-wheel-drive-chk, #premium-upgrades-package-chk').prop('checked', true);
    if ($('#performance-upgrades-package-chk').prop('checked')) {
      wheels = '20inch-sport';
    } else {
      wheels = '18inch-aero';
    }
  } else {
    $('#20inch-sport').hide();
    $('#19inch-sport').show();
    $('#performance-upgrades-package-chk').prop('checked', false);
    if (wheels === '20inch-sport') {
      wheels = '19inch-sport';
    }
  }

  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    if (option.packages.indexOf(battery) > -1) {
      $('#option-wrap-' + option.key).show();
    } else {
      $('#option-wrap-' + option.key).hide();
    }
  }

  $('.wheels-option').removeClass('selected');
  $('#' + wheels).addClass('selected');

  var selectedOptions = {
    battery: battery,
    wheels: wheels,
    color: color,
    options: [],
  }

  if ($('#full-self-driving-chk').prop('checked')) {
    $('#enhanced-autopilot-chk').prop('checked', true);
  }

  $('.battery-option, .color-option, .wheels-option').removeClass('selected');
  $('.battery-option input[type=checkbox]').prop('checked', false);
  $('#' + battery).addClass('selected');
  $('#' + color).addClass('selected');
  $('#' + wheels).addClass('selected');
  $('#' + battery + '-chk').prop('checked', true);
  $('#car-preview').attr('src', 'img/' + viewAngle + '/' + color + '-' + wheels + '.png');

  var batteryOption = batteryOptionMap[battery];

  var batteryPriceStr = numeral(batteryOption.price).format('$0,0');
  var destinationAndDocFeePriceStr = numeral(destinationAndDocFeePrice).format('$0,0');
  var colorPrice = colorOptions[color].price;
  var colorPriceStr = colorPrice !== 0 ? numeral(colorPrice).format('$0,0') : 'Included';
  var wheelsPrice = wheelsOptions[wheels].price;
  var wheelsPriceStr = wheelsPrice !== 0 ? numeral(wheelsPrice).format('$0,0') : 'Included';
  var longRangeBatteryPriceStr = numeral(longRangeBatteryPrice).format('$0,0');
  var allWheelDrivePriceStr = numeral(allWheelDrivePrice).format('$0,0');
  var enhancedAutopilotPriceStr = numeral(enhancedAutopilotPrice).format('$0,0');
  var premiumUpgradesPackagePriceStr = numeral(premiumUpgradesPackagePrice).format('$0,0');

  subtotalPrice = batteryOption.price + colorPrice + wheelsPrice;

  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    var includeOption = $('#' + option.key + '-chk').prop('checked');
    if (includeOption) {
      selectedOptions.options.push(option.key);
      if (battery === 'performance' &&
        ['all-wheel-drive', 'premium-upgrades-package', 'long-range-battery'].indexOf(option.key) > -1) {
        $('#invoice-' + option.key + '-price').css('text-align', 'right').html('-');
      } else {
        subtotalPrice += option.price;
        $('#invoice-' + option.key + '-price')
          .html(numeral(option.price).format('$0,0'))
          .css('text-align', 'right');
      }
      $('#invoice-' + option.key).show();
    } else {
      selectedOptions.options.splice(i, 1);
      $('#invoice-' + option.key).hide();
    }
  }

  var salesTaxRate = parseFloat($('#sales-tax-rate').val()) / 100;
  var salesTax = salesTaxRate * subtotalPrice;
  totalPrice = subtotalPrice + destinationAndDocFeePrice + salesTax;
  var subtotalPriceStr = numeral(subtotalPrice).format('$0,0');
  var totalPriceStr = numeral(totalPrice).format('$0,0');
  var salesTaxStr = numeral(salesTax).format('$0,0');

  $('#invoice-base-description').html('Model 3 - ' + batteryOption.description);
  $('#invoice-base-price').html(batteryOption.price !== 0 ? batteryPriceStr : '-');
  $('#invoice-sales-tax-price').html(salesTax !== 0 ? salesTaxStr : '-');
  $('#invoice-sales-tax-description').html('Sales Tax');
  $('#invoice-destination-and-doc-fee-price').html(destinationAndDocFeePrice !== 0 ? destinationAndDocFeePriceStr : '-');
  $('#invoice-destination-and-doc-fee-description').html('Destination and Doc Fee');
  $('#color-description').html(colorOptions[color].description);
  $('#color-price').html(colorPriceStr);
  $('#invoice-color-description').html(colorOptions[color].description + ' Paint');
  $('#invoice-color-price').html(colorPrice !== 0 ? colorPriceStr : '-');
  $('#invoice-base-price, #invoice-sales-tax-price, #invoice-destination-and-doc-fee-price, #invoice-color-price, #invoice-wheels-price, #invoice-total-price')
    .css('text-align', 'right');

  var wheelsDescription = wheelsOptions[wheels].description;
  if (battery === 'performance') {
    $('#19inch-sport').hide();
    $('#20inch-sport').show();
  }

  $('#wheels-description').html(wheelsDescription);
  $('#wheels-price').html(wheelsPriceStr);
  $('#invoice-wheels-description').html(wheelsDescription + ' Wheels');
  $('#invoice-wheels-price').html(wheelsPrice !== 0 ? wheelsPriceStr : '-');
  $('#invoice-subtotal-price').html(subtotalPriceStr);
  $('#invoice-total-price').html(totalPriceStr);

  computeMonthlyPayment();
  selectedOptions.salesTaxRate = parseFloat($('#sales-tax-rate').val()) / 100;
  selectedOptions.interestRate = parseFloat($('#interest-rate').val()) / 100;
  selectedOptions.downPayment = parseFloat($('#down-payment').val());
  selectedOptions.loanTerm = parseInt($('#loan-term').val());
  window.location.hash = JSON.stringify(selectedOptions);
}

$(function() {
  $('.wheels-option').click(function (e) {
    wheels = $(this).attr('id');
    if (battery === 'performance') {
      $('#performance-upgrades-package-chk').prop('checked', wheels === '20inch-sport');
    }
    loadPreview();
  });

  $('.color-option').click(function (e) {
    color = $(this).attr('id');
    loadPreview();
  });

  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    var optionWrap = $('<label id="option-wrap-' + option.key + '" class="chk-wrap w100"></label>')
        .append($('<input id="' + option.key + '-chk" type="checkbox">').click(loadPreview))
        .append('<h4>' + option.description + ' - ' + numeral(option.price).format('$0,0') + '</h4>');
    
    if (battery !== 'performance' && option.key === 'performance-upgrades-package') {
      optionWrap.hide();
      $('#' + option.key).prop('checked', false);
    }

    $('#chk-options-wrap').append(optionWrap);

    $('#invoice-body').append(
      $('<tr id="invoice-' + option.key + '">' +
        '<td id="invoice-' + option.key +'-description">' + option.description + '</td>' +
        '<td id="invoice-' + option.key +'-price">' + numeral(option.price).format('$0,0') + '</td>' +
      '</tr>').hide());
  }
  $('#invoice-subtotal').appendTo($('#invoice-body'));
  $('#invoice-sales-tax').appendTo($('#invoice-body'));
  $('#invoice-destination-and-doc-fee').appendTo($('#invoice-body'));

  for (var i = 0; i < batteryOptions.length; i++) {
    var option = batteryOptions[i];
    var optionHtml = '<div id="' + option.key + '" class="battery-option">' +
      '<input id="' + option.key + '-chk" type="checkbox">' +
      '<div class="option-description">' + option.description + '</div>' +
      '<div class="option-price">' + numeral(option.price).format('$0,0') + '</div>' +
      '<ul>';
  
    for (var f = 0; f < option.features.length; f++) {
      optionHtml += '<li>' + option.features[f] + '</li>';
    }

    optionHtml += '</ul></div>';
    var optionEl = $(optionHtml);
    if (!option.isDisabled) {
      optionEl.click(function () {
        battery = $(this).attr('id');
        if (battery === 'performance') {
          wheels = '18inch-aero';
        }
        loadPreview();
      });
    } else {
      optionEl.css('cursor', 'not-allowed');
    }
    $('#battery-wrap').append(optionEl);
  }

  var initialDownPayment = 5000;
  var initialLoanTerm = 72;
  var initialSalesTaxRate = 0.065;
  var initialInterestRate = 0.037;

  var windowHash = window.location.hash
  if (windowHash.length > 1) {
    try {
      var initialOptions = JSON.parse(unescape(windowHash.slice(1, windowHash.length)));
      if (initialOptions) {
        battery = !!batteryOptionMap[initialOptions.battery] ? initialOptions.battery : 'standard';
        color = !!colorOptions[initialOptions.color] ? initialOptions.color : 'solid-black';
        wheels = !!wheelsOptions[initialOptions.wheels] ? initialOptions.wheels : '18inch-aero';
        
        for (var i = 0; i < initialOptions.options.length; i++) {
          $('#' + initialOptions.options[i] + '-chk').prop('checked', true);
        }

        if (initialOptions.downPayment &&
            !isNaN(initialOptions.downPayment)) {
          initialDownPayment = initialOptions.downPayment;
        }

        if (initialOptions.loanTerm &&
            !isNaN(initialOptions.loanTerm) &&
            [36, 60, 72].indexOf(initialOptions.loanTerm)) {
          initialLoanTerm = initialOptions.loanTerm;
        }

        if (initialOptions.salesTaxRate &&
          !isNaN(initialOptions.salesTaxRate)) {
          initialSalesTaxRate = initialOptions.salesTaxRate;
        }

        if (initialOptions.interestRate &&
          !isNaN(initialOptions.interestRate)) {
          initialInterestRate = initialOptions.interestRate;
        }
      }
    } catch (error) {}
  }

  $('#down-payment').val(initialDownPayment);
  $('#interest-rate').val(Math.round(initialInterestRate * 100 * 100) / 100);
  $('#sales-tax-rate').val(Math.round(initialSalesTaxRate * 100 * 100) / 100);
  $('#loan-term').val(initialLoanTerm);

  $('#loan-term').change(computeMonthlyPayment);
  $('#down-payment, #interest-rate, #sales-tax-rate, #loan-term').change(loadPreview);
  loadPreview();
});
