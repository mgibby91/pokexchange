$(() => {

  // dymanic adding of newly listed
  const addNewlyListed = function(mostRecentArray) {

    $.ajax('/get_faves', { method: 'GET' })
      .then(res => {

        let faves = [];
        for (let fave of res) {
          faves.push(fave.listing_id);
        }

        for (let obj of mostRecentArray) {

          let faveClass;

          if (faves.includes(Number(obj.listing_id))) {
            faveClass = 'fa fa-heart loved';
          } else {
            faveClass = 'fa fa-heart';
          }

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
                <i class="${faveClass}" id="love"></i>
              </p>
            </div>
          </article>
          `

          const $newlyListedContainer = $('#recent');

          $newlyListedContainer.append(htmlListing);

        }



      })
      .catch(err => {
        console.log(err);
      });



  }



  const addMostFavourited = function(mostFavouritedArray) {

    const featuredHTML = `
    <a href="/listings/${mostFavouritedArray[0].listing_id}"><img src="${mostFavouritedArray[0].img_url[0]}" /></a>
    <a href="/listings/${mostFavouritedArray[1].listing_id}"><img src="${mostFavouritedArray[1].img_url[0]}" /></a>
    <a href="/listings/${mostFavouritedArray[2].listing_id}"><img src="${mostFavouritedArray[2].img_url[0]}" /></a>
    `

    $('#featured').append(featuredHTML);
  }

  $.ajax('/api', { method: 'GET' })
    .then(res => {
      console.log(res);
      addNewlyListed(res.mostRecent);
      addMostFavourited(res.MostFav);

      $('#user').text(`Welcome! ${res.userId[0].username}`);

    })
    .catch(err => {
      console.log(err);
    });


  const faveListing = function(e) {

    if (e.target.className === 'fa fa-heart') {
      e.target.classList.add('loved');
      console.log(e.target);

      const listingID = Number(e.target.parentElement.parentElement.children[0].href.split('/')[4]);

      console.log('listingID', listingID);

      $.post({
        url: '/like_listing',
        data: JSON.stringify({ listingID }),
        contentType: 'application/json',
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }

  }

  $('#recent').click(faveListing);




});
