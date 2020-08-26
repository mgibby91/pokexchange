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
            <a><b>Category:</b> ${listingArray[0].category_name}</a>
            <a><b>Condition:</b> Like New</a>
            <a><b>$50.00</b></a>
            <br>
            <p>
              This backpack is a rare find! Barely used, in fantastic condition. Willing to reduce price if you can meet
              close to me.
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
    `


  }


  const listingID = location.href.slice(location.href.length - 2);
  console.log(listingID);
  $.ajax(`/api/listings/${listingID}`, { method: 'GET' })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })



});
