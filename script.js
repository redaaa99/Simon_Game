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
  on=false;
  strict_on=false;
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
  setTimeout(startGame, 3000);

  
}

function shutDevice(){
  game_memory=[];
  $('p')[1].innerHTML="_ _";
  $('#realCounter').animate({
    opacity:0,
  },600,function(){
    $('p')[1].innerHTML="_ _";
  });
  player_stack=[];
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
}



function startGame(){
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
        lostDisplay();
    }
  }

  

  if(player_stack.length==game_memory.length)
  {
    player_stack=[];
    setTimeout(startGame,800);
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
  $('p')[1].innerHTML="! !";
  setTimeout(function(){
    playTime=false;
  clearTimeout(timer);
  if(strict_on)
  {
     player_stack=[];
     game_memory=[];
     clearAll();
     showCounter(0);
     shutDevice();
     startDevice();
  }
  else
  {
    player_stack=[];
    showCounter(0);
  }
  setTimeout(showGameMemory,800);
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
  if(k<=game_memory.length)
  {
    
    showColor(game_memory[k]);
    k++;
    showCounter(k);
    t=setTimeout(showGameMemory,1200);
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
