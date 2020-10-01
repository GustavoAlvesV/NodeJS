const express = require("express");
const router = express.Router();

const Category = require("../categories/Category");
const Article = require("./Article");

const slugify = require("slugify");

const adminAuth = require("../middlewares/adminAuth")



router.get("/admin/articles/new", adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new.ejs", { categories: categories })
    })
});

router.post("/articles/save", adminAuth, (req, res) => {
    var Title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    if (Title != undefined) {
        Article.create({
            title: Title,
            slug: slugify(Title), //tranforma em slug => "Desenvolvimento Web" => "desenvolvimento-web"   
            body: body,
            categoryId: category
        }).then(() => {
            res.redirect("/admin/articles");
        })
    } else {
        res.redirect("/admin/articles");
    }
});





router.get("/admin/articles", adminAuth, (req, res) => {
    Article.findAll({
        include: [{ model: Category }]   //Incluindo na minha busca o model category  - Os dados da categoria vem juntos - ele trás a junção das tableas
    }).then(articles => {
        res.render("admin/articles/index.ejs", { articles: articles })
    })
});



router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    Article.findOne({
        where: { id: id }
    }).then(() => {
        if (id != undefined) {
            if (!isNaN(id)) { // id é um número
                Article.destroy({
                    where: { id: id }
                }).then(() => {
                    res.redirect("/admin/articles")
                });
            } else { //id não é numérico => redirecionar
                res.redirect("/admin/articles")
            }
        }
        else {  //ID É NULO => redirecionar
            res.redirect("/admin/articles")
        }
    });
});

router.get("/admin/articles/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        res.redirect("/admin/articles");
    }
    else {
        Category.findAll().then(categories => {
            Article.findOne({ where: { id: id }, include: [{ model: Category }] })
                .then((article) => {
                    if (article != undefined) {
                        res.render("admin/articles/edit", {
                            article: article,
                            categories: categories
                        });
                    }
                    else {
                        res.redirect("/admin/articles");
                    }
                }).catch(error => {
                    res.redirect("/admin/articles");
                })
        });

    }
});



router.post("/articles/update", adminAuth, (req, res) => {

    var Title = req.body.title;
    var Id = req.body.id;
    var category = req.body.category;
    var body = req.body.body;

    Article.update({
        title: Title,
        slug: slugify(Title),
        categoryId: category,
        body: body
    }, {
        where: {
            id: Id
        }
    }).then(() => {
        res.redirect("/admin/articles");
    }).catch(err => {
        res.redirect("/admin/articles")
    });

});

router.get("/articles/page/:num", adminAuth, (req, res) => {
    var page = req.params.num;  //numero da página
    var offset = 0;

    if (isNaN(page) || page == 1) {
        offset = 0;
    } else {
        offset = (parseInt(page) - 1) * 4;
    }

    //Qundo trabalho cm função 'findandCountAll' ele retorna duas coisas:
    //Count (quantidade de artigos) e Rows (que são os artigos em si)

    Article.findAndCountAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4,  //limite de dados
        offset: offset,  // Retorna os artigos a partir daquele valor.
    }).then(articles => {
        var next;  //  Variável vai mostrar se existe uma outra página

        if (offset + 4 >= articles.count) {   //Verifica se existe uma nova página ou não
            next = false;
        } else {
            next = true;
        }

        var result = {
            page: parseInt(page),  // Número da página que estou no momento
            next: next,
            articles: articles
        }

        Category.findAll().then(categories => {     // Por causa do navbar
            res.render("admin/articles/page", { result: result, categories: categories }) //Estou passando result e dentro dele artigo, entao no html vou usar js com resulta e não articles
        });
    })


});

module.exports = router;