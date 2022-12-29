const io = require("socket.io")(server);
const port = 8080
const moment = require("moment")
const productosRutas = require("./rutas/productos.rutas");
const server = express()
    
app.use('/api/productos', productosRutas[0]);

var productos = productosRutas[1]
var date = new Date()
var dateConverted = moment(date).format('lll');
var mensajes = [{
  email: "mattheuv.osorio@geometry.com",
  date: dateConverted,
  opinion: "holi"
}];

app.set('views','./views');
app.set('view engine','ejs');


app.use(express.static("public"));


io.on("connection", function (socket) {
  console.log("Alguien se ha conectado con Sockets");
  socket.emit("messages", productos);
  socket.emit("mensajes", mensajes);

  socket.on("new-message", function (data) {
    var arrProductos = data
    var length = productos.length+1
    arrProductos.id = length
    productos.push(arrProductos);

    io.sockets.emit("messages", productos);
  });
  socket.on("new-mensaje", function(data){
    mensajes.push(data);
    io.sockets.emit("mensajes", mensajes);
  });
});

server.listen(port, function () {
  console.log("Servidor corriendo en http://localhost" + port);
});

