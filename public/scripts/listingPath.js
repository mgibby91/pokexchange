$(() => {


  const addListing = function(listingArray) {

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
              <button id="listing-message">Contact Seller</button>
            </p>
          </div>
        </div>
      </div>
    </section>
    `;

    $('#listing-details').append(listingHTML);


  }


  const listingID = location.href.split('/')[4];
  console.log(listingID);
  $.ajax(`/api/listings/${listingID}`, { method: 'GET' })
    .then(res => {
      console.log(res);
      addListing(res);
    })
    .catch(err => {
      console.log(err);
    })



});
