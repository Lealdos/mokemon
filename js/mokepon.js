let Champions = []
let PlayerAttacks = []
let enemyChampAttack = []
let enemyAttack =[]
let combatDecision =""
let currentPlayerLives = 5
let currentEnemyLives = 5
let championOption =""
let championsPlayerChoose = ""
let championsEnemyChoose = ""
let indexForPlayer
let indexForEnemy

let playerId = null

let ChampionSelectName
let ListChampionAttack
let buttonFire
let buttonWater 
let buttonGrass 
let AttacksButtons
let indexChampionPlayer
let collisionhappen = false
let MapBackground = new Image()
MapBackground.src = "./assets/mokemap.png"




/*global var*/
const keys = {
    UP : 38,
    DOWN : 40,
    LEFT : 37,
    RIGHT : 39

};

const sectionSelectAttack = document.getElementById('select_attack')
const sectionReset = document.getElementById('reset')
const champSelectionForm = document.querySelector('#select_champ form')
const buttonReset = document.getElementById('reset_button')
const cartsContainer = document.getElementById('carts_container')
const ChoosePlayerContainer =  document.getElementById('Choose_Player_Container')
const ChooseEnemyContainer =  document.getElementById('Choose_Enemy_Container')
const battleInProgress = document.getElementById('attack_set')
const SectionShowMap = document.getElementById('Show_Map')
const Maps = document.getElementById('Maps')
let board = Maps.getContext('2d')



// Size of the maps in canvas
// Maps.height = 350
// Maps.width = 500

let heightMap
let widthMap = window.innerWidth - 20 
const Maxwidth = 520
if (widthMap > Maxwidth){
    widthMap = Maxwidth - 20
}

heightMap = widthMap * 600/800
Maps.width = widthMap
Maps.height = heightMap

// these get the id of radio boxes

const spanChamp = document.getElementById('playerChamp')
// var to write in the html the name of the champ 

    
const selectAttackSection = document.getElementById('select_attack')
const selectChampSection = document.getElementById('select_champ')

// select enemy champ
const spanEnemyChamp = document.getElementById('enemyChamp');

//combat (lives)
const spanPlayerlives = document.getElementById('playerLives')
const spanEnemylives = document.getElementById('enemyLives')

//messageDisplay
const sectionMessage = document.getElementById("battleDisplayResult")
const newPlayerAttack = document.getElementById("playerDisplayAttack")
const newEnemyAttack = document.getElementById("enemyDisplayAttack")


class Champion{
    constructor(name,img,lives,mapPhoto,x,y){
        this.name = name
        this.img = img
        this.lives = lives
        this.attacks = []
        this.mapPhoto = new Image()
        this.mapPhoto.src = mapPhoto
        this.width = 50
        this.high = 50
        this.x = x
        this.y = y
        this.speedX = 0
        this.speedY = 0
        }
        paintChampion(){
            board.drawImage(
            this.mapPhoto,
            this.x,
            this.y,
            this.width,
            this.high
            )
        }

}

let Hipodoge = new Champion("Hipodoge",'./assets/Hipodoge.png',5,'./assets/Hipodogemap.png',x = RamdomChoise(50,450), y = RamdomChoise(50,Maps.height-50))
let Chiguirazo = new Champion("Chiguirazo",'./assets/Chiguirazo.png',5,'./assets/Chiguirazomap.png',x = RamdomChoise(50,450), y = RamdomChoise(50,Maps.height-50))
let Ratachingona = new Champion("Ratachingona",'./assets/Ratachingona.png',5,'./assets/Ratachingonamap.png',x = RamdomChoise(50,450), y = RamdomChoise(50,Maps.height-50))
let Serpentina = new Champion("Serpentina",'./assets/Serpentina.png',5,'./assets/Serpentina.png',x = RamdomChoise(50,450), y = RamdomChoise(50,Maps.height-50))

let SerpentinaE = new Champion("Serpentina",'./assets/morado.png',5,'./assets/morado.png',x = RamdomChoise(50,450), y = RamdomChoise(50,Maps.height-50))
let RatachingonaE = new Champion("Ratachingona",'./assets/Ratachingona.png',5,'./assets/Ratachingonamap.png',x = RamdomChoise(50,450), y = RamdomChoise(50,Maps.height-50))
let ChiguirazoE = new Champion("Chiguirazo",'./assets/Chiguirazo.png',5,'./assets/Chiguirazomap.png',x = RamdomChoise(50,450), y = RamdomChoise(50,Maps.height-50))
let HipodogeE = new Champion("Hipodoge",'./assets/Hipodoge.png',5,'./assets/Hipodogemap.png',x = RamdomChoise(60,140), y = RamdomChoise(180,Maps.height-50))

