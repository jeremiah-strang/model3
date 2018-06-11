var destinationAndDocFeePrice = 1000;
var longRangeBatteryPrice = 9000;
var allWheelDrivePrice = 5000;
var enhancedAutopilotPrice = 5000;
var premiumUpgradesPackagePrice = 5000;
var battery = 'long-range';
var wheels = 'aero';
var color = 'solid-black';
var totalPrice = 0;

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
    price: 78000,
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
  'deep-blue-metallic': {
    description: 'Deep Blue Metallic',
    price: 1000,
  },
  'silver-metallic': {
    description: 'Silver Metallic',
    price: 1000,
  },
  'pearl-white': {
    description: 'Pearl White Multi-Coat',
    price: 1000,
  },
  'red': {
    description: 'Red Multi-Coat',
    price: 1000,
  },
};

var wheelsOptions = {
  'aero': {
    description: '18" Aero',
    price: 0,
  },
  'sport': {
    description: '19" Sport',
    price: 1500,
  },
};

var options = [
  {
    key: 'all-wheel-drive',
    description: 'All-Wheel Drive',
    price: 5000,
  },
  {
    key: 'premium-upgrades-package',
    description: 'Premium Upgrades Package',
    price: 5000,
  },
  {
    key: 'enhanced-autopilot',
    description: 'Enhanced Autopilot',
    price: 5000,
  },
  {
    key: 'full-self-driving',
    description: 'Full Self-Driving Capability',
    price: 3000,
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
  var selectedOptions = {
    battery: battery,
    wheels: wheels,
    color: color,
    options: [],
  }

  if (battery === 'performance') {
    $('#all-wheel-drive-chk, #premium-upgrades-package-chk').prop('checked', true);
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
  $('#car-preview').attr('src', 'img/' + color + '-' + wheels + '.png');

  var batteryOption = batteryOptionMap[battery];

  var batteryPriceStr = numeral(batteryOption.price).format('$0,0');
  var destinationAndDocFeePriceStr = numeral(destinationAndDocFeePrice).format('$0,0');
  var colorPrice = battery !== 'performance' ? colorOptions[color].price : 0;
  var colorPriceStr = colorPrice !== 0 ? numeral(colorPrice).format('$0,0') : 'Included';
  var wheelsPrice = battery !== 'performance' ? wheelsOptions[wheels].price : 0;
  var wheelsPriceStr = wheelsPrice !== 0 ? numeral(wheelsPrice).format('$0,0') : 'Included';
  var longRangeBatteryPriceStr = numeral(longRangeBatteryPrice).format('$0,0');
  var allWheelDrivePriceStr = numeral(allWheelDrivePrice).format('$0,0');
  var enhancedAutopilotPriceStr = numeral(enhancedAutopilotPrice).format('$0,0');
  var premiumUpgradesPackagePriceStr = numeral(premiumUpgradesPackagePrice).format('$0,0');

  totalPrice = batteryOption.price + colorPrice + wheelsPrice;

  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    var includeOption = $('#' + option.key + '-chk').prop('checked');
    if (includeOption) {
      selectedOptions.options.push(option.key);
      if (battery === 'performance' &&
        ['all-wheel-drive', 'premium-upgrades-package', 'long-range-battery'].indexOf(option.key) > -1) {
        $('#invoice-' + option.key + '-price').css('text-align', 'right').html('-');
      } else {
        totalPrice += option.price;
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
  var salesTax = salesTaxRate * totalPrice;
  totalPrice += destinationAndDocFeePrice + salesTax;
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
  if (battery === 'performance' && wheels === 'sport') {
    wheelsDescription = '20" Sport';
  }

  $('#wheels-description').html(wheelsDescription);
  $('#wheels-price').html(wheelsPriceStr);
  $('#invoice-wheels-description').html(wheelsDescription + ' Wheels');
  $('#invoice-wheels-price').html(wheelsPrice !== 0 ? wheelsPriceStr : '-');
  $('#invoice-total-price').html(totalPriceStr);

  computeMonthlyPayment();
  selectedOptions.salesTaxRate = parseFloat($('#sales-tax-rate').val()) / 100;
  selectedOptions.interestRate = parseFloat($('#interest-rate').val()) / 100;
  selectedOptions.downPayment = parseFloat($('#down-payment').val());
  selectedOptions.loanTerm = parseInt($('#loan-term').val());
  window.location.hash = JSON.stringify(selectedOptions);
}

$(function() {
  $('.wheels-option').click(function () {
    wheels = $(this).attr('id');
    loadPreview();
  });

  $('.color-option').click(function () {
    color = $(this).attr('id');
    loadPreview();
  });

  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    $('#chk-options-wrap').append(
      $('<label class="chk-wrap w100"></label>')
      .append($('<input id="' + option.key + '-chk" type="checkbox">').click(loadPreview))
      .append('<h4>' + option.description + ' - ' + numeral(option.price).format('$0,0') + '</h4>'))

    $('#invoice-body').append(
      $('<tr id="invoice-' + option.key + '">' +
        '<td id="invoice-' + option.key +'-description">' + option.description + '</td>' +
        '<td id="invoice-' + option.key +'-price">' + numeral(option.price).format('$0,0') + '</td>' +
      '</tr>').hide());
  }
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
          wheels = 'sport';
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
  var initialSalesTaxRate = 0.07;
  var initialInterestRate = 0.04;

  var windowHash = window.location.hash
  if (windowHash.length > 1) {
    try {
      var initialOptions = JSON.parse(unescape(windowHash.slice(1, windowHash.length)));
      if (initialOptions) {
        battery = !!batteryOptionMap[initialOptions.battery] ? initialOptions.battery : 'standard';
        color = !!colorOptions[initialOptions.color] ? initialOptions.color : 'solid-black';
        wheels = !!wheelsOptions[initialOptions.wheels] ? initialOptions.wheels : 'aero';
        
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

  $('#loan-term').change(computeMonthlyPayment);
  $('#down-payment, #interest-rate, #sales-tax-rate').change(loadPreview);
  loadPreview();
});
