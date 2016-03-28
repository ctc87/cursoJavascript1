var player = document.getElementById('player')
var enemy = document.getElementById('enemy')
var enemy2 = document.getElementById('enemy2')


var overlaps = (function () {
    function getPositions( elem ) {
        var pos, width, height;
        pos = $( elem ).position();
        width = $( elem ).width();
        height = $( elem ).height();
        return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
    }

    function comparePositions( p1, p2 ) {
        var r1, r2;
        r1 = p1[0] < p2[0] ? p1 : p2;
        r2 = p1[0] < p2[0] ? p2 : p1;
        return r1[1] > r2[0] || r1[0] === r2[0];
    }

    return function ( a, b ) {
        var pos1 = getPositions( a ),
            pos2 = getPositions( b );
        return comparePositions( pos1[0], pos2[0] ) && comparePositions( pos1[1], pos2[1] );
    };
})();


function updateElement(element, incx, incy) {
  var x = Number(element.getAttribute('data-x')) + incx
  var y = Number(element.getAttribute('data-y')) + incy
  element.style.transform = 'translate('+ x +'px, '+ y +'px)'
  
  // Update HTML
  element.setAttribute('data-x', x)
  element.setAttribute('data-y', y)
}

window.addEventListener('keydown', function(e) {
  //console.log(e)
  if (e.keyCode == 39) { // Dcha
    e.preventDefault();
        updateElement(player, +10, 0);
  }
  else if (e.keyCode == 37) { // Izq
    e.preventDefault();
        updateElement(player, -10, 0)
  }
  else if (e.keyCode == 38) { // Arriba
    e.preventDefault();
        updateElement(player, 0, -10)
  }
  else if (e.keyCode == 40) {// Abajo
    e.preventDefault();
        updateElement(player, 0, +10)
  }
})

function algorithmEnemy() {
  var player_x = Number(player.getAttribute('data-x'))
  var player_y = Number(player.getAttribute('data-y'))
  
  var enemy_x = Number(enemy.getAttribute('data-x'))
  var enemy_y = Number(enemy.getAttribute('data-y'))
  
  var incr_x = (player_x > enemy_x ? 1 : -1)
  var incr_y = (player_y > enemy_y ? 1 : -1)  
  if(!overlaps(enemy, player))
    updateElement(enemy, incr_x, incr_y)
}


function algorithmEnemy2() {
  var player_x = Number(player.getAttribute('data-x'))
  var player_y = Number(player.getAttribute('data-y'))
  
  var enemy_x = Number(enemy2.getAttribute('data-x'))
  var enemy_y = Number(enemy2.getAttribute('data-y'))
  var value = 1;
  var incr_x = (player_x > enemy_x ? value * -1 : value)
  var incr_y = (player_y > enemy_y ? value  * -1: value)  
  if(!overlaps(enemy2, player)) {
    updateElement(enemy2, incr_x, incr_y)
  }
}

function inicializar(element) {
  element.setAttribute('data-x', 0)
  element.setAttribute('data-y', 0)
  updateElement(element, 
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 200))  
}


var id = setInterval(function() { algorithmEnemy() }, 10) // Cada 0,1 segundo
var id2 = setInterval(function() { algorithmEnemy2() }, 10) // Cada 0,1 segundo





