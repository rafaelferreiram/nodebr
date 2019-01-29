const commander = require('commander');
const service = require('./service');
const Personagem = require('./personagem');

async function main(){
    commander.version('V-1.0')
    .option('-n, --nome [value]', "Nome para buscar")
    .option('-b, --buscar ', "Buscar dados")
    .parse(process.argv);
    const personagemBuscar = new Personagem(commander);
    try {
        if(commander.buscar){
            const result = await service.getNames(personagemBuscar.nome);
            console.log(result);
            return;
        }
    } catch (error) {
        console.error('Deu problema -> ',error);
    }
}
main();