const express = require('express')
const router = express.Router()


router.use(express.json());
router.use(express.urlencoded({ extended: true }));


let productos = []

class Producto {
    constructor (title, price, thumbnail) {
        this.id = productos.length+1
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}

var removeItemFromArr = ( arr, item ) => {
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
};

router.get('/vista', (req, res) => {

    res.render("index");
})

productos.push(new Producto ("coffee", 100, "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-512.png"))
productos.push(new Producto ("Suggar", 5, "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png"))
productos.push(new Producto ("Milk", 60, "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/2_avatar-512.png"))


router.get("/", (req, res) => {
    try{
        if(productos.length > 0){
            res.status(200).json(productos)
        }else{
            res.status(404).json({"error": "There's not any product available."})
        }
    }catch(err) {
        res.status(404).json({err})
    }

})

router.get("/:id", (req, res) => {
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

router.post("/guardar", (req, res) => {
   
    try{
        productos.push(new Producto (req.query.title, parseInt(req.query.price), req.query.thumbnail))
        res.status(200).json(productos[productos.length-1])
    }catch(err){
        res.status(404).json(err)
    }
})


router.put("/update/:id", (req, res) => {

    try {
        let id = parseInt(req.params.id)
        productos[id-1] = {
            "id": parseInt(id),
            "title": req.query.title,
            "price": parseInt(req.query.price),
            "thumbnail": req.query.thumbnail
        }
        res.json(productos[id-1])
    } catch(err){
        throw new Error(err)
    }
})

router.delete("/delete/:id", (req, res) => {

    try {

        let id = parseInt(req.params.id)

            if(id-1 < productos.length){
                res.status(200).json("elemente deleted")
                removeItemFromArr(productos, productos[id-1])
            } else {
                res.status(200).json({"msg":"No hay productos"})
            }
    
    }catch(err) {
        throw new error(err)
    }
   
})
 

router.post("/guardarform", (req, res) => {
    
    let nuevoProducto = req.body;
   try {
       productos.push(new Producto(
           nuevoProducto.title,
           nuevoProducto.price,
           nuevoProducto.thumbnail
           ));
        res.redirect('/api/productos/vista')
   } catch(err) {
    throw new Error(err)
   }

});


    // try{
           
    //         
    // }catch(err) {
    //     res.status(404).json(err)
    // }

module.exports = [router, productos];