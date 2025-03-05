// Variables 

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

//Event listeners
cargarEventListeners(); 
function cargarEventListeners (){
    // Cuando agregas un cursos presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito 
    carrito.addEventListener('click', eliminarCurso);


    // Vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', ()=>{
        console.log('vaciando carrito');
        articulosCarrito = []; // reseteamos el carrito 
        limpiarHTML(); //Eliminamos todo el html
    });
}


//Funciones 
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado =e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
        
    }
}

//Elimina un curso del carrito
function eliminarCurso(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // Elimina articulos del carrito 
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        console.log(articulosCarrito);
        carritoHTML(); // iterar sobre el carrito y mostrar su HTML

    }
}

// Lee el contenido del HTM al que le dimos click y extrae la informaciòn del curso
function leerDatosCurso(curso){
    console.log(curso);

    // crear un objeto con el contenido del curso actual 

    const infoCurso = { 
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }
    
 // Revisa si un elemento ya existe en el carrito
 const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe){
    // actualizamos la cantidad
    const cursos = articulosCarrito.map(curso =>{
        if (curso.id === infoCurso.id){
            curso.cantidad ++;
            return curso;
        } else{
            return curso;
        }
        
    });
    articulosCarrito = [...cursos];
} else {
    articulosCarrito =[...articulosCarrito, infoCurso];
}
 

    console.log(articulosCarrito);
    carritoHTML();

}

//Muestra el carrito de compras en el html 

function carritoHTML(){
    //Limpiar el HTML
    limpiarHTML();


    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso =>{
        const{imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src = "${imagen}" width = "100"></td>
            <td>${titulo}</td>
            <td>${cantidad}</td>
            <td>
                <a href = "#" class="borrar-curso" data-id= ${id}> X </a>
            </td>
            


        `;

        // agrega el hTML del carrito en el tbdoy
        contenedorCarrito.appendChild(row);

     
    });
}

// Elimina los cursos del tbody 
   function limpiarHTML(){
    //FORMA LENTA
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}