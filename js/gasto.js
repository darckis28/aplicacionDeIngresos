class Gasto extends Dato{
    static numeroDeGastos =0;
    constructor(descripcion,valor){
        super(descripcion,valor)
        this._id = ++Gasto.numeroDeGastos;
    }
    get id(){
        return this._id;
    }
}