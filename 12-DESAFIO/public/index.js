const socket = io()

    const my_template = document.querySelector("#template")
    const toRender = document.getElementById("toRender")

       
    socket.on('connect', () => {

        console.log('Usuario conectado: ' + socket.id);
         });

        socket.on("producto", (productos) => {
        
        const template = Handlebars.compile(my_template);

        console.log(template())
        // toRender.innerHTML =  template({
        //     productos:productos
            
        // });

        console.log(productos)

     })

    
     
     // guardarProd.addEventListener("click", (e) => {
         //     socket.emit("producto",{title: title.value, price: price.value, thumbnail: thumb.value}); // To server
         // });

        
        function enviarProducto (){
   
            var url = 'http://localhost:5050/api/productos/guardarform';
            
        fetch(url, {
                method: 'POST', // 
                body: JSON.stringify({
                    "title": this.title.value,
                    "price": this.price.value,
                    "thumbnail": this.thumbnail.value
                }), // data can be `string` or {object}!
                headers:{
                    'Content-Type': 'application/json'
                }
                
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                
                .then(response =>  console.log(response));
                        
               //mando el producto nuevo.
            }
   
