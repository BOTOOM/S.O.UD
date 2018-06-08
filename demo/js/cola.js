//nodo Cola
function nodoCola(){
	this.proceso;
	this.sig;
}

/* Clase Cola */
 function Cola() {

	/* Atributos */
	this.nodoRaiz = null;
	this.nodoFondo = null;
	this.tam = 0;

	/* Metodos */
	this.Listavacia = vacia;
	this.Listainsertar = insertar;
	this.Listaatender = atender;
	this.ListagetRaiz = getRaiz;
	this.ListagetTam = getTam;
	this.ListaOrdenarPrioridad = ordenarPrioridad;
	this.ListaOrdenarTiempo = ordenarTiempo;
	this.ListaImprimir = ImprimirCola;

 }

function vacia(){
	if(this.nodoRaiz == null){

		return true;
	}
	else{
		return false;
	}
 }

 //Método insertar
 function insertar(proceso){
	var nuevo = new nodoCola();

	nuevo.proceso = proceso;
	nuevo.sig = null;

	if(this.nodoRaiz == null){
		this.nodoRaiz = nuevo;
		this.nodoFondo = nuevo;
	}
	else{
		this.nodoFondo.sig = nuevo;
		this.nodoFondo = nuevo;
	}

	this.tam++;
 }

  //Método atender
 function atender(){

	if (!this.Listavacia()){

		var aux = this.nodoRaiz;
		if(this.nodoRaiz == this.nodoFondo){

			this.nodoRaiz = null;
			this.nodoFondo = null;

		}
		else{
			this.nodoRaiz = this.nodoRaiz.sig;
		}
		return aux.proceso;
	}
	else{
		return 0;
	}

 }

 function getRaiz(){
	var aux = new nodoCola();
	aux = this.nodoRaiz;
	return aux;
 }

 function getTam(){
	return this.tam;
 }

 function ImprimirCola(){
	var aux = new nodoCola();
	aux = this.nodoRaiz;
	while(aux != null){
		console.log("hola soy yo " + aux.proceso.nombre + " mi tiempo "+ aux.proceso.tiempo);
		aux = aux.sig;
	}
}

function ordenarPrioridad()
{
	var aux1 = new nodoCola();
	var aux2 = new nodoCola();

    var procAux = new nodoProceso(0, "", 0, "");

    if(!this.Listavacia()){

    	aux1 = this.nodoRaiz;
		while( aux1.sig != null)
		{
		    aux2 = aux1.sig;

		    while( aux2 != null)
		    {
		    	console.log("aux1 prioridad "+ aux1.proceso.prioridad + " y aux2 "+aux2.proceso.prioridad);
		       	if(parseInt(aux1.proceso.prioridad) > parseInt(aux2.proceso.prioridad))
		       	{
		        	procAux = aux1.proceso;
		           	aux1.proceso = aux2.proceso;
		           	aux2.proceso = procAux;
		       	}

		       	aux2 = aux2.sig;
		    }

		    aux1 = aux1.sig;
		}
	}
}




function ordenarTiempo(){
	var aux1 = new nodoCola();
	var aux2 = new nodoCola();

    var procAux = new nodoProceso(0, "", 0, "");

    if(!this.Listavacia()){

    	aux1 = this.nodoRaiz;

		while( aux1.sig != null)
		{
			console.log("primero aqui");
		    aux2 = aux1.sig;

		    while( aux2 != null)
		    {
					console.log("entra aqui");
					if((aux1.proceso.prioridad == 2) && (aux2.proceso.prioridad=="2")){

				       	if(parseInt(aux1.proceso.tiempo) > parseInt(aux2.proceso.tiempo))
				       	{
									//alert("esta ordenando tiempo 2");
				        	procAux = aux1.proceso;
				           	aux1.proceso = aux2.proceso;
				           	aux2.proceso = procAux;
				       	}

					}

				       	aux2 = aux2.sig;




		    }

		    aux1 = aux1.sig;
		}
    }

}
