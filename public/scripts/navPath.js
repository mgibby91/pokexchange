$(() => {

  $.ajax('/api', { method: 'GET' })
    .then(res => {
      $('#user').text(`Welcome! ${res.userId[0].username}`);
    })
    .catch(err => {
      console.log(err);
    });
});
