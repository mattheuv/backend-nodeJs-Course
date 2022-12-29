
let operacion = (a: number, b: number, oper: String) => {
    return new Promise((resolve, reject) => {
        let calcular = async () => {
            switch (oper) {
                case 'suma':
                    let { Suma } = await import('./suma')
                    let sumar = new Suma(a,b)
                    resolve(sumar.ver());
                    case 'resta':
                        let { Resta } = await import('./resta')
                    let restar = new Resta(a,b)
                    resolve(restar.ver());
                    default:
                        break;
        
                    }
            }
                calcular()
                reject(new Error('Entrada no válida'))
                })
}

let operaciones = () => {

    let oper = operacion(2,3, 'resta');
    console.log(oper)
}
 
operaciones()
