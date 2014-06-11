var fs = require('fs');
var inherits = require('util').inherits;
var Widget = require('browserify-widget');

inherits(NavBar, Widget);

var html = fs.readFileSync(__dirname + '/nav-bar.html', 'utf8');

function NavBar() {
    Widget.call(this, html);
}

module.exports = NavBar;