const HipodogeAttacks =[
    {name:'💧 Hidrojet', id:'water_button', element: 'water'},
    {name:'💧 Waterfall', id:'water_button', element: 'water'},
    {name:'💧 Surf', id:'water_button', element: 'water'},
    {name:'🔥 Ember', id:'fire_button' , element: 'grass'},
    {name:'🌱 Rock Smash', id:'grass_button' , element: 'fire'}, 
]
Hipodoge.attacks.push(... HipodogeAttacks)
HipodogeE.attacks.push(... HipodogeAttacks)

const ChiguirazoAttacks = [    
    {name:'🌱 Earthquake', id:'grass_button' , element: 'grass'},
    {name:'🌱 Earth Power', id:'grass_button', element: 'grass'},
    {name:'🌱 Mud Bomb', id:'grass_button', element: 'grass'},
    {name:'💧 Water Gun', id:'water_button', element: 'water'},
    {name:'🔥 Fireball', id:'fire_button',element: 'fire'},
]
Chiguirazo.attacks.push(...ChiguirazoAttacks)
ChiguirazoE.attacks.push(...ChiguirazoAttacks)

const RatachingonaAttacks = [    
    {name:'🔥 Fire Bite', id:'fire_button', element: 'fire'},
    {name:'🔥 Flame', id:'fire_button', element: 'fire'},
    {name:'🔥 Pride Sun', id:'fire_button', element: 'fire'},
    {name:'💧 Splash', id:'water_button', element: 'water'},
    {name:'🌱 Dig', id:'grass_button', element: 'grass'},
]
Ratachingona.attacks.push(...RatachingonaAttacks)
RatachingonaE.attacks.push(...RatachingonaAttacks)

const SerpentinaAttacks = [
    {name:'🌱 Dig', id:'grass_button', element: 'grass'},
    {name:'🌱 Earth Power', id:'grass_button', element: 'grass'},
    {name:'🔥 Ember', id:'fire_button' , element: 'grass'},
    {name:'💧 Water Gun', id:'water_button', element: 'water'},
    {name:'🌱 Earth Power', id:'grass_button', element: 'grass'} 
]
Serpentina.attacks.push(...SerpentinaAttacks)

SerpentinaE.attacks.push(...SerpentinaAttacks)



Champions.push(Hipodoge,Chiguirazo,Ratachingona,Serpentina)


function starGame(){
    /* get the ID of all the HTML element need it and hide the ones that
     no need it at star of the game*/
   
    sectionSelectAttack.style.display = 'none'
    SectionShowMap.style.display = 'none'
    Champions.forEach((Champion) => {
        championOption = `<input type="radio" name="pets"  id=${Champion.name} value=${Champion.name} />
        <label class="champion_Cards" for=${Champion.name}>
            <p>${Champion.name}</p>
            <img src=${Champion.img} alt=${Champion.name}>
         </label> `

        cartsContainer.innerHTML += championOption
    })
    
    sectionReset.style.display = 'none' 
    champSelectionForm.addEventListener('submit',playerChampSelect)


    buttonReset.addEventListener('click',restarGame)

    JoinToTheGame()
}

