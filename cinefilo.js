
var txt_nombre = localStorage.getItem("ls_nombre");
if(txt_nombre){
    var nombre = JSON.parse(txt_nombre);
}else{
    var nombre = [];
}

var txt_protagonista = localStorage.getItem("ls_protagonista");
if(txt_protagonista){
    var protagonista = JSON.parse(txt_protagonista);
}else{
    var protagonista = [];
}

var txt_duracion = localStorage.getItem("ls_duracion");
if(txt_duracion){
    var duracion = JSON.parse(txt_duracion);
}else{
    var duracion = [];
}

var txt_genero = localStorage.getItem("ls_genero");
if(txt_genero){
    var genero = JSON.parse(txt_genero);
}else{
    var genero = [];
}

var txt_premiacion = localStorage.getItem("ls_premiacion");
if(txt_premiacion){
    var premiacion = JSON.parse(txt_premiacion);
}else{
    var premiacion = [];
}

mostrarListado();

function mostrarListado() {
    var lista = "<table>";
    lista += "<thead><tr><th>N°</th><th>PELICULAS</th><th>PROTAGONISTA</th><th>DURACION</th><th>GENERO</th><th>PREMIACION</th></tr></thead>";
    lista += "<tbody>";
    // Recorrer la lista de películas y agregar filas a la tabla
    for (var i = 0; i < nombre.length; i++) {
        lista += "<tr>";
        lista += "<td>" + i + "</td>";
        lista += "<td>" + nombre[i] + "</td>";
        lista += "<td>" + protagonista[i] + "</td>";
        lista += "<td>" + duracion[i] + "</td>";
        lista += "<td>" + genero[i] + "</td>";
        lista += "<td>" + (premiacion[i] ? "Sí" : "No") + "</td>"; // Mostrar "Sí" si premiacion[i] es true, "No" si es false
        lista += "</tr>";
    }
    lista += "</tbody></table>";

    document.getElementById("salida").innerHTML = lista;

    document.querySelector(".nuevaPeli").style.display = "none";
    document.querySelector(".elimPeli").style.display = "none";

    localStorage.setItem("ls_nombre",JSON.stringify(nombre));
    localStorage.setItem("ls_protagonista",JSON.stringify(protagonista));
    localStorage.setItem("ls_duracion",JSON.stringify(duracion));
    localStorage.setItem("ls_genero",JSON.stringify(genero));
    localStorage.setItem("ls_premiacion",JSON.stringify(premiacion));
}

function mostrarFormulario(){
    document.getElementById("formularioPeli").style.display = "block";
    document.getElementById("elimPeli").style.display = "none";
}
function obtenerGenerosSeleccionados() {
    var generosSeleccionados = [];
    var checkboxes = document.querySelectorAll('input[name="genero"]:checked');
    checkboxes.forEach(function(checkbox) {
        generosSeleccionados.push(checkbox.id);
    });
    return generosSeleccionados.join(', '); // Convertir a cadena separada por comas
}
function obtenerPremSeleccionado(){
    var premSeleccionado = document.querySelector('input[name="Prem"]:checked');
        if (premSeleccionado) {
            return premSeleccionado.value === "true";
    }else{
        return null;
    }
}

function agregNuevPeli() {
    var nueNombre = document.getElementById('campoPeli').value;
    var nueProtagonista = document.getElementById('campoProt').value;
    var nueDuracion = document.getElementById('campoDur').value;
    var nueGenero = obtenerGenerosSeleccionados(); // Obtener géneros seleccionados como cadena
    var nuePremiacion = obtenerPremSeleccionado();

    // Verificar si algún campo está vacío
    if (nueNombre === '' || nueProtagonista === '' || nueDuracion === '' || nueGenero === '' || nuePremiacion === null) {
        alert("Por favor, complete todos los campos.");
        return; // Detener la ejecución de la función si algún campo está vacío
    }

    nombre.push(nueNombre);
    protagonista.push(nueProtagonista);
    duracion.push(nueDuracion);
    genero.push(nueGenero);
    premiacion.push(nuePremiacion);

    // Actualizar localStorage
    localStorage.setItem("ls_nombre", JSON.stringify(nombre));
    localStorage.setItem("ls_protagonista", JSON.stringify(protagonista));
    localStorage.setItem("ls_duracion", JSON.stringify(duracion));
    localStorage.setItem("ls_genero", JSON.stringify(genero));
    localStorage.setItem("ls_premiacion", JSON.stringify(premiacion));

    // Limpiar formulario
    document.getElementById('campoPeli').value = '';
    document.getElementById('campoProt').value = '';
    document.getElementById('campoDur').value = '';
    var checkboxes = document.querySelectorAll('input[name="genero"]:checked');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
    // Limpiar selección de premiación
    document.getElementById('premSi').checked = false;
    document.getElementById('premNo').checked = false;
    mostrarListado();
}

