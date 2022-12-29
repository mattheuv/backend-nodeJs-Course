const fs = require ('fs')


class Archivo {
    constructor(file) {
        this.file = file
    }

    existe() {
      return fs.existsSync(this.file)
    }
    async guardar (producto) {
        if(this.existe()){
            try{
                const consultar = await fs.promises.readFile(this.file)
                const json = JSON.parse(consultar.toString('utf-8'));
                json.push({ ...producto, id: json.length }); // Usando spread operator evitamos crear la var con el arreglo.
            
                await fs.promises.writeFile(this.file, JSON.stringify(json, null, "\t"))
                console.log('Se ha creado un nuevo producto con exito')
        }catch(err){
            throw new Error(err)
            }
        } else{
            try{
                await fs.promises.writeFile(this.file, JSON.stringify([]))
                const consultar = await fs.promises.readFile(this.file)
                const json = JSON.parse(consultar.toString('utf-8'));
                json.push({ ...producto, id: json.length }); // Usando spread operator evitamos crear la var con el arreglo.
            
                await fs.promises.writeFile(this.file, JSON.stringify(json, null, "\t"))

                console.log('Se ha creado un nuevo archivo y producto con exito')
            }
            catch(err){
                throw new Error(err)
            }
        }

    }
    async leer(file) {
        try{
            const lectura = await fs.promises.readFile(file)
            const json = JSON.parse(lectura.toString('utf-8'))
            console.log(json)

        } catch(err){
            throw new Error(err)
        }
    }
    
    borrar(file){
        if (this.existe()){
            fs.unlinkSync(file)
            console.log('Archivo borrado con éxito')
        } else {
            console.log('El registro que intentas eliminar no existe')
        }
    }
}

let producto = new Archivo ('productos.txt')


// producto.guardar({
//     "title": "Desodorante",
//     "price": 7000,
//     "thumbnail": "ruta3.jpg"
// })

// producto.guardar({
//     "title": "Shampoo",
//     "price": 5000,
//     "thumbnail": "ruta2.jpg"
// })

// producto.guardar({
//     "title": "Jabon",
//     "price": 3000,
//     "thumbnail": "ruta.jpg"
// })



