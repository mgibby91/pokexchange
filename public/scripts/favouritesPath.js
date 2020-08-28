$(() => {

  // dymanic adding of newly listed
  const addFavourited = function(favouritesArray) {

    $.ajax('/get_faves', { method: 'GET' })
      .then(res => {
        console.log('faves', res);

        let faves = [];
        for (let fave of res) {
          faves.push(fave.listing_id);
        }
        console.log(faves);

        for (let obj of favouritesArray) {

          let faveClass;

          if (faves.includes(Number(obj.listing_id))) {
            faveClass = 'fa fa-heart loved';
          } else {
            faveClass = 'fa fa-heart';
          }

          let date = new Date(obj.time_posted).toString();
          date = date.slice(0, 10) + ', ' + date.slice(11, 15);

          const htmlFaves = `
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
            <i class="${faveClass}" id="love"></i>
          </p>
        </div>
      </article>
      `

          $('.favourites-listing-container').append(htmlFaves);

        }

      })
      .catch(err => {
        console.log(err);
      });

  }

  $.ajax('/api/favourites/listings', { method: 'GET' })
    .then(res => {
      addFavourited(res.result);
      // console.log(res.result);
    })
    .catch(err => {
      console.log(err);
    });





  // $.post({
  //   url: '/ships',
  //   data: JSON.stringify(shipsData),
  //   contentType: 'application/json',
  // })

});
