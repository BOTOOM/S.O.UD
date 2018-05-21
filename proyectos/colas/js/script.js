//alert (":v")
function SuperCola() {
    var Node = function(id, nombre, Time){
        this.id= id;
        this.nombre = nombre;
        this.Time= Time;
        this.quantum=0;
        this.next = null;
    };

    var listSize = 0;
    var headNode = null;

    this.add = add;
    this.removeFrom = removeFrom;
    this.indexOf = indexOf;
    this.hasElements = hasElements;
    this.size = size;
    this.toString = toString;
    this.headNode=headNode;
    this.ejecucion=ejecucion;

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
        var str = '|';

        while (currentNode) {
            str += currentNode.nombre + '|';
            currentNode = currentNode.next;
        }

        return str;
    }

    function ejecucion(){
        var currentNode = headNode;
        var n=0;
        setInterval(function () {
          if(n<currentNode.Time){
            console.log("nombre del proceso : ", currentNode.nombre, n);
            n++
          }
        },1000);

    }


}


//-------------------------------------------------------------------------------




var ZonaCritica= new SuperCola();
var Listo= new SuperCola();
var Suspendido= new SuperCola();
var Bloqueado = new SuperCola();
ZonaCritica.add(01,"proceso 1",10)
console.log('Imprime los elementos', ZonaCritica.toString());

ZonaCritica.ejecucion();

//ejecucion(ZonaCritica.headNode);


/*
var ZonaCritica = new ZonaCritica();

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
