class Game {
  constructor(){
    
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(displayWidth - 400,200);
    car1.addImage("car1",c1);

    car2 = createSprite(displayWidth - 200,200);
    car2.addImage("car2",c2);

    car3 = createSprite(displayWidth,200);
    car3.addImage("car3",c3);

    car4 = createSprite(displayWidth + 200,200);
    car4.addImage("car4",c4);



    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();

    player.ranked();
    

    if(allPlayers !== undefined){

      background("#c68767");

      image(trackIM,0,-displayHeight*4,displayWidth,displayHeight*4);

      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;

        x = displayWidth - allPlayers[plr].x_Distance;

        //position the cars a little away from each other in x direction
        x = x + 300;

        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = cars[index - 1].x;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
      
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.x_Distance += 2
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.x_Distance -= 2
      player.update();
    }

    if(player.distance > 4200){
      gameState = 2;
      player.rank += 1;
      Player.updateCar(player.rank);
    }

    drawSprites();
  }
  end(){
    console.log("GAME OVER");
    //game.update(2);
    console.log(player.rank);
  }
}
