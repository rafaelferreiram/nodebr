const service = require('./service');

async function main(){
    try {
        const result = await service.obterPessoas('a');
        const names = [];
        
        console.time('for');
        for(var i = 0 ; i <result.results.length ; i++){
            const pessoa = result.results[i];
            names.push(pessoa.name);
        }
        console.timeEnd('for');
        console.log(names);
        
       console.time('forin');
        for(let i in result.results){
            const pessoa = result.results[i];
            names.push(pessoa.name);
        }
        console.timeEnd('forin');
        console.log(names);
        
       console.time('forof');
       for(pessoa of result.results){
           names.push(pessoa.name);
       }
       console.timeEnd('forof');
       console.log(names);
    } catch (error) {
        console.error('erro interno: ',error);
    }
}
main();