use.psr4("CoreJs", "node_modules/corejs-w3c/src");
use.psr4("PageManager", "src");

/* global PageManager */
use("PageManager.Main");
use("CoreJs.Bootstrap.HeadCleaner");

/**
 * Bootstrapper. 
 */
function Bootstrap() {
	CoreJs.Event.Handler.call(this);
}
Bootstrap.prototype = Object.create(CoreJs.Event.Handler.prototype);
Bootstrap.prototype.construct = Bootstrap;

Bootstrap.prototype.handleEvent = function() {
	// unbind
	window.removeEventListener("load", this);
	
	// load & start application
	namespace("PageManager", function() {
		var cleaner = new CoreJs.Bootstrap.HeadCleaner(document.head);
		this.app    = new PageManager.Main();
		
		cleaner.clean();
		this.app.run();
	});
};

var loader = new Bootstrap();
window.addEventListener("load", loader);