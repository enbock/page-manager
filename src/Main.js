/* global CoreJs, namespace, use */

namespace("PageManager", function() {
	function Main() {
		CoreJs.Event.Handler.call(this);
	}
	Main.prototype = Object.create(CoreJs.Event.Handler.prototype);
	this.Main = Main.prototype.constructor = Main;
	
	Main.prototype.run = function(event) {
		var element = document.body;
		element.innerHTML = "<h1>Hello, world!</h1>";
	};
});
