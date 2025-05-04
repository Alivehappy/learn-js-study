function sum(a) {
	let sumValue = a;
	function f(b) {
		sumValue += b;
		return f;
	}
	f.toString = f.valueOf = function () {
		return sumValue;
	};
	return f;
}
sum(1)(2); // 1 + 2
sum(1)(2)(3) + ''; // 1 + 2 + 3
sum(5)(-1)(2);
alert(sum(6)(-1)(-2)(-3)); // 0
alert(sum(0)(1)(2)(3)(4)(5)); // 15
// у меня ошибка овзрващает просто функцию  ане рещульиат и я не моу понят что конркетно не так , с консоль логом не рабоатет , только с алертом
function sum(a) {
	let currentSum = a;

	function f(b) {
		currentSum += b;
		return f;
	}

	f.toString = function () {
		return currentSum;
	};

	return f;
}

alert(sum(1)(2)); // 3
alert(sum(5)(-1)(2)); // 6
alert(sum(6)(-1)(-2)(-3)); // 0
alert(sum(0)(1)(2)(3)(4)(5)); // 15
//Если вы хотите использовать Immediately Invoked Function Expression (IIFE) с цепочкой вызовов и сразу получить результат, то действительно столкнётесь с ограничением: после двух вызовов нужно явное преобразование в примитив. .
{
	function sum(a) {
		let sumValue = a;
		function f(b) {
			sumValue += b;
			return f;
		}
		f[Symbol.toPrimitive] = hint => {
			if (hint === 'number' || hint === 'default') {
				return sumValue;
			}
			return String(sumValue);
		};
		return f;
	}
	sum(1)(2); // 1 + 2
	sum(1)(2)(3) + ''; // 1 + 2 + 3
	sum(5)(-1)(2);
}

function add(sum = 0) {
	return function count(operand) {
		if (operand === undefined) {
			return sum;
		}
		return add(sum + operand);
	};
}
//каррирование

function focus() {
	const r = 1;
	function go() {
		console.log(r);
		setTimeout(go, 1000);
	}
	go();
}
focus();

const obj = {
	a: 3,
};
const obj1 = Object.assign(obj, {}, {});
console.log(obj1);
