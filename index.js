const express = require("express")
const cors = require("cors")

const app =  express()
app.use(cors())
app.use(express.json())

const players = []
class Player {
    constructor(id){
        this.id = id
    }
    assignchampion(mokepon){
        this.mokepon = mokepon
    }
    updatePosition(x,y){
        this.x = x
        this. y = y 

    }
}

class champion {
    constructor(name){
        this.name = name
    }

}

app.get("/join", (req,res)=>{
    const id = `${Math.random()}`
    const player = new Player(id)
    players.push(player)
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.send(id)
} )

app.post("/mokepon/:playerId", (req,res)=>{
    const playerId = req.params.playerId || ""
    const name = req.body.champion || ""
    const mokepon = new champion(name)
    const playerIndex= players.findIndex((player)=> playerId === player.id)
    if (playerIndex >= 0){
        players[playerIndex].assignchampion(mokepon)
    }
    console.log(players)
    console.log(playerId)
    res.end()
})

app.post("/mokepon/:playerId/position",(req,res)=>{
    const playerId = req.params.playerId || ""
    const x = req.body.positionX || 0
    const y = req.body.positionX || 0
    const playerIndex= players.findIndex((player)=> playerId === player.id)
    if (playerIndex >= 0){
        players[playerIndex].updatePosition(x,y)
    }

    const enemys = players.filter((player) => playerId !== player.id )

    res.send({
        enemys
    })
})

app.listen(8085,()=>{
    console.log("Running Server")
})

