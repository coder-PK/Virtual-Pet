//Create variables here
var dog, happyDog, database, foodS, foodStock, Dog1;
function preload()
{
  //load images here 
  dog = loadImage("images/Dog.png")
  happyDog = loadImage("images/happyDog.png")
  
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  Dog1 = createSprite(250, 250);
  Dog1.addImage(dog);
  Dog1.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on('value', readStock);
}


function draw() {
  background(46, 139, 87);  

  if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  Dog1.addImage(happyDog);
  }

  drawSprites();
  //add styles here

  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}



