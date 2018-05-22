//alert (":v")
(function (){

    function Main() {}

    function SuperCola() {
        var Node = function(id, nombre, Time){
            this.id= id;
            this.nombre = nombre;
            this.Time= Time;
            this.next = null;
            this.timeFaltante=Time;
        };

        var listSize = 0;
        var headNode = null;
        var quantum=5;

        this.add = add;
        this.removeFrom = removeFrom;
        this.indexOf = indexOf;
        this.hasElements = hasElements;
        this.size = size;
        this.toString = toString;
        this.headNode=headNode;
        this.quantum=quantum;
        this.datos=datos;




        function add(id, nombre, Time) {
            var node = new Node(id, nombre, Time);
            var currentNode;

            // Verificamos si es el primer nodo en la lista
            if (!headNode) {
                headNode = node;
            } else {
                currentNode = headNode;

                // Este ciclo se ejecuta hasta que llegue al último elemento
                while (currentNode.next) {
                    currentNode = currentNode.next;
                }

                // Obtenemos el último elemento y lo asigamos a next para crear el enlace
                currentNode.next = node;
            }

            // Incrementamos el tamaño de la lista
            listSize++;
        }

        function removeFrom(pos) {
            // Verificamos que la posición exista
            if (pos > -1 && pos < listSize) {
                var currentNode = headNode;
                var previousNode;
                var index = 0;

                // Si pos 0, entonces eliminaremos el primer elemento.
                if (pos === 0) {
                    headNode = currentNode.next;
                } else {
                    while (index++ < pos) {
                        // Mandamos el nodo actual a previous
                        previousNode = currentNode;

                        // Ahora el actual será el next
                        currentNode = currentNode.next;
                    }

                    // Enlazamos el next de previous con el next del nodo actual (lo saltamos para eliminarlo)
                    previousNode.next = currentNode.next;
                }

                // Restamos el elemento eliminado de la lista
                listSize--;

                // Retornamos el valor del elemento eliminado
                return currentNode.element;
            }

            // Si la posición esta fuera de rangos regresamos null
            return null;
        }

        function indexOf(element) {
            var currentNode = headNode;
            var index = 0;

            while (currentNode) {
                if (currentNode.element === element) {
                    return index;
                }

                index++;
                currentNode = currentNode.next;
            }

            return -1;
        }

        function hasElements() {
            return listSize > 0;
        }

        function size() {
            return listSize;
        }

        function toString() {
            var currentNode = headNode;
            var str = '';

                str += currentNode.nombre;


            return [currentNode.nombre];
        }


        function datos() {
          currentNode= headNode;
          return currentNode;
        }

  }


//prueba adiciones

//var ZonaCritica= new SuperCola();
//var Listo= new SuperCola();
//var Suspendido= new SuperCola();
//var Bloqueado = new SuperCola();
//ZonaCritica.add(01,"proceso 1",10)
//ZonaCritica.add(01,"proceso 1",10)
//console.log('Imprime los elementos', ZonaCritica.toString());

//ZonaCritica.ejecucion();
Main.prototype.ejecutar = function() {
    console.log("prueba 1");
    var ZonaCritica= new SuperCola();
    var Suspendido= new SuperCola();
    console.log(ZonaCritica.size());
    ZonaCritica.add(01,"proceso 1",10);
    ZonaCritica.add(02,"proceso2",20);

    console.log(ZonaCritica.size());
    //ZonaCritica.ejecucion();
    var NodoActual=ZonaCritica.datos();
    console.log((NodoActual!=null)==true);
    ejecucionProcesos(NodoActual);


    function ejecucionProcesos(NodoActual){
      NodoUsado=NodoActual;
      console.log(NodoUsado);
      console.log(!NodoUsado);
      console.log((NodoUsado==null)==true);
//for(var i =0 ; i<ZonaCritica.size(); i++){
      if((NodoUsado==null)==true){
        console.log("entro");
      }

        else{
    //while((NodoActual!=null)==true){
              var n=0;
              setInterval(function () {
                if( ZonaCritica.quantum<NodoUsado.Time){
                  if (n<ZonaCritica.quantum){
                  console.log("por quantum ","nombre del proceso : ", NodoUsado.nombre, n);
                  n++
                  }

                }
          /*      if((n>=ZonaCritica.quantum)){
                  console.log("entro al false");
                  ejecucionProcesos(NodoUsado.next);
                  if((NodoUsado.next!=null)==true){
                          console.log("entra");
                          n=0;
                          ejecucionProcesos(NodoUsado.next);
                    }*/

              //  else{
              //      if(n<NodoUsado.Time){
                //      console.log("nombre del proceso : ", NodoUsado.nombre, n);
                  //    n++
                    //}
                  //}
                },1000);
                  if((NodoUsado.next==null) ){
                    console.log("entra");
                  ejecucionProcesos(NodoUsado.next);
                }
              }
          }









};





var main = new Main();
main.ejecutar();


})();

//-------------------------------------------------------------------------------

/*

console.log('¿Tiene elementos?', ZonaCritica.hasElements());
ZonaCritica.add(01,"proceso1",100);
ZonaCritica.add(02,"proceso2",50);
ZonaCritica.add(03,"proceso3",200)
console.log("tamaño cola", ZonaCritica.size());
console.log('Imprime los elementos', ZonaCritica.toString());
ZonaCritica.removeFrom(0);
console.log("tamaño cola", ZonaCritica.size());
console.log('Imprime los elementos', ZonaCritica.toString());
*/
