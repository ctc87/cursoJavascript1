var soundsArray = [new Audio('../audio/proyecto/explosion_asteroid.wav'), new Audio('../audio/proyecto/gun.mp3')]

var max_x = document.documentElement.clientWidth - 120,
    min_x = 0,
    max_y = document.documentElement.clientHeight - 110,
    min_y = 0;
    
var ship = {
  element: document.getElementById('ship'),
  x: 0,
  y: 180,
  
  update: function(incx, incy) {
    
    this.x = Number(this.element.getAttribute('data-x')) + incx
    this.y = Number(this.element.getAttribute('data-y')) + incy    
    
    this.element.style.transform = 'translate('+ this.x +'px, '+ this.y +'px)'    

    if (this.element.classList.contains('mirror'))
      this.element.style.transform += ' scaleX(-1)'

    
    // Update HTML      
    this.element.setAttribute('data-x', this.x)
    this.element.setAttribute('data-y', this.y)
  },
  
  moveRight: function(speed) {
    this.element.classList.add('caminar')
    this.element.classList.remove('mirror')
    if (this.x < max_x)
      this.update(+speed, 0)
      this.shoot.update(+speed, 0)
  },

  moveLeft: function(speed) {
    this.element.classList.add('caminar')
    this.element.classList.add('mirror')
    if (this.x > min_x)
      this.update(-speed, 0)
      this.shoot.update(-speed, 0)
  },

  moveUp: function(speed) {
    if (this.y > min_y)
      this.update(0,-speed)
      this.shoot.update(0,-speed)
  },
  
  moveDown: function(speed) {
    if (this.y < max_y)
      this.update(0,+speed)
      this.shoot.update(0,+speed)
  },
  
  
  
  shoot: { // convertir en una clase
    element: document.querySelector(".shoot"),
    x: 0,
    y: 180,
    shoot: function(speed) {
      this.element.classList.add('shooting')
      var context = this;
      soundsArray[1].currentTime = 0;
      soundsArray[1].play();
      var setInt = setInterval(function() {
          context.update(0, -2)
          if(context.y < min_y || context.impact()) {
            clearInterval(setInt);
            if(context.impact()) {
              asteroid.element.classList.add("explosion")
              soundsArray[0].currentTime = 0;
              soundsArray[0].play();
            }
            context.element.classList.remove('shooting')
            context.element.setAttribute('data-y', ship.y)
            context.update(0,0)
          }
        }, 0);
        
    },
    update: function(incx, incy) {
        this.x = Number(this.element.getAttribute('data-x')) + incx
        this.y = Number(this.element.getAttribute('data-y')) + incy    
        // console.log(this.y)
        this.element.style.transform = 'translate('+ this.x +'px, '+ this.y +'px)'    
    
        // if (this.element.classList.contains('mirror'))
        //   this.element.style.transform += ' scaleX(-1)'
        
        // Update HTML      
        this.element.setAttribute('data-x', this.x)
        this.element.setAttribute('data-y', this.y)
    },
  
    impact: function() {
        var arr = asteroid.area()
        // console.log(arr)
        // console.log(this.x, this.y)
        // console.log(this.x >= arr[0] && this.x <= arr[1] && this.y >= arr[2] && this.y <= arr[3])
        return(this.x >= arr[0] && this.x <= arr[1] && this.y >= arr[2] && this.y <= arr[3])
    }
    
    
  },

  
  release: function() {
    this.element.classList.remove('caminar')
  
  }
}

var asteroid = {  // convertir en una clase
    element: document.querySelector(".asteroid"),
    x: 0,
    y: 180,
    area: function() {
      return [this.x + 20, this.x + 105, this.y + 10, this.y + 115]// right, left, top, bottom
    },  
    asteroid: function explode() {
      
    }, 
    update: function(incx, incy) {
        this.x = Number(this.element.getAttribute('data-x')) + incx
        this.y = Number(this.element.getAttribute('data-y')) + incy    

        this.element.style.transform = 'translate('+ this.x +'px, '+ this.y +'px)'    
    
        // Update HTML      
        this.element.setAttribute('data-x', this.x)
        this.element.setAttribute('data-y', this.y)
  }
}




// Cuando el usuario pulsa una tecla
window.addEventListener('keydown', function(e) {
  // console.log(e)
  
  var speed = 10;
  //var speed = (e.ctrlKey ? 20 : 10)
  
  // Cursor hacia la derecha
  if (e.keyCode == 39) 
    ship.moveRight(speed)

  // Cursor hacia la izquierda
  else if (e.keyCode == 37) 
    ship.moveLeft(speed)

  // Cursor hacia la arriva
  else if (e.keyCode == 38) 
    ship.moveUp(speed)
  

  // Cursor hacia la abajo
  else if (e.keyCode == 40) 
    ship.moveDown(speed)
  
  if (e.keyCode == 85)  // U
    ship.convert()
  
  
  if (e.keyCode == 32)  // space
    ship.shoot.shoot(speed)

  if (e.keyCode == 67) { // C
    console.log('Coords shoot: '+ ship.shoot.x + 'x ' + ship.shoot.y + 'y')
    
    console.log('Coords asteroid: '+ asteroid.x + 'x ' + asteroid.y + 'y')
    console.log('Area asteroid: '+ asteroid.area().toString())
  }
    
})

// Cuando el usuario suelta una tecla
window.addEventListener('keyup', function(e) {
  // Eliminamos la clase caminar para detener la animación
  // y que se detenga en el primer fotograma, como cuando no
  // realiza animación.
  ship.release()
})

// Inicialización
ship.update(0, 0)
asteroid.update(0, 0)
ship.shoot.update(0, 0)
