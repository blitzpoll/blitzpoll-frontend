var levelup = require('levelup')
var uuid = require('uuid')
var db = levelup('/tmp/dprk.db', { valueEncoding: 'json' })

// entities:
//   game - static for now?
//      gameId      : number - Unique id of the game
//      hometeam    : string - Name of the home team
//      awayteam    : string - Name of the away team
//      date - date : Date when the game takes place
//      homePlayers : array - All players of the home team
//      awayPlayers : array - All players of the away team
//      homeEmblem  : img - Image of the home team's club emblem
//      awayEmblem  : img - Image of the away team's club emblem
//   question
//      gameId : id : Id of the game
//      questionId : id : Unique id of the question
//      type : string : type of question being asked
//      question : string : Text of the actual question being asked
//      answerOptions : object : Answer options avaiable for this question
//      countdown : number : opentime after publication
//      image : img : Background image for the question (optional)


// save game
exports.SaveGame = function () {
    console.log('Foo:', 'BAR')
}

// edit game
// get game

// add question to game
exports.AddQuestion = function (game_id, q_obj) {
    console.log('Question:', game_id)
}

// get question for game
