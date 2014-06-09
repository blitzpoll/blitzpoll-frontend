var fs = require('fs');
var inherits = require('util').inherits;
var Widget = require('browserify-widget');
var domify = require('domify');

inherits(QuestionDisplay, Widget);

var html = fs.readFileSync(__dirname + '/question-display.html', 'utf8');

function QuestionDisplay() {
    Widget.call(this, html);
}

QuestionDisplay.prototype.setQuestion = function(question) {
    var el = document.querySelector('#question');
    el.setAttribute('data-id', question.id);
    el.textContent = question.text;

    var aEl = document.querySelector('.answers');
    question.answers.forEach(function(answer, i) {
        aEl.appendChild(domify('<button class="btn btn-block btn-outlined" id="answer-' + (i + 1) + '">' + answer + '</button>'))
    });
}

module.exports = QuestionDisplay;
