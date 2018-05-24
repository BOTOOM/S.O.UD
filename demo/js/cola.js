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
