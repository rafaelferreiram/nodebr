const {deepEqual,ok} = require('assert');
const database = require('./database');

const DEFAULT_ITEM = {
    nome:'Flash',
    poder: 'Speed',
    id: 1
}
const DEFAULT_ITEM_ATUALIZAR = {
    nome:'Lanterna Verde',
    poder:'Energia do Anel',
    id:2
}

describe('Suite de manipulação de Herois',() =>{
    before(async()=>{
        await database.cadastrar(DEFAULT_ITEM);
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
    })
     it('Deve pesquisar um heroi, usando arquivos', async ()=> {
        const expected = DEFAULT_ITEM;
        const [resultado] = await database.listar(expected.id);
        //O [] foi usado pra pegar somente a primeira posição do array que a função listar() retorna. O uso do [] é chamado de Destructor
        deepEqual(resultado,expected);
     });
   
     it('Deve cadastrar um heroi, usando arquivos', async ()=> {
        const expected = DEFAULT_ITEM;
        const resultado = await database.cadastrar(DEFAULT_ITEM);
        const [actual] = await database.listar(DEFAULT_ITEM.id);
        deepEqual(actual,expected);
    });

    it('Deve remover heroi por ID', async ()=> {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM.id);
        deepEqual(resultado,expected);
    });

    it('Deve atualizar heroi por ID', async ()=> {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome:'Batman',
            poder:'Dinheiro'
        };
        const novoDado = {
            nome:'Batman',
            poder:'Dinheiro'
        };
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado);
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);
        deepEqual(resultado,expected);

    });

})