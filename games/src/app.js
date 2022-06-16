const express = require("express")
const index = require("./routes/index")
const gamesRoutes = require("../src/routes/gamesRoutes")
const db = require("./config/dbConnect")

db.on("error", console.log.bind(console, "Erro de conexão"))
db.once("open", () => {
    console.log("Conexão com o banco de dados feita com sucesso")
})

const app = express()

app.use(express.json())

app.use(function (request, response, next){
    response.header("Access-Control-Allow-Origin", "*")
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use("/", index)
app.use("/games", gamesRoutes)

module.exports = app