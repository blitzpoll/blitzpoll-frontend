var page = require('page');
var HacksportsClient = require('./client.js');
var GameInfo = require('./components/game-info');
var NavBar = require('./components/nav-bar');
var questionList = require('./components/question-list');
var questionModal = require('./components/question-modal');
var questionDetails = require('./components/question-details');

var client = new HacksportsClient();
var gi = new GameInfo();
var nb = new NavBar();

var currentPage = null;
var currentCtx = null;
var clientReady = false;

nb.appendTo(document.querySelector('.nav-bar-wrapper'));
gi.appendTo(document.querySelector('#game-info'));

var renderQuestionList = function() {
    document.querySelector('#question-details').style.display = 'none';
    document.querySelector('.question-list-container').style.display = 'block';
    document.querySelector('.question-list-container').innerHTML = '';
    questionList(document.querySelector('.question-list-container'), Object.keys(client.questions).map(function(key) {
        return client.questions[key];
    }));
}

var renderQuestionDetails = function(id) {
    document.querySelector('#question-details').style.display = 'block';
    document.querySelector('.question-list-container').style.display = 'none';
    document.querySelector('#question-details').innerHTML = '';
    var question = client.questions[id];
    questionDetails(document.querySelector('#question-details'), question);
}

var renderPage = function(currentPage, ctx) {
    switch(currentPage) {
    case 'questionList': renderQuestionList(); break;
    case 'questionDetails': renderQuestionDetails(ctx.params.id); break;
    }
}

page('/question/:id', function(ctx) {
    currentPage = 'questionDetails';
    currentCtx = ctx;
    nb.setBackbutton(true);
    if(clientReady) renderPage(currentPage, currentCtx);
});

page('/', function(ctx) {
    currentPage = 'questionList';
    currentCtx = ctx;
    nb.setBackbutton(false);
    if(clientReady) renderPage(currentPage, currentCtx);
});

page.start();

client.on('ready', function() {
    clientReady = true;
    client.getGameInfo(function(gameInfo) {
        gi.setInfo(gameInfo);
    });

    client.getPreviousQuestions(function(questions) {
        var latestQuestion = questions[questions.length - 1];
        questions.forEach(function(question) {
            var now = (new Date()).getTime();
            var elapsed = now - question.timestamp;

            if(elapsed < (question.timeout * 1000)) {
                // display question
                questionModal(question, client, question.timeout - Math.floor(elapsed / 1000));
            }
        });

        renderPage(currentPage, currentCtx);
    });
});

client.on('question', function(question) {
    questionModal(question, client);
});

client.on('answers', function(answers) {
    if(currentPage === 'questionDetails' && answers.questionId === currentCtx.params.id) {
        renderQuestionDetails(answers.questionId);
    }
});

client.on('newGame', function() {
    window.location.reload(false);
});
