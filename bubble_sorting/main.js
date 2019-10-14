var canvas = document.getElementById('canvas');
canvas.height= window.innerHeight;
canvas.width= window.innerWidth-100;
var c= canvas.getContext('2d');
var barArr=[];
var numberOfPartation=250;
document.getElementById('TotalElement').innerHTML=numberOfPartation;
var maxWidth=canvas.width/numberOfPartation;
var maxheight=500;
var minHeight=100;
var deltaHeight=undefined;
var swapped=false;
var swappedCount=0;

var index=0;
var count=numberOfPartation;



var Bar = function(x,y,width,height){
  this.height=height;
  this.x=x;
  this.y=y;
  this.width=width;

  this.color="black";
  this.value=this.height;

  this.draw=function(){
    c.beginPath();
    c.fillStyle=this.color;
    c.rect(this.x,this.y,this.width,this.height);
    c.fill();

  }
  this.update=function(i){
    this.x=i*maxWidth;
    this.draw();
  }
}


//generating the elements
function generateElements(){
  console.log("before sorting");
  for(var i=0;i<numberOfPartation;i++){
    deltaHeight=Math.floor((Math.random()*maxheight)+2);
    barArr.push(new Bar((i*maxWidth),10,maxWidth-2,deltaHeight));                // pushing bar in array
    barArr[i].draw();
    console.log(barArr[i].x);
  }

}
function checker(x,y,width,height){
  c.beginPath();
  c.fillStyle="red";
  c.rect(x,y,width,height);
  c.fill();
}

function bubbleSort(i){
  var temp=0;
  if(i<numberOfPartation-1){
    var check1=barArr[i].height;
    var check2= barArr[i+1].height;

    if(check1>check2){
      console.log("swapping "+barArr[i].height+"and "+barArr[i+1].height);
      temp=barArr[i];
      barArr[i]=barArr[i+1];
      barArr[i+1]=temp;
      swappedCount++;
      document.getElementById('swappedElement').innerHTML=swappedCount;
      swapped=true;
      console.log("after swap : i="+barArr[i].height);
    }


  }

}



function animate(){

if(count!=0){

  requestAnimationFrame(animate);


//console.log(count);
  if(index<barArr.length-1){
    console.log("looping");
    c.clearRect(0,0,canvas.width,canvas.height);
    console.log("current height "+barArr[index].height+" next height"+barArr[index+1].height);

    bubbleSort(index);
    for(var i=0;i<barArr.length;i++){
      barArr[i].update(i);
      //console.log(barArr[i].height);
    }
    index++;
    checker(barArr[index].x,barArr[index].y,barArr[index].width,barArr[index].height);


  }
  else{
  //  swapped=false;
    count--;
    index=0;
  }

}
else{
  console.log("after Sorting: ");
  for (var i = 0; i < barArr.length; i++) {
    console.log(barArr[i].x);

  }
}




}

//generateElements();
setInterval(animate,1000/1);
