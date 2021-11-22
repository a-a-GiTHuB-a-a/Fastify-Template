((oldlog) => {
	console.log = function(...args) {
		oldlog(...args);
	}
})(console.log);
$("body").append("<br/>hi h");