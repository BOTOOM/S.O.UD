//Clase Procesador
function Procesador(){
	this.cronometro = -1;
	this.CPU = new Cola();
	this.listos = new Cola();
	this.suspendidos = new Cola();
	this.bloqueados = new Cola();
	this.terminados = new Cola();
	this.estados=[];
	this.quantum = 5;
	this.rendimientoProcesos = [];

	this.CrearProceso = crearProceso;
	this.CorrerProcesador = correrProcesador;
	this.DetenerProcesador = detenerProcesador;
	this.GuardarEstadosProcesos = guardarEstadosProcesos;
	this.CalcularRendimiento = calcularrendimiento;
	this.BuscarEnTerminados = buscarEnTerminados;
	this.CalcularQuantum = calcularQuantum;

}
//Función para crear un proceso
function crearProceso(proceso){
	proceso.q = this.quantum;
	//Recalcular el valor del quantum
	proceso.qRestante = this.quantum;
	this.listos.Listainsertar(proceso);
	this.CalcularQuantum();
	this.estados[proceso.id] = [];
}

//Funcion del algoritmo Round Robin
function correrProcesador(recursos){
	this.cronometro++;
	//Revisión de los procesos en la cola de suspendidos, aquí se decide si siguen en suspendidos o pasan a listos
	if(!this.suspendidos.Listavacia()){
		var colaAux = new Cola();
		var procesoAux;
		while(!this.suspendidos.Listavacia()){
			procesoAux = this.suspendidos.Listaatender();
			procesoAux.qRestante--;
			//Cuando el tiempo de espera en la cola de suspendidos llega a 0
			if(procesoAux.qRestante == 0){
				this.listos.Listainsertar(procesoAux);
				//Recalcular el valor del quantum
				this.CalcularQuantum();
			}
			// Si tiene tiempo de espera aún en la cola de suspendidos
			else{
				colaAux.Listainsertar(procesoAux);
			}
		}

		while(!colaAux.Listavacia()){
			procesoAux = colaAux.Listaatender();
			this.suspendidos.Listainsertar(procesoAux);
		}
	}

	//Si hay algo en la cola de bloqueados (revisa todos los procesos, y decide si enviarlos a listos o si continuan en bloqueados)
	if(!this.bloqueados.Listavacia()){
		var colaAux = new Cola();
		var procesoAux;
		while(!this.bloqueados.Listavacia()){
			procesoAux = this.bloqueados.Listaatender();
			//------------------------------------------------------------------------

			// revisar recursos
			for(var i in recursos){
				if(recursos[i].nombre == procesoAux.recurso){
					// si el recurso esta disponible
					if(recursos[i].estado == 1 ){
						this.listos.Listainsertar(procesoAux);
						this.CalcularQuantum(); /////// recalcular quenatum ------------------------------------------------------------------
					}// si el recurso no esta disponible
					else{
						colaAux.Listainsertar(procesoAux);
					}
					break;
				}
			}
		}
		while(!colaAux.Listavacia()){
			procesoAux = colaAux.Listaatender();
			this.bloqueados.Listainsertar(procesoAux);
		}
	}

	//Si hay algo en ejecucion en CPU
	if(!this.CPU.Listavacia()){
		var procesoAux = this.CPU.Listaatender();
		procesoAux.tiempo --;
		procesoAux.qRestante --;
		//Si no le queda tiempo de ejecución al proceso va a la cola de terminados
		if(procesoAux.tiempo == 0){

			if(procesoAux.nombre=="EstrellaAzul"){
				var starAzul = stars.create(game.world.randomX, game.world.randomY, 'starA');
					starAzul.body.gravity.y = 30;
					starAzul.body.bounce.y = 0.7 + Math.random() * 0.2;
			}
			if(procesoAux.nombre=="EstrellaRoja"){
				var starRoja = starsRojas.create(game.world.randomX, game.world.randomY,'starR');
				//  Let gravity do its thing
					starRoja.body.gravity.y = 30;
					//  This just gives each star a slightly random bounce value
					starRoja.body.bounce.y = 0.7 + Math.random() * 0.2;
			}
			if(procesoAux.nombre=="EstrellaVerde"){
				var starVerde = starsVerdes.create(game.world.randomX, game.world.randomY,'starG');
					starVerde.body.gravity.y = 30;
					starVerde.body.bounce.y = 0.7 + Math.random() * 0.2;
			}
			if(procesoAux.nombre=="BolaAzul"){
				var bazul = ballB.create(game.world.randomX, game.world.randomY, 'blueball');
				bazul.body.gravity.y = 30;
				bazul.body.bounce.y = 0.7 + Math.random() * 0.2;
			}
			if(procesoAux.nombre=="BolaVerde"){
				var bverde = ballG.create(game.world.randomX, game.world.randomY, 'greenball');
				bverde.body.gravity.y = 30;
				bverde.body.bounce.y = 0.7 + Math.random() * 0.2;
			}
			if(procesoAux.nombre=="BolaRoja"){
				var brosa = ballR.create(game.world.randomX, game.world.randomY, 'redball');
				brosa.body.gravity.y = 30;
				brosa.body.bounce.y = 0.7 + Math.random() * 0.2;
			}
			if(procesoAux.nombre=="DiamondRojo"){
				var drosa = diamanteR.create(game.world.randomX, game.world.randomY, 'diamondR');
				drosa.body.gravity.y = 30;
				drosa.body.bounce.y = 0.7 + Math.random() * 0.2;
			}
			if(procesoAux.nombre=="DiamondAzul"){
				var dazul = diamante.create(game.world.randomX, game.world.randomY, 'diamond');
				dazul.body.gravity.y = 30;
				dazul.body.bounce.y = 0.7 + Math.random() * 0.2;
			}
			if(procesoAux.nombre=="Dverde"){
				var dverde = diamanteG.create(game.world.randomX, game.world.randomY, 'diamondG');
				dverde.body.gravity.y = 30;
				dverde.body.bounce.y = 0.7 + Math.random() * 0.2;
			}

			
			//Buscar el recurso y liberarlo
			for(var i in recursos){
				if(recursos[i].nombre == procesoAux.recurso){
					recursos[i].estado = 1;
					break;
				}
			}
			this.terminados.Listainsertar(procesoAux);
		}
		else{
			//Si no le queda tiempo de quantum al proceso ( va para la cola de suspendido )
			if(procesoAux.qRestante == 0){
				//Buscar el recurso y liberarlo
				for(var i in recursos){
					if(recursos[i].nombre == procesoAux.recurso){
						recursos[i].estado = 1;
						break;
					}
				}
				procesoAux.qRestante = parseInt(Math.floor((Math.random()*procesoAux.qRestante)+2)); //  Tiempo de duración en espera en suspendido
				this.suspendidos.Listainsertar(procesoAux);
			}
			//Si el proceso debe continuar en ejecucion regresa a la cola de CPU
			else{
				this.CPU.Listainsertar(procesoAux);
			}
		}
	}


	//Si hay algo en la cola de listos
	if(!this.listos.Listavacia()){
		//Mentras la CPU esta disponible y haya algo por antender en listos
		while(this.CPU.Listavacia() && !this.listos.Listavacia()){
			var procesoAux = this.listos.Listaatender();
			//Revisar recursos
			for(var i in recursos){
				if(recursos[i].nombre == procesoAux.recurso){
					//Si el recurso esta disponible
					if(recursos[i].estado == 1){
						this.CPU.Listainsertar(procesoAux);
						recursos[i].estado = 0;
					}//Si el recurso no esta disponible
					else{
						procesoAux.qRestante = parseInt(Math.floor((Math.random()*procesoAux.qRestante)+2)); // este tiempo es el que va a durar en espera en bloqueados
						this.bloqueados.Listainsertar(procesoAux);
					}
					break;
				}
			}
		}
	}
	this.GuardarEstadosProcesos();
}

