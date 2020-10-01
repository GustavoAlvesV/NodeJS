function enviarEmail(corpo, para) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var deuErro = false;  //define se promessa será ou não cumprida
            if (!deuErro) {
                resolve({ time: 6, to: "Gustavo" });  //promessa Ok!
            }
            else {
                reject("Fila cheia");   // Promessa não cumprida
            }
        }, 2000)
    });
}

enviarEmail("Olá Mundo", "teste").then(({ time, to }) => {
    console.log(`Email enviado com sucesso. 
        Tempo: ${time} ---- Para: ${to}`);
}).catch((erro) => {
        console.log("Deu Errro: " + erro);
    })