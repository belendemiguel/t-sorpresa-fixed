class Enemigos{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    w = 30;
    h = 30;
    url1 = "assets/enemy1.png"
    url2 = "assets/enemy2.png"
    url3 = "assets/enemy3.png"
    cargarAssets(){
        this.enemigos1 = loadImage(this.url1)
        this.enemigos2 = loadImage(this.url2)
        this.enemigos3 = loadImage(this.url3)
    }
     enemigosArray = []
    inicializarEnemigos(){
        let actualX = 0;
        let actualY = 0;
        for (let j = 0; j < 5; j++){
            for (let i = 0; i < 10; i++){
                this.enemigosArray.push({x: actualX+(108-this.size)/2, y: actualY+(40-this.size)/2, MUERTO: false, img: this.enemigos1});
                this.enemigosArray.push({x: actualX+(108-this.size)/2, y:actualY+(40-this.size)/2, MUERTO: false, img: this.enemigos2});
                this.enemigosArray.push({x: actualX+(108-this.size)/2, y:actualY+(40-this.size)/2, MUERTO: false, img: this.enemigos3});
                actualX = actualX + 108
            }
            actualX = 100;
            actualY = actualY + 40;
        }
    }
    dibujarEnemigos(){
        this.enemigosArray.forEach((enemigos) => {
                image(enemigos.img, enemigos.y, this.size, this.size)
        });
    }
}
class naveJugador{
    constructor(x, y){
        this.x = x
        this.y = y
    }
    w = 30;
    h = 30
    url="assets/player.png"
    coolDown = 0
    maxCoolDown = 10;
    cargarAssets(){
        this.player= loadImage(this.url)
    }
    dibujarNave(){
        imageMode (CENTER);
        image(this.player, this.x, this.y, 50, 48)
    }
    controlarNave(){
        if(keyIsDown(37)){
            this.x = this.x-15;
        }
        if(keyIsDown(39)){
            this.x = this.x+15;
        }
        if(keyIsDown(32)){
            this.disparar(arrayProyectiles)
        }
    }
    disparar(arrayProyectiles){
        if(this.coolDown !=0){
            this.coolDown--;
        }
        else{
            arrayProyectiles.push(new Bala(this.x));
            this.coolDown = this.maxCoolDown;
        }
    }
}
class Bala{
    y = 600;
    constructor(x){
        this.x=x;
    }
    dibujarBala(){
        fill("red")
        rect(this.x, this.y, 4, 20);
        noFill();
    }
    mover(){
        this.y-=3;
    }
}
var arrayProyectiles = [];
var jugador = new naveJugador(640, 662)
let enemigo = new Enemigos();
var enemigos1;
var enemigos2;
var enemigos3;
function setup(){
var img;
    createCanvas(1280, 720);
    colorMode(RGB);
    background(0);
    enemigo.inicializarEnemigos();
}
function draw(){
    background(0);
    image(img, 0, 0, 1280, 720);
    enemigo.dibujarEnemigos();
    jugador.dibujarNave();
   
    jugador.controlarNave(arrayProyectiles);
    arrayProyectiles.forEach(proyectil =>{
        proyectil.dibujarBala();
        proyectil.mover();
    });
}
function preload(){
    img = loadImage('assets/espacio.jpg');
    jugador.cargarAssets();
    enemigo.cargarAssets();
}g