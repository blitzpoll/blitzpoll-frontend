var fs = require('fs');
var inherits = require('util').inherits;
var Widget = require('browserify-widget');

inherits(QuestionDisplay, Widget);

var html = fs.readFileSync(__dirname + '/question-display.html', 'utf8');

function QuestionDisplay() {
    Widget.call(this, html);
}

QuestionDisplay.prototype.setQuestion = function(question) {
    var el = document.querySelector('#question');
    el.setAttribute('data-id', question.id);
    el.textContent = question.text;
}

module.exports = QuestionDisplay;
