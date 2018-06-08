var arregloRecursos = Array();
valorinicial = new recurso("ninguno", 1);
arregloRecursos.push(valorinicial);

//Nodo que alberga la parte de recursos
function recurso(nomRecurso, estadoRecurso/*, cantidad*/){
	this.nombre = nomRecurso;
	this.estado = estadoRecurso;
	//this.camtidad=cantidad;

/* Estados de un recurso */
	this.OcuparRecurso = ocuparRecurso;
	this.LiberarRecurso = liberarRecurso;
	this.CrearRecurso = crearRecurso;
	this.actualizarRecurso = actualizarRecurso;
}

/*
	Semaforo
	estados: 	0 --> ocupado
				1 --> libre
 */
function ocuparRecurso(){
	this.estado = 0;
}
function liberarRecurso(){
	this.estado = 1;
}

//Crear un recurso desde el formulario
function CreatorRecur(){
	$("#CreadorRecur").attr("disabled",true);
	console.log("creator");
	crearRecurso("PolvoEstelar");
	crearRecurso("MinnerDiamond");
	crearRecurso("FactoryBall");
	crearRecurso("ALquimia");
	crearRecurso("Cera");
	crearRecurso("Magic");
}



function crearRecurso(nomRecu){
	console.log("creo un recurso");
	var nombreRecurso = nomRecu;
	recursoCreado = new recurso(nombreRecurso, 1/*, cantidadRecurso*/);
	arregloRecursos.push(recursoCreado);
	//actualizarRecurso();
	console.log(arregloRecursos.toString());
	/*$('#formularioRecurso').each (function(){
  		this.reset();
	});*/
}

//Actualizar el proceso
function actualizarRecurso(){
	if (arregloRecursos == null){
	}
	else{
		i = arregloRecursos.length;
		$('#combRecursos').append('<option value = '+arregloRecursos[i-1].nombre+'>'+arregloRecursos[i-1].nombre+'</option>');

	}

}
