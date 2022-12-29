const http = require("http")
let min = 1
let max = 10

let randomNumber =  () => {
  let randomnum = Math.floor(Math.random() * (max - min) + min)
  return randomnum
}

let randomPrice =  () => {
  let randomnum = Math.random() * (9999.9 - 0) + 0
  return randomnum
}

class Objetico {
  constructor(){
    
    this.id = randomNumber()
    this.title = "nice " + randomNumber()
    this.price = "Producto " + randomPrice()
    this.thumbnail = "Foto " + randomNumber()
  
  }
  titleNum(title) {
    return title + randomNumber() + ".jpg"
  }
}

const obj = new Objetico


console.log(obj.titleNum("hello"))
console.log(obj)
 
 

const server = http.createServer((req, res) => {
    res.end("hello" + JSON.stringify(obj))  
})

const PORT = 3000

server.listen(PORT, ()=>{
  console.log(`hello, server its running its ${PORT}`)
})

