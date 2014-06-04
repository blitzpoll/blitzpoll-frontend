var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var shoe = require('shoe');
var reconnect = require('reconnect');

inherits(HacksportsClient, EventEmitter);

function HacksportsClient() {
    reconnect(function(stream) {
        this.stream = stream;
    }.bind(this)).connect('/live-data');

    this.stream.on('data', function(data) {
        this._parseIncomingData(data);
    }.bind(this));

    this.results = {};
}

HacksportsClient.prototype._parseIncomingData = function(data) {
    console.log(data);
    var cmd = data.substring(0, data.indexOf(':'));
    var obj = JSON.parse(data.substring(data.indexOf(':') + 1));

    switch(cmd) {
    case 'QUESTION': this._handleQuestion(obj); break;
    case 'ANSWERS': this._handleAnswers(obj); break;
    case 'GAME_INFO': this._gameInfoCb.call(this, obj); break;
    case 'PREVIOUS_QUESTIONS': this._previousQuestionsCb.call(this, obj);break;
    }
}

HacksportsClient.prototype._handleQuestion = function(question) {
    this.results[question.id] = {};
    this.emit('question', question);
}

HacksportsClient.prototype._handleAnswers = function(answers) {
    if(this.results[answers.questionId] === JSON.stringify(answers)) return;

    this.results[answers.questionId] = JSON.stringify(answers);
    this.emit('answers', answers);
}

HacksportsClient.prototype.answer = function(id, answer) {
    var obj = {
        questionId: id,
        answer: answer
    };

    this.stream.write('ANSWER: ' + JSON.stringify(obj));
}

HacksportsClient.prototype.getGameInfo = function(cb) {
    this.stream.write('GET_GAME_INFO: ' + JSON.stringify({}));
    this._gameInfoCb = cb;
}

HacksportsClient.prototype.getPreviousQuestions = function(cb) {
    this.stream.write('GET_PREVIOUS_QUESTIONS: ' + JSON.stringify({}));
    this._previousQuestionsCb = cb;
}

module.exports = HacksportsClient;
