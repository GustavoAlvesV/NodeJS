var express = require("express");
var app = express();
var session = require("express-session");
var flash = require("express-flash");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");  //Necessário para que a flash funcione

//Ativa o cookie-Parser, tem que ser antes de ativas sessão
app.use(cookieParser("shauhushas"));

app.set('view engine','ejs');
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
//Flash e session serve para persistir informções entre rotas.
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000}  //tempo maximo de vida do cookie
  }))
  
app.use(flash());
 
app.get("/", (req,res)=>{

    var emailError = req.flash("emailError");
    var pontosError = req.flash("pontosError");
    var nomeError = req.flash("nomeError");

    var email = req.flash("email");
    var pontos = req.flash("pontos");
    var nome = req.flash("nome");
    

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    pontosError = (pontosError == undefined || pontosError.length == 0) ? undefined : pontosError;
    nomeError = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError;

    res.render("index", {emailError, pontosError, nomeError, email, nome, pontos});
});

app.post("/form", (req,res)=>{
    var {email, nome,pontos} = req.body;
    var emailError;
    var pontosError;
    var nomeError;
 
    if(email == undefined || email == ""){
        emailError="O email não pode ser vazio";
    }
 
    if(pontos == undefined || pontos < 20){
        pontosError = "Você não pode ter menos do que 20 pontos";
    }
 
    if(nome == undefined || nome == ""){
        nomeError = "O nome não pode ser vazio";
    }
 
    if(emailError != undefined || pontosError != undefined || nomeError != undefined){
        req.flash("emailError", emailError);
        req.flash("pontosError", pontosError);
        req.flash("nomeError", nomeError);


        req.flash("email", email);
        req.flash("pontos", pontos);
        req.flash("nome", nome);

        res.redirect("/");
    }else{
        res.send("Show de bola esse form");
    }   
});

 
app.listen(2000, (req, res)=>{
    console.log("servidor on");
});
