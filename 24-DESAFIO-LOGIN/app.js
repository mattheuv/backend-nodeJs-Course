const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const moment = require('moment')
const port = 8080
const {Firebase} = require("./db")
const { auth } = require("./auth/auth")
const session = require("express-session")
const cookieParser = require("cookie-parser")

app.use(cookieParser());

var sessionAct;
var date = new Date()
var dateConverted = moment(date).format('lll');


const anibal = new Firebase

anibal.connectDB()

app.set('views','./views');
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: "djjfj",
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}))


app.get("/", (req, res) => {
  res.render("login")
})

app.get("/password-invalid", (req,res) => {
  res.render("logininvalid")
})

app.use(express.static("public"));

app.get('/vista', (req, res) => {
  const userAct = sessionAct.user

    res.render("index", {userAct});
   
})

app.get("/misesion", (req, res) => {
  const { nombre } = req.query
  if(req.session.count){
    req.session.count++
    res.send(`${nombre} ha visitado el site ${req.session.count}`)
  }
  else{
    req.session.count = 1
    res.send("welcome papis")
  }
})

app.post('/login', (req,res) => {
  const {user} = req.body
  sessionAct = req.session
  sessionAct.user = user
  
  anibal.findUser(user, req, res)
  
})


app.get("/logout", (req, res) => {
  const userAct = sessionAct.user
  req.session.destroy((err) => {
    if(!err) res.render("logout", {userAct})
    else
    res.send({error: err})
  })
})


io.on("connection", function (socket) {
    console.log("Alguien se ha conectado con Sockets");
    anibal.readMessage().then(data => {
    socket.emit("mensajes", data);
    })
    socket.on("new-mensaje", function(data){
    
        anibal.createMessage(data)
        anibal.readMessage().then(data => {
          console.log(data)
        io.sockets.emit("mensajes", data);
    });
});
});

server.listen(port, function () {
  console.log("Servidor corriendo en http://localhost:" + port);
});


