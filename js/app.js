var page = require('page');
var HacksportsClient = require('./client.js');
// var QuestionDisplay = require('./components/question-display');
var GameInfo = require('./components/game-info');
var NavBar = require('./components/nav-bar');
var QuestionList = require('./components/question-list');
var questionModal = require('./components/question-modal');

var client = new HacksportsClient();
var gi = new GameInfo();
var ql = new QuestionList();
var nb = new NavBar();

page('/question/:id', function(ctx) {
    // render question results
    console.log('render results for question ' + ctx.params.id);
});

page('/', function() {
    // render list of questions
    ql.appendTo('.question-list-container');
});


page.start();

nb.appendTo(document.querySelector('.nav-bar-wrapper'));
gi.appendTo(document.querySelector('#game-info'));

client.on('ready', function() {
    client.getGameInfo(function(gameInfo) {
        gi.setInfo(gameInfo);
    });

    client.getPreviousQuestions(function(questions) {
        console.log(questions);
        ql.addQuestions(questions);
    });
});

client.on('question', function(question) {
    ql.addQuestion(question);
    questionModal(question, client);
    // qd.setQuestion(question);
});

//
// client.on('question', function(question) {
//
//     setInterval(function() {
//
//     	if (question.timeout <= 0) {
//     		$('.answers').html('');
//     		$('#countdown').text('');
//     		$('.results').fadeIn(1000);
//     		return;
//     	}
//
//     	$('#countdown').text(question.timeout--);
//
//     }, 1000);
//
//     $('#question')
//     	.data('id', question.id)
//     	.text(question.text);
//
//     question.answers.forEach(function (option, i) {
//     	$('.answers').append('<button class="btn btn-block btn-outlined" id="answer-' + (i + 1) + '">' + option + '</button>');
//     });
//
//     $('.answers button').click(function(e) {
// 	  // hide vote buttons
// 	  $('.answers').fadeOut(1000).delay(500).animate({ height: 0}, 10);
//
// 	  // send answer to server
// 	  client.answer($('#question').data('id'), $(e.currentTarget).text());
//
// 	  // display results
// 	  $('.results').delay(1000).fadeIn(2000);
// 	});
//
// });
//
// client.on('answers', function(answers) {
//
//     console.debug('answers', answers);
//  	var total = 0,
//  		results = [];
//
//     for (name in answers.answers) {
//     	total += parseInt(answers.answers[name]);
//     }
//
//     for (name in answers.answers) {
//  		results.push({
//  			answer: name,
//  			percentage: Math.round(parseInt(answers.answers[name]) / (total || 1) * 100)
//  		});
//  	}
//
//  	results.total = total;
//      console.debug('results total', results);
//
//  	updateResults(results);
//
// });


// makeList(questions);


// add game info to page

/*
$('.hometeam').text(game.hometeam);
$('.awayteam').text(game.awayteam);
$('.homelogo').$(this).attr("src", game.homelogo);
$('.homelogo').$(this).attr("src", game.awaylogo);
*/


// show splash page to user on first visit, set cookie, save user's team selection

// push question to users


// initiate countdown

// update results
function updateResults(results) {

    console.log('in update method');
    console.log(results);
	$('.results').html("");

	for (i=0; i<results.length; i++) {
		var theclass = 'result result-' + i;
		$('.results').append('<div class="' + theclass + '"/>');
		$('.result-' + i).append('<p>' + results[i].answer + '</p>');
		$('.result-' + i).append('<p class="number">' + results[i].percentage + '%</p>');
	}

	$('.results').append('<p class="votes" />');
	$('.votes').text(results.total + " votes"); // add number of answers for this question

}

/* WE DONT NEED THAT YET create list of all questions, sorted by latest on top (show countdown if Q still active)
function makeList(questions) {

	for (i=0;i < questions.length;i++) {

		var $cell = '<li class="table-view-cell" />';
		var $cella = '<a class="navigate-right" />';
		// var $btn = '<button class="btn btn-outlined btn-primary" />'; only if countdown > 0
		var $span = '<span class="listquestion" />';

		$('.table-view').append($cell);
		$cell.append($cella);
		$cella.append($btn).append($span);
		$span.text(questions[i].question);

	}
}*/
