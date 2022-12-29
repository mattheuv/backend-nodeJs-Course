const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const moment = require('moment')
const port = 8080
const {Firebase} = require("./db")
const mongoStore = require("connect-mongo")
const session = require("express-session")
const cookieParser = require("cookie-parser")

app.use(cookieParser());
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
var sessionAct;
var date = new Date()
var dateConverted = moment(date).format('lll');


// AUTH MIDLEWARE

var auth = function (req, res , next) {
  if(req.session.user)
  return next()
  else
      return res.status(401).render("unauthorized")
}

// END AUTH MIDLEWARE


const anibal = new Firebase

anibal.connectDB()

app.set('views','./views');
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
  store: mongoStore.create({
    mongoUrl: "mongodb+srv://coladmin:mosorio12@cluster0.kduye.mongodb.net/desafio25?retryWrites=true&w=majority",
    mongoOptions: advancedOptions
  }),
  secret: "djjfj",
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 600000}
}
))


app.get("/", (req, res) => {
  res.render("login")
})

app.get("/password-invalid", (req,res) => {
  res.render("logininvalid")
})

app.use(express.static("public"));

app.get('/vista', auth, (req, res) => {
  const userAct = req.session.user

  // if(req.session.user)
  // {
    res.render("index", {userAct});
  // } else {
  //   res.send("Usted no tiene privilegios para acceder")
  // }

   
})

app.get("/misesion", auth, (req, res) => {
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


app.get("/logout", (req, res, next) => {
  
  req.session.destroy((err) => {
    if(err) return next(err)
    else
    res.status(200).render("logout")
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


