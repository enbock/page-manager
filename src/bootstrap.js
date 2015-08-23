use.psr4("CoreJs", "node_modules/corejs-w3c/src");
use.psr4("PageManager", "src");

use("CoreJs.DependencyInjection.Container");

/**
 * Bootstrapper. 
 * 
 * @param {CoreJs.Ajax} ajax The ajax request object.
 */
function Bootstrap(ajax) {
	CoreJs.Event.Listener.call(this);
	this.ajax           = ajax;
	this.windowReady    = false;
	this.containerReady = false;
	
	this.addEventListener("pg.start", this);
}
Bootstrap.prototype = Object.create(CoreJs.Event.Listener.prototype);
Bootstrap.prototype.construct = Bootstrap;

/**
 * The event handler.
 * 
 * @param {Event} event System and custom events.
 */
Bootstrap.prototype.handleEvent = function(event) {
	switch(event.type) {
		case "load":
			// unbind
			window.removeEventListener(event.type, this);
			this.windowReady = true;
			this.dispatchEvent(new CoreJs.Event("pg.start"));
		break;
		case CoreJs.Ajax.Event.LOAD:
			this.ajax.removeEventListener(CoreJs.Ajax.Event.LOAD, this);
			var config = JSON.parse(event.detail.responseText);
			var self = this;
			namespace("PageManager.Injection", function() {
				this.container = 
					new CoreJs.DependencyInjection.Container(config);
				this.container.load();
				self.containerReady = true;
				self.dispatchEvent(new CoreJs.Event("pg.start"));
			});
		break;
		case "pg.start":
			if (!this.windowReady || !this.containerReady) {
				return;
			}
			/* global PageManager */
			// start application
			namespace("PageManager", function() {
				var cleaner = 
					PageManager.Injection.container.get("boot.cleaner");
				this.app    =
					PageManager.Injection.container.get("main");
				
				cleaner.clean();
				this.app.run();
			});
		break;
	}
};

/**
 * Start loading activities.
 */
Bootstrap.prototype.load = function() {
	this.ajax.addEventListener(CoreJs.Ajax.Event.LOAD, this);
	this.ajax.load();
};

// Main routine
var loader = new Bootstrap(new CoreJs.Ajax("get", "config/services.json"));
loader.load();
window.addEventListener("load", loader);