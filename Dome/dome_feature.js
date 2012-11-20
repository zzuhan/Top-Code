(function () {
	Dome.isFunction = function (obj) {
		return typeof obj === 'function';
	};
	// Dome like a LikeArray Class,it's instance 
	function Dome(els) {
		for (var i = 0,len=els.length; i < len; i++) {
				this[i] = els[i];
		};
		this.length = els.length;
	}

	Dome.prototype = {
		constructor: Dome,

		map: function (callback) {
			var results = [];
			for (var i = 0,len=this.length; i < len; i++) {
				results.push( callback.call(this[i], i, this[i]) )
			};
			// this.each()
			return results;
		},/* end map */

		each: function (callback, args) { //可以使用return false 提前跳出this循环 也应该实现object的 each
			var name,
				i = 0,
				length = this.length,
				isObj = length === undefined || Dome.isFunction(this);

			if ( args ) {
				for ( ; i < length; ) {
					if ( callback.apply( this[i++], args) === false ) {
						break;
					}
				}

			// A special, fast, case for the most common use of each
			} else {
				for ( ; i < length; ) {
					if ( callback.call( this[i], i, this[i++] ) === false) {
						break;
					}
				}
			}
		},/* end map */

		

	};

	var dome = {
		// handle 'string', DOM node, NodelList
		get: function (selector) {
			var els; //an array contains Dom Object
			if (typeof selector === 'string') {
				els = document.querySelectorAll(selector)
			} else if (typeof selector.length === 'number') {
				if (selector instanceof Dome) return selector;
				els = selector;
			} else {
				els = [selector];
			}
			return new Dome(els);
		},

		create: function (tagName, attrs) {
			
		}
	}

	window.dome = dome;

})();