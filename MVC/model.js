if (typeof Object.create !== 'function') {
	Object.create = function(o){
		function F(){};
		F.prototype = o;
		return new F;
	};
}
// Model 基于原型的继承

var Model = {
	inherited: function () {
		
	},

	created: function () {
			
	},

	prototype: {
		init: function () {
			
		}
	},

	create: function () {
		var object= Object.create(this);
		object.parent = this;
		object.prototype = object.fn = Object.create(this.prototype);

		object.created();
		this.inherited(object);
		return object;
	},

	// 生成实例
	init: function () {
		var instance = Objec.create(this.prototype);
		instance.parent = this;
		instance.init.apply(instance, arguments);
		return instance;
	},

	extend: function(o) {
		var extended = o.extended;
		jQuery.extend(this, o);
		if(extended) extended();
	},

	include: function(o) {
		var included = o.included;
		jQuery.extend(this.prototype, o);
		if(included) o.included();
	}
}

var User = Model.create();
var Bike = Model.create();

var user = User.init();

Model.extend({
	find: function(){}
});

Model.include({
	init: function(atts) {
		this.attributes = this.load(atts);
	},
	load: function(attributes) {
		for (var name in attributes) {
			this[name] = attributes[name];
		}
	}
});

// 因为是原型继承，所以及时生效
var bike = Bike.init({name: 'cannondale'});

Model.records = {};

/* 持久化 */
Model.include({
	newRecord: true,
	create: function(){
		this.newRecord = false;
		this.parent.records[this.id] = this;
	},
	destroy: function(id){
		delete this.parent.records[this.id];
	},
	update: function(){

	},
	save: function(){
		this.newRecord ? this.create() : this.update();
	}
})