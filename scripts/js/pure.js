//Pure Javascript version



  //Check for Illegal Messages
  //-------------------------------
  function parseErrors(stuff){
    var message = stuff;
    if (message === ""){
      return false;
    }else{
      return true;
    }
  }


  function parseEmoji(message){

    var emoji =[
      {
        'char':'happy',
        'emoji':'0x1F604'
      },
      {
        'char':"[;][\)]",
        'emoji':'1F609'
      },
      {
        'char':"[:][P]",
        'emoji':'1F61C'
      },
      {
        'char': "[\-][\_][\-]",
        'emoji':'1F620'
      },
      {
        'char':"[:][\(]",
        'emoji':'1F622'
      }
    ];

    var check = message;

    for(var i = 0; i < 4; i++){
      var doeshave = check.search(emoji[i].char);
      //console.log(emoji[i].char+" "+doeshave);
      if (doeshave === 0){
        var emoji_make = String.fromCharCode(emoji[i].emoji);
        check = check.replace(emoji[i].char,emoji);
      }
    }
    return check;
  }


  //Take whats in #chat_area, placein element and append to #msg_area
  //-------------------------------
  function scrubMessage(event){

    //Check if Enter was clicked
    //==========================
    if (event.keyCode === 13){

      var msg = document.getElementById('chat_area').value;

      //Check to see if message is not illegal
      //==========================
      if (parseErrors(msg)){
        //Is there emoji?
        msg = parseEmoji(msg);
        return msg;
      }

      return false;
    }
  }

  // //Only once the chat area is activated do we listen for a key up event
  // //-------------------------------
  // function chatClicked(){
  //     console.log('clicked');
  //     document.addEventListener("keyup", function(){sendMessage(event);}, false);
  // }
  //
  //
  //
  // //Listen for chat area to be activated
  // //-------------------------------
  // document.getElementById('chat_area').addEventListener("click", function(){chatClicked();}, false);
