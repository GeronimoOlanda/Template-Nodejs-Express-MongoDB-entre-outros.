exports.paginaInicial = (req, res) => {
    res.render('index', {
        titulo: 'Pagina Inicial - Geronimo',
        numeros: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        nome: function(a = 0, b = 0){
            a = 100;
            b = 100;

            return `A soma dos valores de a e b equivale a ${a + b}`;
        },
        objeto: Symbol("Masculino"),
        titleMain: 'Pagina Inicial'
    });
    return; 
}

exports.trataPost = (req, res) =>{
    res.send(req.body);
    return;
}