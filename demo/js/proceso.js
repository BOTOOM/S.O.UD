//Funcion para recibir los valores del nodo proceso
function nodoProceso(idProceso, nomProceso, tiempoVidaProceso, recurso, priority, posiX, posiY){
	this.id = idProceso;
	this.nombre = nomProceso;
	this.tiempo = tiempoVidaProceso;
	this.quantum;
	this.quantumRestante;
	this.recurso = recurso;
	this.t = tiempoVidaProceso;
	this.prioridad = priority;
	this.posX = posiX;
	this.posY = posiY;
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


function CreacionProcesos(nProcesador, noProceso,recu,prio ,poX, poY) {
	var numProcesador= nProcesador;
	var nomProceso=noProceso;
	var tiempoProceso= numAleatorio();
	var recurso= recu;
	var posicionX = poX;
	var posicionY = poY;
	var valPrioridad = prio;
//alert("crea:"+posicionX+","+posicionY);
	if (numProcesador == "1") {
		var proceso = new nodoProceso(contador1, nomProceso, tiempoProceso, recurso, valPrioridad, posicionX, posicionY);
		procesador1.CrearProceso(proceso);
		contador1++;
		setTimeout(function(){
			procesador1.listos.ListaOrdenarPrioridad();;
			procesador1.listos.ListaOrdenarTiempo();
		//	$("#listos1").html(dibujarCola(procesador1.listos));
	}, 500);
		//$("#listos1").html(dibujarCola(procesador1.listos));

	} else{
		if (numProcesador == "2") {
			var proceso = new nodoProceso(contador2, nomProceso, tiempoProceso, recurso, valPrioridad, posicionX, posicionY);
			procesador2.CrearProceso(proceso);
			contador2++;
			setTimeout(function(){
				procesador2.listos.ListaOrdenarPrioridad();;
				procesador2.listos.ListaOrdenarTiempo();
			//	$("#listos1").html(dibujarCola(procesador1.listos));
		}, 500);
			//$("#listos2").html(dibujarCola(procesador2.listos));
		}else{
			var proceso = new nodoProceso(contador3, nomProceso, tiempoProceso, recurso, valPrioridad, posicionX, posicionY);
			procesador3.CrearProceso(proceso);
			contador3++;
			setTimeout(function(){
				procesador3.listos.ListaOrdenarPrioridad();;
				procesador3.listos.ListaOrdenarTiempo();
			//	$("#listos1").html(dibujarCola(procesador1.listos));
		}, 500);
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
	if(tipo=="1"){
		randomx=game.world.randomX;
		randomy=game.world.randomY;
		CreacionProcesos("1","PoscionAzul","ALquimia","2",randomx,randomy);
		//alert("1");
	}
	else if(tipo=="2"){
		//alert("2");
		randomx=game.world.randomX;
		randomy=game.world.randomY;
		CreacionProcesos("2","PoscionRoja","ALquimia","2",randomx,randomy);
	}
	else{
	//	alert("3");
	randomx=game.world.randomX;
	randomy=game.world.randomY;
	CreacionProcesos("3","PoscionVerde","ALquimia","2",randomx,randomy);
	}
}

function CrearVelas(tipo) {
	if(tipo=="1"){
		//alert("1");
		randomx=game.world.randomX;
		randomy=game.world.randomY;
		CreacionProcesos("1","VelaAzul","Cera","2",randomx,randomy);
	}
	else if(tipo=="2"){
		//alert("2");
		randomx=game.world.randomX;
		randomy=game.world.randomY;
		CreacionProcesos("2","VelaRoja","Cera","2",randomx,randomy);
	}
	else{
		//alert("3");
		randomx=game.world.randomX;
		randomy=game.world.randomY;
		CreacionProcesos("3","VelaVerde","Cera","2",randomx,randomy);
	}
}

function CearPolvo(tipo) {
	if(tipo=="1"){
		//alert("1");
		randomx=game.world.randomX;
		randomy=game.world.randomY;
		CreacionProcesos("1","PolvoAzul","Magic","3",randomx,randomy);
	}
	else if(tipo=="2"){
	//	alert("2");
	randomx=game.world.randomX;
	randomy=game.world.randomY;
	CreacionProcesos("2","PolvoRojo","Magic","3",randomx,randomy);
	}
	else{
//		alert("3");
randomx=game.world.randomX;
randomy=game.world.randomY;
CreacionProcesos("3","PolvoVerde","Magic","3",randomx,randomy);
	}
}
