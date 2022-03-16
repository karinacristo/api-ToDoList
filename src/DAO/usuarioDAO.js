// A classe DAO é responsável por acessar nosso banco de dados
// Cada arquivo DAO é responsável por uma entidade

class UsuarioDAO{

    constructor(db){
        this.db = db
    }

    // Metodo responsável pelo acesso aos bancos de dados
    // cada metodo será responsável por uma query de acordo com
    // o que ele deve retornar
    pegaTodosUsuarios = ()=>{
        // Como estamos tratando de acesso a banco de dados, o processo é
        // assíncrono, por isso precisamos trabalhar com promises.
        // O método ira retornar a promise, que será excutada (com .then e .catch)
        // no controller
        return new Promise((resolve, reject)=>{
            this.db.all('SELECT * FROM USUARIOS', (error, rows)=>{
                if(error){
                    // No reject retorna só o erro para deixar mais f[acil tratar
                    // os mais variados erros na propria model
                    reject(error)
                }else{
                    resolve({
                        "usuarios": rows,
                        "erro": false
                    })
                }
            })
        })
    }

    pegaUmUsuario = (email)=>{
        return new Promise((resolve, reject)=>{
            this.db.all('SELECT * FROM USUARIOS WHERE EMAIL = ?',
            email,
            (error, rows)=>{
                if(error){
                    reject(error)
                }else{
                    resolve({
                        "usuario": rows,
                        "erro": false
                    })
                }
            })
        })
    }

    pegaUmUsuarioId = (id)=>{
        return new Promise((resolve, reject)=>{
            this.db.all('SELECT * FROM USUARIOS WHERE ID = ?',
            id,
            (error, rows)=>{
                if(error){
                    reject(error)
                }else{
                    resolve({
                        "usuario": rows,
                        "erro": false
                    })
                }
            })
        })
    }

    insereUsuario = (novoUsuario) =>{

        return new Promise((resolve, reject)=>{
            // Query com ? para evitar SQL Injection
            // NUNCA DEVEMOS USAR COM TEMPLATE STRING
            // Nós inserimos os dados a serem substituidos depois da query
            // Ou separado por vírgula (QUERY, a,b,c, callback)
            // Ou em um array (QUERY, [a,b,c] , callback)
            this.db.run("INSERT INTO USUARIO(NOME, EMAIL, SENHA) VALUES (?, ?, ?)",
                novoUsuario.nome, novoUsuario.email, novoUsuario.senha, 
                (error)=>{
                if(error){
                    reject(error)
                }else{
                    resolve({
                        "mensagem": `Usuário ${novoUsuario.nome} inserido com sucesso`,
                        "usuario": novoUsuario,
                        "erro": false
                    })
                }
            })
        })

    }

    deletaUsuario = (id)=>{
        return new Promise((resolve, reject)=>{
            this.db.run('DELETE FROM USUARIOS WHERE ID = ?',
            id,
            (error)=>{
                if(error){
                    reject(error)
                }else{
                    resolve({
                        "usuario": `Usuario de id ${id} deletado com sucesso`,
                        "erro": false
                    })
                }
            })
        })
    }

    atualizaUsuario = (id, usuario)=>{
        return new Promise((resolve, reject)=>{
            this.db.run('UPDATE USUARIOS SET NOME = ?, EMAIL = ?, SENHA = ? WHERE ID = ?',
            usuario.nome, usuario.email, usuario.senha,
            id,
            (error)=>{
                if(error){
                    reject(error)
                }else{
                    resolve({
                        "mensagem": `Usuario de id ${id} atualizado com sucesso`,
                        "usuario": usuario,
                        "erro": false
                    })
                }
            })
        })
    }

}

export default UsuarioDAO