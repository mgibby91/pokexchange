$(() => {

  const addListingByCity = function(cityArray) {

    for (let obj of cityArray) {

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

      $('.city-search-container').append(htmlListing);

    }

  }

  const city = location.href.split('/')[4];
  console.log(city);
  $.ajax(`/api/cities/${city}`, { method: 'GET' })
    .then(res => {
      console.log(res);
      addListingByCity(res.result);
    })
    .catch(err => {
      console.log(err);
    })



})
