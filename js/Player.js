class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null;
    this.x_Distance = 0;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      x_Distance:this.x_Distance
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  } 
 
  ranked(){ 

    database.ref("carsAtEnd").on("value",(data) => {
      this.rank = data.val();
    })

  }

  static updateCar(rank){

    database.ref('/').update({
      carsAtEnd: rank
    })

  }

  carReset(pos){
    database.ref('/').update({
      carsAtEnd: pos
    })
  }

}
