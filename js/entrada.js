class Entrada extends Dato{
    static numeroDeEntradas =0;
    constructor(descripcion,valor){
        super(descripcion,valor)
        this._id = ++Entrada.numeroDeEntradas;
    }
    get id(){
        return this._id;
    }
}