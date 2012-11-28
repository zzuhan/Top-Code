JavaScript Namespacing
===

// ## Prefix Namespacing

myGame_start = function () {
	
}
myGame_end = function () {
	
}

**problem**: create many global objects

// Single Object Namespacing

var myGame = {

}
myGame.start = function () {
	console.log( 'start game' );
}
myGame.end = function () {
	console.log( 'ending...' );
}
myGame.start();

myGame.start(); 执行过程 编译器先找到myGame对象，然后找start方法
// problem 不利于方法传递
myGame.showMsg = function(){

}