function detenerProcesador(recursos){
	if(!this.CPU.Listavacia()){
		var procesoAux = this.CPU.Listaatender();
		procesoAux.qRestante = parseInt(Math.floor((Math.random()*procesoAux.qRestante)+2)); //  este tiempo es el que va a durar en espera en suspendidos
		this.suspendidos.Listainsertar(procesoAux);
		//Buscar el recurso y liberarlo
		for(var i in recursos){
			if(recursos[i].nombre == procesoAux.recurso){
				recursos[i].estado = 1;
				break;
			}
		}
	}
}

//Funcion para guardar el estado de cada proceso en un instante dado toca recorrer cada cola
function guardarEstadosProcesos(){

	var procesoAux;
	var contadorAux;
	/* cola de listos */
	var colaAux = new Cola();
	while(!this.listos.Listavacia()){//
		procesoAux = this.listos.Listaatender();//
		console.log("******" + procesoAux.id);
		contadorAux = this.estados[procesoAux.id].length;
		this.estados[procesoAux.id][contadorAux] = [this.cronometro, "L"];
		colaAux.Listainsertar(procesoAux);
	}
	while(!colaAux.Listavacia()){
		procesoAux = colaAux.Listaatender();
		console.log("******" + procesoAux.id);
		this.listos.Listainsertar(procesoAux); //
	}

	//Cola de CPU
	while(!this.CPU.Listavacia()){//
		procesoAux = this.CPU.Listaatender();//
		console.log("******" + procesoAux.id);
		contadorAux = this.estados[procesoAux.id].length;
		this.estados[procesoAux.id][contadorAux] = [this.cronometro, "E"];
		colaAux.Listainsertar(procesoAux);

	}
	while(!colaAux.Listavacia()){
		procesoAux = colaAux.Listaatender();
		console.log("******" + procesoAux.id);
		this.CPU.Listainsertar(procesoAux); //
	}

	//Cola de suspendidos
	while(!this.suspendidos.Listavacia()){//
		procesoAux = this.suspendidos.Listaatender();//
		console.log("******" + procesoAux.id);
		contadorAux = this.estados[procesoAux.id].length;
		this.estados[procesoAux.id][contadorAux] = [this.cronometro, "S"];
		colaAux.Listainsertar(procesoAux);
	}
	while(!colaAux.Listavacia()){
		procesoAux = colaAux.Listaatender();
		console.log("******" + procesoAux.id);
		this.suspendidos.Listainsertar(procesoAux); //
	}

	//Cola de bloqueados
	while(!this.bloqueados.Listavacia()){//
		procesoAux = this.bloqueados.Listaatender();//
		console.log("******" + procesoAux.id);
		contadorAux = this.estados[procesoAux.id].length;
		this.estados[procesoAux.id][contadorAux] = [this.cronometro, "B"];
		colaAux.Listainsertar(procesoAux);
	}
	while(!colaAux.Listavacia()){
		procesoAux = colaAux.Listaatender();
		console.log("******" + procesoAux.id);
		this.bloqueados.Listainsertar(procesoAux); //
	}
}

