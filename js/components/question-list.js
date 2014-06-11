var fs = require('fs');
var inherits = require('util').inherits;
var Widget = require('browserify-widget');

inherits(QuestionList, Widget);

var html = fs.readFileSync(__dirname + '/question-list.html', 'utf8');

function QuestionList() {
    Widget.call(this, html);
}

QuestionList.prototype.addQuestions = function(questions) {
    questions.forEach(this.addQuestion.bind(this));
}

QuestionList.prototype.addQuestion = function(question) {
    this.renderedTo.forEach(function(el) {
        var ul = el.querySelector('.question-list');
        var li = document.createElement('li');
        li.className = 'table-view-cell';
        var a = document.createElement('a');
        a.className = 'navigate-right';
        a.textContent = question.text.substring(0, 20);
        if(question.text.length > 20) a.textContent += '...';
        a.href = '/question/' + question.id;
        li.appendChild(a);
        ul.appendChild(li);
    });
}

module.exports = QuestionList;
