//Para evitar o promise HELL foi criada uma funcionalidade, no ES7, ASYNC/AWAIT
//Com ASYNC/AWAIT vocÊ elimina necessidade de colocar uma promise dentro da outra.
//Forma diferente de trabalhar com Promise.
//Forma de escreve o código com Promise só que sem o 'then' e o 'catch'.
//obs: nem sempre vai da para usar ASYNC/AWAIT, ele é mais utilizado quando você tem que receber dados.

const { Console } = require("console");

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
                resolve({ time: 6, to: "Gustavo" });  //promessa Ok!
            }
            else {
                reject("Fila cheia");   // Promessa não cumprida
            }
        }, 2000)
    });
}

function pegarUsuarios() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { name: "Gustavo", lang: "JS" },
                { name: "Alves", lang: "C#" },
                { name: "Vasconcelos", lang: "Java" }
            ])
        }, 3000)
    })
}

//Esse modo de pegar dados que gera o promise hell:
/*
pegarUsuarios().then( (usuarios) => {
    console.log(usuarios);
})
*/
//Ambos são equivalentes.       
//Como solucionar: Await.
//Mas para trabalhar com await, você deve trabalhar dentro de uma função especial async, como podemos ver abaixo:

async function principal() {
    var usuarios = await pegarUsuarios();
    console.log(usuarios);
    console.log("Olá!");
}

//AWAIT bloqueia fluxo do programa, então não da para usar AWAIT em tudo.
//Então não usar AWIT em funções que demoram demais.

principal();

 