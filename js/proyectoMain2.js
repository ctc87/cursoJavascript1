// clase que contiene las constantes
function Constants() {
}
Constants.soundsArray = [new Audio('../audio/proyecto/explosion_asteroid.wav'), new Audio('../audio/proyecto/gun.mp3')];
Constants.asteroidArray = [];
Constants.flag = false;
Constants.max_x = document.documentElement.clientWidth - 120,
Constants.min_x = 0,
Constants.max_y = document.documentElement.clientHeight - 140,
Constants.min_y = 0;

// clase de la que heredan tdos los objetos de pantalla
function ScreenObject (x, y, element) {
  this.x = x;
  this.y = y;
  this.element = element; //= window.document.querySelector(element);

  this.area = function() {
    return [this.x + 20, this.x + 105, this.y + 10, this.y + 115]; // right, left, top, bottom
  }
  
  this.update = function(incx, incy) {
    this.x = Number(this.element.getAttribute('data-x')) + (incx | 0)
    this.y = Number(this.element.getAttribute('data-y')) + (incy | 0)    
    this.element.style.transform = 'translate('+ this.x +'px, '+ this.y +'px)'    
    
    if (this.element.classList.contains('mirror'))
      this.element.style.transform += ' scaleX(-1)'
    
    // Update HTML      
    this.element.setAttribute('data-x', this.x)
    this.element.setAttribute('data-y', this.y)
  }
}

// clase de la nave hereda de objeto pantalla
function Ship(x, y, element) {
  ScreenObject.call(this, x, y, element);
  this.gun = [];
  // new Gun(50, 180, ".shoot"); // cambiar esto por un array de disparos y hacer metodos para insertar o quitar
  
  this.useGun = function() {
    var div = document.createElement('div');
    div.setAttribute("class", "shoot");
    div.setAttribute('data-x', this.x + 50);
    div.setAttribute('data-y', this.y);
    var size = this.gun.length;
    div.setAttribute('id', 'shoot' + (size));
    document.querySelector("body").insertBefore(div, this.element);
    this.gun.push(new Gun(this.x + 50, this.y, div));//"#shoot" + (size)));
    this.gun[size].shoot(1);
  }
  
  this.moveRight = function(speed) {
    this.element.classList.add('caminar')
    this.element.classList.remove('mirror')
    if (this.x < Constants.max_x)
      this.update(+speed, 0)
  };

  this.moveLeft = function(speed) {
    this.element.classList.add('caminar')
    this.element.classList.add('mirror')
    if (this.x > Constants.min_x)
      this.update(-speed, 0)
  };

  this.moveUp =function(speed) {
    if (this.y > Constants.min_y)
      this.update(0,-speed)
  };
  
  this.moveDown = function(speed) {
    if (this.y < Constants.max_y)
      this.update(0,+speed)
  };
   
  this.release = function() {
    this.element.classList.remove('caminar')
  };
  
  this.explode = function (sounds) {
    
    if(sounds) {
      this.element.classList.add("explosion") // cambiar
      Constants.soundsArray[0].currentTime = 0;
      Constants.soundsArray[0].play();
    }
  
    //hay que hacer algo aqui
    // console.log(Constants.asteroidArray)
  };
  
}

Ship.prototype = new ScreenObject();
Ship.prototype.constructor = Ship;

// clase arma es el arma principal de la nave cada instancia representa un disparo
function Gun(x, y, element) {
  ScreenObject.call(this, x, y, element);

  this.shoot = function(speed) {
    this.element.classList.add('shooting')
    var context = this;
    Constants.soundsArray[1].currentTime = 0;
    Constants.soundsArray[1].play();
    var setInt = setInterval(function() {
        context.update(0, -2)
        if(context.y < Constants.min_y || context.impact()) {
          clearInterval(setInt);
          // context.impact();
          context.element.classList.remove('shooting')
          document.querySelector("body").removeChild(context.element);
        }
      }, 0);
  }
  this.impact = function() { //cambiar para comprobar con tdoas las instancias
    var impact = false
    var i = 0;
    if(Constants.asteroidArray.length > 0) {
      while(i < (Constants.asteroidArray.length || !impact)) {
        // console.log(Constants.asteroidArray[i], i)
        var element = Constants.asteroidArray[i];
        var arr = element.area();
        // console.log(element.area(), this.x, this.y,this.y >= arr[2] && this.y <= arr[3], this.x >= arr[0] && this.x <= arr[1]);
        if(this.x >= arr[0] && this.x <= arr[1] && this.y >= arr[2] && this.y <= arr[3]) {
          console.log("impact!!")
          impact = true;
          element.exploded = true;
          element.explode(true);
          
        }
        i++;
      }
    }
    return impact;
  }
}
Gun.prototype = new ScreenObject();
Gun.prototype.constructor = Gun;
    
