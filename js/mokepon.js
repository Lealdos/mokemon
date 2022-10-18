let Champions = []
let attackPlayer =""
let enemyAttack =""
let combatDecision =""
let currentPlayerLives = 3
let currentEnemyLives = 3
let championOption =""
let championsPlayerChoose = ""
let championsEnemyChoose = ""


let listaAtaques = []
let listllena = ""
let nuevavaina

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

Hipodoge.attacks.push(
    {name:'💧 Hidrojet', id:'water_button', element: 'watter'},
    {name:'💧Waterfall', id:'water_button', element: 'watter'},
    {name:'💧 Surf', id:'water_button', element: 'watter'},
    {name:'🔥 ember', id:'water_button' , element: 'grass'},
    {name:'🌱Rock smash', id:'grass_button' , element: 'fire'},
)

Chiguirazo.attacks.push(
    {name:'🌱 Earthquake', id:'grass_button' , element: 'grass'},
    {name:'🌱 Earth power', id:'grass_button', element: 'grass'},
    {name:'🌱 Mud bomb', id:'grass_button', element: 'grass'},
    {name:'💧Water gun', id:'water_button', element: 'watter'},
    {name:'🔥 Fireball', id:'fire_button',element: 'fire'},
)

Ratachingona.attacks.push(
    {name:'🔥Fire bite', id:'fire_button', element: 'fire'},
    {name:'🔥 Flame', id:'fire_button', element: 'fire'},
    {name:'🔥 Pride sun', id:'fire_button', element: 'fire'},
    {name:'💧Splash', id:'fire_button', element: 'water'},
    {name:'🌱 Dig', id:'grass_button', element: 'grass'},
)


Champions.push(Hipodoge,Chiguirazo,Ratachingona)

/*global var*/
const sectionSelectAttack = document.getElementById('select_attack')
const sectionReset = document.getElementById('reset')
const champSelectionForm = document.querySelector('#select_champ form')
const buttonFire = document.getElementById('fire_button')
const buttonwater = document.getElementById('water_button')
const buttonGrass = document.getElementById('grass_button')
const buttonReset = document.getElementById('reset_button')
const cartsContainer = document.getElementById('carts_container')
const ChoosePlayerContainer =  document.getElementById('Choose_Player_Container')
const ChooseEnemyContainer =  document.getElementById('Choose_Enemy_Container')
const ataques = document.getElementById('attack_set')


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

    buttonFire.addEventListener('click',attackFire) 
    buttonwater.addEventListener('click',attackWater)    
    buttonGrass.addEventListener('click',attackGrass)
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
        nuevavaina = values.pets
        console.log(nuevavaina)
        extractAttacks(nuevavaina)
        enemyChampSelect()
        selectAttackSection.style.display = 'flex'
        selectChampSection.style.display = 'None'
    }
    else {
        alert('Please select a champ')
        } 
}

function extractAttacks (){
    let champAtaccks
    Champions.forEach((Champion) => {
        if (nuevavaina === Champion.name) {
            champAtaccks = Champion.attacks
            console.log(champAtaccks)
        }
    })
}

function enemyChampSelect() {
    let enemyChamp = RamdomChoise(0, Champions.length-1);
    // if (enemyChamp == 1) {
        //     spanEnemyChamp.innerHTML = 'Hipodoge';
        // } else if (enemyChamp == 2) {
            //     spanEnemyChamp.innerHTML = 'Chiguirazo';
            // } else if (enemyChamp == 3) {
                //     spanEnemyChamp.innerHTML = 'Ratachingona';
                // }
        // ES PARA HACERLO GENERAL ABAJO SE MUESTRA

        Champions.forEach((Champion) => {
            if (Champion.name === Champions[enemyChamp].name){
                championsEnemyChoose = `<img src=${Champion.img} alt=${Champion.name}>`
                ChooseEnemyContainer.innerHTML += championsEnemyChoose} 
            })    
        
    spanEnemyChamp.innerHTML = Champions[enemyChamp].name
  }

function enemySelectAttack(){
    let attack = RamdomChoise(0,3)
    switch(attack) {
        case 1:
            enemyAttack = "Fire🔥"
            break
        case 2:
            enemyAttack = "Water💧"
            break
        case 3:
            enemyAttack = "Grass🌱"
            break
      }
}

function attackGrass(){
    attackPlayer = 'Grass🌱'
    enemySelectAttack()
    combat()
    attackmessage()
}

function attackWater(){
    attackPlayer ='Water💧'
    enemySelectAttack()
    combat()
    attackmessage()
}

function attackFire(){
    attackPlayer ='Fire🔥'
    enemySelectAttack()
    combat()
    attackmessage()
 
}

function attackmessage(){
    sectionMessage.innerHTML = combatDecision
    let newPlayerLine = document.createElement('p')
    newPlayerLine.innerHTML = attackPlayer
    newPlayerAttack.appendChild(newPlayerLine)

    let newEnemyline = document.createElement('p')
    newEnemyline.innerHTML = enemyAttack
    newEnemyAttack.appendChild(newEnemyline)
    checklives() 
}

function endBattle(battleResult){
    //battleResult { this come from the funtion check lives type: str}
    sectionMessage.innerHTML = battleResult
    //Turn off the battle button

    sectionReset.style.display = 'flex'
    
    buttonFire.disabled = true
    
    buttonwater.disabled = true
    
    buttonGrass.disabled = true
}

function checklives(){
    if (currentEnemyLives == 0){
        endBattle("You won the battle🥳")
    }
    else if (currentPlayerLives == 0){
            endBattle("You lost the battle ☠💀")
    }
}

function combat(){
    if (attackPlayer == enemyAttack) {
        combatDecision = "is a tie😅"
    } else if ((attackPlayer == "Fire🔥" && enemyAttack == "Grass🌱") || 
            (attackPlayer == "Water💧" && enemyAttack == "Fire🔥") ||
            (attackPlayer == "Grass🌱" && enemyAttack == "Water💧")) {
                combatDecision = "You win this combat 🤩"
                currentEnemyLives +=-1 
                spanEnemylives.innerHTML = "lives " + currentEnemyLives
            } 
    else {combatDecision = "Enemy win this combat🤯"
            currentPlayerLives += -1
            spanPlayerlives.innerHTML = "lives " + currentPlayerLives
        }   
}

function restarGame(){
    location.reload()
}


window.addEventListener('load', starGame)
