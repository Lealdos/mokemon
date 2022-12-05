const express = require("express")

const app =  express()


const players = []
class player {
    constructor(id){
        this.id = id
    }
    
}

app.get("/join", (req,res)=>{
    const id = `${Math.random()}`
    const Player = new player(id)
    players.push(Player)

    res.send(id)
} )
app.listen(8085,()=>{
    console.log("Running Server")
})

