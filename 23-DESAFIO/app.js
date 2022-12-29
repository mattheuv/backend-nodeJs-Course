const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const moment = require('moment')
const port = 8080
const {Firebase} = require("./db")
const { normalize, denormalize, schema } = require("normalizr")
// creating entities

const author = new schema.Entity("authors")
const message = new schema.Entity("message", {
  author: author
})
const messages = new schema.Entity("messages", {
  messages: [message]
})
// normalize

var date = new Date()
var dateConverted = moment(date).format('lll');

var mensaje = {
  id: 1,
  mensajes: [{
  id: "mateo@gmail.com",
  text: "mensaje del usuario",
  date: "fecha"
  },
  {
    id: "prueba@gmail.com",
    text: "mensaje del usuario",
    date: "fecha"
    }],
  authors: [
    {
    id: "mateo@gmail.com",
    nombre: "anibal",
    apellido: "ff",
    edad: "edad del usuario",
    alias: "alias del usuario",
    avatar: "url.jpg",
  },
    {
    id: "prueba@gmail.com",
    nombre: "cristian",
    apellido: "ff",
    edad: "edad del usuario",
    alias: "alias del usuario",
    avatar: "url.jpg",
  },
]
}


const anibal = new Firebase

anibal.connectDB()

app.set('views','./views');
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.static("public"));

app.get('/vista', (req, res) => {

    res.render("index");
})


io.on("connection", function (socket) {
    console.log("Alguien se ha conectado con Sockets");
    anibal.readMessage().then(data => {
    socket.emit("mensajes", data);
    })
    socket.on("new-mensaje", function(data){
    
      const query = {
        id:1,
        ...data
      }
       const normalizeData = normalize(query, messages)
    
        anibal.createMessage(normalizeData)
        anibal.readMessage().then(data => {
          console.log(data)
        io.sockets.emit("mensajes", data);
    });
});
});

server.listen(port, function () {
  console.log("Servidor corriendo en http://localhost:" + port);
});