function RamdomChoise(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

function playerChampSelect(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const entries = formData.entries()
    const  values = Object.fromEntries(entries);

    if (values.pets){
        Champions.forEach((Champion) => {
            if (Champion.name === values.pets){
                championsPlayerChoose = `<img src=${Champion.img} alt=${Champion.name}>`
                ChoosePlayerContainer.innerHTML += championsPlayerChoose
            }
        })
        spanChamp.innerHTML = values.pets 
        ChampionSelectName = values.pets
        indexChampionPlayer = [Champions.findIndex(checkChampion)]
        extractAttacks()    
        selectChampSection.style.display = 'None'
        //selectAttackSection.style.display = 'flex'
        SectionShowMap.style.display = 'flex'  
        starmap()
    }
    else {
        alert('Please select a champ')
        } 
    
    MokemonSelect(Champions[indexChampionPlayer].name)
}

function extractAttacks (){
    let champAttacks
    Champions.forEach((Champion) => {
        if (ChampionSelectName === Champion.name) {
            champAttacks = Champion.attacks
        }
    })
    displayChampsAtacck(champAttacks)
}

function displayChampsAtacck(champAtaccks){
    champAtaccks.forEach((attacks) =>{
        ListChampionAttack = `<button id=${attacks.id} class="attack_button AttcksB">${attacks.name}</button>
        `
        attack_set.innerHTML += ListChampionAttack
    })
    buttonFire= document.getElementById('fire_button')
    buttonWater= document.getElementById('water_button')
    buttonGrass= document.getElementById('grass_button')
    AttacksButtons = document.querySelectorAll('.AttcksB')
}  

function attacks_pack(){
    AttacksButtons.forEach((button)=>{
        button.addEventListener('click',(event)=>{
            //console.log(event.target.textContent.slice(0,2))
            if (event.target.textContent.slice(0,2) ==='🔥' ){
                PlayerAttacks.push('Element: Fire!  🔥')
                button.style.background = '#112f59'
                button.disabled = true
                enemySelectAttack()
                
            } else if(event.target.textContent.slice(0,2) ==='💧'){
                PlayerAttacks.push('Element: Water💧')
                button.style.background = '#112f56'
                button.disabled = true
                enemySelectAttack()
                
            } else {
                PlayerAttacks.push('Element: Grass🌱')
                button.style.background = '#112f59'
                button.disabled = true
                enemySelectAttack()
            }
            starBattle ()
        })
    })
}

function enemyChampSelect(MyEnemy) {
    //let enemyChamp = RamdomChoise(0, Champions.length-1);
        
        Champions.forEach((Champion) => {
            if (Champion.name === MyEnemy.name){
                championsEnemyChoose = `<img src=${MyEnemy.img} alt=${MyEnemy.name}>`
                ChooseEnemyContainer.innerHTML += championsEnemyChoose} 
            })    
        
    spanEnemyChamp.innerHTML = MyEnemy.name
    enemyChampAttack = MyEnemy.attacks
    attacks_pack()
  }

function enemySelectAttack(){
    
    let attack = RamdomChoise(0,enemyChampAttack.length-1)
    if (attack === 0 || attack === 1 ){
        enemyAttack.push("Element: Fire!  🔥")
    } else if(attack === 2 || attack === 3){
        enemyAttack.push("Element: Water💧")
    }else {
        enemyAttack.push("Element: Grass🌱")
    }
    console.log(enemyAttack)
}


function starBattle (){
    if (PlayerAttacks.length === 5) {
        mokemonBattle() 
    }
}

function mokemonBattle(){
    combat()
    if (currentEnemyLives > 0 || currentPlayerLives > 0){
        AttacksButtons.forEach((button)=>{
            button.style.background = '#2a9367'
            button.disabled = false
        })
    }
    PlayerAttacks = []
    enemyAttack = []
}

function attackmessage(){
    let newPlayerLine = document.createElement('p')
    newPlayerLine.innerHTML = indexForPlayer
    newPlayerAttack.appendChild(newPlayerLine)
    
    let newEnemyline = document.createElement('p')
    newEnemyline.innerHTML = indexForEnemy
    newEnemyAttack.appendChild(newEnemyline)
    checklives() 
}

function indexplayers(player,enemy){
    indexForPlayer = PlayerAttacks[player]
    indexForEnemy = enemyAttack[enemy]

}

function combat(){
    ClearAttacks()
    for (let index = 0; index < PlayerAttacks.length; index++) {
        //Tie
        if (PlayerAttacks[index] === enemyAttack[index]){
            indexplayers(index,index)
            attackmessage()
            
        } // Player Win
        else if ((PlayerAttacks[index] === "Element: Fire!  🔥" && enemyAttack[index] === "Element: Grass🌱") || 
                (PlayerAttacks[index] === "Element: Water💧" && enemyAttack[index] === "Element: Fire!  🔥") ||
                (PlayerAttacks[index] === "Element: Grass🌱" && enemyAttack[index] === "Element: Water💧")) {
                    indexplayers(index,index)
                    currentEnemyLives +=-1 
                    spanEnemylives.innerHTML = "lives " + currentEnemyLives
                    attackmessage()
                }
                //Player loss
        else {
                indexplayers(index,index)
                currentPlayerLives += -1
                spanPlayerlives.innerHTML = "lives " + currentPlayerLives
                attackmessage()

        }
        
    }   
}

function ClearAttacks(){
    if (PlayerAttacks.length ===5){
        newPlayerAttack.innerHTML = ""
        newEnemyAttack.innerHTML = ""
    }
}

function endBattle(battleResult){
    //battleResult { this come from the funtion checklives type: str}
    sectionMessage.innerHTML = battleResult
    //Turn off the battle button
    sectionReset.style.display = 'flex'
}

function checklives(){
    if (currentEnemyLives < currentPlayerLives && currentPlayerLives > 0 ){
        currentPlayerLives 
        combatDecision = "You win this combat 🤩"
        sectionMessage.innerHTML = combatDecision
        
    }
    else if (currentEnemyLives > currentPlayerLives && currentEnemyLives > 0 ){
            combatDecision = "Enemy win this combat 😫"
            sectionMessage.innerHTML = combatDecision

    }
    else if (currentEnemyLives === currentPlayerLives ){
            combatDecision = "is a tie😅"
            sectionMessage.innerHTML = combatDecision
    }
    if (currentEnemyLives <= 0 && currentPlayerLives > 0){
        if (currentEnemyLives<0){
            currentEnemyLives =0
        }
        endBattle("You won the battle🥳")
    }
    else if (currentPlayerLives <= 0 && currentEnemyLives > 0){
        if (currentPlayerLives<=0){
            currentPlayerLives = 0
        }
            endBattle("You lost the battle ☠💀")
    }
    else if (currentEnemyLives <=0 && currentPlayerLives <=0){
            endBattle("The battle was a draw 😒")
            currentPlayerLives = 0
            currentEnemyLives = 0
    }
    
}

function paintCanvas(){
    Champions[indexChampionPlayer].x = Champions[indexChampionPlayer].x + Champions[indexChampionPlayer].speedX
    Champions[indexChampionPlayer].y = Champions[indexChampionPlayer].y + Champions[indexChampionPlayer].speedY
    board.clearRect(0,0,Maps.width,Maps.height)
    board.drawImage(
        MapBackground,
        0,
        0,
        Maps.width,
        Maps.height
    )
    Champions[indexChampionPlayer].paintChampion()
    SerpentinaE.paintChampion()
    RatachingonaE.paintChampion()
    HipodogeE.paintChampion()
    ChiguirazoE.paintChampion()
    if (Champions[indexChampionPlayer].speedX !== 0 || Champions[indexChampionPlayer].speedY !== 0) {
        CheckColission(SerpentinaE)
        CheckColission(RatachingonaE)
        CheckColission(ChiguirazoE)
        CheckColission(HipodogeE)
    }
    sendPosition(Champions[indexChampionPlayer].x, Champions[indexChampionPlayer].y)
}

function sendPosition(positionX,positionY){
    fetch(`http://localhost:8085/mokepon/${playerId}/position`,{
            method: "post",
            headers: { "content-type": "application/json"
            },
            body: JSON.stringify({
            positionX,
            positionY
            })
        }
    )
    .then(function(res){
        if (res.ok){
            res.json()
                .then(function({enemys}){
                    console.log(enemys)
                })
        }
    })

}

function starmap(){
    paintCanvas()
    document.addEventListener("keydown", checkSteps);
    document.addEventListener("keyup", StopMove);
}

function checkSteps(event){
    if (collisionhappen===false){
        MoveKeys(event)
    }
}

function checkChampion(Champions){
    return Champions.name === ChampionSelectName
}

function MoveChampToRight(){
    Champions[indexChampionPlayer].speedX =  5
    paintCanvas()
}

function MoveChampToLeft(){
    Champions[indexChampionPlayer].speedX =  - 5
    paintCanvas()
}

function MoveChampToUp(){
    Champions[indexChampionPlayer].speedY =  - 5
    paintCanvas()
}

function MoveChampToDown(){
    Champions[indexChampionPlayer].speedY =  5
    paintCanvas()
}

function StopMove(){
    Champions[indexChampionPlayer].speedY = 0
    Champions[indexChampionPlayer].speedX = 0
}

function MoveKeys(event){
    switch (event.keyCode) {
        case keys.DOWN:
            MoveChampToDown()
            break;
        case keys.UP:
            MoveChampToUp()
            break;
        case keys.LEFT:
            MoveChampToLeft()
            break;
        case keys.RIGHT:
            MoveChampToRight()
            break;
        default:
            break;
    }

}

function restarGame(){
    location.reload()
}

function CheckColission(Enemy){
    const EnemyUp = Enemy.y
    const EnemyDown = Enemy.y + Enemy.high
    const EnemyRight = Enemy.x + Enemy.width
    const EnemyLeft = Enemy.x

    const ChampionUP = 
        Champions[indexChampionPlayer].y
    const DownChampion = 
        Champions[indexChampionPlayer].y + Champions[indexChampionPlayer].high
    const ChampionRight = 
        Champions[indexChampionPlayer].x + Champions[indexChampionPlayer].width
    const ChampionLeft = 
        Champions[indexChampionPlayer].x
    if (
        DownChampion < EnemyUp || ChampionUP > EnemyDown ||
        ChampionRight < EnemyLeft || ChampionLeft > EnemyRight 
        ){
            return
        }
        collisionhappen = true
        selectAttackSection.style.display = 'flex'
        enemyChampSelect(Enemy)
        SectionShowMap.style.display = 'none' 
    //alert("chocaste con "+ Enemy.name)
}

function JoinToTheGame(){
    fetch("http://localhost:8085/join")
        .then(function(res){
            if (res.ok) {
                res.text()
                    .then(function(answer){
                        playerId = answer
                    })
            }
        })
}

function MokemonSelect(playerselect){
    fetch(`http://localhost:8085/mokepon/${playerId}`,{
        method: "post",
        headers: { "content-type": "application/json"
        },
        body: JSON.stringify({
            champion: playerselect
        })
    })
}

window.addEventListener('load', starGame)