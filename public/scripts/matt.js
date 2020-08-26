$(() => {

  // dymanic adding of newly listed
  const addNewlyListed = function(mostRecentArray) {

    for (let obj of mostRecentArray) {

      let date = new Date(obj.time_posted).toString();
      date = date.slice(0, 10) + ', ' + date.slice(11, 15);

      const htmlListing = `
      <article class="listing">
        <div class="img-date">
          <img src="${obj.img_url[0]}" />
          <a>Posted ${date}</a>
        </div>
        <div class="summary">
          <a href="/listings/${obj.listing_id}">
            <p>${obj.title}</p>
          </a>
          <p>$${(obj.price / 100).toFixed(2)}</p>
          <p>${obj.city}</p>
          <p>
            <i class="fa fa-heart" id="love"></i>
          </p>
        </div>
      </article>
      `

      const $newlyListedContainer = $('#recent');

      $newlyListedContainer.append(htmlListing);

    }

  }

  $.ajax('/api', { method: 'GET' })
    .then(res => {

      addNewlyListed(res.mostRecent);

    })
    .catch(err => {
      console.log(err);
    })

  $.ajax('/api/listings/30', { method: 'GET' })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })





  // $.post({
  //   url: '/ships',
  //   data: JSON.stringify(shipsData),
  //   contentType: 'application/json',
  // })

});
