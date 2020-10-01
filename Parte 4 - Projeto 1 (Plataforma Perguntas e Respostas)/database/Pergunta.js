const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNULL: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNULL: false
    }
});

Pergunta.sync({force:false}).then(()=>{
    console.log("Tabela Criada com Sucesso!");
})

module.exports = Pergunta;