

###
TODO:
  1. Make annon function that creates and event listener on page bound to an "onactive" area
  2. When chat area is active listen for an enter button press
  3. Have function that parses message for special characters or patterns.
###



#document.getElementById('chat_area').addEventListener("click", chatActive);
$("#chat_area").click -> chatActive
#document.getElementsByClassName('chat_area').addEventListener("deactivate", chatActive('not'));



chatActive = () ->
  alert "stuff"
  document.addEventListener('keydown', sendMessage(event));


sendMessage = (event) ->
  alert event
