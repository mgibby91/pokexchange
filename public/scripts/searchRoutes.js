$(() => {

  // Error handling for user entering non-integer into min/max price
  $searchError = $('#search-error');

  const $searchBtn = $('#filter-search-btn');
  const $minPriceInput = $('#min_price');
  const $maxPriceInput = $('#max_price');

  const showHideError = () => {
    if (isNaN(Number($minPriceInput.val())) || isNaN(Number($maxPriceInput.val()))) {
      $searchBtn.prop('disabled', true);
      $searchError.slideDown();
    } else if (Number($minPriceInput.val()) >= 1000000 || Number($maxPriceInput.val()) >= 1000000) {
      $searchBtn.prop('disabled', true);
      $searchError.slideDown();
    } else {
      $searchBtn.prop('disabled', false);
      $searchError.slideUp();
    }
  };

  $minPriceInput.on('keyup', showHideError);
  $maxPriceInput.on('keyup', showHideError);

});
