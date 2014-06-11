var fs = require('fs');
var inherits = require('util').inherits;
var Widget = require('browserify-widget');
var domify = require('domify');

inherits(QuestionDisplay, Widget);

var html = fs.readFileSync(__dirname + '/question-display.html', 'utf8');
var buttonHtml = fs.readFileSync(__dirname + '/question-button.html', 'utf8');

function QuestionDisplay() {
    Widget.call(this, html);
}

QuestionDisplay.prototype.setQuestion = function(question, onclick) {
    var el = document.querySelector('#question');
    el.setAttribute('data-id', question.id);
    el.textContent = question.text;

    var aEl = document.querySelector('.answers');
    question.answers.forEach(function(answer, i) {
        var btn = domify(buttonHtml);
        btn.id = 'answer-' + (i + 1);
        btn.textContent = answer;
        btn.onclick = onclick;
        aEl.appendChild(btn);
    });
}

QuestionDisplay.prototype.hide = function() {
    this.renderedTo.forEach(function(el) {
        el.querySelector('.question-wrapper').style.display = 'none';
    });
}

QuestionDisplay.prototype.show = function() {
    this.renderedTo.forEach(function(el) {
        el.querySelector('.question-wrapper').style.display = 'block';
    })
}

module.exports = QuestionDisplay;
