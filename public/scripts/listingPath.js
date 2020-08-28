
$(() => {
  const addListing = function (listingArray) {
    let date = new Date(listingArray[0].time_posted).toString();
    date = date.slice(0, 10) + ', ' + date.slice(11, 15);

    const listingHTML = `
    <section id="details">
      <div id="top">
        <a id="listing-title">${listingArray[0].title} (${listingArray[0].city})</a><br>
        <a>Posted ${date}</a>
        <div id="listing-middle">
          <img src="${listingArray[0].image_url}">
          <div id="middle-details">
            <a><b>Category:</b> ${listingArray[0].name}</a>
            <a><b>Condition:</b> ${listingArray[0].condition}</a>
            <a><b>$${(listingArray[0].price / 100).toFixed(2)}</b></a>
            <br>
            <p>
             ${listingArray[0].description}
            </p>
            <p id="favourite-listing">
              <a>Like this? <i class="fa fa-heart" id="love"></i></a>
              <textarea id="item-message"></textarea>
              <button id="listing-message-button" type="button">Contact Seller</button>
            </p>
          </div>
        </div>
      </div>
    </section>
    `;

    $('#listing-details').append(listingHTML);

    //marisa starts
    $('#listing-message-button').on('click', (e) => {
      e.preventDefault();
      const messageText = $("textarea#item-message").val();
      const dateString = new Date().toISOString();
      const listing = listingArray[0];

      const result = {
        "buyer_id": listing.buyerID,
        "seller_id": listing.user_id,
        "text_body": messageText,
        "time_sent": dateString,
        "listing_id": listing.id,
        "written_by": listing.buyerID
      };

      $.ajax({
        type: "POST",
        url: "/api/messages",
        data: JSON.stringify(result),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          $('#item-message').val('');
          alert('Message sent!');

        },
        failure: function (err) {
          console.log(err);
        }
      });



    });

  };
  const listingID = location.href.split('/')[4];

    $.ajax(`/api/listings/${listingID}`, { method: 'GET' })
      .then(res => {
        console.log(res);
        addListing(res);
      })
      .catch(err => {
        console.log(err);
      })

});
