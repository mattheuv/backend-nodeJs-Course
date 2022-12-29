var socket = io.connect("http://localhost", { forceNew: true });

socket.on("messages", function (data) {
  let index = data.length
  render(data, index);
});

function render(data) {
  var html = data
    .map(function (elem, index) {
     
      return `<tr>
              <th scope="row">${index+1}</th>
              <td>${elem.title}</td>:
              <td>${elem.price}</td>
              <td><img src =${elem.thumbnail} width="100" height="100"></td>
            </tr>`;
    })
    .join(" ");

  document.getElementById("messages").innerHTML = html;
}

function addMessage() {
  var message = {
    id: 0,
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumb").value,
  };

  socket.emit("new-message", message);
  return false;
}

function renderChat(data) {
  console.log(typeof data)
  var html = data
  .map(function (elem, index) {
    return `<div>
    <p align="left" style="color: brown">
    <strong style="color: blue">${elem.email}</strong>
   ${elem.date}:
    <i style="color: green">${elem.opinion}</i>
    </p>
    </div>`;
  })
  .join(" ");
  document.getElementById("mensajes").innerHTML = html;
}

socket.on("mensajes", function (data) {
  renderChat(data)
});

var date = new Date()
var dateConverted = moment(date).format('lll');

function addMensaje() {
  var mensaje = {
    email: document.getElementById("email").value,
    date: dateConverted,
    opinion: document.getElementById("opinion").value,
    };
console.log(mensaje)
if(document.getElementById("email").value != 0){

socket.emit("new-mensaje", mensaje);
  return false;
}else
console.log("need email")
}
