const usuarioController = (app)=>{
    app.get('/usuario', (req, res)=>{
        res.send('Rota GET para entidade usuário')
    })
}

export default usuarioController