
(function(exports)
{
    var itercaciones = 15;
    
    function cambiarDado(number, imgNode) {
       console.log(imgNode)
    //   imgNode.classList.add('animated')
    //   imgNode.classList.add('abounceOutLeft')
       imgNode.src = "./img/dado" + number + ".png"
       
    };
    
    function numeroAleatorio(min, max) {
        return Math.floor(Math.random() *  max) + min; 
    };
    
    exports.tirarDado = function(imgNode) {
        for (var i = 1; i <= itercaciones; i++) {
            setTimeout(function(){
                cambiarDado(numeroAleatorio(1,6), imgNode);
            }, 50 * i);
        }
    } 

})(this);

