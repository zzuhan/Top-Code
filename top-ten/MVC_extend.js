Function.prototype.extend = function (source) {
	source = source || {};
	var F = function() {this.init.apply(this, arguments)};
	F.prototype.__proto__ = this.prototype;
	for (var prop in source) {
		F.prototype[prop] = source[prop];
	}
	return F;
}

// 有待验证，可能有点小问题