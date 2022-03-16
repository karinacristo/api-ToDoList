// A classe DAO é responsável por acessar nosso banco de dados
// Cada arquivo DAO é responsável por uma entidade

class TarefaDAO{

    constructor(db){
        this.db = db
    }

    // Metodo responsável pelo acesso aos bancos de dados
    // cada metodo será responsável por uma query de acordo com
    // o que ele deve retornar
    pegaTodasTarefas = ()=>{
        // Como estamos tratando de acesso a banco de dados, o processo é
        // assíncrono, por isso precisamos trabalhar com promises.
        // O método ira retornar a promise, que será excutada (com .then e .catch)
        // no controller
        return new Promise((resolve, reject)=>{
            this.db.all('SELECT * FROM TAREFAS', (error, rows)=>{
                if(error){
                    reject(error)
                }else{
                    resolve({
                        "tarefas": rows,
                        "erro": false
                    })
                }
            })
        })
    }

    pegaUmaTarefa = (titulo)=>{
        return new Promise((resolve, reject)=>{
            this.db.all('SELECT * FROM TAREFAS WHERE TITULO = ?',
            titulo,
            (error, rows)=>{
                if(error){
                    reject(error)
                }else{
                    resolve({
                        "tarefas": rows,
                        "erro": false
                    })
                }
            })
        })

    }

    pegaUmaTarefaId = (id)=>{
        return new Promise((resolve, reject)=>{
            this.db.all('SELECT * FROM TAREFAS WHERE ID = ?',
            id,
            (error, rows)=>{
                if(error){
                    reject(error)
                }else{
                    resolve({
                        "tarefa": rows,
                        "erro": false
                    })
                }
            })
        })

    }

    insereTarefa = (novaTarefa) =>{
        return new Promise((resolve, reject)=>{
            // Query com ? para evitar SQL Injection
            // NUNCA DEVEMOS USAR COM TEMPLATE STRING
            // Nós inserimos os dados a serem substituidos depois da query
            // Ou separado por vírgula (QUERY, a,b,c, callback)
            // Ou em um array (QUERY, [a,b,c] , callback)
            this.db.run("INSERT INTO TAREFAS(TITULO, DESCRICAO, STATUS, DATACRIACAO, ID_USUARIO) VALUES (?, ?, ?, ?, ?)",
            novaTarefa.titulo, novaTarefa.descricao, novaTarefa.status, novaTarefa.dataCriacao, novaTarefa.idUsuario, 
                (error)=>{
                if(error){
                    reject(error)
                }else{
                    resolve({
                        "mensagem": `Tarefa ${novaTarefa.titulo} inserida com sucesso`,
                        "tarefa": novaTarefa,
                        "erro": false
                    })
                }
            })
        })

    }

    deletaTarefa = (id)=>{
        return new Promise((resolve, reject)=>{
            this.db.run('DELETE FROM TAREFAS WHERE ID = ?',
            id,
            (error)=>{
                if(error){
                    reject(error)
                }else{
                    resolve({
                        "tarefa": `Tarefa de id ${id} deletada com sucesso`,
                        "erro": false
                    })
                }
            })
        })
    }

    atualizaTarefa = (id, tarefa)=>{
        return new Promise((resolve, reject)=>{
            this.db.run('UPDATE TAREFAS SET TITULO = ?, DESCRICAO = ?, STATUS = ?, ID_USUARIO = ? WHERE ID = ?',
            tarefa.titulo, tarefa.descricao, tarefa.status, tarefa.idUsuario,
            id,
            (error)=>{
                if(error){
                    reject(error)
                }else{
                    resolve({
                        "mensagem": `Tarefa de id ${id} atualizada com sucesso`,
                        "tarefa": tarefa,
                        "erro": false
                    })
                }
            })
        })
    }

}

export default TarefaDAO