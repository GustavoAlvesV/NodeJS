const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var DB = {
    games: [
        {
            id: 23,
            name: "Call of duty MW",
            year: 2019,
            price: 60
        },
        {
            id: 65,
            name: "Sea of thieves",
            year: 2018,
            price: 40
        },
        {
            id: 2,
            name: "Minecraft",
            year: 2012,
            price: 20
        }
    ]
}

//Listagem geral dos games
app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
})

//Listagem única de game
app.get("/game/:id", (req, res) => {

    if (isNaN(req.params.id)) {   //SE id não for um número
        res.sendStatus(400);
    }
    else {  //Se id for um Número
        var id = parseInt(req.params.id);  // id era um texto
        var game = DB.games.find(g => g.id == id);

        if (game != undefined) {
            res.statusCode = 200;
            res.json(game);
        } else {
            res.sendStatus(404);
        }
    }

})

app.post("/game", (req, res) => {
    var { title, price, year } = req.body;
    DB.games.push({
        id: 2323,
        title,
        price,
        year
    });
    res.sendStatus(200);
})


app.delete("/game/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);
        if (index == -1) {
            res.sendStatus(404);
        } else {
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
});

app.put("/game/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);
        if (game != undefined) {
            var { title, price, year } = req.body;
            if (title != undefined) {
                game.title = title;
            }
            if (price != undefined) {
                game.price = price;
            }
            if (year != undefined) {
                game.year = year;
            }
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }

});

app.listen(45678, () => {
    console.log("API rodando");
})