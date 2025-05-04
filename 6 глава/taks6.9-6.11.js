//Создайте декоратор delay(f, ms), который задерживает каждый вызов f на ms миллисекунд. Например
function f(x) {
	console.log(x);
}
function delay(f, ms) {
	return function (...args) {
		//это аргументы из f1000('test') из вызова f
		setTimeout(() => f(...args), ms); ///delay(f, 1000); отсюда 1000
	};
}

let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);
f1000('test'); // показывает "test" после 1000 мс
f1500('test'); // показывает "test" после 1500 мс

///////либо вот по теме
{
	function delay(f, ms) {
		return function () {
			setTimeout(() => f.apply(null, arguments), ms);
		};
	}
	let f1000 = delay(alert, 1000);

	f1000('test');
}

//Создайте декоратор spy(func), который должен возвращать обёртку, которая сохраняет все вызовы функции в своём свойстве calls.

{
	function work(a, b) {
		console.log(a + b);
	}
	function spy(func) {
		function wrapper(...args) {
			wrapper.calls.push(args);
			return func.apply(this, args);
		}
		wrapper.calls = [];
		return wrapper;
	}

	work = spy(work);
	work(1, 2); // 3
	work(4, 5); // 9
	for (let args of work.calls) {
		console.log('call' + args.join());
	}
}

{
	function debounce(func, ms) {
		let timeout;
		return function () {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, arguments), ms);
		};
	}
}
//Вызов debounce возвращает обёртку. При вызове он планирует вызов исходной функции через указанное количество ms и отменяет предыдущий такой тайм-аут
