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
        el.querySelector('.hometeam').textContent = gameInfo.home;
        el.querySelector('.awayteam').textContent = gameInfo.away;

        el.querySelector('.teams').style.display = 'block';
    }.bind(this));
}

module.exports = GameInfo;
