var canvas = document.getElementById('myCanvas');
var c = canvas.getContext('2d');

canvas.width = 400
canvas.height = 400



class Jugador {
    
    constructor({position, velocidad, tamano}){
        this.position = position
        this.velocidad = velocidad
        this.tamano = tamano
        
    }
    draw() {
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y, this.tamano.x, this.tamano.y);
    }

    update(){
    let positionSuelo = 250
    this.position.y += this.velocidad.y
    if (this.position.y >= positionSuelo) {
        this.position.y = positionSuelo
        
    } else if (this.position.y < 100) {
        this.position.y = 100
        if (booleanos.salto.permitido) {
            booleanos.salto.permitido = false;
            setTimeout(() => {
                booleanos.salto.permitido = true
            }, 
            750);
        }
    }

    this.draw()
    
    }
} 


class Obstaculo {
    
    constructor({position, velocidad, tamano}){
        this.position = position
        this.velocidad = velocidad
        this.tamano = tamano
        
    }
    draw() {
        c.fillStyle = 'black'
        c.fillRect(this.position.x, this.position.y - this.tamano.y+50, this.tamano.x, this.tamano.y);
    }

    update(){
    this.position.x -= this.velocidad.x
    this.draw()
    if (this.position.x <0-this.tamano.x) {
        obstaculos.splice(obstaculos.indexOf(this),1)
        }
    }
} 

class Suelo {
    constructor({position, velocidad}){
        this.position = position
        this.velocidad = velocidad
    }
    draw() {
        c.beginPath();
        c.fillStyle = 'black'
        c.moveTo(0,300);
        c.lineTo(400, 300);

        for (let i = 0; i <8; i++) {
            if (this.position.x+(100*i) < -400) {
                this.position.x+=400;
            }
            c.moveTo(this.position.x+(100*i),this.position.y);
            c.lineTo(this.position.x+100+(100*i),this.position.y+100);
            
        }

        c.stroke()
    }

    update(){
    this.draw()
    this.position.x -= this.velocidad.x
    
    }
} 
//////////////////////////////
const jugador = new Jugador({
    position:   {
    x: 50,
    y: 250
    },
    velocidad: {
        x: 0,
        y: 5
    },
    tamano:   {
        x: 30,
        y: 50
    }
})

const obstaculos = [new Obstaculo({
    position:   {
    x: 400,
    y: 250
    },
    velocidad: {
        x: 2,
        y: 0
    },
    tamano:   {
        x: 30,
        y: 70
    }
})]

const suelo = new Suelo( {
    position:   {
        x: 0,
        y: 300
        },
        velocidad: {
            x: 2,
            y: 0
        }
})


const teclas = {
    w: {
        pressed : false
    },
    space: {
        pressed: false
    }
}

const booleanos = {
    salto:{
        permitido: true
    }
}


jugador.draw()
suelo.draw()
obstaculos[0].draw()
/////////////////
animate()

var distanciadif = 50

function animate(){
    window.requestAnimationFrame(animate)
    
    c.clearRect(0,0,canvas.width,canvas.height)
    jugador.update();
    suelo.update();
    obstaculos.forEach((obstaculo) => {
        obstaculo.update();
    });
    moreObstaculos()
    console.log("Aullando como lobaa aaaaaauuuuuuuuuuuu uuuuuuuuuu soy quien no se enamoraaaaaaaaaaaaaaa aaaaaaaaaaaauuuuuuuuu uuuuuuuuuuu uuuuuuuuuuuuuuuuuu");
    jugador.velocidad.y = 3
    //console.log(jugador.velocidad.y)
    //console.log(booleanos.salto.permitido)
    if (teclas.w.pressed && booleanos.salto.permitido) {
        jugador.velocidad.y *= -5
    }
    
}

//////////

window.addEventListener('keydown', (event) =>{
    switch (event.key) {
        case 'w':
            teclas.w.pressed=true

            break;
    }

})
window.addEventListener('keyup', (event) =>{
    switch (event.key) {
        case 'w':
            teclas.w.pressed=false
            break;
    }


})


async function moreObstaculos(){
    
    if (obstaculos.length <=5) {
        
        let numRandom = Math.random();
        console.log(numRandom)
       if (numRandom > 0.99) {
        
         obstaculos.push(new Obstaculo({
            position:   {
            x: 400,
            y: 250
            },
            velocidad: {
                x: 2,
                y: 0
            },
            tamano:   {
                x: 30,
                y: 70
            }
        }))
       }

    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

