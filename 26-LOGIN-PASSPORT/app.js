// DEPENDENCIES REAL TIME
const express = require("express");
const app = express();
const server = require("http").Server(app);
const moment = require('moment')
const port = 8080

// DEPENDENCIES REAL TIME
const io = require("socket.io")(server);

// DEPENDENCIES DB
const {Mongo} = require("./db")
const mongoStore = require("connect-mongo")

// DEPENDENCIES SESSION
const session = require("express-session")
const cookieParser = require("cookie-parser")

//--------------------------------PASSPORT--------------------------------------

const bcrypt = require("bcrypt") // for encryript passwords
const passport = require("c")
const LocalStrategy = require("passport-local").Strategy

passport.use("login", new LocalStrategy({
  passReqToCallback: true
}, 
function (req, username, passport, done){
  let user = anibal.findUser(username, req, res)
  if(!user) return done(null,false)
  console.log(user)
  // let sucess = user.username == user

}

))

app.use(passport.initialize())
app.use(passport.session())
//--------------------------------END PASSPORT--------------------------------------


// SETTING COOKIES AND ADVANCE OPTIONS
app.use(cookieParser());
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}


// SETTING A VARIABLE WITHOUT VALUE
var sessionAct;

//FORMATING DATE WITH MOMENTJS
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

// ASSIGN CLASS MONGO WITH PROPERTIES TO USE BELOW
const anibal = new Mongo


//FIRST STARTS CONNECTING TO DB
anibal.connectDB()

app.set('views','./views');
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
  store: mongoStore.create({
    mongoUrl: "mongodb+srv://coladmin:mosorio12@cluster0.kduye.mongodb.net/desafio26?retryWrites=true&w=majority",
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

    res.render("index", {userAct});
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


// io.on("connection", function (socket) {
//     console.log("Alguien se ha conectado con Sockets");
//     anibal.readMessage().then(data => {
//     socket.emit("mensajes", data);
//     })
//     socket.on("new-mensaje", function(data){
    
//         anibal.createMessage(data)
//         anibal.readMessage().then(data => {
//           console.log(data)
//         io.sockets.emit("mensajes", data);
//     });
// });
// });

server.listen(port, function () {
  console.log("Servidor corriendo en http://localhost:" + port);
});


