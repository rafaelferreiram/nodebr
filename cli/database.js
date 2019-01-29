const {readFile,writeFile} = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(readFile); // convertermos uma função para Promisse
const writeFileAsync = promisify(writeFile); // convertermos uma função para Promisse

class Database{
    
    constructor(){
        this.NOME_ARQUIVO = 'herois.json'
    }
    // usa-se o asyn/await somente quando precisa manipular o resultado, no caso converstendo para um JSON
    async obterDadosArquivo(){
        const arquivo = await readFileAsync(this.NOME_ARQUIVO,'utf8');
        //outra maneira de fazer a leitura do JSON -> const arquivo = require('./herois.json')
        return JSON.parse(arquivo.toString());
    }

    async escreverArquivo(dados){  
        await writeFileAsync(this.NOME_ARQUIVO,JSON.stringify(dados));
        return true;
    }

    async cadastrar(heroi){
        const dados = await this.obterDadosArquivo();
        const id = heroi.id <= 2 ? heroi.id : Date.now();
        /*
            {
                nome:'Flash',
                poder: 'Velocidade'
            }
            {
                id:1123 
            }
            {
                nome:'Flash',
                poder: 'Velocidade',
                id:1123 
            }
        */
       const heroiComId = {
           id,
           ...heroi
       }
       const dadosFinal =[
           ...dados,
           heroiComId
       ]
       /*
        [
            {
                nome: Flash
            }
        ]
        [
            {
                nome: Batman
            }
        ]
        [
            {
                nome: Flash
            },
            {
                nome: Batman
            },
        ]
       */
       const resultado = await this.escreverArquivo(dadosFinal);
       return resultado;
    }

    async remover(id){
        if(!id){
            return await this.escreverArquivo([]);
        }
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item => item.id === parseInt(id));
        if (indice === -1){
            throw Error('Usuario informado não existe');
        }
        dados.splice(indice,1);
        return await this.escreverArquivo(dados);
    }
    
    async atualizar(id, modificacoes){
        const dados = await this.obterDadosArquivo();
        const indice = dados.findIndex(item => item.id === parseInt(id));
        if(indice === -1){
            throw Error('Herói informado não existe');
        }
        const atual = dados[indice];
        const objetoAtualizar = {
            ...atual,
            ...modificacoes
        }
        dados.splice(indice,1);
        
        return await this.escreverArquivo([
            ...dados,
            objetoAtualizar
        ]);
    }
    async listar(id){
        const dados = await this.obterDadosArquivo();
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id ): true));
        return dadosFiltrados;
    }

}

module.exports = new Database();