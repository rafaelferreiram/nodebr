const service = require('./service');
Array.prototype.meuMap = function(callback){
    const novoArrayMapeado = [];
    for(let i = 0; i< this.length;i++){
        const resultado = callback(this[i],i);
        novoArrayMapeado.push(resultado);
    }
    return novoArrayMapeado;
}

async function main(){
    try {
       const results = await service.obterPessoas('a');
       const names = results.results.meuMap(function(pessoa,indice){
           return pessoa.name;
       })
       console.log(names);
    } catch (error) {
        console.log('Deu erro: ',error);
    }
}
main();