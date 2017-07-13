var on=false;
var strict_on=false;

var game_stack=[];
var game_memory=[];
var counter=0;


//Waiting for click event to start device
$(".slider").click(function(){
  if(on)
  {
    on=false;
    shutDevice();
    game_stack=[];

  }
  else
  {
    on=true;
    startDevice();
    game_stack=[];
  }
});

function startDevice(){
  $('#realCounter').animate({
    opacity:1,
  },600,function(){
    $('p')[1].innerHTML="0 0";
  });
  setTimeout(startGame, 3000);
}

function shutDevice(){
  $('p')[1].innerHTML="_ _";
  $('#realCounter').animate({
    opacity:0,
  },600,function(){
    $('p')[1].innerHTML="_ _";
  });
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
  game_stack.push(color);
  counter++;
  showCounter();
  showColor(color);
}

function showColor(number)
{
  if(number==4)
  {
    $("#red").css("background-color","#f56767");
  }
  if(number==3)
  {
    $("#green").css("background-color","#26da26");
  }
  if(number==2)
  {
    $("#blue").css("background-color","#57a0fd");
  }
  if(number==1)
  {
    $("#yellow").css("background-color","rgb(241, 255, 54)");
  }
  setTimeout(function(){
    $("#red").css("background-color","#d63838");
    $("#green").css("background-color","#277b27");
    $("#blue").css("background-color","#28288e");
    $("#yellow").css("background-color","#c5c521");
  },1200);
}


function randomColor(){
  return Math.floor((Math.random() * 4) + 1);
}