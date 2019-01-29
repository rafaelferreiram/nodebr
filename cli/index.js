const commander = require('commander');
const database = require('./database');
const Heroi = require('./heroi');
async function main(){
    commander.version('V1.0')
    .option('-n , --nome [value]',"Nome do Heroi")
    .option('-p, --poder [value]',"Poder do Heroi")
    .option('-i, --id [value]',"Poder do Heroi")

    .option('-c , --cadastrar',"Cadastrar um Heroi")
    .option('-l , --listar',"Listar um Heroi")
    .option('-r , --remover ',"Remover um Heroi")
    .option('-a , --atualizar [value]',"Atualizar um Heroi")
    .parse(process.argv);
    
    const heroi = new Heroi(commander);
    
    try {
        if(commander.cadastrar){
            delete heroi.id;
            const resultado = await database.cadastrar(heroi);
            if(!resultado){
                console.error('Heroi não foi cadastrado ! ');
                return;
            }
            console.log('Heroi cadastrado com sucesso !');
        }
        if(commander.listar){
            const resultado = await database.listar();
            console.log(resultado);
            return;
        }
        if(commander.remover){
            const resultado = await database.remover(heroi.id);
            if(!resultado){
                console.error('Não foi possivel remover o Heroi');
                return;
            }
            console.log('Heroi removido com sucesso');
        }
        if(commander.atualizar){
            const idAtualizar = parseInt(commander.atualizar);
            //delete heroi.id;
            const dado = JSON.stringify(heroi);
            const heroiAtualizar = JSON.parse(dado);
            const resultado = await database.atualizar(idAtualizar,heroiAtualizar);
            if(!resultado){
                console.error('Não foi possivel atualizar o heroi');
                return;
            }
            console.log('Heroi atualizado com sucesso');
        }
    } catch (error) {
        console.error('Deu ruim : ',error);
    }
}
main();