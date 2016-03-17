
(function(exports)
{
    
    this.arrTeclas =  ["C1", "C1S", "D1", "D1S", "E1", "F1", "F1S", "G1", "G1S", "A1", "A1S", "B1", "C2"]
    this.arraySonidos = this.arrTeclas.map(function(tecla, index) {
         return new Audio("./audio/" + tecla.toLocaleLowerCase() +  ".mp3")
    });
    this.borrarCalendario = function() {
        var mes = document.getElementsByClassName('mes')[0];
        mes.innerHTML = ""
    }
    
    
            document.onkeydown = function(evt) {
                evt = evt || window.event;
                switch(evt.keyCode) {
                    case 81:
                    document.getElementById(arrTeclas[0]).style.background = "orange"
                    arraySonidos[0].currentTime = 0;
                    arraySonidos[0].play();
                    setTimeout(function() {
                        document.getElementById(arrTeclas[0]).style.background = "white"
                    }, 100);
                    break;
                    case 87:
                    document.getElementById(arrTeclas[2]).style.background = "orange"
                    arraySonidos[2].currentTime = 0;
                    arraySonidos[2].play();
                    setTimeout(function() {
                        document.getElementById(arrTeclas[2]).style.background = "white"
                    }, 100);
                    break;
                    case 50:
                    document.getElementById(arrTeclas[1]).style.background = "orange"
                    arraySonidos[1].currentTime = 0;
                    arraySonidos[1].play();
                    setTimeout(function() {
                        document.getElementById(arrTeclas[1]).style.background = "black"
                    }, 100);
                    break;
                    case 51:
                    document.getElementById(arrTeclas[3]).style.background = "orange"
                    arraySonidos[3].currentTime = 0;
                    arraySonidos[3].play();
                    setTimeout(function() {
                        document.getElementById(arrTeclas[3]).style.background = "black"
                    }, 100);
                    break;
                    case 69:
                    document.getElementById(arrTeclas[4]).style.background = "orange"
                    arraySonidos[4].currentTime = 0;
                    arraySonidos[4].play();
                    setTimeout(function() {
                        document.getElementById(arrTeclas[4]).style.background = "white"
                    }, 100);
                    break;
                    case 82:
                    document.getElementById(arrTeclas[5]).style.background = "orange"
                    arraySonidos[5].currentTime = 0;
                    arraySonidos[5].play();
                    setTimeout(function() {
                        document.getElementById(arrTeclas[5]).style.background = "white"
                    }, 100);
                    break;
                    case 53:
                    document.getElementById(arrTeclas[6]).style.background = "orange"
                    arraySonidos[6].currentTime = 0;
                    arraySonidos[6].play();
                    setTimeout(function() {
                        document.getElementById(arrTeclas[6]).style.background = "black"
                    }, 100);
                    break;
                    case 84:
                    document.getElementById(arrTeclas[7]).style.background = "orange"
                    arraySonidos[7].currentTime = 0;
                    arraySonidos[7].play();
                    setTimeout(function() {
                        document.getElementById(arrTeclas[7]).style.background = "white"
                    }, 100);
                    break;
                    case 54:
                    document.getElementById(arrTeclas[8]).style.background = "orange"
                    arraySonidos[8].currentTime = 0;
                    arraySonidos[8].play();
                    setTimeout(function() {
                        document.getElementById(arrTeclas[8]).style.background = "black"
                    }, 100);
                    break;
                    case 89:
                    document.getElementById(arrTeclas[9]).style.background = "orange"
                    arraySonidos[9].currentTime = 0;
                    arraySonidos[9].play();
                    setTimeout(function() {
                        document.getElementById(arrTeclas[9]).style.background = "white"
                    }, 100);
                    break;
                    case 55:
                    document.getElementById(arrTeclas[10]).style.background = "orange"
                    arraySonidos[10].currentTime = 0;
                    arraySonidos[10].play();
                    setTimeout(function() {
                        document.getElementById(arrTeclas[10]).style.background = "black"
                    }, 100);
                    break;
                    case 85:
                    document.getElementById(arrTeclas[11]).style.background = "orange"
                    arraySonidos[11].currentTime = 0;
                    arraySonidos[11].play();
                    setTimeout(function() {
                        document.getElementById(arrTeclas[11]).style.background = "white"
                    }, 100);
                    break;
                    case 73:
                    document.getElementById(arrTeclas[12]).style.background = "orange"
                    arraySonidos[12].currentTime = 0;
                    arraySonidos[12].play();
                    setTimeout(function() {
                        document.getElementById(arrTeclas[12]).style.background = "white"
                    }, 100);
                    break;
                }
                    
            };
    
    exports.crearTeclasPiano = function() {
        var piano = document.getElementsByClassName("piano")[0];
        this.arrTeclas.forEach(function(tecla, indiex, array) {
            var div = document.createElement('div');
            var clase = tecla[2] == "S" ? "teclaNegra" : "teclaBlanca";
            div.id = tecla;
            piano.appendChild(div);
            div.classList.add(clase);
        })
    }

})(this);

