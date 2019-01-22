const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){
    //quando der problema, chama o reject
    //quando for sucesso chama o resolve
    return new Promise(function resolvePromisse(resolve,reject){

        setTimeout(function(){
            return resolve({
                id:1,
                nome:'Aladin',
                dataNascimento: new Date()
            })
        },1000);

    })
}

function obterTelefone(id){
    return new Promise(function resolvePromisse(resolve,reject){
        setTimeout(()=>{
            return resolve ({
                telefone:'1199002',
                ddd:'011'
            })
        },2000);
    })
}

function obterEndereco(id,callback){
    setTimeout(()=>{
        return callback(null,{
            rua:'Dos Bobos',
            numero:0
        })
    },2000);
}
const usuarioPromisse = obterUsuario();
usuarioPromisse
    .then(function(usuario){
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
            return{
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then(function(resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id);
        return endereco.then(function resolverEndereco(result){
            return{
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        });
    })
    .then(function (resultado){
        console.log('Resultado: ',resultado);
    }).catch(function (error){
        console.error('Deu RUIM',error);
    });
// para sucesso, usa o .then() 
// para erros, usa o .catch()

// obterUsuario(function resolverUsuario(error,usuario){
//     if(error){
//         console.error('Deu ruim no USUARIO: ',error);
//         return;
//     }
//     obterTelefone(usuario.id,function resolverTelefone(error1,telefone){
//         if(error1){
//             console.error('Deu ruim no TELEFONE: ',error1);
//             return;
//         }
//         obterEndereco(usuario.id,function resolverEndereco(error2,endereco){
//             if(error2){
//                 console.error('Deu ruim no ENDERECO',error2);
//                 return;
//             }
//             console.log(`Nome: ${usuario.nome},
//             Endereco: ${endereco.rua} - ${endereco.numero},
//             Telefone:${telefone.telefone}`);
//         })
//     });
// });
//const telefone = obterTelefone(usuario.id);
//console.log(telefone);