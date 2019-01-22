const EventEmitter = require('events');
class MeuEmissor extends EventEmitter{

}
const meuEmissor = new MeuEmissor();
const nomeEvento = 'usuario:click';
meuEmissor.on(nomeEvento, function(click){
    console.log('Um usuario clicou ',click);
});

/*
meuEmissor.emit(nomeEvento,'Na barra de rolagem');
meuEmissor.emit(nomeEvento,'No Ok ' );
let count = 0;
setInterval(function(){
    meuEmissor.emit(nomeEvento,'No Ok '+ (count++));
},1000);
*/

const stdin = process.openStdin();
stdin.addListener('data',function(value){
    console.log('Voce digitou :',value.toString().trim());
});