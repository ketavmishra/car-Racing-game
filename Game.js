class Game {
  constructor() {
    this.resetTitle=createElement("h2");
    this.resetButton=createButton("");
    this.leaderboardTitle=createElement("h2");
    this.leader1=createElement("h2");
   this.leader2=createElement("h2");
    
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

   showleaderboard(){
   var leader1,leader2
   var racer= Object.values(allPlayers);
   if(racer[0].rank==0&&racer[1].rank==0||racer[0].rank==1
    ){leader1=racer[0].rank + "&emsp;"+ racer[0].name+"&emsp;"+racer[0]
    .score;
  leader2=racer[1].rank + "&emsp;"+ racer[1].name+"&emsp;"+racer[1]
  .score;}
  if(racer[1]==1){
    leader1=racer[1].rank + "&emsp;"+ racer[1].name+"&emsp;"+racer[1]
    .score;
    leader2=racer[0].rank + "&emsp;"+ racer[0].name+"&emsp;"+racer[0]
    .score
  }
  this.leader1.html(leader1);
  this.leader2.html(leader2);



   }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("reset");
    this.resetTitle.position(width/2+200,40);
    this.resetButton.class("resetb");
    this.resetButton.position(width/2+230,100);
    this.leaderboardTitle.html("Leaderboard");
    this.leaderboardTitle.class("ace");
    this.leaderboardTitle.position(width/3-60,40);
    this.leader1.class("xyz");
    this.leader1.position(width/3-50,80);
    this.leader2.class("abc");
    this.leader2.position(width/3-50,130);

  }
handleplayercontrols(){
if(keyIsDown(UP_ARROW)){
  player.positionY+=10;
  player.update();
} 
}
  play() {
    this.handleElements();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
     
      image(track, 0, -height * 5, width, height * 6);
      this.showleaderboard();
      var index=0
      for(var plr in allPlayers){
        index=index+1;
        var x=allPlayers[plr].positionX
        var y=height - allPlayers[plr].positionY
        cars[index-1].position.x=x
        cars[index-1].position.y=y
        if(index==player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          camera.position.x=cars[index-1].position.x;
          camera.position.y=cars[index-1].position.y;
        }

      }
      this.handleplayercontrols()
      drawSprites();
    }

  }
}
