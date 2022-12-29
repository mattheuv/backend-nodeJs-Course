const express = require("express");
const handlebars = require("express-handlebars");
const port = 5050;
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http);

const productosRutas = require("./rutas/productos.rutas");

app.use('/api/productos', productosRutas[0]);

    app.use(express.json())

// const server = app.listen(port, () => {
//     console.log("Corriendo en el puerto " + server.address().port)
// })

app.engine("hbs",handlebars(
    {
        extname: '.hbs',
        defaultlayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials"
    }
    ))
        
        app.set('views','./views');
        app.set('view engine','hbs');
        app.use(express.static('public'));

        io.on('connection', (socket) => {
            console.log('cliente conectado ' + socket.id),
            socket.emit('producto', productosRutas[1]);
        });

http.listen(port, ()=> {
    console.log('Inicializado...')
})


    
