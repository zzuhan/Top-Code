(function () {
	/* fix ie indexOf function of IE */	
	if (typeof Array.prototype.indexOf !== 'function') {
		Array.prototype.indexOf = function (item) {
			for (var i=0, len=this.length; i<len; i++) {
				if (this[i] === item) {
					return i;
				}
			}
			return -1;
		};
	}

})();


(function () {
	// 将elements包起来可以加入我们的方法
	function Dome(els) {
		for(var i=0, len = els.length; i<len; i++ ) {
			this[i] = els[i]; //创建出来一个类数组伪数组对象，通过[0] 可以转换为原生对象
		}
		this.length = len; //fake array 
	}

	Dome.fn = Dome.prototype;

	Dome.fn.map = function (callback) {  // callback(item, i)
		var results = [], i=0;
		for ( ; i<this.length; i++) {
			results.push( callback.call(this, this[i], i) ); //this指向自己
		}
		return results;
	};

	Dome.fn.mapOne = function (callback) {
		var results =  this.map(callback);
		return (results.length > 1 ) ?  results : results[0]; // if the results only one return its self not array
	};

	Dome.fn.forEach = function (callback) {
		this.map(callback);
		return this;
	};

	Dome.fn.text = function (text) {
		if (typeof text !== 'undefined') { //don't use if(text) 
			return this.forEach(function (el) { // return fot chainable
				el.innerText = text;
			});
		} else {
			return this.mapOne(function (el) {
				return el.innerText;
			});
		}
	};

	Dome.fn.html = function (html) {
		if (typeof html !== 'undefined') {
			return this.forEach(function (el) {
				el.innerHTML = html;
			});
		} else {
			return this.mapOne(function (el) {
				return el.innerHTML;
			});
		}
	};

	Dome.fn.addClass = function (classes) {
		var className = '';
		if (typeof classes !== 'string') {
			for (var i = 0,len=classes.length; i < len; i++) {
				className += ' ' +classes[i];
			};
		} else {
			className += ' '+ classes;
		}
		return this.forEach(function (el) {
			el.className += className;
		});
	};

	Dome.fn.removeClass = function (clazz) {
		this.forEach(function (el) {
			var cs = el.className.split(' '), i;
			while ( (i=cs.indexOf(clazz)) > -1 ) {
				// 由两部分添加 即i前加i后 可以有方法直接去除某个数组
				cs.splice(i);
				// cs = cs.slice(0, i).concat(cs.slice(++i));
			}
			el.className = cs.join(' ');
		});
	};

	Dome.fn.attr = function (attr, val) {
		if (typeof val !== 'undefined') {
			return this.forEach(function (el) {
				el.setAttribute(attr, value);
			});
		} else {
			return this.mapOne(function (el) {
				return el.getAttribute(attr);
			});
		}
	};


	Dome.fn.append = function (el) {
			this.forEach(function () {
				el.appendChild(el)
			});
	};

	Dome.fn.prepend = function (els) { // 需要考虑如果是插入到多个元素中，需要克隆
		this.forEach(function (parEl, i) {
			els.forEach(function (childEl) {
				if ( i > 0) {
					childEl = childEl.cloneNode(true);
				}
				parEl.appendChild(childEl)
			});
		});
	};

	Dome.fn.prepend = function (els) { //els 插入应该用倒插的方法
		this.forEach(function (parEl, i) {
			for (var j = els.length-1; j>-1 ; j--) {
					childEl = ( i > 0 ) ? childEl.cloneNode(true) : childEl;
					if (parEl.firstChild) {
						parEl.insertBefore(childEl, parEl.firstChild)
					} else {
						parEl.appendChild(childEl)
					}
			}
		});
	};

	Dome.fn.remove = function () { //Dome 对象中还保存着DOM对象引用，仍然可以进行别处添加
		return this.forEach(function (el) {
			return el.parentNode.removeChild(el);
		});
	};

	Dome.fn.on = (function () { // 这种优势很大 不用每次都进行检测，直接返回了检测生成的函数
		if (document.addEventListener) {
			return function (evt, fn) {
				return this.forEach(function (el) {
					el.addEvnetListener(evt, fn, false);
				});
			}
		} else if (document.attachEvent) {
			return function (evt, fn) {
				return this.forEach(function (el) {
					el.addEvnetListener('on'+evt, fn);
				});
			}
		} else {
			return function (evt, fn) {
				return this.forEach(function (el) {
					el['on'+evt] = fn;
				})
			}
	};

	Dome.fn.off = (function () {
		if (document.removeEventListener) {
			return function (evt, fn) {
				this.forEach(function (el) {
					el.removeEventListener(evt, fn, false);
				});
			};
		} else if (document.detachEvent) {
			return function (evt, fn) {
				this.forEach(function (el) {
					el.detachEvent('on'+evt, fn);
				});
			};
		} else {
			return function (evt, fn) {
				this.forEach(function (el) {
					el['on'+evt] = null;
				});
			};
		}

	})();



})(); /* end IIFE */


	var dome = {
		get: function (selector) {
				var els; // must be an array
				if (typeof selector === 'string') {
					els = document.querySelectorAll(selector);
				} else if (selector.length) { // handle NodeList
					if (selector instanceof Dome) return selector
					els = selector;
				} else { // handle DOM Node because we need a Array to pass to constructor Dome
					els = [selector];
				}
				return new Dome(els);
		},

		create: function (tagName, attrs) { // also return a Dome instance
			var el = new Dome( document.createElement(tagName) );
			if (attrs) {
				if (attrs.text) {
					el.innerText = text;
					delete attrs.text;
				}
				if (attrs.className) {
					el.addClass(attrs.className);
					delete attrs.className;
				}
				for(var key in attrs){
					if (el.hasOwnProperty(key)) {
						el.attr(key, attrs[key]);
					}
				}
			}
			return el;
		}/* end create */
	}
	
	window.dome = dome;
})();