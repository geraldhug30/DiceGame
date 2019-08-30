//active player
const activePlayerUI = document.querySelectorAll('.container .Players');
//Player One Holder 
const PlayerOneScore = document.querySelector('#PlayerOneScore');
const PlayerOneScoreGame = document.querySelector('.PlayerOneScoreGame');

//Player Two Holder 
const PlayerTwoScore = document.querySelector('#PlayerTwoScore');
const PlayerTwoScoreGame = document.querySelector('.PlayerTwoScoreGame');

const DiceImage = document.querySelector('.Dice');

let ScoreHolder = {};
ScoreHolder.activePlayer = 'One';
ScoreHolder.Dice = 0;
ScoreHolder.MainOne = 0;
ScoreHolder.MainTwo = 0;
ScoreHolder.gameOne = 0;
ScoreHolder.gameTwo = 0;


const init = () => {
	if (ScoreHolder.MainOne >= 20){
		document.querySelector('.Winner').innerHTML = '<h1>Player One Win</h1>';
	}else if(ScoreHolder.MainTwo >= 20) {
		document.querySelector('.Winner').innerHTML = '<h1>Player Two Win</h1>';
	} else {
		PlayerOneScore.innerHTML = ScoreHolder.MainOne;
		PlayerTwoScore.innerHTML = ScoreHolder.MainTwo;
		PlayerOneScoreGame.innerHTML = ScoreHolder.gameOne;
		PlayerTwoScoreGame.innerHTML = ScoreHolder.gameTwo;

		//DiceImage.setAttribute('src', ' ')
		if (ScoreHolder.activePlayer === 'One') {
			activePlayerUI[0].classList.add('active')
			activePlayerUI[1].classList.remove('active')
		} else {
			activePlayerUI[1].classList.add('active')
			activePlayerUI[0].classList.remove('active')
		}
	}

}
init();

// //Time
// const myTimer = () => {
//   const d = new Date();
//   document.getElementById("timeH").innerHTML = d.toLocaleTimeString();
// }
// setInterval(myTimer, 1000);


// 	const RollDice = {
// 		start: startRoll(),
// 		stop: 	clearInterval(startRoll)
// 	}

const DiceRoll = () => {
	ScoreHolder.Dice = Math.floor((Math.random() * 6) + 1);

  	return new Promise(resolve => {
    		resolve(DiceImage.setAttribute('src', `images/dice-${ScoreHolder.Dice}.png`));
  	});

  	
  	
}

const DiceData = () => {
	if(ScoreHolder.Dice === 1){
    			if (ScoreHolder.activePlayer === 'One') {
    				ScoreHolder.activePlayer = 'Two';
    				ScoreHolder.gameOne = 0;
    				init();
    			} else {
    				ScoreHolder.activePlayer = 'One';
    				ScoreHolder.gameTwo = 0;
    				init();
    			}
  				console.log('nextPlayer');
  			} else {
  				if (ScoreHolder.activePlayer === 'One') {
  			  	ScoreHolder.gameOne += ScoreHolder.Dice;
  				} else{
  			  	ScoreHolder.gameTwo += ScoreHolder.Dice;
  				}
  			 init();
  			}
  }


async function asyncDiceCall() {

	//Dice veiw on UI and update ScoreHolder
   await DiceRoll();
   //Manipulate data
   DiceData();
  //score view on UI
	init();

}

function saveInput(){
			if (ScoreHolder.activePlayer === 'One') {
  			  	ScoreHolder.MainOne += ScoreHolder.gameOne;
  			 	 ScoreHolder.gameOne = 0;
  			 	 ScoreHolder.activePlayer = 'Two';
  				  init();
  			  } else{
  			  	ScoreHolder.MainTwo += ScoreHolder.gameTwo;
  			  	ScoreHolder.gameTwo = 0;
  			  	ScoreHolder.activePlayer = 'One';
  			  	init();
  			  }
}



document.addEventListener('click', el => {
	if (el.target.id === 'Roll') {
		asyncDiceCall();
	}
	if (el.target.id === 'Pass') {
		saveInput();
	}
});


