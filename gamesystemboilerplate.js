/*
This is aformat that help you separate your code and make your system scalable for tones of levels,
remember there is a difference between levels and scenes or rooms or stages,
a level may contain 1 to n scenes
*/

game/
 ├─ folder images
 ├─ folder maps 
    ├─ subfolder Lv1,Lv2,...Lvn
 ├─ folder sound
 ├─ folder src
   ├─ libs
     └─ canvas.js
   ├─ js
	 └─ main.js
	 └─ scene_management.js
	 └─ entityGroups.js
	 └─ player.js
	 └─ controller.js
levels/
 └─ level1.js
 └─ level2.js
 └─ levelManager.js


//scene_management.js
/*------Scene_management------*/
  import game from "./main.js"
 import player from "./player.js"
 import { enemies, boss,items } from "./entityGroups.js"
import {currentLevel}  from "./../levels/levelManager.js"
  
 export let currentScene = {index:1}
 export let lastSceneSeen = currentScene.index

  
 let map;
function clearSceneEntities() {
  for (const type in enemies) {
    enemies[type].length = 0
  }
  
  for (const type in items) {
    items[type].length = 0
  }
}
 
function  spawnSceneEntities(timer){

 let spawnId = setTimeout(() => {
     //key
     let keyList = new SpawnEntities("items", "key", 0, 0, 16, 28, "sheet", items.key, 16, 0)
     keyList.asyncOperation()
     for (let key of items.key) {
         clearTimeout(spawnId)
         key.useImage("key")
     }
     //used to get the number of entities at spawn time
     getEntityCount("items", false, function (count) {
         return game.maxEntity = count
      
     })
     
     //burger
     let burgerList = new SpawnEntities("items", "burger", 0, 0, 32, 28, "sheet", items.burger, 16, 0)
     burgerList.asyncOperation()
     for (let burger of items.burger) {
         clearTimeout(spawnId)
         burger.useImage("burger")
     }
     //used to get the number of entities at spawn time
     getEntityCount("items", false, function (count) {
         return game.maxEntity = count
 
     })
     
     //burger
     let croissantList = new SpawnEntities("items", "croissant", 0, 0, 32, 28, "sheet", items.croissant, 16, 0)
      croissantList.asyncOperation()
     for (let croissant of items.croissant) {
         clearTimeout(spawnId)
         croissant.useImage("croissant")
     }
     //used to get the number of entities at spawn time
     getEntityCount("items", false, function (count) {
         return game.maxEntity = count
      
     })
 
 }, timer)
 
 
 }
 
 export function loadScene(scene) {
 try{
 clearSceneEntities()
 map = new tiledMap(scene.path, 16)
 map.load()
player.x = scene.spawn.x
player.y = scene.spawn.y
spawnSceneEntities(500)

}catch(err){
log("Cause : "+ err)

}
}
 
 export function nextScene() {
    let level = getCurrentLevel()
    if (currentScene.index < level.scenes.length-1){
      currentScene.index++
    loadScene(level.scenes[currentScene.index])
  }
   else{
  if(gameLevel.index < levels.length-1){
     nextLevel()
  }else{
     game.stopAnimation()
    log("Congratulations you've completed level" + gameLevel.index)
}
}
  }
 
 export function resetScenes() {
 currentScene.index = 0
 }
 

export {map}

// levelManager.js manage level
import { resetScenes, loadScene, currentScene } from "./../js/scenemanagement.js"
import level1 from "./level1.js"
import level2 from "./level2.js"

let currentLevel = null
export const levels = [level1, level2]

export function getCurrentLevel() {
    return currentLevel;
}

export let gameLevel = { index: 0 }

export function loadLevel(index) {
  if(gameLevel.index > levels.length-1)return
    currentLevel = levels[index]
    loadScene(currentLevel.scenes[currentScene.index])
}

export function nextLevel() {
  if(gameLevel.index < levels.length-1){
    gameLevel.index++
     resetScenes()
    loadLevel(gameLevel.index)
    }
}

// main.js the entry point
import {currentLevel,loadLevel}  from "../levels/levelManager.js"
import player from "./player.js"
import {map,currentScene} from "./scene_management.js"
import { controller, jumpB } from "./controller.js"
 import { enemies, boss,items } from "./entityGroups.js"


const game = new Stage(); // init game object
  game.create=()=>{
   game.setSize(320, 180);
   game.add(stage)

//preload assets
 assets.preload("playerIdle", "images/idle.png")
  assets.preload("playerRun", "images/run.png")
 assets.preload("playerJump", "images/jump.png")

player.useImage("playerIdle")
 assets.preload("bg2", "./images/background.png")
  assets.preload("music","sound/music.ogg")
 let bgSound 
  assets.preload("jump", "sound/jump.wav")
 assets.preload("key", "images/key1.png")
 assets.preload("burger", "images/burger.png")
    assets.preload("croissant", "images/croissant.png")

//load level
loadLevel(0)
 }
 

player.useImage("playerIdle")

game.update = (delta) => {
    if (loader) {
        player.state(delta)
    }

}

game.complexUpdate =  () => {

 }


