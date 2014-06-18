var fs = require('fs');
var domify = require('domify');
var html = fs.readFileSync(__dirname + '/question-list.html', 'utf8');

module.exports = function(el, questions) {
    var listElement = domify(html);
    el.appendChild(listElement);

    var questions = questions.sort(function(a, b) {
         return (a.timestamp > b.timestamp) ? -1 : 1;
    });

    for(var i = 0; i < questions.length; i++) {
        var question = questions[i];
        var li = document.createElement('li');
        li.className = 'table-view-cell';
        var a = document.createElement('a');
        a.className = 'navigate-right';
        a.textContent = question.text.substring(0, 20);
        if(question.text.length > 20) a.textContent += '...';
        a.href = '/question/' + question.id;
        li.appendChild(a);
        listElement.appendChild(li);
    }
}
