// var util = {};

// extend function for MVC
(function  () {

	Function.prototype.extend = function (source) {
		source = source || {};
		var F = function() { this.init.apply(this, arguments) };
		F.prototype.__proto__ = this.prototype;
		for (var prop in source) {
			F.prototype[prop] = source[prop];
		}
		return F;
	};

})();

// A uitl Collection 
(function(){
	// Collection function for Objects and Array
	var _ = {};

	var ArrayProto = Array.prototype, 
		ObjProto = Object.prototype,
		FuncProto = Function.prototype;

	var slice = ArrayProto.slice,
		unshift = ArrayProto.unshift,
		toString = ObjProto.toString, // 比较强大的
		hasOwnProperty = ObjProto.hasOwnProperty;

	// **ECMAScript 5** method
	var nativeFilter = ArrayProto.filter;

	_.has = function (obj, key) {
		return hasOwnProperty.call(obj, key);
	}

	_.isElement = function (obj) {
		return !!(obj && obj.nodeType == 1);
	}

	// ECM5 FUNC LIST
	// 

	// isArray
	// isObject
	// _.each(list, iterator, [context])
	_.each = function (obj, callback, context) {
		if (obj == null) return;

		if (obj.forEach) {
			obj.forEach(callback, context);

		} else if (obj.length === +obj.length) { // 太精巧了，判断它是数字
			for (var i = 0, len = obj.length; i < len; i++ ) {
				// i in obj?
				i in obj && callback.call(context, obj[i], i, obj);
			}

		} else {
			for (var key in obj) {
				if ( _.has(obj, key) ) {
					callback.call( context, obj[i], i, obj );
				}
			}
		}
	};

	_.map = function (obj, iterator, context) {
		var results = [],
			i = 0;

		 _.each()

		return results;
	};

	_.delay = function (func, wait) {
		var args = slice.call(arguments, 2);
		return setTimeout(function(){ return func.apply(null, args); },wait);
	};

	_.defer = function (func) {
		return _.delay.apply(_,[func,1].concat(slice.call(arguments, 1)));
	};

	// 单例，又像模块的书写方式
	_.once = function (func) {
		var ran = false, memo;
		return function () {
			if (ran)	 return memo;
			ran = true;
			return memo = func.apply(null, arguments);
		};
	};

	// filter 返回一个数组
	_.filter = function (obj, iterator, context) {
		var results = [];
		// 如果不存在obj 直接返回空数组
		if (!obj) return results;
		// 如果有本地方法,则执行返回这个数组
		if (nativeFilter && obj.filter == nativeFilter) return obj.filter(iterator, context);
		_.each(obj, function (value, index, list) {
			if(iterator.call(context, value, index, list)) results[results.length] = value;
		});
		return results;
	};

	_.reject = function (obj, iterator, context) {
		var results = []	;
		if (!results) return results;

		return results;
	};



	


	window._ = _;

})();