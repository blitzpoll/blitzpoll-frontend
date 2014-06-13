var fs = require('fs');
var inherits = require('util').inherits;
var Widget = require('browserify-widget');

inherits(NavBar, Widget);

var html = fs.readFileSync(__dirname + '/nav-bar.html', 'utf8');

function NavBar() {
    Widget.call(this, html);
}

NavBar.prototype.setBackbutton = function(set) {
    this.renderedTo.forEach(function(el) {
        el.querySelector('.icon').style.display = (set === true) ? 'block' : 'none';
    });
}

module.exports = NavBar;
