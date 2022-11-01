let Champions = []
let attackPlayer = []
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

let ChampionSelectName
let ListChampionAttack
let buttonFire
let buttonWater 
let buttonGrass 
let AttacksButtons

class Champion{
    constructor(name,img,lives){
        this.name = name
        this.img = img
        this.lives = lives
        this.attacks =[]
    }

}

let Hipodoge = new Champion("Hipodoge",'./assets/morado.png',5)
let Chiguirazo = new Champion("Chiguirazo",'./assets/verdesito.png',5)
let Ratachingona = new Champion("Ratachingona",'./assets/fuego.png',5)
let serpentina = new Champion("Serpentina",'./assets/pydos_attack.png',5)

Hipodoge.attacks.push(
    {name:'💧 Hidrojet', id:'water_button', element: 'water'},
    {name:'💧 Waterfall', id:'water_button', element: 'water'},
    {name:'💧 Surf', id:'water_button', element: 'water'},
    {name:'🔥 Ember', id:'fire_button' , element: 'grass'},
    {name:'🌱 Rock Smash', id:'grass_button' , element: 'fire'},
)

Chiguirazo.attacks.push(
    {name:'🌱 Earthquake', id:'grass_button' , element: 'grass'},
    {name:'🌱 Earth Power', id:'grass_button', element: 'grass'},
    {name:'🌱 Mud Bomb', id:'grass_button', element: 'grass'},
    {name:'💧 Water Gun', id:'water_button', element: 'water'},
    {name:'🔥 Fireball', id:'fire_button',element: 'fire'},
)

Ratachingona.attacks.push(
    {name:'🔥 Fire Bite', id:'fire_button', element: 'fire'},
    {name:'🔥 Flame', id:'fire_button', element: 'fire'},
    {name:'🔥 Pride Sun', id:'fire_button', element: 'fire'},
    {name:'💧 Splash', id:'water_button', element: 'water'},
    {name:'🌱 Dig', id:'grass_button', element: 'grass'},
)

serpentina.attacks.push(
    {name:'🌱 Dig', id:'grass_button', element: 'grass'},
    {name:'🌱 Earth Power', id:'grass_button', element: 'grass'},
    {name:'🔥 Ember', id:'fire_button' , element: 'grass'},
    {name:'💧 Water Gun', id:'water_button', element: 'water'},
    {name:'🌱 Earth Power', id:'grass_button', element: 'grass'} 
)


Champions.push(Hipodoge,Chiguirazo,Ratachingona,serpentina)

/*global var*/
const sectionSelectAttack = document.getElementById('select_attack')
const sectionReset = document.getElementById('reset')
const champSelectionForm = document.querySelector('#select_champ form')
const buttonReset = document.getElementById('reset_button')
const cartsContainer = document.getElementById('carts_container')
const ChoosePlayerContainer =  document.getElementById('Choose_Player_Container')
const ChooseEnemyContainer =  document.getElementById('Choose_Enemy_Container')
//
const battleInProgress = document.getElementById('attack_set')


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



function starGame(){
    /* get the ID of all the HTML element need it and hide the ones that
     no need it at star of the game*/
   
    sectionSelectAttack.style.display = 'None'
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
        extractAttacks(ChampionSelectName)    
        enemyChampSelect()
        selectAttackSection.style.display = 'flex'
        selectChampSection.style.display = 'None'
    }
    else {
        alert('Please select a champ')
        } 
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
                attackPlayer.push('Element: Fire!  🔥')
                button.style.background = '#112f59'
                button.disabled = true
                enemySelectAttack()
                
            } else if(event.target.textContent.slice(0,2) ==='💧'){
                attackPlayer.push('Element: Water💧')
                button.style.background = '#112f56'
                button.disabled = true
                enemySelectAttack()
                
            } else {
                attackPlayer.push('Element: Grass🌱')
                button.style.background = '#112f59'
                button.disabled = true
                enemySelectAttack()
            }
            starBattle ()
            console.log("player: ",attackPlayer)
            console.log("enemigo:",enemyAttack)
        })
    })
}

function enemyChampSelect() {
    let enemyChamp = RamdomChoise(0, Champions.length-1);
        Champions.forEach((Champion) => {
            if (Champion.name === Champions[enemyChamp].name){
                championsEnemyChoose = `<img src=${Champion.img} alt=${Champion.name}>`
                ChooseEnemyContainer.innerHTML += championsEnemyChoose} 
            })    
        
    spanEnemyChamp.innerHTML = Champions[enemyChamp].name
    enemyChampAttack = Champions[enemyChamp].attacks
    attacks_pack()
  }

function enemySelectAttack(){
    let attack = RamdomChoise(0,enemyChampAttack.length-1)
    if (attack === 0 || attack ===1 ){
        enemyAttack.push("Element: Fire!  🔥")
    } else if(attack === 2 || attack ===3 ){
        enemyAttack.push("Element: Water💧")
    }else {
        enemyAttack.push("Element: Grass🌱")
    }
}


function starBattle (){
    if (attackPlayer.length ===5) {
        mokemonBattle()
    }
}

function mokemonBattle(){
    combat()
    if (currentEnemyLives>0 || currentPlayerLives >0){
        AttacksButtons.forEach((button)=>{
            button.style.background = '#2a9367'
            button.disabled = false
        })
    }
    attackPlayer = []
    enemyAttack = []
}

function attackmessage(){
    sectionMessage.innerHTML = combatDecision

    let newPlayerLine = document.createElement('p')
    newPlayerLine.innerHTML = indexForPlayer
    newPlayerAttack.appendChild(newPlayerLine)

    let newEnemyline = document.createElement('p')
    newEnemyline.innerHTML = indexForEnemy
    newEnemyAttack.appendChild(newEnemyline)
    checklives() 
}

function indexplayers(player,enemy){
    indexForPlayer = attackPlayer[player]
    indexForEnemy = enemyAttack[enemy]

}

function combat(){
    for (let index = 0; index < attackPlayer.length; index++) {
        if (attackPlayer[index] === enemyAttack[index]){
            indexplayers(index,index)
            combatDecision = "is a tie😅"
            attackmessage()
            
        } else if ((attackPlayer[index] == "Element: Fire!  🔥" && enemyAttack[index] == "Element: Grass🌱") || 
                (attackPlayer[index] == "Element: Water💧" && enemyAttack[index] == "Element: Fire!  🔥") ||
                (attackPlayer[index] == "Element: Grass🌱" && enemyAttack[index] == "Element: Water💧")) {
                    indexplayers(index,index)
                    combatDecision = "You win this combat 🤩"
                    currentEnemyLives +=-1 
                    spanEnemylives.innerHTML = "lives " + currentEnemyLives
                    attackmessage()
                }
        else {
                indexplayers(index,index)
                combatDecision = "Enemy win this combat🤯"
                currentPlayerLives += -1
                spanPlayerlives.innerHTML = "lives " + currentPlayerLives
                attackmessage()

        }
        
    
    }
    //checklives() 
}

function endBattle(battleResult){
    //battleResult { this come from the funtion checklives type: str}
    sectionMessage.innerHTML = battleResult
    //Turn off the battle button
    sectionReset.style.display = 'flex'
}

function checklives(){
    if (currentEnemyLives <=0){
        endBattle("You won the battle🥳")
    }
    else if (currentPlayerLives <= 0){
            endBattle("You lost the battle ☠💀")
    }
    else if (currentEnemyLives <=0 && currentPlayerLives <=0){
        endBattle("The battle was a draw 😒")
    }
}


function restarGame(){
    location.reload()
}


window.addEventListener('load', starGame)
