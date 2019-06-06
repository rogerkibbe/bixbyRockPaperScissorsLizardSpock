var console = require("console");

module.exports.function = function shootHands(userHand) {
  
  var bixbyHand = HANDS[Math.floor(Math.random() * HANDS.length)];
  var result = rpslsLogic(bixbyHand, userHand);

  if (DEBUG) {
    console.log ("Result: win = " + result.whoWins + " message = " + result.message);
  }
 
  return {
    userHand: userHand,
    bixbyHand: bixbyHand,
    resultMessage: result
  };
}

function rpslsLogic(bixbyHand, userHand) {
  if (bixbyHand == userHand) {
    return TIE;
  } else if (!userHand in RULES){  // Error handling for bad input
     var fail = require ('fail');
     throw fail.checkedError('Unrecognized hand from user.', 'BadInput', null);
     return 'Unrecognized hand';
  } else {
    if (bixbyHand in RULES[userHand]) {
      return RULES[userHand][bixbyHand] + YOU_WIN;
    } else {
      return RULES[bixbyHand][userHand] + I_WIN;
    }
  }
}

const DEBUG = false;
const HANDS = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
const RULES = {
  Rock: {
    Lizard: 'Rock crushes lizard',
    Scissors: 'Rock crushes scissors'
  },
  Paper: {
    Spock: 'Paper disproves Spock',
    Rock: 'Paper covers rock'
  },
  Scissors: {
    Lizard: 'Scissors beheads lizard',
    Paper: 'Scissors cuts paper'
  },
  Lizard: {
    Spock: 'Lizard poisons Spock',
    Paper: 'Lizard eats paper'
  },
  Spock: {
    Scissors: 'Spock distroys scissors',
    Rock: 'Spock vaporizes rock'
  }
};
const TIE = ". We tie";
const YOU_WIN = ". You win!";
const I_WIN = ". I win";