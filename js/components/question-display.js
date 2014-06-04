var fs = require('fs');
var inherits = require('util').inherits;
var Widget = require('browserify-widget');

inherits(QuestionDisplay, Widget);

var html = fs.readFileSync(__dirname + '/question-display.html', 'utf8');

function QuestionDisplay() {
    Widget.call(this, html);
}

module.exports = QuestionDisplay;
