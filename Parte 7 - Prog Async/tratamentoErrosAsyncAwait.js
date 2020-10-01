//catch e mecanismo de lidar com erro pra promise
//Como tratamoas erro de ASYNC/AWAIT??
//Resposta:  estrutura => try{}catch{}

function pegarId() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(5);
        }, 1500)
    })
}

function buscarEmailBanco(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("gustavoalves.v@hotmail.com");
        }, 2000)
    })
}

function enviarEmail(corpo, para) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var deuErro = true;  //define se promessa será ou não cumprida
            if (!deuErro) {
                resolve({ time: 6, to: para });  //promessa Ok!
            }
            else {
                reject("Fila cheia");   // Promessa não cumprida
            }
        }, 2000)
    });
}


async function principal() {
    var id = await pegarId();
    var email = await buscarEmailBanco(id);
    try {
        await enviarEmail("Olá, tudo bem?", email)
        console.log("email enviado com sucesso");
    }
    catch(erro){
        console.log(erro);
    }
}


principal();