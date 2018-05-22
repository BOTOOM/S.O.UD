
function ReporteMetrica(procesos){
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
