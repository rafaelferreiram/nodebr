let counter = 0;

var interval = setInterval(function(){ 
    counter++;
    console.log(counter+" | "+  Date.now());
}, 0);