console.log('Lucas Mischiatti Cazelli');
console.log('Calculadora de pressao de concreto');


var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");



//
//


//fundo
const fundo ={
    desenha(){
      ctx.fillStyle = '#70c5ce';
      ctx.fillRect(0,0, c.width, c.height-50)
  }
}


//chao
const chao ={
  espessura: 50,
  desenha(){
    ctx.fillStyle = '#900C3F';
    ctx.fillRect(0,c.height-chao.espessura, c.width, c.height)
  }
}


                 //  pass the number of iterations as an argument


const forma =
{
  altura: 250,
  largura: 10,
  desenha(){
    ctx.fillStyle = 'black';
    ctx.fillRect(
      (c.width/2) - forma.largura,
      c.height - chao.espessura - forma.altura,
      forma.largura,
      forma.altura,
    )
  }

};





//concreto
const concreto = {
  h_maxconcreto: 250,
  h_concreto: 0,
  densidade: 0.25,
  pmax: 10,
  pressaolimitada: 35,
  pressaoatual: 0,
  h_atual: 0,

    desenha()
    {
      var p = concreto.h_concreto * concreto.densidade;
      var h = 0;
      //hydro
      ctx.fillStyle = 'gray';
      ctx.beginPath();
      ctx.moveTo((c.width/2), (c.height- chao.espessura - concreto.h_concreto));
      ctx.lineTo(((c.width/2) + p), c.height- chao.espessura);
      ctx.lineTo((c.width/2), c.height- chao.espessura);
      ctx.closePath();
      ctx.stroke()

      //limitado
      ctx.fillStyle = 'gray';
      ctx.beginPath();
      ctx.moveTo((c.width/2), (c.height- chao.espessura - concreto.h_concreto));
      if(p>concreto.pressaolimitada)
      {
        p = concreto.pressaolimitada;
        ctx.lineTo(((c.width/2) + p), c.height - chao.espessura - concreto.h_concreto + (concreto.pressaolimitada/concreto.densidade));
        
      };
      ctx.lineTo(((c.width/2) + p), c.height- chao.espessura);
      ctx.lineTo((c.width/2), c.height- chao.espessura);
      ctx.closePath();
      ctx.fill()
      
      },
      

    concreta()
    {
          if( concreto.h_concreto < concreto.h_maxconcreto ){
            setTimeout(concreto.concreta, 100000000);
            concreto.h_concreto++;
            
           } else {
             concreto.encheu();
           }

    },
    encheu(){break}
  };


//tirantes
const tirante = {
  altura: 350,
  diametro: 15,


}

    




//main
function mostra(hf,hc,pm) {
  document.getElementById("hf").innerHTML =  forma.altura;
  document.getElementById("hc").innerHTML =  concreto.h_maxconcreto;
  document.getElementById("pm").innerHTML =  concreto.pressaolimitada;
  loop()
}
function loop() {
  fundo.desenha();
  chao.desenha();
  forma.desenha();
  concreto.desenha();
  concreto.concreta();
    





  requestAnimationFrame(loop);
  }
  




//window.addEventListener('click', function() {
// 
// });
//

