var fs = require('fs');
var domify = require('domify');

var html = fs.readFileSync(__dirname + '/question-modal.html');
var buttonHtml = fs.readFileSync(__dirname + '/question-button.html', 'utf8');
var el = domify(html);

document.body.appendChild(el);

el.querySelector('.close').onclick = function(evt) {
    el.classList.toggle('active');
}

var interval = null;
var active = false;

module.exports = function(question, client, remaining) {
    el.querySelector('#question').textContent = question.text;
    el.classList.toggle('active');
    active = true;

    var aEl = document.querySelector('.answers');
    aEl.innerHTML = '';
    question.answers.forEach(function(answer, i) {
        var btn = domify(buttonHtml);
        btn.id = 'answer-' + (i + 1);
        btn.textContent = answer;
        btn.href = '/question/' + question.id;
        btn.onclick = function() {
            client.answer(question.id, answer);
            el.classList.toggle('active');
            active = false;
        };
        aEl.appendChild(btn);
    });

    var cEl = el.querySelector('#countdown');
    cEl.innerHTML = '';
    cEl.textContent = remaining ? remaining : question.timeout;

    interval = setInterval(function() {
        cEl.textContent = parseInt(cEl.textContent) - 1;

        if(parseInt(cEl.textContent) <= 10) {
            cEl.style.color = '#ff2222';
        }

        if(parseInt(cEl.textContent) <= 0) {
            clearInterval(interval);
            if(active === true) {
                el.classList.toggle('active');
                window.location.href = '/question/' + question.id;
            }
        }
    }, 1000);
}
