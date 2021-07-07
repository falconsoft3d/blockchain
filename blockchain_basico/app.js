const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(timestamp, data, hashPrevio=''){
        this.timestamp = timestamp
        this.data = data
        this.hashPrevio = hashPrevio
        this.hash = this.calcularHash()
    }

calcularHash(){
    return SHA256(this.timestamp + this.hashPrevio + JSON.stringify(this.data)).toString()
}

}

class BlockChain {
    constructor(){
        this.chain = [this.crearBloqueGenesis()]
    }

    crearBloqueGenesis(){
        return new Block('01/01/2021', 'Bloque Genesis', '0')
    }
    
    getUltimoBloque() {
        return this.chain[this.chain.length - 1]
    }
    
    agregarBloque(nuevoBloque) { 
        nuevoBloque.hashPrevio = this.getUltimoBloque().hash;
        nuevoBloque.hash = nuevoBloque.calcularHash();
        this.chain.push(nuevoBloque);
    }
}



let cutreCoin = new BlockChain()
cutreCoin.agregarBloque(new Block('01/07/2021'), { cantidad:10 });
cutreCoin.agregarBloque(new Block('02/07/2021'), { cantidad:40 });
cutreCoin.agregarBloque(new Block('07/07/2021'), { cantidad:1 });

console.log(JSON.stringify(cutreCoin, null, 4))