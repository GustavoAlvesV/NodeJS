//Com progrmaação assync: Node e assync, ou seja,
// No exemplo abaixo, o node chama todos os consoles junto com a função.
// A função enviaremail não bloqueia.


function enviaremail(corpo, para, callback) {
    setTimeout(() => {
        var erro = true;
        if(erro){
            callback("Deu erro no envio do email");
        }else{
            callback();
        }
    }, 3000)
}

console.log("Inicio de envio de email");
enviaremail("Oi, seja bem vindo", "todos@todos.com", (error) => {
    if(error == undefined){
        console.log("Tudo Ok!");
    }
    else{
        console.log(error);
    }
});




