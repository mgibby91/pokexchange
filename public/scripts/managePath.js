$(() => {


  const deleteMyListing = function(e) {

    if (e.target.className === 'delete-listing-btn') {
      const listingID = Number(e.target.id.split('-')[1]);

      $.ajax(`/my_listings/delete/${listingID}`, { method: 'POST' })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

      e.target.parentElement.parentElement.remove();

    }


  }

  const editMyListing = function(e) {

    if (e.target.className === 'edit-listing-btn') {
      const listingID = Number(e.target.id.split('-')[1]);


      $.ajax(`/my_listings/view_listing/${listingID}`, { method: 'GET' })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });



    }


  }


  $('.my-listings-container').click(deleteMyListing);
  $('.my-listings-container').click(editMyListing);










})
