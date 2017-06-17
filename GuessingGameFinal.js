$(document).ready(function(){
var disableAll=function(){
  $('#submit-button').prop('disabled',true);
  $('#hint').prop('disabled',true);
  $('input').prop('disabled',true);
}

  var freshGame = new Game();
  var guessCounter=0;
  var gameCounter=0;
  var clear = function(){$("#player-input").val('');}
  var passGuess = function(){
  console.log(freshGame.playersGuessSubmission(+freshGame.playersGuess));
  }
  function displayGuess(guessNum){
    if(guessCounter<6){
      if(guessNum.text()==="_"){
        guessNum.text(freshGame.playersGuess);
      }
      else{
      displayGuess(guessNum.next());
      }
    }
  }
  var resetShit= function(){
    $('#guesses li').each(function(){
      $(this).text('_')
      $('#hint').prop('disabled',false);
      $('input').prop('disabled',false);
      guessCounter=0;
      freshGame=new Game;
    })
  }

  $('#submit-button').click(function(){
    guessCounter++;
    console.log('Go button working!');
    freshGame.playersGuess=$("#player-input").val();
    console.log(freshGame.playersGuess);
    clear();
    passGuess();
    displayGuess($(".guess").first());

  });

  $('#player-input').on('keyup',function(e){
    if(e.keyCode===13){
      e.preventDefault();
      guessCounter++;
      console.log('Go button working!');
      freshGame.playersGuess=$("#player-input").val();
      console.log(freshGame.playersGuess);
      clear();
      passGuess();
      displayGuess($(".guess").first());
    }
  });
  $('#reset').click(function(){
    gameCounter++;
    resetShit();
    $('h1').text('You\'ve Played '+gameCounter+' Games. Get A Life.');
    $('h2').text('You Know The Rules, 0-100.');
  })

  $('#hint').click(function(){
    var hintArr=freshGame.provideHint();
    $('h1').text(hintArr[0]+'           '+hintArr[1]+'          '+hintArr[2]);
  })

function generateWinningNumber(){
  return Math.floor(1+Math.random()*100);
}


function shuffle(arr){
  var max=arr.length-1;
  for(var i =0;i<arr.length;i++){
    var ind=Math.round(Math.random()*max);
    var el = arr[i];
    arr[i]=arr[ind];
    arr[ind]=el;
  }
  return arr;
}


function Game(){
  var guessCount=0;
  this.playersGuess=null;
  this.pastGuesses=[];
  this.winningNumber=generateWinningNumber();
  Game.prototype.difference=function(){
    return Math.abs(this.playersGuess-this.winningNumber);
  }
  Game.prototype.isLower=function() {
      if(this.playersGuess<this.winningNumber){return true;}
      else{return false;}
  }
  Game.prototype.playersGuessSubmission=function(num){
    if(num<100&&num>0){
      this.playersGuess=num;
      this.pastGuesses.unshift(num);
      return this.checkGuess();
    }
    else{throw "That is an invalid guess.";}
  }
  Game.prototype.checkGuess=function(){
    var arr=this.pastGuesses;
    var guess=arr[0];
    guessCount++;
    if(guess===this.winningNumber){
    disableAll();
    $('h1').text('Glad You Can Count');
    $('h2').text('Do It Again, You Won\'t. Hit The Reset Button.')
    $('h2').animate({'color':'rgb(102, 0, 255)'});
    return "You Win!";
    }
    else{
      if(guessCount>=5){
        disableAll();
        $('h1').text('It Was '+freshGame.winningNumber+'. Call Me When You Doctor.');
        $('h2').text('Hit The Reset Button If You Love Failure');
        return "You Lose."
      }
      if(arr.lastIndexOf(guess)>0){
        setTimeout(function(){
        $('h2').text('You Already Guessed That');
        $('h2').animate({'color':'#4286f4','font-size':'40px'});
        //$('h2').animate({'bottom':'-10px'});
      },200);
      setTimeout(function(){
        $('h2').text('idiot');
        $('h2').animate({'color':'#4286f4','font-size':'8px'},'fast');
      },1000);
      setTimeout(function(){
        $('h2').text('Don\'t Worry, I Believe In You!');
        $('h2').animate({'color':'rgb(255, 199, 0)','font-size':'40px'},'fast');
      },1200);
        return 'You have already guessed that number.';
      }
      if(Math.abs(guess-this.winningNumber)<10){
        if(freshGame.isLower()){$('h2').text('You\'re burning up! Guess Higher');}
        else{$('h2').text('You\'re burning up! Guess Lower');}
        return "You\'re burning up!";
      }
      if(Math.abs(guess-this.winningNumber)<25){
        if(freshGame.isLower()){$('h2').text('You\'re lukewarm. Guess Higher');}
        else{$('h2').text('You\'re lukewarm. Guess Lower');}
        return "You\'re lukewarm.";
      }
      if(Math.abs(guess-this.winningNumber)<50){
        if(freshGame.isLower()){$('h2').text('You\'re a bit chilly. Guess Higher');}
        else{$('h2').text('You\'re a bit chilly. Guess Lower');}
        return "You\'re a bit chilly.";
      }
      if(Math.abs(guess-this.winningNumber)<100){
        if(freshGame.isLower()){$('h2').text('You\'re ice cold, boyyy. Guess Higher');}
        else{$('h2').text('You\'re ice cold, boyyy. Guess Lower');}
        return "You\'re ice cold!";
      }
    }
  }
  newGame=function(){
    var obj=new Game;
    return obj;
  }
  Game.prototype.provideHint=function(){
    var arr=[this.winningNumber];
    for(var i=1;i<3;i++){
      arr[i]=generateWinningNumber();
    }
    arr=shuffle(arr);
    return arr;
  }
}
});
