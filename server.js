require('dotenv').config();

const express = require('express'); //importando express para o projeto
const app = express(); //jogando express em uma variavel
const mongoose = require('mongoose');//adicionando mongoose no projeto, ele vai fazer a conexão com o servidor do mongodb

mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})//conectando ao banco de dados mongodb
.then(()=>{
    app.emit('pronto');
})

.catch(e => console.log(e));

const session =  require('express-session'); //chamando a sessao na pagina
const MongoStore = require('connect-mongo')(session);//importando o modulo de conexao e chamando a sessao
const flash = require('connect-flash');//modulo flash
const routes = require('./routes'); //importando as rotas
const path  = require('path'); //importando pacote do path(para tratar caminhos)
const helmet = require('helmet');//importando modulo helmet(de segurança)
const csrf = require('csurf');
const {middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');//importando nosso proprio middlewares

app.use(express.urlencoded({extended:true})); //permitindo a leitura dos arquivos express
app.use(express.static(path.resolve(__dirname, 'public'))); //utilizando o express.static permite que o express leia arquivos estaticos, como css
app.use(helmet());//utilizando helmet para evitar ataques de injeção de codigos

const sessionOption = session({
    secret: 'Jesus Te Ama',//frase secreta, pode ser qualquer uma
    store: new MongoStore({ mongooseConnection:mongoose.connection }),//efetuando a conexão com o mongoose
    resave:false,//nao permite que save novamente
    saveUninitialized:false,//nao permite que inicialize novamente
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, //sete dias em milessimos de segundos
        httpOnly: true//somente metodo HTTP
    }
});

app.use(sessionOption); //usando a sessionOption()
app.use(flash());//usando o flash();

//usando csrf para evitar(previnir) ataques

app.use(csrf());
//nosso proprio Middlewares
app.use(middlewareGlobal); //usando o middleware
app.use(checkCsrfError); //usando a checagem de erro
app.use(csrfMiddleware )//criando um token
app.use(routes); //usando as rotas

app.set('views', path.resolve(__dirname, 'src', 'views')); //tratando o caminho absoluto das view
app.set('view engine', 'ejs'); //adicionando a engine de view ejs no nosso projeto

//o app.on() diz que só vai ser executado quando o app.emit() emitir o sinal de pronto, como foi a mensagem passada
app.on('pronto', () =>{
//porta 3000
app.listen(5050);
})

