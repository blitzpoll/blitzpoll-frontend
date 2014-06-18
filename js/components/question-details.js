var domify = require('domify');

module.exports = function(el, question) {
    var answers = [];
    var keys = Object.keys(question.results);
    var countTotal = 0;

    for(var i = 0; i < keys.length; i++) {
        answers.push({
            text: keys[i],
            count: question.results[keys[i]]
        });

        countTotal += question.results[keys[i]];
    }

    var questionText = document.createElement('p');
    questionText.textContent = question.text;
    el.appendChild(questionText);

    answers.forEach(function(answer, i) {
        answer.percentage = (countTotal > 0) ? (100/countTotal) * parseInt(answer.count) : 0;
        var div = document.createElement('div');
        div.className = 'result result-' + i;
        var p2 = document.createElement('p');
        p2.className = 'number';
        p2.textContent = Math.floor(answer.percentage) + '%';
        div.appendChild(p2);
        var p3 = document.createElement('p');
        p3.textContent = answer.text;
        div.appendChild(p3);
        el.appendChild(div);

        if(i === answers.length - 1) {
            var totalCount = document.createElement('p');
            totalCount.className = 'votes';
            totalCount.textContent = countTotal + ' Stimme(n)';
            el.appendChild(totalCount);
        }
    });
}
