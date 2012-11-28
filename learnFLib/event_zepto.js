$.fn.bind = function (event, callback) {
	return this.each(function () {
		add(this, event, callback);
	});
}

// focus 和 blur 不会冒泡 在webkit 下替换为focus 和 blur 其它环境下替换为capture
// fn 的执行环境应为 selector
// ?capture 捕获
$.fn.delegate = function (selector, event, callback) {
	var capture = false;
	if (event == 'blur' || event == 'focus') {

		if ($.isWebkit) {
			event = event == 'blur' ? 'focusout' : event == 'focus' ? 'focusin' : event;
		} else {
			capture = true;
		}
	}

	this.each(function (i, element) {
		add(element, event, callback, selector, function (fn) {
			return function (e) {
				var evt, match = $(e.target).closet(selector, element)[0];
				if (match) {
					evt = $.extend(createProxy(e),{currentTarget:match, liveFired:element});
					return fn.apply(match, [evt].concat([].slice.call(arguments,1)));
				}
			}
		}, capture);
	});
}

function add(element, events, fn, selector, getDelegate, capture) {
	capture = !!capture;
	var id = zid(element), set = (handlers[id] || (handlers[id] = [])); // handlers ?
	eachEvent(events, fn, function (event, fn) {
		var delegate = getDelegate && getDelegate(fn, event),
			callback = delegate || fn;
		var proxyfn = function (event) {
			var result = callback.apply(element, [event].concat(event.data));
			if (result == false) event.preventDefault();
			return result;
		}
		var handler = $.extend(parse(event), {fn:fn, proxy:proxyfn, sel: selector, del:delegate, i:set.length});
		set.push(handler);
		element.addEventListener(handler.e, proxyfn, capture);
	})
}

// 每一个都分为一个小的模块执行
window.Zepto = Zepto;
'$' in window || window.$ = Zepto;

//  general

var li = 