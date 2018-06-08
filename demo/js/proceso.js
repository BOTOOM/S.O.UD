//Funcion para recibir los valores del nodo proceso
function nodoProceso(idProceso, nomProceso, tiempoVidaProceso, recurso, priority){
	this.id = idProceso;
	this.nombre = nomProceso;
	this.tiempo = tiempoVidaProceso;
	this.quantum;
	this.quantumRestante;
	this.recurso = recurso;
	this.t = tiempoVidaProceso;
	this.prioridad = priority;
}

//Variables de cada procesador
var procesador1 = new Procesador();
var procesador2 = new Procesador();
var procesador3 = new Procesador();
//Contadores para cada procesador
var contador1=0, contador2=0, contador3=0; contNom=0;
/*
//Creación de procesos
$(document).ready(function(){
	$("#guardarProceso").click(function(){
		var nomProceso = $("#nombreProceso").val();
		var tiempoProceso = $("#tiempo").val();
		var recurso = $("#combRecursos").val();
		var numProcesador = $("#escogerProcesador").val();

		if (numProcesador == "1") {
			var proceso = new nodoProceso(contador1, nomProceso, tiempoProceso, recurso);
			procesador1.CrearProceso(proceso);
			contador1++;
			$("#listos1").html(dibujarCola(procesador1.listos));

		} else{
			if (numProcesador == "2") {
				var proceso = new nodoProceso(contador2, nomProceso, tiempoProceso, recurso);
				procesador2.CrearProceso(proceso);
				contador2++;
				$("#listos2").html(dibujarCola(procesador2.listos));
			}else{
				var proceso = new nodoProceso(contador3, nomProceso, tiempoProceso, recurso);
				procesador3.CrearProceso(proceso);
				contador3++;
				$("#listos3").html(dibujarCola(procesador3.listos));
			}
		}
		$('#formProcesos').each (function(){
	  		this.reset();
		});
	});
});*/


function CreacionProcesos(nProcesador, noProceso,recu) {
	var numProcesador= nProcesador;
	var nomProceso=noProceso;
	var tiempoProceso= numAleatorio();
	var recurso= recu;

	if (numProcesador == "1") {
		var proceso = new nodoProceso(contador1, nomProceso, tiempoProceso, recurso, valPrioridad);
		procesador1.CrearProceso(proceso);
		contador1++;
		setTimeout(function(){
			procesador1.listos.ListaOrdenarPrioridad();;
			procesador1.listos.ListaOrdenarTiempo();
		//	$("#listos1").html(dibujarCola(procesador1.listos));
	}, 1000);
		//$("#listos1").html(dibujarCola(procesador1.listos));

	} else{
		if (numProcesador == "2") {
			var proceso = new nodoProceso(contador2, nomProceso, tiempoProceso, recurso);
			procesador2.CrearProceso(proceso);
			contador2++;
			setTimeout(function(){
				procesador2.listos.ListaOrdenarPrioridad();;
				procesador2.listos.ListaOrdenarTiempo();
			//	$("#listos1").html(dibujarCola(procesador1.listos));
		}, 1000);
			//$("#listos2").html(dibujarCola(procesador2.listos));
		}else{
			var proceso = new nodoProceso(contador3, nomProceso, tiempoProceso, recurso);
			procesador3.CrearProceso(proceso);
			contador3++;
			setTimeout(function(){
				procesador3.listos.ListaOrdenarPrioridad();;
				procesador3.listos.ListaOrdenarTiempo();
			//	$("#listos1").html(dibujarCola(procesador1.listos));
		}, 1000);
			//$("#listos3").html(dibujarCola(procesador3.listos));
		}
	}
}

function numAleatorio(){
	var min=2;
	var max=10;
	 return Math.floor(Math.random() * (max - min)) + min;
}

//Funcion para dibujar la cola
function dibujarCola(cola){
	var colaAux = new Cola();
	var textoCola = "";
	var procesoAux;
	while(!cola.Listavacia()){
		procesoAux = cola.Listaatender();
		textoCola += dibujarProceso(procesoAux);
		colaAux.Listainsertar(procesoAux);
	}
	while(!colaAux.Listavacia()){
		procesoAux = colaAux.Listaatender();
		cola.Listainsertar(procesoAux);
	}
	return textoCola;

}
//Imprimir los datos de la tabla de procesos
function dibujarProceso(proceso){
	var procesoAux ="<tr>";
	procesoAux+="<td>id</td>";
	procesoAux+="<td>nom</td>";
	procesoAux+="<td>TTL</td>";
	procesoAux+="<td>Quant</td>";
	procesoAux+="<td>rec</td>";
	procesoAux+="</tr>";
	procesoAux+="<tr>";
	procesoAux += "<td>"+proceso.id+"</td>";
	procesoAux += "<td>"+proceso.nombre+"</td>";
	procesoAux += "<td>"+proceso.tiempo+"</td>";
	procesoAux += "<td>"+proceso.qRestante+"</td>";
	procesoAux += "<td>"+proceso.recurso+"</td>";
	procesoAux += "</tr>";
	return procesoAux;
}

//Funcion para dar valores por defecto a los campos de los formularios
function valoresDefecto(){
	$("#nombreProceso").val("Proceso "+contador);
	$("#tiempo").val(0);
}

function CrearPosciones(tipo){
//alert("pos" + tipo);

}

function CrearVelas(tipo) {

}

function CearPolvo(tipo) {

}