function calcularrendimiento(){
	if(this.cronometro > 0){

		var tiempoProceso;
		var tiempoRespuesta;
		var tiempoEspera;
		var penalizacion;
		var respuesta;

		for(var i = 0; i < this.estados.length; i++){
			var procesoAux = this.BuscarEnTerminados(i);
			if(procesoAux){
				tiempoProceso = procesoAux.t;
				tiempoRespuesta = this.estados[i].length;
				tiempoEspera = tiempoRespuesta - tiempoProceso;
				penalizacion = tiempoRespuesta / tiempoProceso;
				respuesta = 1 / penalizacion;
				this.rendimientoProcesos[i] = [tiempoProceso, tiempoRespuesta, tiempoEspera, penalizacion, respuesta];
			}
			else{
				this.rendimientoProcesos[i] = "-----";
			}
		}
	}
}

function buscarEnTerminados(id){
	var colaAux = new Cola();
	var procesoAux;
	var proceso = false
	while(!this.terminados.Listavacia()){
		procesoAux = this.terminados.Listaatender();
		if(procesoAux.id == id){
			proceso = new nodoProceso(procesoAux.id, procesoAux.nombre, procesoAux.t, procesoAux.recurso);
		}
		colaAux.Listainsertar(procesoAux);
	}
	while(!colaAux.Listavacia()){
		procesoAux = colaAux.Listaatender();
		this.terminados.Listainsertar(procesoAux);
	}
	return proceso;
}


