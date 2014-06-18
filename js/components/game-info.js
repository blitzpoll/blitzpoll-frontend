var fs = require('fs');
var inherits = require('util').inherits;
var Widget = require('browserify-widget');

inherits(GameInfo, Widget);

var html = fs.readFileSync(__dirname + '/game-info.html', 'utf8');

function GameInfo() {
    Widget.call(this, html);
}

GameInfo.prototype.setInfo = function(gameInfo) {
    this.renderedTo.forEach(function(el) {
        var home = gameInfo.home.substring(3, 4).toUpperCase() + gameInfo.home.substring(4);
        var away = gameInfo.away.substring(3, 4).toUpperCase() + gameInfo.away.substring(4);
        el.querySelector('.hometeam').textContent = home;
        el.querySelector('.awayteam').textContent = away;

        el.querySelector('.homelogo').src = '/flags/' + gameInfo.home + '.png';
        el.querySelector('.awaylogo').src = '/flags/' + gameInfo.away + '.png';

        el.querySelector('.teams').style.display = 'block';
    }.bind(this));
}

GameInfo.prototype.hide = function() {
    this.renderedTo.forEach(function(el) {
        el.querySelector('.teams').style.display = 'none';
    });
}

GameInfo.prototype.show = function() {
    this.renderedTo.forEach(function(el) {
        el.querySelector('.teams').style.display = 'block';
    })
}

module.exports = GameInfo;
