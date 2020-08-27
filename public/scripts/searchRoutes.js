$(() => {


  //   const submitSearchResults = function() {

  //     const searchInput = $('#search-box').val();

  //     const categoryArray = ['Any', 'Accessories', 'Cards', 'Clothing', 'Movies', 'Plushies', 'Toys', 'Video-games', 'Other'];
  //     const cityArray = ['Any', 'Calgary', 'Montreal', 'Toronto', 'Vancouver', 'Victoria'];
  //     const conditionArray = ['Any', 'BINB', 'CIB', 'Like New', 'Good', 'Well-Loved'];

  //     const categorySelect = categoryArray[document.getElementById('select-category').selectedIndex]
  //     const citySelect = cityArray[document.getElementById('select-city').selectedIndex];
  //     const conditionSelect = conditionArray[document.getElementById('select-condition').selectedIndex]

  //     const minPrice = $('#min_price').val();
  //     const maxPrice = $('#max_price').val();

  //     let searchArray = {};

  //     if (searchInput) {
  //       searchArray.title = searchInput;
  //     }

  //     if (categorySelect !== 'Any') {
  //       searchArray.category = categorySelect;
  //     }

  //     if (citySelect !== 'Any') {
  //       searchArray.city = citySelect;
  //     }

  //     if (conditionSelect !== 'Any') {
  //       searchArray.condition = conditionSelect;
  //     }

  //     if (minPrice) {
  //       searchArray.min_price = minPrice * 100;
  //     }

  //     if (maxPrice) {
  //       searchArray.max_price = maxPrice * 100;
  //     }

  //     console.log(searchArray);

  //     $.get({
  //       url: '/search/',
  //       data: JSON.stringify(searchArray),
  //       contentType: 'application/json',
  //     })
  //       .then(res => {
  //         console.log(res);
  //       })
  //       .catch(err => console.log(err));


  //   }



  // const submitSearchResults = function(e) {

  //   // e.preventDefault();

  //   const data = $(this).serialize();

  //   console.log(data);



  // }

  // console.log($('#search-btn'));
  // $('#search-btn').submit(submitSearchResults);







})
