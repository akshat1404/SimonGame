let buttonColors=["blue","red","yellow","green"];

let gamePath=[];

let userPath=[];

let started=false;

let level=0;

$(document).keypress(function(){
      if(!started){
            $('h1').text("Level " + level);
            nextSequence();
            started = true;
      }
});

$('.box').click(function(){
      let userColor=$(this).attr("id");

      userPath.push(userColor);

      playSound(userColor);
      animatePress(userColor);

      checkAnswer(userPath.length-1);
})

function checkAnswer(currentLevel){
      if(gamePath[currentLevel]==userPath[currentLevel]){
            console.log("Success");
            if(gamePath.length==userPath.length){
                  setTimeout(function () {
                        nextSequence();
                  }, 1000);
            }
      }else{
            console.log("Wrong");

            playSound("wrong");

            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");

            setTimeout(function () {
              $("body").removeClass("game-over");
            }, 200);

            startOver();
      }
}

function nextSequence(){
      userPath=[];

      level++;

      $('h1').text('Level ' + level);

      let ran=Math.floor(Math.random()*4);
      let randomColor=buttonColors[ran];
      gamePath.push(randomColor);

      $('#'+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

      playSound(randomColor);
}

function playSound(color){
      let audio=new Audio('sounds/'+color+'.mp3');
      audio.play();
}

function animatePress(color){
      $('#'+color).addClass("pressed");

      setTimeout(function(){
            $('#'+color).removeClass("pressed");
      },100)
}

function startOver() {
      level = 0;
      gamePath = [];
      started = false;
}