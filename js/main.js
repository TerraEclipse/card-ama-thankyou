$(function() {
  
  function setFontSize(input, selector, loopNumber) {
    var charArray = input.split('')
      , letters = 0
      , spaces = 0
      , chars = 0
      , rawSize = 0
      , finalSize = 0
      , manualAdjustments = {
          'positive_a': 1,
          'positive_b': 1,
          'positive_c': 1,
          'negative_a': 1.2,
          'negative_b': 1.2,
          'negative_c': 1.2
        };

    $.each(charArray, function(index,character) {
      if (character == ' ') {
        spaces++;
      }
      else {
        letters++;
      }
    });

    chars = letters+(spaces/2);
    rawSize = Math.round(((-0.00103*(Math.pow(chars, 2)))+(0.01765*chars)+48.6));

    if (variables.variant) {
      finalSize = Math.floor(rawSize * manualAdjustments[variables.variant]) * 1.2;
    }
    else {
      finalSize = rawSize * 0.85;
    }

    $(selector).css({ 'font-size': finalSize + 'px' }); //
  }

  function setStateBackground(loopNumber, cardSelector) {
    var $card = $(cardSelector);

    $card.css({ 'background-image': 'url("http://action.fixmedicarenow.org.s3.amazonaws.com/states/' + variables.state + '/' + variables.state + '-' + loopNumber + '.jpg")'});
  }

  function setLoopNumber(variantArray, selector) {
    var text = document.getElementsByTagName('h1')[0].innerText
      , loopNumber = variantArray.length + 1;

    $(selector).addClass('loop-' + loopNumber);
    setStateBackground(loopNumber, '.card');
    setFontSize(text, '.card-text, .rep-callout', loopNumber);
  }

  function loadFonts() {
    WebFont.load({
      typekit: {
        id: 'lni3vve'
      },
      active: function() {
        setTimeout(function () {
          window.parent.postMessage('loaded', '*');
        }, 500);
      }
    });
  }
  
  loadFonts();
  setLoopNumber(variables.variants_shared, 'body');
});
