$(() => {
  $('#messages-list article').each(function(i, message) {
    $(message).on('click', () => {
      const listingID = $(this).data('id');
      const otherUsername = $(this).data('other');
      const otherUserID = $(this).data('uid');
      const title = $(this).data('title');

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

const messageExchange = function(res, otherUsername, title) {
  const messages = res.results;
  const userID = res.userID;
  const $messages = $('#message-chain');

  $messages.empty();

  let messageClass = "";
  let $resultHTML = `<a id="chain-header">
                      ${title}
                      <img src="/resources/pokeball-icon.png" class="message-title">
                      ${otherUsername}
                     </a>`;

  for (const message of messages) {
    const milliseconds = Date.parse(message.time_sent);
<<<<<<< HEAD
    console.log(milliseconds);
=======

>>>>>>> 853d9bb8b7f89ece0eefc4513f997df53315c82c
    const timeStamp = generateTimeStamp(milliseconds);

    if (message.written_by === userID) {
      messageClass = "user-message";
    } else {
      messageClass = "response-message";
    }
    $resultHTML += `<article class=${messageClass}>
      ${message.text_body}
        <br>
        <a class="time">${timeStamp}</a>
        </article>`;
  }

  let $sendNewMessage = `
    <form id="send-message">
      <section id="compose-message">
        <textarea name="message"></textarea>
        <button type="button" id="message-button">Send</button>
      </section>
    </form>`;
  $messages.append($resultHTML);
  $messages.append($sendNewMessage);

  $('#message-button').on('click', (e) => {
    e.preventDefault();
    const messageText = $("textarea[name='message']").val();
    const dateString = new Date().toISOString();

    const result = {
      "buyer_id": messages[0].buyer_id,
      "seller_id": messages[0].seller_id,
      "text_body": messageText,
      "time_sent": dateString,
      "listing_id": messages[0].listing_id,
      "written_by": userID
    };

    $.ajax({
      type: "POST",
      url: "/api/messages",
      data: JSON.stringify(result),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        res.results.push(data.result);
        messageExchange(res, otherUsername, title);
      },
      failure: function(err) {
        console.log(err);
      }
    });

  });
};

const generateTimeStamp = function(time) {
  const date = new Date(time);
  const currentDate = new Date();

  console.log('date', date)
  console.log('current date', currentDate);

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
    let hours = Math.floor(difference / 3600) % 24;
    let minutes = Math.floor(difference / 60) % 60;

    hours -= 5;
    minutes -= 58;

    console.log('hours', hours);
    console.log('minutes', minutes);

    if (hours + minutes === 1) {
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
