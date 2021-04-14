const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const tarefa = require("./models/Tarefa");

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Rotas

app.get('/tarefa', function(req, res) {
    res.render('tarefa');
})

app.get('/cad-tarefa', function(req, res) {
    res.render('cad-tarefa');
})

app.post('/add-tarefa', function(req, res) {
    tarefa.create({
        nome: req.body.nome,
        descricao: req.body.descricao
    }).then(function() {
        // res.send("Tarefa cadastrada com sucesso!");
        res.redirect('/tarefa');
    }).catch(function(erro) {
        res.send("Erro ao cadastrar tarefa: " + erro);
    });
    // res.send("Nome: " + req.body.nome + "<br>Descrição: " + req.body.descricao + "<br>");

})

app.listen(8080);