function mostrarFormularioElimPeli(){
    document.getElementById("elimPeli").style.display = "block";
    document.getElementById("formularioPeli").style.display = "none";
}
function eliminarPeli(){
    console.log("Función eliminarPeli() invocada");
    var eliminarUno = document.getElementById('campoElimPeli').value; // Obtener el número de la película a eliminar
    // Convertir el valor a un número entero
    eliminarUno = parseInt(eliminarUno);
    
    // Verificar si el valor ingresado es válido y está dentro del rango de películas
    if (eliminarUno >= 0 && eliminarUno < nombre.length) {
        // Eliminar la película correspondiente a partir del índice
        nombre.splice(eliminarUno, 1);
        protagonista.splice(eliminarUno, 1);
        duracion.splice(eliminarUno, 1);
        genero.splice(eliminarUno, 1);
        premiacion.splice(eliminarUno, 1);
    } else {
        alert("Ingrese un número válido de película para eliminar."); // Mostrar mensaje de error si el número ingresado no es válido
    }
    mostrarListado();
}
function ascendente(){
    var bandera, aux;
    do{
        bandera = false;
        for (var i=0 ; i< nombre.length -1; i++){
            if(duracion[i]>duracion[i+1]){
                console.log(duracion[i]+ " "+duracion[i+1]);
                
                aux = duracion[i];
                duracion[i] = duracion[i+1];
                duracion[i+1]=aux;
                bandera = true;

                aux = nombre[i];
                nombre[i] = nombre[i+1];
                nombre[i+1] = aux;

                aux = protagonista[i];
                protagonista[i] = protagonista[i+1];
                protagonista[i+1] = aux

                aux = genero[i];
                genero[i] = genero[i+1];
                genero[i+1] = aux;

                aux = premiacion[i];
                premiacion[i] = premiacion[i+1];
                premiacion[i+1] = aux;
            }
        }
    }while(bandera);
    mostrarListado();
}
function descendente(){
    var bandera, aux;
    do{
        bandera = false;
        for (var i = 0; i < nombre.length - 1; i++){ // Cambio aquí
            if(duracion[i] < duracion[i+1]){ // Cambio aquí
                console.log(duracion[i] + " " + duracion[i+1]);
                
                aux = duracion[i];
                duracion[i] = duracion[i+1];
                duracion[i+1] = aux;
                bandera = true;

                aux = nombre[i];
                nombre[i] = nombre[i+1];
                nombre[i+1] = aux;

                aux = protagonista[i];
                protagonista[i] = protagonista[i+1];
                protagonista[i+1] = aux;

                aux = genero[i];
                genero[i] = genero[i+1];
                genero[i+1] = aux;

                aux = premiacion[i];
                premiacion[i] = premiacion[i+1];
                premiacion[i+1] = aux;
            }
        }
    } while(bandera);
    mostrarListado();
}
function premiadas(){
    var listaPremiadas = "<table>";
    listaPremiadas += "<thead><tr><th>N°</th><th>PELICULAS</th><th>PROTAGONISTA</th><th>DURACION</th><th>GENERO</th><th>PREMIACION</th></tr></thead>";
    listaPremiadas += "<tbody>";

    // Filtrar las películas premiadas
    for (var i = 0; i < nombre.length; i++) {
        if (premiacion[i]) { // Si la película tuvo premiación
            listaPremiadas += "<tr>";
            listaPremiadas += "<td>" + i + "</td>";
            listaPremiadas += "<td>" + nombre[i] + "</td>";
            listaPremiadas += "<td>" + protagonista[i] + "</td>";
            listaPremiadas += "<td>" + duracion[i] + "</td>";
            listaPremiadas += "<td>" + genero[i] + "</td>";
            listaPremiadas += "<td>" + (premiacion[i] ? "Sí" : "No") + "</td>"; // Mostrar "Sí" si premiacion[i] es true, "No" si es false
            listaPremiadas += "</tr>";
        }
    }
    listaPremiadas += "</tbody></table>";
    document.getElementById("salida").innerHTML = listaPremiadas;
}
function noPremiadas(){
    var listaNoPremiadas = "<table>";
    listaNoPremiadas += "<thead><tr><th>N°</th><th>PELICULAS</th><th>PROTAGONISTA</th><th>DURACION</th><th>GENERO</th><th>PREMIACION</th></tr></thead>";
    listaNoPremiadas += "<tbody>";

    // Filtrar las películas no premiadas
    for (var i = 0; i < nombre.length; i++) {
        if (!premiacion[i]) { // Si la película no tuvo premiación
            listaNoPremiadas += "<tr>";
            listaNoPremiadas += "<td>" + i + "</td>";
            listaNoPremiadas += "<td>" + nombre[i] + "</td>";
            listaNoPremiadas += "<td>" + protagonista[i] + "</td>";
            listaNoPremiadas += "<td>" + duracion[i] + "</td>";
            listaNoPremiadas += "<td>" + genero[i] + "</td>";
            listaNoPremiadas += "<td>" + (premiacion[i] ? "Sí" : "No") + "</td>"; // Mostrar "Sí" si premiacion[i] es true, "No" si es false
            listaNoPremiadas += "</tr>";
        }
    }
    listaNoPremiadas += "</tbody></table>";
    document.getElementById("salida").innerHTML = listaNoPremiadas;
}