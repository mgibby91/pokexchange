$(() => {
  $('#messages-list article').each(function(i, message){
    $(message).on('click', ()=>{
      console.log($(this).data('id'));
      //1. perform ajax req /messages/id/otheruser
      //2. render msg templates in
    })
  })

});


{/* <article class="message-summary odd">
<a id="chain-title">Listing title</a>
<img src="/resources/pokeball-icon.png" />
<a id="other-username">Username</a>
</article> */}


// const messagesList = function(chainDetails) {
  //   console.log(chainDetails.results);
  //   const $messagesList = $('#messages-list');
  //   let $resultHTML = "";
  //   for(const chain of chainDetails.results) {
  //     let $otherUsername = "";
  //     if(chainDetails.userID === chain.buyerid){
  //       $otherUsername = chain.seller;
  //     } else if(chainDetails.userID === chain.sellerid){
  //       $otherUsername = chain.buyer;
  //     }
  //     $resultHTML += `<a href="/messages/${chain.id}"><article class="message-summary odd">
  //     <a class="chain-title">${chain.title}</a>
  //     <img src="/resources/pokeball-icon.png" />
  //     <a class="other-username">${$otherUsername}</a>
  //     <img src="/resources/pokeball-icon.png" />
  //     <a class="message-count">${chain.total_messages_exchanged} messages</a>
  //     </article></a>`;
  //     console.log(chain);
  //   }
  //   $messagesList.append($resultHTML);

  // };


  // $.ajax('/api/messages', { method: 'GET' })
  //   .then(res => {
  //     console.log(res);
  //     messagesList(res);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
