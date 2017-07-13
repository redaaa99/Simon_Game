var on=false;
$(".slider").click(function(){
  if(on)
  {
    on=false;
    shutDevice();
  }
  else
  {
    on=true;
    startDevice();
  }
});

function startDevice(){
  $("#realCounter").innerHTML="_ _";
  $("#realCounter").animate()
}






