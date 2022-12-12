const express = require("express")
const cors = require("cors")

const app =  express()
app.use(express.static('Online'))
app.use(cors())
app.use(express.json())

const players = []
class Player {
    constructor(id){
        this.id = id
    }
    assignchampion(pet){
        this.pet = pet
    }
    updatePosition(x,y){
        this.x = x
        this. y = y 

    }
    assignAttacks(Attacks){
        this.Attacks = Attacks
    }
}

class Champion {
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
    const name = req.body.Champion || ""
    const pet = new Champion(name)
    const playerIndex= players.findIndex((player)=> playerId === player.id)
    if (playerIndex >= 0){
        players[playerIndex].assignchampion(pet)
    }
     console.log(players)
     console.log(playerId)
    res.end()
})

app.post("/mokepon/:playerId/position",(req,res)=>{
    const playerId = req.params.playerId || ""
    const x = req.body.positionX || 0
    const y = req.body.positionY || 0
    const playerIndex= players.findIndex((player)=> playerId === player.id)
    if (playerIndex >= 0){
        players[playerIndex].updatePosition(x,y)
    }

    const enemys = players.filter((player) => playerId !== player.id )

    res.send({
        enemys
    })
})

app.post("/mokepon/:playerId/Attacks", (req,res)=>{
    const playerId = req.params.playerId || ""
    const Attacks = req.body.Attacks || []
    const playerIndex= players.findIndex((player)=> playerId === player.id)
    if (playerIndex >= 0){
        players[playerIndex].assignAttacks(Attacks)
    }
    res.end()
})

app.get("/mokepon/:playerId/attacks", (req,res)=>{
    const playerId = req.params.playerId || ""
    const player = players.find((player) => player.id === playerId)
    res.send({
        Attacks: player.Attacks || []
    })
})

app.put("/mokepon/:playerId/attacks", (req,res)=>{
    const playerId = req.params.playerId || ""
    const player = players.find((player) => player.id === playerId)
    res.send({
        Attacks: player.Attacks = [] || []
    })
})


app.listen(8085,()=>{
    console.log("Running Server")
})

