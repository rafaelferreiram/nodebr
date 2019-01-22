const {obterPessoas} = require('./service');
// {} usado para trazer apenas uma função especifica dentro o 'service'
Array.prototype.meuFilter = function(callback){
    const lista = [];
    for(index in this){
        const item = this[index];
        const resultado = callback(item,index,this);
        if(!resultado)continue;
        lista.push(item);
    }
    return lista;
}

async function main(){
    try {
        const {results} = await obterPessoas('a');
        /*
        const familiaLars = results.filter(function(item){
            //por padrao retornar um booleano / para remover ou nao da lista
            // se for false remove da lista / true mantem
            const result = item.name.toLowerCase().indexOf('lars') !== -1;
            //nao encontrou é =-1, encontrou é = a posição do array
            return result;
        });*/
        const familiaLars = results.meuFilter((item,index,lista)=> item.name.toLowerCase().indexOf('lars')!==-1);
        const names = familiaLars.map(pessoa => pessoa.name);
        console.log(names);
    } catch (error) {
        console.error('Deu erro: ',error);
    }
}
main();