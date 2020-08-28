$(() => {
  const messageExchange = function (res, otherUsername, title) {
    const messages = res.results;
    const userID = res.userID;
    console.log(messages);
    const $messages = $('#message-chain');
    $messages.empty();
    let $resultHTML = "";
    let messageClass = "";


    for(const message of messages){
      const timeStamp = generateTimeStamp(message.time_sent);
      if(message.written_by === userID){
        messageClass = "user-message";
      } else {
        messageClass = "response-message";
      }
      console.log(message.text_body);
      $resultHTML += `<article class=${messageClass}>
      Sent: ${timeStamp}
      <br>
      Message: ${message.text_body}
      </article>`;
    }

    let $sendNewMessage = `<form id="send-message">
    <section id="compose-message">
      <textarea name="message"></textarea>
      <button>Send</button>
    </section>
  </form>`;
    $messages.append($resultHTML);
    $messages.append($sendNewMessage);
  };

  const generateTimeStamp = function (time) {
    const date = new Date(time);
    const currentDate = new Date();

    let timeStamp = '';

    const difference = Math.abs(currentDate - date) / 1000;
    const days = Math.floor(difference / 86400);

    if (days >= 365) {
      const years = Math.floor(difference / (86400 * 365));
      console.log('years ', years);
      timeStamp = `${years} year`;
      if (years >= 2) {
        timeStamp += 's';
      }
    } else if (days > 0) {
      timeStamp = Math.floor(difference / 86400) + ' day';
      if (days !== 1) {
        timeStamp += 's';
      }
    } else {
      const hours = Math.floor(difference / 3600) % 24;
      const minutes = Math.floor(difference / 60) % 60;

      if (hours + minutes === 0) {
        return 'Just now!';
      }

      if (hours > 0) {
        timeStamp = `${hours} hour`;
        if (hours > 1) {
          timeStamp += 's';
        }
      }
      if (minutes > 0) {
        if (hours > 0) {
          timeStamp += ` and `;
        }
        timeStamp = `${minutes} minute`;
        if (minutes !== 1) {
          timeStamp += 's';
        }
      }
    }
    timeStamp += ` ago`;

    return timeStamp;
  };

  $('#messages-list article').each(function (i, message) {
    $(message).on('click', () => {
      console.log($(this).data('id'));
      console.log($(this).data('other'));
      console.log($(this).data('uid'));
      console.log($(this).data('title'));

      const listingID = $(this).data('id');
      const otherUsername = $(this).data('otherid');
      const otherUserID = $(this).data('uid');
      const title = $(this).data('title');
      //1. perform ajax req /messages/id/otheruser
      //2. render msg templates in

      $.ajax(`/api/messages/${listingID}/${otherUserID}`, { method: 'GET' })
        .then(res => {
          messageExchange(res, otherUsername, title);
        })
        .catch(err => {
          console.log(err);
        });

    });
  });

});
