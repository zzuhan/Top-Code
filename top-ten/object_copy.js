// copy object may be has many solutions i will collect it
var object_copy = function (obj) {
	var newObj = {};
	for (var i in obj) {
		if (typeof obj[i] == object) {
			newObj[i] = object_copy(obj[j]);
		} else {
			newObj[i] = obj[i];
		}
	}
	return newObj;
};
