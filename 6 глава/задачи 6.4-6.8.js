//Создайте функцию, которая выводит в консоль числа от N до 0 с интервалом 1 секунду, используя setInterval. По достижении 0 таймер должен остановиться
function showNum(from, to) {
	let current = from;
	let timerId = setInterval(function () {
		console.log(current);

		if (current === to) {
			clearInterval(timerId);
		} else {
			current--;
		}
	}, 1000);
}
showNum(5, 0);
{
	//то это самое только через  SetTimeout
	function showNum(from, to) {
		let current = from;
		setTimeout(function go() {
			console.log(current);
			if (current > to) {
				current--;
				setTimeout(go, 1000); //нам нужно передать ссылку на функцию для вызова через таймаут.
			}
		}, 1000);
	}
	showNum(5, 0);
}

//Напишите функцию delayLog(message, time), которая выводит message в консоль через time миллисекунд, используя setTimeout.
function delayLog(message, time) {
	setTimeout(() => {
		console.log(message);
	}, time);
}
delayLog('Hello', 2000);

/*Перепишите код с var так, чтобы i в setTimeout была уникальной для каждой итерации, используя IIFE:
Все таймеры видят одно и то же i, которое после цикла становится 3


for (var i = 0; i < 3; i++) {
  // Ваш код с IIFE
}
*/
//Named Function Expression+IIFE
for (var i = 0; i < 3; i++) {
	var func = (function saveValue(copy) {
		return function () {
			console.log(copy);
		};
	})(i);
	setTimeout(func, 100);
	//Значение i передаётся в параметр copy
}
/*Что попадает в setTimeout:

Не сама saveValue, а результат её вызова (та функция, что с console.log)

*/
