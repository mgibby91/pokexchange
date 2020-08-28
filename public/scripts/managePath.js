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
      console.log(listingID);


      $.ajax(`/my_listings/view_listing/${listingID}`, { method: 'GET' })
        .then(res => {

          console.log(res[0]);
          const listingObj = res[0];

          let date = new Date(listingObj.time_posted).toString();
          date = date.slice(0, 10) + ', ' + date.slice(11, 15);

          const editHTML = `
          <div style='display: flex; flex-direction: column;'>
          <a id="recent-header" style="margin-top: 30px;">Edit Listing</a>
              <form id="new-listing" method="POST" action="/api/listings/manage/${listingID}" style='height: 320px;'>
            <label for="title">Title:
              <input type="text" name="title" value="${listingObj.title}" style='width: 300px;'>
            </label>
            <label for="imgUrl">Image URL:
              <input type="text" name="imgUrl" value="${listingObj.image_url}" style='width: 300px;'>
            </label>
            <label for="price">Price:
              <input type="text" name="price" value="$${(listingObj.price / 100).toFixed(2)}" style='width: 300px;'>
            </label>
            <label for="category">Category:
              <select name="category">
                <option>Accessories</option>
                <option>Cards</option>
                <option>Clothing</option>
                <option>Movies</option>
                <option>Plushies</option>
                <option>Toys</option>
                <option>Video Games</option>
                <option>Other</option>
              </select></label>
            <label for="city">City:
              <select name="city">
                <option>Calgary</option>
                <option>Montreal</option>
                <option>Toronto</option>
                <option>Vancouver</option>
                <option>Victoria</option>
              </select></label>
            <label for="condition">Condition:
              <select name='condition' style>
                <option>BNIB</option>
                <option>CIB</option>
                <option>Like New</option>
                <option>Good</option>
                <option>Well-Loved</option>
              </select></label>
              <label for="description">Description
              <textarea type="text" name="description" style='width: 300px; height: 100px;'>${listingObj.description}</textarea>
            </label>
            <button type='submit' id='edit-form-btn' style='margin-top: 10px;'>Edit</button>
            <label for="listing_id" style='display: none;'>
              <input type="text" name="listing_id" value="${listingID}" style='width: 300px;'>
            </label>
          </form>
          </div>`;

          $('.my-listings-container').css('display', 'none');

          // document.querySelector('.my-listings-container').parentElement.appendChild(editHTML);
          $('.container').append(editHTML);

        })
        .catch(err => {
          console.log(err);
        });

    }

  }


  $('.my-listings-container').click(deleteMyListing);
  $('.my-listings-container').click(editMyListing);










})
