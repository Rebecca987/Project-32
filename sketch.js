    const Engine = Matter.Engine;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Body = Matter.Body;
    const Render = Matter.Render;
    const Constraint=Matter.Constraint;
    //Variables
    var backgroundImg;
    var shellObj,groundObject, launcherObject;
    var seagull1,seagull2,seagull3,seagull4,seagull5;
    var world,girl;
    var launchingForce=100;

function preload(){
    //Load Background
	backgroundImg = loadImage("Images/Beach.jpg");
    girl = loadImage("Images/Girl.png");
}

function setup() {
	createCanvas(1300, 700);
	engine = Engine.create();
	world = engine.world;

	shellObj=new Shell(235,420,30); 

	seagull1=new Seagull(500,100,30);
  seagull2=new Seagull(770,130,30);
	seagull3=new Seagull(1010,140,30);
	seagull4=new Seagull(300,70,30);
	seagull5=new Seagull(850,70,30);

	groundObject=new Ground(width/2,700,width,20);
	launcherObject=new launcher(shellObj.body,{x:235,y:420})
    
    var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 1300,
      height: 600,
      wireframes: false
    }
  })

     Engine.run(engine);
    // Render.run(render);
}

function draw() {

    //Background
    background(backgroundImg);

    textSize(25);
    fill("darkgreen");
    text("Scare away all the seagulls!",950 ,50);
    image(girl ,200,340,200,300);

    //Display
    shellObj.display();
    seagull1.display();
    seagull2.display();
    seagull3.display();
    seagull4.display();
    seagull5.display();
    shellObj.display();
  
    groundObject.display();
    launcherObject.display();

    //Collision
    detectollision(shellObj,seagull1);
    detectollision(shellObj,seagull2);
    detectollision(shellObj,seagull3);
    detectollision(shellObj,seagull4);
    detectollision(shellObj,seagull5);
  }
  
  function mouseDragged()
  {
      Matter.Body.setPosition(shellObj.body, {x:mouseX, y:mouseY}) 
  }
  
  function mouseReleased()
  {
      launcherObject.fly();
      // distance=int(dist(shellObj.x,shellObj.y,seagull1.x,seagull1.y));
  }
  
  function keyPressed() {
      if (keyCode === 32) {
      Matter.Body.setPosition(shellObj.body, {x:235, y:420}) 
      launcherObject.attach(shellObj.body);
      }
    }
  
    function detectollision(lshell,lseagull){
      /*var collision = Matter.SAT.collides(lshell,lseagull);
      if(collision.collided){
          console.log("collided");
          Matter.Body.setStatic(lseagull,false);	
      }*/
    seagullBodyPosition=lseagull.body.position
    shellBodyPosition=lshell.body.position
    
    var distance=dist(shellBodyPosition.x, shellBodyPosition.y, seagullBodyPosition.x, seagullBodyPosition.y)
    //console.log(distance)
   // console.log(lseagull.r+lshell.r)
        if(distance<=lseagull.r+lshell.r)
      {
        //console.log(distance);
          Matter.Body.setStatic(lseagull.body,false);
      }
  
    }