game.render = () => {
  if (!loader) return
  try{
  const world = game.worldThroughCamera()
  game.setCam(player,world)

  if (!currentLevel) return
  for (const step of currentLevel.scenes[currentScene.index].renderOrder) {
    if (step.type === "tile") {
      map.renderLayer(data.layers[step.layer], step.tileset)  
    }
    
    if (step.type === "entity") {

      if(step.group === "player")game.renderBatch(player, "sheet")
       if(step.group === "key")game.renderBatch(items.key, "sheet")
       if(step.group === "burger")game.renderBatch(items.burger, "sheet")
       if(step.group === "croissant")game.renderBatch(items.croissant, "sheet")

    }
  }
  }catch(err){
 log("Failed to draw : " + err)
  }
}


game.setAnimation(60)
export default game


// in a folder named levels
// level1.js
export default {
   scenes :[{path:"maps/Lv1/scene1.json",
			renderOrder: [
			{ type: "tile", layer: 0, tileset:"images/another-world-tileset.png"},
			{ type: "tile", layer: 1, tileset: "images/another-world-tileset.png" },
			
			{ type: "entity", group:"player" },
			{ type: "tile", layer: 2, tileset: "images/another-world-tileset.png" }
			],
			maxEntity:8,
			spawn: { x: 40, y: 20 }
			     
         },
         {path:"maps/Lv1/scene2.json",
	         renderOrder: [
	         { type: "tile", layer: 0, tileset:"images/gothic-castle-background.png"},
	         { type: "tile", layer: 1, tileset: "images/tileset.png" },
	         
	         { type: "entity", group:"player" },
	         { type: "entity", group:"burger" },
	         // { type: "tile", layer: 2, tileset: "images/another-world-tileset.png" }
	         ],
	         maxEntity:17,
	         spawn: { x: 40, y: 20 }
	      },
          {path:"maps/Lv1/scene3.json",
              renderOrder: [
              { type: "tile", layer: 0, tileset:"images/gothic-castle-tileset.png"},
              { type: "tile", layer: 1, tileset: "images/Tiles.png" },
              
              { type: "entity", group:"player" },
               { type: "entity", group:"croissant" }
             /* { type: "tile", layer: 2, tileset: "maps/tileset.png" }*/
              ],
              maxEntity:13,
              spawn: { x: 50, y: 50 }
          }],


}

// add level2.js, level3.js ...leveln.js
/*that version is tiled editor based ,but you can use it for any other game based,
that level format is just a reference,but not the main data and structure,renderOrder givevs you the power to decide what must be drawn first
*/

// player.js example
import game from "./main.js"
import controlPlayer from "./controller.js"
 import {items } from "./entityGroups.js"
 import {currentScene,nextScene,lastSceneSeen} from "./scene_management.js"
import {currentLevel}  from "../levels/levelManager.js"

let player = new SpriteSheet(0, 3, 64, 66, 10, 30, 32, 32, 0, 0)

//state machine

player.items = []
export let PlayerState ={
IDLE:"idle",
RUN :"run"
}


player.activeState = PlayerState.IDLE
// used to have the coorect collider box
player.fixedCollider = () => {
    if (!player.flipX) {
        player.collider.x = player.x + 12
    } else {
        player.collider.x = player.x + 12
    }
    player.collider.h = player.collider.h - 6
}

player.state = (delta) => {
//player.createShadow("circle")
    player.setBody()
    game.setCollider(player)
    player.fixedCollider()
    Platformer(player, "collision", true)
    controlPlayer(delta)

    game.setCollider(player)
    player.fixedCollider()
    Platformer(player, "collision", true)

    if (player.isJumping) {
        player.runAnimation("playerJump", 0, 4, 8)
    }

     if (player.activeState =="run") {
     if(player.isJumping)return
        player.runAnimation("playerRun", 0, 7, 4)
    }

    if (player.activeState =="idle") {
        player.runAnimation("playerIdle", 0, 1, 10)
    }
    
    player.collectItems() 
    player.items.length == currentLevel.scenes[currentScene.index].maxEntity && currentScene.index < currentLevel.scenes.length ? nextScene() : false //switch scenes oneliner
}



//player collect items
player.collectItems =async ()=>{
for(let item of items.key ){
let index = items.key.indexOf(item)
if(isCollide(player.collider,item)){
      let beep = new game.beep("sine", 12000)
      beep.setVolume(0.2)
      particlePool.createParticle(item, 30,"self")
game.squash(item,16)
game.flash(item)
player.items.push(item)
return kill(items.key,index)

}

}
for(let item of items.burger ){
let index = items.burger.indexOf(item)
if(isCollide(player.collider,item)){
      let beep = new game.beep("sine", 12000)
      beep.setVolume(0.2)
      particlePool.createParticle(item, 30,"self")
game.squash(item,16)
game.flash(item)
player.items.push(item)
game.freeze(5000,0.01,1)
return kill(items.burger,index)
}

}

for(let item of items.croissant ){
let index = items.croissant.indexOf(item)
if(isCollide(player.collider,item)){
      let beep = new game.beep("sine", 12000)
      beep.setVolume(0.2)
      particlePool.createParticle(item, 30,"self")
game.squash(item,16)
game.flash(item)
player.items.push(item)
return kill(items.croissant,index)

}
}

}



//an animation method that handles 3 different animations : idle , run and jump
player.runAnimation = (image, start, end, timer) => {
    player.useImage(image)
    if (frame % timer == 0) {
        player.col++
        if (player.col > end) {
            player.col = start
        }
    }
}


export default player

// that line make you change scene
    player.items.length == currentLevel.scenes[currentScene.index].maxEntity && currentScene.index < currentLevel.scenes.length ? nextScene() : false //switch scenes oneliner

/* Good to know in home page of the library i have provided oa boilerplate zip file with more precise indications */