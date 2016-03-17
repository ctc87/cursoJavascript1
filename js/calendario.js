
(function(exports)
{
    
    Date.prototype.monthDays= function() {
        var d = new Date(this.getFullYear(), this.getMonth()+1, 0);
        return d.getDate();
    }

    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var diasSemana = new Array("Domingo","Lunes","Martes","Mi&eacute;rcoles","Jueves","Viernes","S&aacutebado");
    var mes = 0;
    
    this.borrarCalendario = function() {
        var mes = document.getElementsByClassName('mes')[0];
        mes.innerHTML = ""
    }
    
    exports.imagenOverNext = function(div) {
        div.src = "./img/nextW.png"
    }
    
    exports.imagenOutNext = function(div) {
        div.src = "./img/nextB.png"
    }
    
    exports.imagenOverPrev = function(div) {
        div.src = "./img/prevW.png"
    }
    
    exports.imagenOutPrev = function(div) {
        div.src = "./img/prevB.png"
    }
    
    exports.cambiarMes = function(incDec) {
        mes += incDec;
        borrarCalendario();
        var fechaActual = new Date()
        fechaActual.setMonth(fechaActual.getMonth() + mes);
        crearCalendario(fechaActual);
    }
    
    exports.crearCalendario = function(fechaActual = new Date()) {
        var hoy = new Date();
        var mes = document.getElementsByClassName('mes')[0];
        var nMes = document.getElementsByClassName('nombreMes')[0];
        nMes.innerHTML = meses[fechaActual.getMonth()];
        
        
        for(var i in diasSemana) {
            var div = document.createElement('div');
            div.className = 'diaSemana';
            div.innerHTML = diasSemana[i];
            mes.appendChild(div);
        }
        var j = 0;
        for(var i = 0; i < fechaActual.getDay() - 1 ; i++) {
            var vacioVisual = document.createElement('div');
            vacioVisual.className = 'vacioVisual';
            mes.appendChild(vacioVisual);
            j++;
        }
        
    
        var numDiasMEs = fechaActual.monthDays();
        for(var i = 0; i < numDiasMEs; i++) {
            var div = document.createElement('div');
            div.className = 'diaMes';
            if(j % 7 == 0) {
                div.classList.add('diaFestivo');
            }
            if(i == hoy.getDate() && hoy.getMonth() == fechaActual.getMonth())
                div.classList.add('diaActual');
            mes.appendChild(div);
            div.innerHTML = i + 1;
            j++;
        }
    }

    
    //document.write(diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());


})(this);

