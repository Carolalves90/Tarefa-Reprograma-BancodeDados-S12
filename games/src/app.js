const express = require("express")
const index = require("./routes/index")
const gamesRoutes = require("../src/routes/gamesRoutes")
const db = require("./config/dbConnect")

const app = express()

app.use(express.json())
app.use(function (request, response, next){
    response.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use("/", index)
app.use("/games", gamesRoutes)

db.connect()

module.exports = app