const usuarioController = (app)=>{
    app.get('/usuario', (req, res)=>{
        res.send('Rota GET para entidade usuário')
    })

    app.post('/usuario',(req, res)=>{
        res.json({
            "Rota POST de usuario ativada": "usuario adicionada ao banco de dados"
        })
    })
}

export default usuarioController