//Recalcular quantum
function calcularQuantum(){
	if(!this.listos.Listavacia()){
		var colaAux = new Cola();
		var promedio = 0;
		var numeroProcesos= 0;
		var procesoAux;
		while(!this.listos.Listavacia()){
			procesoAux = this.listos.Listaatender();
			promedio+=parseInt(procesoAux.tiempo);
			numeroProcesos++;
			colaAux.Listainsertar(procesoAux);
		}
		promedio = promedio/numeroProcesos;
		while(!colaAux.Listavacia()){
			procesoAux = colaAux.Listaatender();
			//cuando solo hay un proceso en la lista, el quantum es el mismo tiempo
			if(numeroProcesos == 1){
				procesoAux.q = procesoAux.tiempo;
				procesoAux.qRestante = procesoAux.tiempo;
			}
			else{
				console.log("Quantum: "+procesoAux.qRestante +"\nPromedio: "+ promedio  );
				if(promedio < (parseInt(procesoAux.tiempo) - (parseInt(procesoAux.tiempo)/(numeroProcesos)))){
					var nuevPromedio = promedio;

					while( (procesoAux.tiempo - parseInt(procesoAux.tiempo)/(numeroProcesos)) > nuevPromedio){
						nuevPromedio ++;
					}
					procesoAux.qRestante = Math.floor(parseInt(nuevPromedio));
					procesoAux.q = Math.floor(parseInt(nuevPromedio));
					//alert("1) "+procesoAux.q +", "+procesoAux.qRestante);
				}
				else{
					if((parseInt(procesoAux.tiempo)) == promedio){
						procesoAux.q = Math.floor(parseInt(promedio*(parseInt(procesoAux.tiempo)/(numeroProcesos))));
						procesoAux.qRestante = Math.floor(parseInt(promedio*(parseInt(procesoAux.tiempo)/(numeroProcesos)))/(numeroProcesos * 10) *0.8);
						//alert("2) "+procesoAux.q +", "+procesoAux.qRestante);
					}
					else {
						if(promedio < (procesoAux.tiempo + 5)){
							var nuevPromedio = promedio;

							while(nuevPromedio > (parseInt(procesoAux.tiempo) + 5)){
									nuevPromedio --;
							}
							procesoAux.qRestante = parseInt(nuevPromedio);
							procesoAux.q =parseInt(nuevPromedio);
							if(parseInt(procesoAux.tiempo) < procesoAux.q){
								procesoAux.q = Math.floor((parseInt(nuevPromedio))/2);
								procesoAux.qRestante = Math.floor((parseInt(nuevPromedio))/((parseInt(procesoAux.tiempo))/2));
							}
							//alert("3) "+procesoAux.q +", "+procesoAux.qRestante);
						}
					}

				}
				console.log("Nuevo quantum: "+procesoAux.qRestante);
			}
			if(procesoAux.q == 0){
				procesoAux.q = 1;
				procesoAux.qRestante = 1;
			}
			this.listos.Listainsertar(procesoAux);
		}

	}
}
