function parseErrors(e){var a=e;return""===a?!1:!0}function parseEmoji(e){for(var a=[{"char":"happy",emoji:"0x1F604"},{"char":"[;][)]",emoji:"1F609"},{"char":"[:][P]",emoji:"1F61C"},{"char":"[-][_][-]",emoji:"1F620"},{"char":"[:][(]",emoji:"1F622"}],r=e,t=0;4>t;t++){var n=r.search(a[t].char);if(console.log(a[t].char+" "+n),0===n){console.log("has");var c=String.fromCharCode(a[t].emoji);r=r.replace(a[t].char,a)}}return r}function sendMessage(e){if(13===e.keyCode){var a=document.getElementById("chat_area").value;if(parseErrors(a)){a=parseEmoji(a);var r=document.createElement("P"),t=document.createTextNode(a);r.appendChild(t);var n=document.getElementById("msg_area").firstChild;document.getElementById("msg_area").insertBefore(r,n),document.getElementById("chat_area").value=""}}}function chatClicked(){console.log("clicked"),document.addEventListener("keyup",function(){sendMessage(event)},!1)}document.getElementById("chat_area").addEventListener("click",function(){chatClicked()},!1);