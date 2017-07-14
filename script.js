var on=false;
var strict_on=false;
var playTime=false;

var player_stack=[];
var game_memory=[1,2,3,4,1,2,3,3,2,4];
var counter=0;


//Waiting for click event to start device
$(".slider").click(function(){
  if(on)
  {
    on=false;
    shutDevice();
    player_stack=[];
    game_memory=[];

  }
  else
  {
    on=true;
    startDevice();
    player_stack=[];
    game_memory=[];
  }
});

function startDevice(){
  $('#realCounter').animate({
    opacity:1,
  },600,function(){
    $('p')[1].innerHTML="0 0";
  });
  setTimeout(startGame, 3000);
  game_memory=[];
  player_stack=[];
}

function shutDevice(){
  $('p')[1].innerHTML="_ _";
  $('#realCounter').animate({
    opacity:0,
  },600,function(){
    $('p')[1].innerHTML="_ _";
  });
  player_stack=[];
  game_memory=[];
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


function startGame(){
  color = randomColor();
  game_memory.push(color);
  showGameMemory();
}

function addCounter(num)
{
  counter++;
  if(counter<10)
  {
    $('p')[1].innerHTML="0 "+counter;
  }
  else
  {
    $('p')[1].innerHTML=((counter/10)+" "+(counter%10));
  }
}

function showColor(number)
{
  if(number==4)
  {
    $("#red").css("background-color","#ff2d2d");
  }
  if(number==3)
  {
    $("#green").css("background-color","#26da26");
  }
  if(number==2)
  {
    $("#blue").css("background-color","#3030ff");
  }
  if(number==1)
  {
    $("#yellow").css("background-color","rgb(241, 255, 54)");
  }
  setTimeout(function(){
    $("#red").css("background-color","#841b1b");
    $("#green").css("background-color","#277b27");
    $("#blue").css("background-color","#020261");
    $("#yellow").css("background-color","#8e8e10");
  },300);
}


function randomColor(){
  return Math.floor((Math.random() * 4) + 1);
}


k=0;
function showGameMemory()
{
  if(k<game_memory.length)
  {
    
    showColor(game_memory[k]);
    setTimeout(showGameMemory,1200);
    addCounter(counter);
    setTimeout(function(){k++;},100);
  }
  if(k==game_memory)
  {
    clearTimeout(t);
  }
  
}

