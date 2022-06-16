const games = require("../models/games")

const gamesLista = (request, response) => {
    games.find((err, games) => {
        response.status(200).json(games)
    })
}

const buscaJogo = (request, response) => {
    const idRequest = request.params.id

    games.findById(id, (err, games) => {
        if(err){
            response.status(400).send({message: `${err.message} - id do jogo não encontrado`})
        } else {
            response.status(200).send(games)
        }
    })
}

const cadastraJogo = (request, response) => {

    let game =  new games(request.body)

    game.save((err) => {
        if(err) {
            response.status(500).send({message: `${err.message} - falha ao cadastrar jogo`})
        } else {
            response.status(201).send(games.toJSON())
        }
    })
}

const atualizaJogo = (request, response) => {
    try{
        const idRequest = request.params.id
        let updateRequest = request.body

        let gameFound = games.findIndex(game => game.id == idRequest)
        games.splice(gameFound, 1, updateRequest)

        response.status(201).json({
            message: "Jogo atualizado",
            games
        })
    } catch (err) {
        response.status(500).send({
            message: "Erro ao atualizar"
        })
    }
}

const deletaJogo = (request, response) => {
    try{
        const idRequest = request.params.id
        const gameIndex = games.findIndex(game => game.id == idRequest)

        games.splice(gameIndex, 1)

        response.status(200).send({
            message: "Jogo deletado",
            games
        })
    } catch (err){
        response.status(400).send({
            message: "Erro ao deletar Jogo"
        })
    }
}

const likedGame = (request, response) => {
    const idRequest = request.params.id
    const likeRequest = request.body.liked

    let gameIndex = games.find(game => game.id == idRequest)
    
    if (gameIndex) {
        gameIndex.liked = likeRequest

        response.status(200).json({
            message: "Jogo alterado com sucesso",
            games
        })
    } else {
        response.status(404).json({
            message: "Jogo não encontrado"
        })
    }
}

module.exports ={
    gamesLista,
    buscaJogo,
    cadastraJogo,
    atualizaJogo,
    deletaJogo,
    likedGame
}