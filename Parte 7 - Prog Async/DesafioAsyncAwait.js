function pegarId() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(5);
        }, 2000)
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
            var deuErro = false;  //define se promessa será ou não cumprida
            if (!deuErro) {
                resolve({ time: 6, to: para });  //promessa Ok!
            }
            else {
                reject("Fila cheia");   // Promessa não cumprida
            }
        }, 2000)
    });
}

/*
pegarId().then((id) => {
    buscarEmailBanco(id).then((email) => {
        enviarEmail("Olá, tudo bem?", email).then(() => {
            console.log("Email enviado com sucesso, para usuário com id: " + id);
        }).catch((error) => {
            console.log(error)
        })
    })
})
*/

async function principal() {
    var id = await pegarId();
    var email = await buscarEmailBanco(id);
    enviarEmail("Olá, tudo bem?", email).then(() => {
        console.log("Email enviado com sucesso, para usuário com id: " + id);
    }).catch((error) => {
        console.log(error)
    })
    console.log("Terminou")
}


principal();