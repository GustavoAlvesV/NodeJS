const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = require("../categories/Category")

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    body: {
        type: Sequelize.TEXT,
        allowNull:false
    }
})

Category.hasMany(Article); //Estou dizendo que: UMA categoria tem MUITOS artigos

Article.belongsTo(Category);  // Estou dizendo que:  UM artigo pertence a uma categoria.

//Article.sync({force:true});  => Cria tabela sempre que executar o programa. 

module.exports = Article;



