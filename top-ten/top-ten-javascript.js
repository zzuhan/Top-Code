// 添加事件
function addEvent (elm, evType, fn) {
	if (elm.addEventListener) {
		elm.addEventListener(evType, fn, false);
	} else if (elm.attachEvent) {
		elm.attachEvent('on'+evType, fn);
	} else {
		elm['on'+evType] = fn;
	}
	
}

// 添加Load事件
function addLoadEvent (func) {
	var oldLoad = window.onload;
	if (typeof oldLoad != 'function') {
		window.onload = fnc;
	} else {
		window.onload = function () {
			oldLoad();
			func();
		}
	}
}

// getElementsByTagName
function getElementsByTagName (searchClass, node, tag) {
	var matchElements = new Array();
	if (!node) {
		node = window.document;
	} 
	if (!tag) {
		tag = '*';
	}
	var els = node.getElementsByTagName(tag);
	var elsLen  = els.length;
	var pattern = new RegExp('(^|\\s)'+searchClass + ('\\s|$'));
	for ( var i=0, j=0; i<elsLen; i++) {
		if( pattern.test(els[i].className)) {
			matchElements[j] = els[i];
			j++;
		}
	}
	return matchElements;
}

// 
function toggle (idStr) {
	var el = document.getElementById(idStr);
	if (el.style.display != 'none'){
		el.style.display = 'none';
	} else {
		el.style.display = '';
	}
}

// insertAfter
function insertAfter (node, refNode) {
	// nextSibling值为null也没有问题
	refNode.parentNode.insertBefore(node, refNode.nextSibling);
}

// 插入到第一个位置
function prependChild(parent, newNode) {
	if (parent.firstChild) {
		parent.insertBefore(newNode, parent.firstChild);
	} else {
		parent.appendChild(newNode);
	}
}

// 判断一个数是否在数组中
Array.prototype.inArray = function (value) {
	var i;
	for (i=0; i<this.length; i++) {
		if (this[i] === value) {
			return true;
		}
	}
	return false;
}

// getCookie, setCookie, deleteCookie

// PROTOTYPE FUNCTION $
// 如果是字符串则作为ID名获取DOM, 如果非字符串则直接放入数组，如果只输入一个参数，则直接返回获得的内容
function $() {
	var elements = new Array();
	for (var i = 0, len=arguments.length; i < len; i++) {
			var element = arguments[i];
			if (typeof element == 'string'){
				element = document.getElementById(element);
			}
			if (len==1) {
				return element;
			}
			elements.push(element);
	};
	return elements;	
}
