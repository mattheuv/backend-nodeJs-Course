let consigna = 1

function Usuario (nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido =apellido;
    this.libros = libros;
    this.mascotas = mascotas;
    this.getFullName = () => {
        console.log(`El nombre completo del usuario es ${nombre} ${apellido}`)}
    this.addMascota = () => {
        let mascota = prompt('introduce el nombre de tu nueva mascota');
        mascotas.push(mascota)
    }
    this.getMascotas = () => {
        console.log(`la cantidad de mascotas que tiene es ${mascotas.length}`)
    }
    this.addBook = (book, author) => {
        libros.push(
            {
                titulo: book,
                autor: author
            }
        )
        console.log(libros)
    }
    this.getBooks = () => {
        libros.forEach(element => {
            console.log(element.titulo)
        });
    }
}

let libros = [
    {
        titulo: 'Cronicas de una muerte anunciada',
        autor: 'Gabriel Garcia Marquez'
    },
    {
        titulo: '100 años de soledad',
        autor: 'Gabriel Garcia Marquez'
    }
]

let mascotas = ['Pola', 'Jimmy', 'Napo', 'Iris']


let usuario = new Usuario('Leonardo', 'Davinci', libros, mascotas)


usuario.getFullName()
usuario.addMascota()
usuario.addBook('Todo está jodido', 'Mark Manson')
usuario.getBooks()