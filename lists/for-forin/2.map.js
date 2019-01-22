const service = require('./service');

async function main(){
    try {
        const results = await service.obterPessoas('a');
        /*const names = results.results.map(function(pessoa){
            return pessoa.name;
        }) 
        essa função pode ser feita em uma linha apenas
        */
        const names = results.results.map(pessoa => pessoa.name); 
        // O => (arrow function) é usado para dizer que 'pessoa' é uma função onde irá retorna apenas o pessoa.name
        console.log(names);
    } catch (error) {
        console.error('Deu erro: ',error);
    }
}
main();