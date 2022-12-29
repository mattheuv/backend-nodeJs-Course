var socket = io.connect("http://localhost:8080", { forceNew: true });

// no works
// window.scrollTo(1000, document.getElementById('mensajes').scrollHeight);

function renderChat(data) {
  // console.log(typeof data)
  console.log(data)
  var html = data
  .map(function (elem, index) {
    return `<div>
    <p align="left" style="color: brown">
    <strong style="color: blue">${elem.Author.Alias}</strong>
   ${elem.date}:
    <i style="color: green">${elem.text}</i>
    </p>
    </div>`;
  })
  .join(" ");
  document.getElementById("mensajes").innerHTML = html;
}

socket.on("mensajes", function (data) {
  renderChat(data)
});



function addMensaje() {
  var mensaje = {
    Author:{
      id: document.getElementById("id").value,
      name: document.getElementById('Name').value,
      lastname: document.getElementById('LastName').value,
      Age: document.getElementById('Age').value,
      Alias: document.getElementById('Alias').value,
      Avatar: document.getElementById('Avatar').value,
    },
  date: new Date(),
  text: document.getElementById("text").value,
  };

// console.log(mensaje)
if(document.getElementById("id").value != 0){
  //emit var message with form values with the event new-messages
  socket.emit("new-mensaje", mensaje);
    return false;
  }else
  console.log("need email")
  }