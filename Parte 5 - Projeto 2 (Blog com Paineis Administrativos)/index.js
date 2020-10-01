const express = require("express");  //Carrega modulo do express.
const app = express();              // Cria instância do express.
const session = require("express-session");
const bodyParser = require("body-parser"); //Carrega o body parser
const connection = require("./database/database");



//Controllers
const categoriesController = require("./categories/CategoriesController"); //importando as rotas de categoria
const articlesController = require("./articles/ArticlesController"); //importando as rotas de artigos
const usersController = require("./users/UsersController"); //importando as rotas do usuario



//Models
const Category = require("./categories/Category");
const Article = require("./articles/Article");
const User = require("./users/User");




//Configuração Rotas
app.set('view engine', 'EJS'); // Configuração para poder utilizar rotas.




//Configurar Sessoes
app.use(session({
    secret: "qualquercoisa",   //palavra qualquer para aumenta segurança das sua sessões.
    cookie: { maxAge: 30000000}   // forma como cookie vai ser salvo no navegador do usuario
}));                                //sessao precisa do cookie para funcionar, a sessao trabalha com o cookie de identificação
                                    // Dados usuario e salvo servidor, e é criado um cookie no navegador
                                //Cookie tem habilidade de expirar, e aqui agente pode setar tempo de expiração
                                        // sessao tem "historias" => onde sessão vai ficar salva no sistema, por padrão, o express-session
                                        // salva suas sessões na memoria ram do servidor.
                                        // No entando, em sistemas de médio e grande porte, não é legal salva sessao na memoria ram do servidor,
                                        // memoria vai estourar pq esses sistemas tem grande numero de requisições.
                                        //Como resolve isso: Mudando storage do express-session.
                                        //Tem como utilizar um storge com um bando de dados chamado "Redis"
                                        // Redis => BD FOCADO EM SALVAMENTO DE SESSOES e CACHE.



//Express trabalhar com arquivos estáticos
app.use(express.static('public')); // Linha de configuração para usar arquivos estáticos. Ou seja, bibliotecas.


//Body parser => Para trabalhar com formulários.   
app.use(bodyParser.urlencoded({ extended: false }));  // lInk body-parser no express.
app.use(bodyParser.json()); // Permite leitura de formularios enviados via JSON.




//Database => Conexão com o banco de dados
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    })
    .catch((error) => {
        console.log(error);
    })



//Rotas

app.use("/", categoriesController);  //Adicionando as rotas de categoria
app.use("/", articlesController);  //Adicionando as rotas de artigos
app.use("/", usersController);  //Adicionando as rotas de usuarios


app.get("/session", (req,res) => {
    req.session.treinamento = "Formação Node.js";
    req.session.ano = 2020;
    req.session.user = {
        username: "GustavoA",
        email: "email@email.com",
        id: 10
    }
    res.send("Sessão Gerada");
})


app.get("/leitura", (req,res) => {
    res.json({
        treinamento: req.session.treinamento,
        ano: req.session.ano,
        user: req.session.user
    });
})


app.get("/", (req, res) => {

    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index.ejs", {
                articles: articles, categories: categories
            });
        })
    });
})


app.get("/:slug", (req, res) => {
    var slug = req.params.slug;

    Article.findOne({
        where: { slug: slug }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", { article: article, categories: categories });
            })
        } else {
            res.redirect("/");
        }
    })
})


app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;

    Category.findOne({
        where: {
            slug: slug
        },
        include: [{ model: Article }]
    }).then(category => {
        if (category != undefined) {
            Category.findAll().then(categories => {
                res.render("index", { articles: category.articles, categories: categories });
            })
        } else {
            res.redirect("/");
        }
    })
})


//Inicialização do servidor express
app.listen(8090, error => {
    if (error) {
        console.log("Deu ERRRO!");
    } else {
        console.log("Server Ok!");
    }
})