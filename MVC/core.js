(function(){
	// 类库
	var Class = function () {
		var klass = function () {
			this.init.apply(this, arguments);
		};
		klass.prototype.init = function(){};

		return klass;
	}

	// 类库2
	var createClass =  function () {
		var klass = function () {
			this.init.apply(this, arguments);
		};
		klass.prototype.init = function(){};

		return klass;
	}

	var Person = new Class;
	var Person = createClass();
	Person.prototype.init = function () {
		// 构造函数	
	}

	var person = new Person;

});

// 类库
var Class = function (parent) {
	var klass = function () {
		this.init.apply(this, arguments);
	};
	// 改变klass原型
	if (parent) {
		var F = function(){};
		F.prototype = parent.prototype;
		klass.prototype = new F;
	}

	klass.prototype.init = function(){};

	// 定义别名
	klass.fn = klass.prototype;

	// 添加proxy函数
	klass.proxy = function (func) {
		var self = this;
		return (function () {
			return func.apply(self, arguments);
		});
	};
	klass.fn.proxy = klass.proxy;

	// 为实例添加访问构造类的方法
	klass.fn.parent = klass;
	klass._super = klass.__proto__; // 这个还不是太懂

	// 给类添加属性
	klass.extend = function (obj) { // obj 一般都为原生Object
		// 添加属性执行后的回调函数
		var extended = obj.extended;
		for (var i in obj) {
			klass[i] = obj[i];
		}
		if (extended) extended(klass);
	}

	// 实例添加属性
	klass.include = function (obj) {
		var included = obj.included;
		for (var i in obj) {
			klass.fn[i] = obj[i];
		}
		if(included) included();
	}

	return klass;
};

// 测试继承
var Animal = new Class;
Animal.include({
	breath: function () {
		console.log( 'breath' );
	}
});

var Cat = new Class(Animal);
var cat = new Cat;
cat.breath();
console.log( cat.parent );

// 测试proxy
var Button = new Class;

Button.include({
	init: function (element) {
		this.element = document.querySelector(element);

		this.element.onclick = this.proxy(this.click);
	},
	click: function (e) {
		console.log( e.target );
	}
});
window.onload = function () {
	var myBtn = new Button('#myBtn');
}


// var Person = new Class;

// Person.extend({
// 	find: function(id) {/* ... */},
// 	exists: function(id) {/* ... */},
// 	extended: function (klass) {
// 		console.log(klass, ' was extended');
// 	}
// });

// Person.include({
// 	save: function(id) {/* ... */},
// 	destory: function(id) {/* ... */}
// });

// // 支持模块化

// var person = Person.find(1);

// person.name = 'han';
// person.save();
