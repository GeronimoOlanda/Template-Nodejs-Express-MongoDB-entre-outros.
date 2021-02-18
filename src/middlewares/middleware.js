exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariavelLocal = 'Estamos testando a variavel local';
    next();
};

//fazendo verificação e previnindo que o erro apareça para o usuario, caso de erro, será renderizado o arquivo error.ejs
exports.checkCsrfError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN'){
        return res.render('error');//renderizando arquivo error.ejs
    }
}
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();//cria aleatoriamente um token() - Codigos aleatorios evitando que ataques e pessoas maliciosas consigam invadir nosso codigo base
    next();
}