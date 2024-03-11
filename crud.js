function crearPersona(){
	var nombre= document.getElementById("nombre").value;
	var profesion= document.getElementById("profesion").value;

	var personas= localStorage.getItem("personas")


	//Si no hay personas guardadas o es nulo, crear un nuevo array
	if(!personas || personas==="null"){
		personas=[];
	}else{
		personas=JSON.parse(personas);
	}

	//Verificar si la persona existe
	var personaIndex=-1;
	for(var i=0; i<personas.length;i++){
		if(personas[i].nombre===nombre){
			personaIndex=i;
			break;
		}
	}

	//Si la persona no existe, agregar al arreglo
	if(personaIndex===-1){
		personas.push({nombre:nombre, profesion:profesion})
	}else{
		//Actualizar su profesion
		personas[personaIndex].profesion=profesion;
	}

	//Guardar el arreglo actualizado
	localStorage.setItem("personas",JSON.stringify(personas));
	mostrarDatos();
	limpiar();
}

function mostrarDatos(){
	var personas= localStorage.getItem("personas");
	var tablaPersonas = document.getElementById("tablaPersonas");

	if(!personas || personas==="null"){
		tablaPersonas.innerHTML="<tr><td colspan='4'>No se encontraron datos</td></tr>";		
	}else{
		personas=JSON.parse(personas);
		var tablaHTML="<tr><th>Número</th><th>Nombre</th><th>Profesion</th><th>Acciones</th></tr>";
		personas.forEach(function(usuario, indice){
			tablaHTML += "<tr><td>"+(indice+1)+"</td><td>"+
			usuario.nombre + "</td><td>"+usuario.profesion+"</td><td>"+
			"<button onclick='eliminarPersona("+indice+")'>Eliminar </button>"+
			"<button onclick='actualizarPersona("+indice+")'>Modificar</button>"+
			"</td></tr>";
		});
		tablaPersonas.innerHTML=tablaHTML;
		}
}

function limpiar(){
	document.getElementById("nombre").value="";
	document.getElementById("profesion").value="";
}

function actualizarPersona(indice){
	var personas= JSON.parse(localStorage.getItem("personas"));
	var usuario=personas[indice];
	var nuevoNombre=prompt("Modifica el nombre: ",usuario.nombre)
	var nuevaProfesion=prompt("Modifica la profesion: ",usuario.profesion)

	if(nuevoNombre!==null && nuevoNombre.trim()!=="" && nuevaProfesion!==null && nuevaProfesion.trim()!==""){
		personas[indice].nombre=nuevoNombre;
		personas[indice].profesion=nuevaProfesion;
		localStorage.setItem("personas",JSON.stringify(personas));
		mostrarDatos();
		limpiar();
	}
}

function eliminarPersona(indice){
	var personas= JSON.parse(localStorage.getItem("personas"));
	personas.splice(indice,1);
	localStorage.setItem("personas",JSON.stringify(personas));
	mostrarDatos();
}


