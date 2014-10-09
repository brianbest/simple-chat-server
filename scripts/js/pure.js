//Pure Javascript version

  var socket = io();
  var user_name = "";

  //Once user has entered name hide feild
  function hide_name(){
    $('#usr_name').addClass('hide');
    $('#usr_name').bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
    function() {
      console.log('change');
      $('#usr_name').removeClass('hide').addClass('hidden');
      $('.entr_name').html("You are " + user_name);
      $('.entr_name').removeClass('hidden').addClass('show');
    });

  }
  function show_name(){
    $('.entr_name').addClass('hide');
    $('.entr_name').bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
    function() {
      console.log('change');
      $('.entr_name').removeClass('hide').addClass('hidden');
      $('#usr_name').html("You are " + user_name);
      $('#usr_name').removeClass('hidden').addClass('show');
    });

  }

  $('.entr_name').on( "dblclick", function(){show_name();});


  $('#msg').submit(function(){
    var message = $('#chat_area').val();
    //message = scrubMessage(message);
    if (message !== false){
      if(user_name === ""){user_name = "Annon";}
      socket.emit('chat message',user_name + ": " + message);
      $('#chat_area').val('');
    }
    return false;
  });

  $('#name').submit(function(){
    var message = $('#usr_name').val();
    //message = scrubMessage(message);
    if (message !== false){
      user_name = message;
      hide_name();
    }
    return false;
  });

  socket.on('chat message', function(msg){
    $('#msg_area').prepend($('<p>').text(msg));
  });



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
      // {
      //   'char':'happy',
      //   'emoji':'0x1F604'
      // },
      // {
      //   'char':"[;][\)]",
      //   'emoji':'1F609'
      // },
      // {
      //   'char':"[:][P]",
      //   'emoji':'1F61C'
      // },
      // {
      //   'char': "[\-][\_][\-]",
      //   'emoji':'1F620'
      // },
      // {
      //   'char':"[:][\(]",
      //   'emoji':'1F622'
      // }
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
