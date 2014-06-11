var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var reconnect = require('reconnect/shoe');

inherits(HacksportsClient, EventEmitter);

function HacksportsClient() {
    reconnect(function(stream) {
        this.stream = stream;
        this.emit('ready');

        this.stream.on('data', function(data) {
            this._parseIncomingData(data);
        }.bind(this));
    }.bind(this)).connect('/live-data');

    this.results = {};
    this.questions = {};
}

HacksportsClient.prototype._parseIncomingData = function(data) {
    var cmd = data.substring(0, data.indexOf(':'));
    var obj = JSON.parse(data.substring(data.indexOf(':') + 1));

    switch(cmd) {
    case 'QUESTION': this._handleQuestion(obj); break;
    case 'ANSWERS': this._handleAnswers(obj); break;
    case 'GAME_INFO': this._gameInfoCb.call(this, obj); break;
    case 'PREVIOUS_QUESTIONS': this._handlePreviousQuestions(obj); break;
    }
}

HacksportsClient.prototype._handleQuestion = function(question) {
    this.questions[question.id] = question;
    this.results[question.id] = {};
    this.emit('question', question);
}

HacksportsClient.prototype._handlePreviousQuestions = function(questions) {
    if(!questions) {
        return this._previousQuestionsCb.call(this, []);
    }
    questions.forEach(function(question) {
        this.questions[question.id] = question;
    }.bind(this));
    this._previousQuestionsCb.call(this, questions);
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

HacksportsClient.prototype.getCurrentQuestion = function(cb) {

}

HacksportsClient.prototype.getPreviousQuestions = function(cb) {
    this.stream.write('GET_PREVIOUS_QUESTIONS: ' + JSON.stringify({}));
    this._previousQuestionsCb = cb;
}

module.exports = HacksportsClient;
