ll Rights Reserved
Developper : Jean .F CÉRÉLUS
canvasJs is a javascript canvas library, 
that makes you develop game very  quick
all of the work is done behind the scene.
*/
//Developper : Jean .F CÉRÉLUS

const get=function(x){return document.querySelector(x)}
const getAll=function(x){return document.querySelectorAll(x)}
const log=console.log
let self
function Stage(){self={stage:document.createElement("canvas"),}
self.add=function(x){document.body.appendChild(x)}
self.stage.setBg=function(x){self.stage.style.background=x}
self.stage.setBgSize=function(x){self.stage.style.backgroundSize=x}
self.stage.setBgRepeat=function(x){self.stage.style.backgroundRepeat=x}
ctx=self.stage.getContext("2d")
rectColor=function(x){ctx.fillStyle=x}
strokeColor=function(x){ctx.strokeStyle=x}
Rect=function(x,y,w,h){ctx.fillRect(x,y,w,h)}
Stroke=function(x,y,w,h){ctx.strokeRect(x,y,w,h)}
playSound=function(x){this.audio=new Audio(x)
this.audio.volume =0.3;this.audio.play()}
Text=function(color,fontsize,fontfamily,t,x,y,fontweight,fontstyle){this.x=x
this.y=y
this.color=color
this.fontsize=fontsize
this.fontstyle=fontstyle
this.fontweight=fontweight
this.fontfamily=fontfamily
this.t=t
/*Jcerelus Dev All Rights Reserved
Developper : Jean .F CÉRÉLUS
canvasJs is a javascript canvas library, 
that makes you develop game very  quick
all of the work is done behind the scene.
*/
//Developper : Jean .F CÉRÉLUS
if(this.fontweight==undefined){this.fontweight="bold"}
if(this.fontstyle==undefined){this.fontstyle="italic"}
ctx.fillStyle=this.color
ctx.font=this.fontstyle+" "+this.fontsize+" "+this.fontweight+"  "+this.fontfamily
ctx.fillText(this.t,this.x,this.y)}
clear=function(x,y,w,h){ctx.clearRect(x,y,w,h)}
var frameEnd
var then=Date.now()
var now
gameLoop=function(){fps=self.fps||30
now=Date.now()
dT=now-then
if(dT>1000/fps){clear(0,0,self.stage.width,self.stage.height)
then=now
self.animate=self.drawGame()
/*Jcerelus Dev All Rights Reserved
Developper : Jean .F CÉRÉLUS
canvasJs is a javascript canvas library, 
that makes you develop game very  quick
all of the work is done behind the scene.
*/
//Developper : Jean .F CÉRÉLUS
update=self.update()}
frameEnd=requestAnimationFrame(gameLoop)}
gameLoop()
self.isHoriBorder=function(a){if(a.r==undefined){if(a.x<=0||a.x>=self.stage.width-a.w){return!0}}else if(a.r!=undefined){if(a.x<=0||a.x>=self.stage.width-a.r){return!0}}}
self.isVertiBorder=function(a){if(a.r==undefined){if(a.y<=0||a.y>=self.stage.height-a.h){return!0}}else if(a.r!=undefined){if(a.y<=0||a.y>=self.stage.height-a.r){return!0}}}
return self}
Sprite=function(x,y,w,h,vx,vy,color,id){this.x=x
this.y=y
this.w=w
this.h=h
this.vx=vx
this.vy=vy
this.id=id
this.setGravity=function(x){this.gravity=x}
this.color=color
this.image=new Image()
this.drawSprite=function(){ctx.fillStyle=this.color
ctx.fillRect(this.x,this.y,this.w,this.h)}
this.drawSpriteImg=function(){ctx.drawImage(this.image,this.x,this.y,this.w,this.h)}
this.setBody=()=>{this.gravity=2
this.vy+=this.gravity
this.y+=this.vy}}
Circle=function(x,y,r,vx,vy,color,id){this.x=x
this.y=y
this.r=r
this.vx=vx
this.vy=vy
this.id=id
this.setGravity=function(x){this.gravity=x}
this.color=color
this.drawCirc=function(){ctx.beginPath()
ctx.fillStyle=this.color
ctx.arc(this.x,this.y,this.r,0,Math.PI*2)
ctx.fill()
ctx.closePath()}
this.setBody=()=>{this.gravity=2
this.vy+=this.gravity
this.y+=this.vy}}
SpriteSheet=function(col,row,sw,sh,x,y,w,h,vx,vy,id){this.row=row
this.col=col
this.sw=sw
this.sh=sh
this.x=x
this.y=y
this.w=w
this.h=h
this.vx=vx
this.vy=vy
this.id=id
this.setGravity=function(x){this.gravity=x}
this.image=new Image()
this.drawSpriteSheet=function(){ctx.drawImage(this.image,this.col*this.sw,this.row*this.sh,this.sw,this.sh,this.x,this.y,this.w,this.h)}
this.setBody=()=>{this.gravity=2
this.vy+=this.gravity
this.y+=this.vy}}
function isOverlap(a,b){var dx=Math.abs(a.x-(b.x+b.w/2));var dy=Math.abs(a.y-(b.y+b.h/2));if(dx<=a.r+b.w/2&&dy<=a.r+b.h/2){return!0}}
function isCollide(a,b){if(a.x+a.w>=b.x&&a.x<=b.x+b.w&&a.y+a.h>=b.y&&a.y<=b.y+b.h){return!0}}
function isInterCirc(a,b){dx=a.x-b.x
dy=a.y-b.y
sumr=a.r+b.r
distance=Math.sqrt(dx*dx+dy*dy)
if(distance<=sumr){return!0}}

/*Jcerelus Dev All Rights Reserved
Developper : Jean .F CÉRÉLUS
canvasJs is a javascript canvas library, 
that makes you develop game very  quick
all of the work is done behind the scene.

version 1.0
*/
//Developper : Jean .F CÉRÉLUS 

