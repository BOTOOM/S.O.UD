var hilo1, hilo2, hilo3;

/* --------------Main--------------------- */
/*
$(document).ready(function(){
	//Botón Ejecutar
	$("#ejecutar").click(function(){
		$("#ejecutar").attr("disabled",true);
		$("#interrumpir").attr("disabled",false);
		ejecutarhilos();
	});

	//Botón Pausa
	$("#pausar").click(function(){
		$("#interrumpir").attr("disabled",true);
		$("#ejecutar").attr("disabled",false);
		pausarProcesadores();
	});

	//Botón Interrumpir
	$("#interrumpir").click(function(){
		$("#interrumpir").attr("disabled",true);
		$("#pausar").attr("disabled",true);
		$("#ejecutar").attr("disabled",false);
		detenerProcesador1();
		detenerProcesador2();
		detenerProcesador3();
	});

	//Botón rendimiento metrica 1
	$("#rendimiento1").click(function(){
		procesador1.CalcularRendimiento();
		$("#metrica1").html(dibujarRendiminetos(procesador1.rendimientoProcesos));

	});
	//Botón rendimiento metrica 2
	$("#rendimiento2").click(function(){
		procesador2.CalcularRendimiento();
		$("#metrica2").html(dibujarRendiminetos(procesador2.rendimientoProcesos));

	});
	//Botón rendimiento metrica 3
	$("#rendimiento3").click(function(){
		procesador3.CalcularRendimiento();
		$("#metrica3").html(dibujarRendiminetos(procesador3.rendimientoProcesos));

	});

});*/
//Ejecutar los hilos para el manejo de procesadores
function ejecutarhilos(){
	hilo1 = setInterval(function(){
			procesador1.CorrerProcesador(arregloRecursos);
			$("#listos1").html(dibujarCola(procesador1.listos));
			$("#suspendidos1").html(dibujarCola(procesador1.suspendidos));
			$("#bloqueados1").html(dibujarCola(procesador1.bloqueados));
			$("#terminados1").html(dibujarCola(procesador1.terminados));
			$("#cpu1").html(dibujarCola(procesador1.CPU));
			$("#tiempoEjecucion").text(procesador1.cronometro);
			procesador1.CalcularRendimiento();
			$("#dGantt1").html("");
			pintarGantt(procesador1.estados,"#dGantt1");

		},2000);

	hilo2 = setInterval(function(){
			procesador2.CorrerProcesador(arregloRecursos);
			$("#listos2").html(dibujarCola(procesador2.listos));
			$("#suspendidos2").html(dibujarCola(procesador2.suspendidos));
			$("#bloqueados2").html(dibujarCola(procesador2.bloqueados));
			$("#terminados2").html(dibujarCola(procesador2.terminados));
			$("#cpu2").html(dibujarCola(procesador2.CPU));
			procesador2.CalcularRendimiento();
			$("#dGantt2").html("");
			pintarGantt(procesador2.estados,"#dGantt2");
		},2000);
		hilo3 = setInterval(function(){
			procesador3.CorrerProcesador(arregloRecursos);
			$("#listos3").html(dibujarCola(procesador3.listos));
			$("#suspendidos3").html(dibujarCola(procesador3.suspendidos));
			$("#bloqueados3").html(dibujarCola(procesador3.bloqueados));
			$("#terminados3").html(dibujarCola(procesador3.terminados));
			$("#cpu3").html(dibujarCola(procesador3.CPU));
			procesador3.CalcularRendimiento();
			$("#dGantt3").html("");
			pintarGantt(procesador3.estados,"#dGantt3");
		},2000);
}
//Detener los procesadores
function detenerProcesador1(){
	procesador1.DetenerProcesador(arregloRecursos);
	clearInterval(hilo1);
	$("#listos1").html(dibujarCola(procesador1.listos));
	$("#suspendidos1").html(dibujarCola(procesador1.suspendidos));
	$("#bloqueados1").html(dibujarCola(procesador1.bloqueados));
	$("#terminados1").html(dibujarCola(procesador1.terminados));
	$("#cpu1").html(dibujarCola(procesador1.CPU));
}

function detenerProcesador2(){
	procesador2.DetenerProcesador(arregloRecursos);
	clearInterval(hilo2);
	$("#listos2").html(dibujarCola(procesador2.listos));
	$("#suspendidos2").html(dibujarCola(procesador2.suspendidos));
	$("#bloqueados2").html(dibujarCola(procesador2.bloqueados));
	$("#terminados2").html(dibujarCola(procesador2.terminados));
	$("#cpu2").html(dibujarCola(procesador2.CPU));
}

function detenerProcesador3(){
	procesador3.DetenerProcesador(arregloRecursos);
	clearInterval(hilo3);
	$("#listos3").html(dibujarCola(procesador3.listos));
	$("#suspendidos3").html(dibujarCola(procesador3.suspendidos));
	$("#bloqueados3").html(dibujarCola(procesador3.bloqueados));
	$("#terminados3").html(dibujarCola(procesador3.terminados));
	$("#cpu3").html(dibujarCola(procesador3.CPU));

}

function pausarProcesadores () {
	clearInterval(hilo1);
	clearInterval(hilo2);
	clearInterval(hilo3);
}

//Imprimir el valor de rendimiento del procesador en la metrica
function dibujarRendiminetos(procesos){
	var texto ="<tr><td>Nombre</td><td>Tiempo P</td><td>Tiempo Respuesta</td><td>Tiempo Espera</td><td>Penalización</td><td>Proporción Respuesta</td></tr>";
	for(var i = 0; i < procesos.length; i++){
		texto +="<tr><td>P"+i+"</td>";
		for(var j = 0; j < 5; j++){
			texto += "<td>"+procesos[i][j]+"</td>";
		}
		texto +="</tr>";
	}
	return texto;
}
