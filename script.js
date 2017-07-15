var on=false;
var strict_on=false;
var playTime=false;

var timer;
var player_stack=[];
var game_memory=[];
var counter=0;

var corresp = {yellow : 1, blue : 2, green : 3 , red: 4};



//Waiting for click event to start device
$(".slider").click(function(){
  if(on)
  {
    
    shutDevice();
    player_stack=[];
    game_memory=[];
    on=false;

  }
  else
  {
    startDevice();
    player_stack=[];
    game_memory=[];
    on=true;
  }
});



function startDevice(){
  on=false;
  playTime=false;

  timer;
  player_stack=[];
  game_memory=[];
  counter=0;
  $('#realCounter').animate({
    opacity:1,
  },600,function(){
    $('p')[1].innerHTML="0 0";
  });
  player_stack=[];
  showCounter(0);
  game_memory=[];
  time2 =setTimeout(startGame, 3000);

  
}

function shutDevice(){
  
  $('#realCounter').animate({
    opacity:0,
  },600,function(){
    $('p')[1].innerHTML="0 0";
    $('#realCounter').css('opacity',0)
  });
  player_stack=[];
  game_memory=[];
  clearAll();
}

function strictClicked(){

  if(!strict_on)
  {
    strict_on=true;

    $("#strict").css("background-color","#00ff00");
  }
  else
  {
    strict_on=false;
    $("#strict").css("background-color","#d63838");  
  }

}


function clearAll(){
  game_memory=[];
  clearTimeout(timer);
  clearTimeout(time2);
  // clearTimeout(time3);
  // clearTimeout(time4);
  // clearTimeout(time5);
  // clearTimeout(time6);
  // clearTimeout(t);
}



function startGame(){
  // alert(strict_on);
    color = randomColor();
    game_memory.push(color);
    showGameMemory();
}
 
function checkMove()
{
  for(j=0;j<player_stack.length;j++)
  {
    if(player_stack[j]!=game_memory[j])
    {
      // alert(strict_on);
      if(strict_on)
      {
        game_memory=[];
        lostDisplay();
        setTimeout(startGame,800);
        return;
      }
        lostDisplay();
        return;

    }
  }

  

  if(player_stack.length==game_memory.length)
  {
    player_stack=[];
    time3 =setTimeout(startGame,800);
  }
}

function clicked(num)
{
  if(playTime)
  {
    clearTimeout(timer);
    showColor(num);
    player_stack.push(num);
    showCounter(player_stack.length);
    checkMove();
  }
}

function lostDisplay()
{
  document.getElementById('wrongSound').play();
  $('p')[1].innerHTML="! !";
  time4 =setTimeout(function(){
  playTime=false;
  clearTimeout(timer);
  if(strict_on)
  {
     player_stack=[];
     game_memory=[];
     clearAll();
     showCounter(0);
     return;
  }
  else
  {
    player_stack=[];
    showCounter(0);
  }
  time5 = setTimeout(showGameMemory,700);
  },800);
  
}

function showCounter(counterr)
{
  if(counterr<10)
  {
    $('p')[1].innerHTML="0 "+counterr;
  }
  else
  {
    $('p')[1].innerHTML=((Math.floor(counterr/10))+" "+(counterr%10));
  }
}

function showColor(number)
{
  if(number==4)
  {
    $("#red").css("background-color","#ff2d2d");
    $("#red").css("box-shadow","rgb(255, 47, 47) 16px -11px 88px");
    document.getElementById('redSound').play();
  }
  if(number==3)
  {
    $("#green").css("background-color","#26da26");
    $("#green").css("box-shadow","-10px -2px 88px #26da26");
    document.getElementById('greenSound').play();
  }
  if(number==2)
  {
    $("#blue").css("background-color","#3030ff");
    $("#blue").css("box-shadow","-10px -2px 88px #3030ff");
    document.getElementById('blueSound').play();
  }
  if(number==1)
  {
    $("#yellow").css("background-color","rgb(241, 255, 54)");
    $("#yellow").css("box-shadow","-10px -2px 88px rgb(241, 255, 54)");
    document.getElementById('yellowSound').play();
  }
  time6 = setTimeout(function(){
    $("#red").css("background-color","#841b1b");
    $("#red").css("box-shadow","0px 0px 0px #26da26");
    $("#green").css("background-color","#277b27");
    $("#green").css("box-shadow","0px 0px 0px #26da26");
    $("#blue").css("background-color","#020261");
    $("#blue").css("box-shadow","0px 0px 0px #26da26");
    $("#yellow").css("background-color","#8e8e10");
    $("#yellow").css("box-shadow","0px 0px 0px #26da26");
  },300);
}


function randomColor(){
  return Math.floor((Math.random() * 4) + 1);
}


k=0;
tempo=1200;
function showGameMemory()
{
  if(k<=game_memory.length)
  {
    
    showColor(game_memory[k]);
    k++;
    showCounter(k);
    switch(game_memory.length)
    {
      case 1:
      case 2:
      case 3:
      case 4:
        tempo = 1200;
          break;
      case 5:
        tempo = 900;
        break;
      case 9:
        tempo = 700;
        break;
      case 13:
        tempo = 600;
        break;
    }
    t=setTimeout(showGameMemory,tempo);
  }
  if(k>game_memory.length)
  {
    k=0;
    showCounter(k);
    playTime=true;
    timer = setTimeout(lostDisplay,5000);
    clearTimeout(t);
  } 
}
