var PubSub = {
	subscribe: function (channel, cb) {
		// if (!this._callbacks this._callbacks = {};
			// var list = (this._callbacks || this._callbacks = {})[channel];
			// list = list || [];
			// list.push(cb);
			var _callbacks = this._callbacks || (this._callbacks = {});
			var list = _callbacks[channel] || _callbacks[channel] = [];

			list.push(cb);
			return this;
	},

	publish: function () {
		var args = [].slice.apply(arguments, 0),
			channel = args.shift();

		if(!this._callbacks) return this;
		if(!this._callbacks[channel]) return this;

		var list = this._callbacks[channel];
		
		for (var i=0, len=list.length; i<len; i++) {
			list[i].apply(this, args);
		}

		return this;
	}
}
publish('go',name, age);