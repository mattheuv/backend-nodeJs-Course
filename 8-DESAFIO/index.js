import  express from 'express'

let productos = []

class Producto {
    constructor (title, price, thumbnail) {
        this.id = productos.length+1
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}

const port = 8080
const app = express()

const server = app.listen(port, () => {
    console.log("Corriendo en el puerto " + server.address().port)
})

productos.push(new Producto ("Banano", 200, "/test.jpg"))
productos.push(new Producto ("Zanahoria", 100, "/test2.jpg"))



app.get("/api/productos/listar", (req, res) => {
    try{
        if(productos.length == 0){
            res.status(404).json({"error": "No hay productos guardados"})
        }else {
            res.status(200).json(productos)
        }
    }catch(err) {
        res.status(404).json({err})
    }

})


app.get("/api/productos/listar/:id", (req, res) => {
    try{
        if (req.params.id <= (productos.length)) {
            res.status(200).json(productos[req.params.id-1])
        } else {
            res.status(404).json({"error": "Producto no encontrado"})
        }
    }catch(err) {
        res.status(404).json({err})
    }
})

app.post("/api/productos/guardar/", (req, res) => {
   
    let title = req.query.title
    let price = parseInt(req.query.price)
    let thumbnail = req.query.price
  

    try{
            productos.push(new Producto(title, price, thumbnail))
            res.status(200).json(productos[productos.length -1])
        
    }catch(err) {
        res.status(404).json(err)
    }
})