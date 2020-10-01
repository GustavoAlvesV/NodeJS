function pegarId(){
    return new Promise((resolve, reject) => {
        setTimeout( ()=>{
            resolve(5);
        }, 1500)
    })
}

function buscarEmailBanco(id){
    return new Promise((resolve, reject) => {
        setTimeout( ()=>{
            resolve("gustavoalves.v@hotmail.com");
        }, 2000)
    })
}

function enviarEmail(corpo, para){
    return new Promise((resolve, reject) => {
        setTimeout( ()=>{
            var deuErro = true;  //define se promessa será ou não cumprida
            if(!deuErro){
                resolve({ time: 6, to: "Gustavo"});  //promessa Ok!
            }
            else{
                reject("Fila cheia");   // Promessa não cumprida
            }
        }, 2000)
    });
}

//Promisse Aninhadas ou Promisse HELL, ou seja, estou chamando uma promisse dentro da outra.
// é uma jeito de deixa o código mais síncrono.
//Dá muito problema
//Aplicação fica uma bagunça quando tenho muitas promises aninhadas.
//Evitar ao máximo colocar uma promise dentro da outra.
pegarId().then((id) => {
    buscarEmailBanco(id).then((email) => {
        enviarEmail("Olá, tudo bem?", email).then(() => {
            console.log("Email enviado com sucesso, para usuário com id: " + id);
        }).catch((error) => {
            console.log(error)
        })
    })
})