// clase asteroide cada instancia representa un asteroide     
function Asteroid(x, y, element, type) { //the type its defined in css class
  ScreenObject.call(this, x, y, element);
  this.exploded = false;
  this.explode = function (sounds) {
    
    if(sounds) {
      this.element.classList.add("explosion") // cambiar
      Constants.soundsArray[0].currentTime = 0;
      Constants.soundsArray[0].play();
    }
    var index = Constants.asteroidArray.indexOf(this);
    if (index > -1) {
      Constants.asteroidArray.splice(index, 1);
    }
    if(!sounds) {
      document.querySelector("body").removeChild(this.element);
    }
    // console.log(Constants.asteroidArray)
  } 
  this.randomMove = function() {
    var direction = this.randonNumber(1, 2)
    direction = direction == 1 ? -1 : 1; 
    var context = this;
    var interval = setInterval(function() {
      if(context.x >= Constants.max_x -40 || context.x <= Constants.min_x)
        direction *= -1;
      context.update(direction * 1, 1);
      if(context.y >= Constants.max_y) {
        context.explode();
        clearInterval(interval);
      }
    });
  }
 
  this.randonNumber = function(min, max) {
      return Math.floor(Math.random() *  max) + min; 
  };
}
Asteroid.prototype = new ScreenObject();
Asteroid.prototype.constructor = Asteroid;

function Level(dificult, background) {
 this.ship = new Ship(0, 180, document.querySelector('#ship'));
 console.log(this.ship.element)
 this.start = function()  {
    this.ship.update(0, Constants.max_y - 180)
    var context = this;
    var i = 1;
    var setMet = setInterval(function() {
      if(i >= 12) {
          clearInterval(setMet);
      }
        context.generateAsteroids();
        i++;
      }, 2000);
    // setInterval(this.generateAsteroids(), 1000)
 }
 
 this.generateAsteroids = function() {
    var div = document.createElement('div');
    div.setAttribute("class", "asteroid");
    div.setAttribute('data-x', this.randonNumber(Constants.min_x, Constants.max_x));
    div.setAttribute('data-y', Constants.min_y);
    // console.log(Constants.asteroidArray.length);
    var size = Constants.asteroidArray.length;
    div.setAttribute('id', 'asteroid' + (Constants.asteroidArray.length));
    document.querySelector("body").insertBefore(div, document.querySelector("body").lastChild);
    Constants.asteroidArray.push(new Asteroid(0, 180, div)); //"#asteroid" + (Constants.asteroidArray.length)));
    Constants.asteroidArray[Constants.asteroidArray.length - 1].update(0, 0);
    Constants.asteroidArray[Constants.asteroidArray.length - 1].randomMove();
 }
 
  this.randonNumber = function(min, max) {
      return Math.floor(Math.random() *  max) + min; 
  };
}

var level = new Level(1,"");
level.start();



// Cuando el usuario pulsa una tecla
window.addEventListener('keydown', function(e) {
  // console.log(e)
  
  var speed = 10;
  //var speed = (e.ctrlKey ? 20 : 10)
  
  // Cursor hacia la derecha
  if (e.keyCode == 39) 
    level.ship.moveRight(speed)

  // Cursor hacia la izquierda
  else if (e.keyCode == 37) 
    level.ship.moveLeft(speed)

  // Cursor hacia la arriva
  else if (e.keyCode == 38) 
    level.ship.moveUp(speed)
  

  // Cursor hacia la abajo
  else if (e.keyCode == 40) 
    level.ship.moveDown(speed)
  
  if (e.keyCode == 85)  // U
    level.ship.convert()
  
  
  if (e.keyCode == 32)  // space
    level.ship.useGun();

  if (e.keyCode == 67) { // C
    console.log('Coords shoot: '+ level.ship.gun[level.ship.gun.length - 1].x + 'x ' + level.ship.gun[level.ship.gun.length - 1].y + 'y')
    // console.log('Coords asteroid: '+ asteroid.x + 'x ' + asteroid.y + 'y')
    // console.log('Area asteroid: '+ asteroid.area().toString())
  }
    
})

// Cuando el usuario suelta una tecla
window.addEventListener('keyup', function(e) {
  // Eliminamos la clase caminar para detener la animación
  // y que se detenga en el primer fotograma, como cuando no
  // realiza animación.
  level.ship.release()
})

// Inicialización
// ship.gun.update(0, 0)



