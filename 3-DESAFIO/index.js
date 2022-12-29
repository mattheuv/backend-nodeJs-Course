const procesoFinal = (acumulado) => {
    console.log(`El total acumulado es ${acumulado}`);
  };

  const letters = async (text, time, callback) => {
    time === undefined ? (time = 1000) : time
    let arr = text.split(' ')
    for (let i = 0; i < arr.length; i++) {
      await timmer(time)
      console.log(arr[i])
    }
    callback(arr.length)
  };

const timmer = (ms) => {
    return new Promise ((res, rej) => {
        setTimeout(()=> {
            res()
        },ms)
    })
}

    const orderedWords = async (text1, text2, text3) => {
        try {
            let acumulado = 0;
            await letters (text1, 100, (word) => {
                acumulado += word
            },)
            await letters (text2, 100, (word) => {
                acumulado += word
            },)
            await letters (text3, 100, (word) => {
                acumulado += word
            })
            procesoFinal(acumulado)

        }catch(err){
        console.log(err)

        }
}   

orderedWords('Mattheuv Osorio', 'Este es el desafio No 3', 'con el uso de split que no entiendo Silvio')