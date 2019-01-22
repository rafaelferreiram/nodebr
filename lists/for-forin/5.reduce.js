const {obterPessoas} = require('./service');

Array.prototype.meuReduce = function(callback,valorInicial){
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0];
    for(let i = 0 ; i< this.length ; i++){
        valorFinal = callback(valorFinal,this[i],this);
    }
    return valorFinal;
}

async function main(){
    try {
        
        const {results} = await obterPessoas('a');
        const pesos = results.map(item => parseInt(item.height));
        console.log('Peso :',pesos);
        /*
        const total = pesos.reduce((anterior,proximo)=>{
            return anterior + proximo;
        },0);
        */
        const minhaLista = [
            ['Rafael','Ferreira'],
            ['Palmeiras','Brasil']
        ]
        const total = minhaLista.meuReduce((anterior,proximo) => {
            return anterior.concat(proximo);
        },[])
            .join(' , ');
        console.log('Total :',total);
    } catch (error) {
        console.error('Deu ruim: ',error);
    }
}
main();