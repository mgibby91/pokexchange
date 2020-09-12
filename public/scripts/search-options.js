$(document).ready(function() {
  let clicked = false;

  $('#options-toggle').on('click', function() {
    if (!clicked) {
      $('#option-fields').slideDown('slow');
      clicked = true;
    } else if (clicked) {
      $('#option-fields').slideUp('slow');
      clicked = false;
    }
  });
});
