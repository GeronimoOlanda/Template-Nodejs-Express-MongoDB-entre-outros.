
exports.contatos = (req, res) => {

    res.render('contatos', {
        titleMain: 'Louvores ao Deus vivo!',
        message: 'Que Deus seja louvado e Glorificado',
        versiculo: 'Salmos 21'
    
    })
}
    // console.log(req.flash('info'))
    // console.log(req.session.usuario);