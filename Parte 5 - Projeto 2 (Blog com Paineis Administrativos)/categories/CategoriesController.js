const express = require("express");
const router = express.Router();

const slugify = require("slugify");

const Category = require("./Category");

const adminAuth = require("../middlewares/adminAuth")


//Rotas 

router.get("/categories", adminAuth, (req, res) => {
    res.redirect("admin/categories")
});



router.get("/admin/categories/new", adminAuth, (req, res) => {
    res.render("admin/categories/new.ejs")
});


router.post("/categories/save", adminAuth, (req, res) => {

    var Title = req.body.title;

    if (Title != undefined) {
        Category.create({
            title: Title,
            slug: slugify(Title) //tranforma em slug => "Desenvolvimento Web" => "desenvolvimento-web"   
        }).then(() => {
            res.redirect("/admin/categories");
        })
    } else {
        res.redirect("/admin/categories");
    }
});


router.get("/admin/categories", adminAuth, (req, res) => {  //Rota padrão das categorias
    Category.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then(categories => {
        res.render("admin/categories/index.ejs", {
            categories: categories
        })
    });
});

router.post("/categories/delete", adminAuth, (req, res) => {
    var id = req.body.id;
    Category.findOne({
        where: { id: id }
    }).then(() => {
        if (id != undefined) {
            if (!isNaN(id)) { // id é um número
                Category.destroy({
                    where: { id: id }
                }).then(() => {
                    res.redirect("/admin/categories")
                });
            } else { //id não é numérico => redirecionar
                res.redirect("/admin/categories")
            }
        }
        else {  //ID É NULO => redirecionar
            res.redirect("/admin/categories")
        }
    });
});



router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        res.redirect("/admin/categories");
    }
    else {
        Category.findByPk(id)
            .then((category) => {
                if (category != undefined) {
                    res.render("admin/categories/edit", {
                        category: category
                    });
                }
                else {
                    res.redirect("/admin/categories");
                }
            }).catch(error => {
                res.redirect("/admin/categories");
            })
    }
});

router.post("/categories/update", adminAuth, (req, res) => {

    var Title = req.body.title;
    var Id = req.body.id;

    Category.update({
        title: Title,
        slug: slugify(Title)
    }, {
        where: {
            id: Id
        }
    }).then(() => {
        res.redirect("/admin/categories");
    })

});


module.exports = router;

